package config

import (
	"fmt"
	"os"
	"testing"

	"github.com/joeshaw/envdecode"
)

func TestConfig(t *testing.T) {
	os.Setenv("SUPERUSER_EMAIL", "test@example.com")
	os.Setenv("SUPERUSER_PASSWORD", "password123")

	cfg := AppConfig()

	if got, want := cfg.AppConf.SuperuserEmail, "test@example.com"; got != want {
		t.Errorf("expected %q, got %q", want, got)
	}
	if got, want := cfg.AppConf.SuperuserPassword, "password123"; got != want {
		t.Errorf("expected %q, got %q", want, got)
	}
}

func ExampleAppConfig() {
	type exampleStruct struct {
		String string `env:"STRING"`
	}
	os.Setenv("STRING", "an example string!")

	var e exampleStruct
	err := envdecode.StrictDecode(&e)
	if err != nil {
		panic(err)
	}

	// if STRING is set, e.String will contain its value
	fmt.Println(e.String)

	// Output:
	// an example string!
}

func TestAppConfigError(t *testing.T) {
	type exampleStruct struct {
		String string `env:"BADSTRING,required"`
	}
	var e exampleStruct
	err := envdecode.StrictDecode(&e)
	fmt.Println(err)

	// Output:
	// the environment variable "BADSTRING" is missing
	want := "the environment variable \"BADSTRING\" is missing"
	if err.Error() != want {
		t.Errorf("expected: %q, got %q", want, err.Error())
	}
}

func TestConfigCacheURLSDefault(t *testing.T) {
	t.Setenv("SUPERUSER_EMAIL", "test@example.com")
	t.Setenv("SUPERUSER_PASSWORD", "password123")

	// Compose interpolates an unset CACHE_URLS to an empty string rather than
	// omitting it, so the default must still apply when the value is present but blank.
	t.Run("empty value falls back to the default", func(t *testing.T) {
		t.Setenv("CACHE_URLS", "")

		if got := AppConfig().AppConf.CacheURLS; !got {
			t.Errorf("expected true, got %v", got)
		}
	})

	t.Run("explicit false is honoured", func(t *testing.T) {
		t.Setenv("CACHE_URLS", "false")

		if got := AppConfig().AppConf.CacheURLS; got {
			t.Errorf("expected false, got %v", got)
		}
	})
}
