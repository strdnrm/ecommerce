package apiserver

import (
	"ecommerce/pkg/config"
	"ecommerce/pkg/store/sqlstore"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/golang-migrate/migrate/v4/source/github"
	"github.com/jmoiron/sqlx"
)

func Start(config *config.Config) error {
	db, err := newDB(config.DatabaseURL)
	if err != nil {
		return err
	}
	defer db.Close()

	store := sqlstore.New(db)
	// sessionStore := cookie.NewStore([]byte(config.SessionKey))

	srv := newServer(store, config.SessionKey)

	return srv.Router.Run(config.BindAddr)
}

func newDB(databaseURL string) (*sqlx.DB, error) {
	db, err := sqlx.Open("postgres", databaseURL)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	driver, err := postgres.WithInstance(db.DB, &postgres.Config{})
	if err != nil {
		return nil, err
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file:./pkg/store/migrations/",
		"postgres", driver,
	)
	if err != nil {
		return nil, err
	}

	m.Up()

	return db, nil
}
