package search

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type IPInfo struct {
	IP           string `json:"ip"`
	City         string `json:"city"`
	Region       string `json:"region"`
	Country      string `json:"country"`
	Location     string `json:"loc"`
	Organization string `json:"org"`
	Postal       string `json:"postal"`
	Timezone     string `json:"timezone"`
}

func parseIPData(ipaddr string) (*IPInfo, error) {
	// Skip lookup for invalid IPs
	if ipaddr == "IP Could not be Resolved" {
		return nil, nil
	}

	// Call ipinfo.io API
	resp, err := http.Get(fmt.Sprintf("https://ipinfo.io/%s/json", ipaddr))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Parse response
	var info IPInfo
	if err := json.NewDecoder(resp.Body).Decode(&info); err != nil {
		return nil, err
	}

	return &info, nil
}
