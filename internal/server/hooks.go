package server

import (
	"time"

	"github.com/danielmichaels/checkredirects/internal/search"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

var NonCachedURLS = []string{"https://en.wikipedia.org/wiki/Special:Random"}

type URLRequest struct {
	URL       string `json:"url"`
	UserAgent string `json:"user_agent,omitempty"`
}
type URLResponse struct {
	ID     *string `json:"id"`
	Cached bool    `json:"cached"`
}

func (s *Server) checkURL(req URLRequest) (*string, error) {
	record, err := s.app.FindFirstRecordByData("searches", "url", req.URL)
	if err != nil {
		return nil, err
	}
	for _, url := range NonCachedURLS {
		if record.GetString("url") == url {
			return nil, nil
		}
	}
	return &record.Id, nil
}
func (s *Server) saveResponses(r *search.Responses) (*string, error) {
	searches, _ := s.app.FindCollectionByNameOrId("searches")
	sr := core.NewRecord(searches)
	sr.Set("url", r.URL)
	sr.Set("final_url", r.FinalURL)
	sr.Set("status_code", r.FinalStatusCode)
	sr.Set("total_hops", r.TotalHops)
	sr.Set("total_time", r.TotalTime)

	// Save parent
	if err := s.app.Save(sr); err != nil {
		return nil, err
	}

	// Save each hop
	hops, _ := s.app.FindCollectionByNameOrId("hops")
	for _, resp := range r.Responses {
		hop := core.NewRecord(hops)
		hop.Set("search_id", sr.Id)
		hop.Set("hop_number", resp.Hop)
		hop.Set("url", resp.URL)
		hop.Set("path", resp.Path)
		hop.Set("http_version", resp.HTTPVersion)
		hop.Set("status_code", resp.StatusCode.Code)
		hop.Set("status_phrase", resp.StatusCode.Phrase)
		hop.Set("host", resp.Host)
		hop.Set("scheme", resp.Scheme)
		hop.Set("ipaddr", resp.IPAddr)
		hop.Set("time_elapsed", resp.TimeElapsed)
		hop.Set("headers", resp.Headers)
		hop.Set("body", resp.Body)
		hop.Set("ipinfo", resp.IPInfo)
		if err := s.app.Save(hop); err != nil {
			return nil, err
		}
	}

	return &sr.Id, nil
}

func (s *Server) deleteExpiredRecords() {
	expireDays := time.Now().UTC().AddDate(0, 0, -3)
	records, err := s.app.FindRecordsByFilter(
		"searches",
		"created < {:expiry} && created != {:empty}",
		"-created",
		200,
		0,
		dbx.Params{"expiry": expireDays, "empty": nil},
	)
	if err != nil {
		s.app.Logger().Error("find expired searches error", "error", err)
	}
	for _, record := range records {
		if err := s.app.Delete(record); err != nil {
			s.app.Logger().Error("delete file error", "error", err, "id", record.Id)
		}
	}
	s.app.Logger().Info("deleting old searches", "total", len(records))
}
