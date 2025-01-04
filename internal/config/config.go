package config

import (
	"log"

	"github.com/joeshaw/envdecode"
)

type Conf struct {
	AppConf appConf
	Server  serverConf
}

type appConf struct {
	// todo
}
type serverConf struct {
	// todo
}

// AppConfig Setup and install the applications' configuration environment variables
func AppConfig() *Conf {
	var c Conf
	if err := envdecode.StrictDecode(&c); err != nil {
		log.Fatalf("Failed to decode: %s", err)
	}
	return &c
}
