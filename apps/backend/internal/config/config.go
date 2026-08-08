package config

import "os"

type Config struct {
	Port, DatabasePath, FrontendURL, AdminEmail, AdminPassword, AuthSecret string
}

func Load() Config {
	return Config{
		Port: value("PORT", "8080"),
		DatabasePath: value("DATABASE_PATH", "./data/prorope.db"),
		FrontendURL: value("FRONTEND_URL", "http://localhost:3000"),
		AdminEmail: value("ADMIN_EMAIL", "admin@prorope.id"),
		AdminPassword: value("ADMIN_PASSWORD", "prorope123"),
		AuthSecret: value("AUTH_SECRET", "dev-only-change-this-secret"),
	}
}

func value(key, fallback string) string { if v := os.Getenv(key); v != "" { return v }; return fallback }
