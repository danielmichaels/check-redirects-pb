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
