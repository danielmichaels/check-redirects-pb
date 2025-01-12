package main

import (
	"log/slog"
	"os"

	"github.com/danielmichaels/checkredirects/internal/server"
)

func main() {
	os.Exit(RunPB())
}
func RunPB() int {
	srv := server.New()

	if err := srv.Start(); err != nil {
		slog.Error("error starting up", "error", err)
		return 1
	}
	return 0
}
