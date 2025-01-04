package server

import (
	"github.com/pocketbase/pocketbase"
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
	s.app.OnServe().BindFunc(s.routes)
	s.app.Cron().MustAdd("removeExpiredFiles", "*/10 * * * *", func() {
		s.deleteExpiredRecords()
	})

	s.app.Logger().Info("Starting server")
	return s.app.Start()
}
