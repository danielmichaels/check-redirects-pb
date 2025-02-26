package config

import (
	"log"

	"github.com/joeshaw/envdecode"
)

type Conf struct {
	Server  serverConf
	AppConf appConf
}

type appConf struct {
	SuperuserEmail    string `env:"SUPERUSER_EMAIL,required"`
	SuperuserPassword string `env:"SUPERUSER_PASSWORD,required"`
	CacheURLS         bool   `env:"CACHE_URLS,default=true"`
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
