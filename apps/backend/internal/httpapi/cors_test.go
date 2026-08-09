package httpapi

import (
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"prorope.id/backend/internal/config"
	"prorope.id/backend/internal/database"
)

func TestAllowedOrigin(t *testing.T) {
	tests := []struct {
		configured string
		origin     string
		want       bool
	}{
		{"https://prorope.id", "https://prorope.id", true},
		{"https://prorope.id", "https://www.prorope.id", true},
		{"https://www.prorope.id", "https://prorope.id", true},
		{"https://prorope.id,https://preview.example.com", "https://preview.example.com", true},
		{"https://prorope.id", "http://prorope.id", false},
		{"https://prorope.id", "https://evilprorope.id", false},
		{"https://prorope.id", "", false},
	}
	for _, tt := range tests {
		if got := allowedOrigin(tt.configured, tt.origin); got != tt.want {
			t.Errorf("allowedOrigin(%q, %q) = %v, want %v", tt.configured, tt.origin, got, tt.want)
		}
	}
}

func TestTrainingRegistrationFlow(t *testing.T) {
	db, err := database.Open(filepath.Join(t.TempDir(), "test.db"))
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	server := New(config.Config{FrontendURL: "https://prorope.id", AuthSecret: "test-secret"}, db)
	handler := server.Handler()
	create := httptest.NewRequest(http.MethodPost, "/api/v1/registrations", strings.NewReader(`{"name":"Rina","phone":"08123","email":"rina@example.com","program":"TKBT","message":"Batch berikutnya"}`))
	create.Header.Set("Content-Type", "application/json")
	create.Header.Set("Origin", "https://www.prorope.id")
	createResponse := httptest.NewRecorder()
	handler.ServeHTTP(createResponse, create)
	if createResponse.Code != http.StatusCreated {
		t.Fatalf("create registration returned %d: %s", createResponse.Code, createResponse.Body.String())
	}
	if got := createResponse.Header().Get("Access-Control-Allow-Origin"); got != "https://www.prorope.id" {
		t.Fatalf("CORS origin = %q", got)
	}

	list := httptest.NewRequest(http.MethodGet, "/api/v1/admin/registrations", nil)
	list.Header.Set("Authorization", "Bearer "+server.token(time.Now().Add(time.Hour)))
	listResponse := httptest.NewRecorder()
	handler.ServeHTTP(listResponse, list)
	if listResponse.Code != http.StatusOK || !strings.Contains(listResponse.Body.String(), `"program":"TKBT"`) {
		t.Fatalf("list registrations returned %d: %s", listResponse.Code, listResponse.Body.String())
	}

	update := httptest.NewRequest(http.MethodPatch, "/api/v1/admin/registrations/1", strings.NewReader(`{"status":"contacted"}`))
	update.Header.Set("Content-Type", "application/json")
	update.Header.Set("Authorization", "Bearer "+server.token(time.Now().Add(time.Hour)))
	updateResponse := httptest.NewRecorder()
	handler.ServeHTTP(updateResponse, update)
	if updateResponse.Code != http.StatusOK {
		t.Fatalf("update registration returned %d: %s", updateResponse.Code, updateResponse.Body.String())
	}
}
