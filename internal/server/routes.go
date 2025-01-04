package server

import (
	"github.com/danielmichaels/checkredirects/ui"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func (s *Server) routes(se *core.ServeEvent) error {
	se.Router.GET("/{path...}", apis.Static(ui.DistDirFS, true)).
		BindFunc(s.handleEmbeddedFrontend()).Bind(apis.Gzip())

	se.Router.POST("/api/search", s.handleSearchPOST())

	return se.Next()
}
