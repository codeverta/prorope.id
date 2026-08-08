package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"prorope.id/backend/internal/config"
	"prorope.id/backend/internal/database"
	"prorope.id/backend/internal/httpapi"
)

func main() {
	cfg := config.Load()
	db, err := database.Open(cfg.DatabasePath)
	if err != nil { log.Fatalf("database: %v", err) }
	defer db.Close()

	server := httpapi.New(cfg, db)
	httpServer := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           server.Handler(),
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      20 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
	log.Printf("Pro Rope API listening on http://localhost:%s", cfg.Port)
	if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed { log.Println(err); os.Exit(1) }
}
