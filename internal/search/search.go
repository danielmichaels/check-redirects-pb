package search

import (
	"context"
	"fmt"
	"io"
	"net"
	"net/http"
	"regexp"
	"time"
)

type StatusResponse struct {
	Code   int    `json:"code"`
	Phrase string `json:"phrase"`
}
type Responses struct {
	URL             string     `json:"url"`
	TotalTime       int        `json:"total_time"`
	FinalURL        string     `json:"final_url"`
	FinalStatusCode int        `json:"final_status_code"`
	TotalHops       int        `json:"total_hops"`
	Responses       []Response `json:"responses"`
}
type Response struct {
	ID          int                 `json:"id"`
	Hop         int                 `json:"hop"`
	URL         string              `json:"url"`
	HTTPVersion string              `json:"http_version"`
	StatusCode  StatusResponse      `json:"status_code"`
	Host        string              `json:"host"`
	Scheme      string              `json:"scheme"`
	Path        string              `json:"path"`
	IPAddr      string              `json:"ipaddr"`
	TimeElapsed int                 `json:"time_elapsed"`
	Headers     map[string][]string `json:"headers"`
	Body        string              `json:"body"`
	IPInfo      interface{}         `json:"ipinfo"`
}

type URLChecker struct {
	url                 string
	userAgent           string
	resp                *http.Response
	startTime           time.Time
	hop                 int
	responseInformation []Response
	client              *http.Client
	ctx                 context.Context
}

func (s *URLChecker) getTotalTime() int {
	total := 0
	for _, resp := range s.responseInformation {
		total += resp.TimeElapsed
		fmt.Println("TOTOAL", total)
	}
	return total
}
func NewURLChecker(ctx context.Context, url string, userAgent string) *URLChecker {
	if userAgent == "" {
		userAgent = "Check-Redirects.com"
	}

	client := &http.Client{
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			return nil // Allow redirects
		},
		Timeout: 10 * time.Second,
	}

	return &URLChecker{
		url:       url,
		userAgent: userAgent,
		hop:       0,
		client:    client,
		ctx:       ctx,
	}
}

func (s *URLChecker) Run() (*Responses, error) {
	err := s.makeRequest()
	if err != nil {
		return nil, fmt.Errorf("request failed: %v", err)
	}

	s.pathTaken()
	result := &Responses{
		TotalTime:       s.getTotalTime(),
		URL:             s.url,
		FinalURL:        s.resp.Request.URL.String(),
		FinalStatusCode: s.resp.StatusCode,
		TotalHops:       len(s.responseInformation),
		Responses:       s.responseInformation,
	}
	return result, nil
}

func (s *URLChecker) makeRequest() error {
	url := s.addHTTPPrefix()

	startTime := time.Now()
	req, err := http.NewRequestWithContext(s.ctx, http.MethodGet, url, nil)
	if err != nil {
		return err
	}

	req.Header.Set("User-Agent", s.userAgent)

	resp, err := s.client.Do(req)
	if err != nil {
		return err
	}

	s.resp = resp
	s.startTime = startTime
	return nil
}

func (s *URLChecker) addHTTPPrefix() string {
	matched, _ := regexp.MatchString("(?i)^(?:http|https)://", s.url)
	if !matched {
		return "http://" + s.url
	}
	return s.url
}

func (s *URLChecker) resolveIP(host string) string {
	ips, err := net.LookupIP(host)
	if err != nil {
		return fmt.Sprintf("IP Could not be Resolved: %s", host)
	}
	return ips[0].String()
}

func (s *URLChecker) pathTaken() {
	if s.resp == nil {
		return
	}
	s.hop = 0 // Reset hop counter

	var responses []Response

	// Process the redirect chain in the correct order
	var processResponse func(resp *http.Response, hopStartTime time.Time)
	processResponse = func(resp *http.Response, hopStartTime time.Time) {
		if resp == nil {
			return
		}
		nextHopStart := time.Now()
		processResponse(resp.Request.Response, nextHopStart)
		s.hop++
		respObj := s.loadResponseInfo(resp, nextHopStart)
		responses = append(responses, respObj)
	}

	processResponse(s.resp.Request.Response, s.startTime)

	// Process final response
	s.hop++
	respObj := s.loadResponseInfo(s.resp, s.startTime)
	responses = append(responses, respObj)

	s.responseInformation = responses
}

func (s *URLChecker) loadResponseInfo(resp *http.Response, startTime time.Time) Response {
	timeElapsed := int(time.Since(startTime).Milliseconds())

	host := resp.Request.URL.Host
	ipaddr := s.resolveIP(host)

	var body string
	bdy, err := io.ReadAll(resp.Body)
	if err != nil {
		body = ""
	} else {
		body = string(bdy)
	}

	ipData, _ := parseIPData(ipaddr)
	respObj := Response{
		ID:          s.hop,
		Hop:         s.hop,
		URL:         resp.Request.URL.String(),
		HTTPVersion: resp.Proto,
		StatusCode: StatusResponse{
			Code:   resp.StatusCode,
			Phrase: http.StatusText(resp.StatusCode),
		},
		Host:        host,
		Scheme:      resp.Request.URL.Scheme,
		Path:        resp.Request.URL.Path,
		IPAddr:      ipaddr,
		TimeElapsed: timeElapsed,
		Headers:     resp.Header,
		Body:        body,
		IPInfo:      ipData,
	}
	return respObj
}
