package migrations

import (
	"github.com/danielmichaels/checkredirects/internal/config"
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		superusers, err := app.FindCollectionByNameOrId(core.CollectionNameSuperusers)
		if err != nil {
			return err
		}
		record := core.NewRecord(superusers)
		record.Set("email", config.AppConfig().AppConf.SuperuserEmail)
		record.Set("password", config.AppConfig().AppConf.SuperuserPassword)
		return app.Save(record)
	}, func(app core.App) error {
		record, _ := app.FindAuthRecordByEmail(core.CollectionNameSuperusers, config.AppConfig().AppConf.SuperuserEmail)
		if record == nil {
			return nil
		}
		return app.Delete(record)
	})
}
