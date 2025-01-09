package server

import (
	"context"
	"errors"
	"github.com/danielmichaels/checkredirects/internal/config"
	"github.com/danielmichaels/checkredirects/internal/search"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"net/http"
	"time"
)

func (s *Server) handleEmbeddedFrontend() func(e *core.RequestEvent) error {
	return func(e *core.RequestEvent) error {
		if e.Request.PathValue(apis.StaticWildcardParam) != "" {
			e.Response.Header().
				Set("Cache-Control", "max-age=1209600, stale-while-revalidate=86400")
		}
		// add a default CSP
		if e.Response.Header().Get("Content-Security-Policy") == "" {
			e.Response.Header().
				Set("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' http://127.0.0.1:* data: blob:; connect-src 'self' http://127.0.0.1:*; script-src 'self' 'sha256-GRUzBA7PzKYug7pqxv5rJaec5bwDCw1Vo6/IXwvD3Tc='")
		}
		return e.Next()
	}
}
func (s *Server) handleSearchPOST() func(e *core.RequestEvent) error {
	return func(e *core.RequestEvent) error {
		var req URLRequest
		if err := e.BindBody(&req); err != nil {
			s.app.Logger().Info("failed to bind body", "err", err)
			return e.BadRequestError("failed to parse request", err)
		}
		if config.AppConfig().AppConf.CacheURLS {
			existingRecord, _ := s.checkURL(req)
			if existingRecord != nil {
				return e.JSON(http.StatusOK, URLResponse{
					ID:     existingRecord,
					Cached: true,
				})
			}
		}

		ctx, cancel := context.WithTimeout(e.Request.Context(), 15*time.Second)
		defer cancel()
		c := search.NewURLChecker(ctx, req.URL, req.UserAgent)
		responses, err := c.Run()
		if err != nil {
			if !errors.Is(ctx.Err(), context.Canceled) {
				s.app.Logger().Info("search timed out", "url", req.URL, "err", err)
				return e.InternalServerError("network error unable to resolve host", err)
			}
			s.app.Logger().Info("search failed unknown reasons", "url", req.URL, "err", err)
			return e.InternalServerError("search resulted in an error", err)
		}
		id, err := s.saveResponses(responses)
		if err != nil {
			s.app.Logger().Info("failed to save responses", "err", err, "url", responses.URL)
			return e.InternalServerError("failed to save responses", err)
		}
		return e.JSON(http.StatusOK, URLResponse{
			ID: id,
		})
	}
}
