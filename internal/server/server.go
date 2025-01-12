package server

import (
	"os"
	"strings"

	_ "github.com/danielmichaels/checkredirects/migrations"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

type Server struct {
	app *pocketbase.PocketBase
}

func New() *Server {
	return &Server{
		app: pocketbase.New(),
	}
}

func (s *Server) Start() error {

	// loosely check if it was executed using "go run"
	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())
	migratecmd.MustRegister(s.app, s.app.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Dashboard
		// (the isGoRun check is to enable it only during development)
		Automigrate: isGoRun,
	})

	s.app.OnServe().BindFunc(s.routes)
	s.app.Cron().MustAdd("removeExpiredFiles", "*/10 * * * *", func() {
		s.deleteExpiredRecords()
	})

	s.app.Logger().Info("Starting server")
	return s.app.Start()
}
