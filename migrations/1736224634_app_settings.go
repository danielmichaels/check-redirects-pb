package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		settings := app.Settings()

		// for all available settings fields you could check
		// https://github.com/pocketbase/pocketbase/blob/develop/core/settings_model.go#L121-L130
		settings.Meta.AppName = "Check Redirects"
		settings.Meta.AppURL = "https://check-redirects.com"
		settings.Logs.MaxDays = 5
		settings.Logs.LogAuthId = true
		settings.Logs.LogIP = true
		settings.Meta.SenderAddress = "noreply@check-redirects.com"
		settings.Meta.SenderName = "Check Redirects"

		settings.RateLimits.Enabled = true

		return app.Save(settings)
	}, func(app core.App) error {
		// add down queries...

		return nil
	})
}
