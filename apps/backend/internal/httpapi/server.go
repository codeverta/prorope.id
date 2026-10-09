package httpapi

import (
	"crypto/hmac"
	"crypto/sha256"
	"crypto/subtle"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"

	"prorope.id/backend/internal/config"
)

type Server struct {
	cfg config.Config
	db  *sql.DB
}
type apiError struct {
	Error string `json:"error"`
}
type postTranslation struct {
	Title   string `json:"title"`
	Excerpt string `json:"excerpt"`
	Body    string `json:"body"`
}
type postInput struct {
	Slug         string                     `json:"slug"`
	Category     string                     `json:"category"`
	ImageURL     string                     `json:"image_url"`
	Published    bool                       `json:"published"`
	Translations map[string]postTranslation `json:"translations"`
}
type postRecord struct {
	ID           int64                      `json:"id"`
	Slug         string                     `json:"slug"`
	Category     string                     `json:"category"`
	ImageURL     string                     `json:"image_url"`
	Published    bool                       `json:"published"`
	PublishedAt  string                     `json:"published_at"`
	UpdatedAt    string                     `json:"updated_at"`
	Translations map[string]postTranslation `json:"translations"`
}

func New(cfg config.Config, db *sql.DB) *Server { return &Server{cfg: cfg, db: db} }

func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", s.health)
	mux.HandleFunc("POST /api/v1/auth/login", s.login)
	mux.HandleFunc("GET /api/v1/services", s.publicServices)
	mux.HandleFunc("GET /api/v1/locales", s.publicLocales)
	mux.HandleFunc("GET /api/v1/trainings", s.publicTrainings)
	mux.HandleFunc("GET /api/v1/projects", s.publicProjects)
	mux.HandleFunc("GET /api/v1/posts", s.publicPosts)
	mux.HandleFunc("GET /api/v1/posts/{slug}", s.publicPost)
	mux.HandleFunc("GET /api/v1/schedules", s.publicSchedules)
	mux.HandleFunc("POST /api/v1/leads", s.createLead)
	mux.HandleFunc("POST /api/v1/registrations", s.createRegistration)
	mux.Handle("GET /api/v1/admin/leads", s.auth(http.HandlerFunc(s.adminLeads)))
	mux.Handle("GET /api/v1/admin/registrations", s.auth(http.HandlerFunc(s.adminRegistrations)))
	mux.Handle("PATCH /api/v1/admin/leads/{id}", s.auth(http.HandlerFunc(s.updateLead)))
	mux.Handle("PATCH /api/v1/admin/registrations/{id}", s.auth(http.HandlerFunc(s.updateRegistration)))
	mux.Handle("GET /api/v1/admin/summary", s.auth(http.HandlerFunc(s.adminSummary)))
	mux.Handle("GET /api/v1/admin/posts", s.auth(http.HandlerFunc(s.adminPosts)))
	mux.Handle("POST /api/v1/admin/posts", s.auth(http.HandlerFunc(s.createPost)))
	mux.Handle("PATCH /api/v1/admin/posts/{id}", s.auth(http.HandlerFunc(s.updatePost)))
	mux.Handle("DELETE /api/v1/admin/posts/{id}", s.auth(http.HandlerFunc(s.deletePost)))
	return s.cors(s.security(mux))
}

func (s *Server) cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if allowedOrigin(s.cfg.FrontendURL, origin) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		}
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func allowedOrigin(configured, origin string) bool {
	requestURL, err := url.Parse(origin)
	if err != nil || requestURL.Scheme == "" || requestURL.Host == "" {
		return false
	}
	requestHost := strings.TrimPrefix(strings.ToLower(requestURL.Host), "www.")
	for _, value := range strings.Split(configured, ",") {
		allowedURL, parseErr := url.Parse(strings.TrimSpace(value))
		if parseErr != nil || allowedURL.Scheme == "" || allowedURL.Host == "" {
			continue
		}
		allowedHost := strings.TrimPrefix(strings.ToLower(allowedURL.Host), "www.")
		if strings.EqualFold(requestURL.Scheme, allowedURL.Scheme) && requestHost == allowedHost {
			return true
		}
	}
	return false
}
func (s *Server) security(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		next.ServeHTTP(w, r)
	})
}
func jsonResponse(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}
func decode(r *http.Request, value any) error {
	d := json.NewDecoder(io.LimitReader(r.Body, 1<<20))
	d.DisallowUnknownFields()
	return d.Decode(value)
}

func (s *Server) health(w http.ResponseWriter, _ *http.Request) {
	if err := s.db.Ping(); err != nil {
		jsonResponse(w, 503, apiError{"database unavailable"})
		return
	}
	jsonResponse(w, 200, map[string]string{"status": "ok", "service": "prorope-api"})
}
func (s *Server) login(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if decode(r, &in) != nil {
		jsonResponse(w, 400, apiError{"invalid request"})
		return
	}
	emailOK := subtle.ConstantTimeCompare([]byte(strings.ToLower(strings.TrimSpace(in.Email))), []byte(strings.ToLower(s.cfg.AdminEmail)))
	passOK := subtle.ConstantTimeCompare([]byte(in.Password), []byte(s.cfg.AdminPassword))
	if emailOK != 1 || passOK != 1 {
		time.Sleep(250 * time.Millisecond)
		jsonResponse(w, 401, apiError{"invalid credentials"})
		return
	}
	jsonResponse(w, 200, map[string]any{"token": s.token(time.Now().Add(12 * time.Hour)), "expires_in": 43200, "user": map[string]string{"email": s.cfg.AdminEmail, "role": "admin"}})
}
func (s *Server) token(exp time.Time) string {
	payload := fmt.Sprintf("admin|%d", exp.Unix())
	mac := hmac.New(sha256.New, []byte(s.cfg.AuthSecret))
	mac.Write([]byte(payload))
	return base64.RawURLEncoding.EncodeToString([]byte(payload)) + "." + base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}
func (s *Server) validToken(value string) bool {
	parts := strings.Split(value, ".")
	if len(parts) != 2 {
		return false
	}
	payloadBytes, e1 := base64.RawURLEncoding.DecodeString(parts[0])
	sig, e2 := base64.RawURLEncoding.DecodeString(parts[1])
	if e1 != nil || e2 != nil {
		return false
	}
	mac := hmac.New(sha256.New, []byte(s.cfg.AuthSecret))
	mac.Write(payloadBytes)
	if !hmac.Equal(sig, mac.Sum(nil)) {
		return false
	}
	fields := strings.Split(string(payloadBytes), "|")
	if len(fields) != 2 || fields[0] != "admin" {
		return false
	}
	expiry, err := strconv.ParseInt(fields[1], 10, 64)
	return err == nil && time.Now().Unix() < expiry
}
func (s *Server) auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
		if !s.validToken(token) {
			jsonResponse(w, 401, apiError{"unauthorized"})
			return
		}
		next.ServeHTTP(w, r)
	})
}

func rowsJSON(w http.ResponseWriter, rows *sql.Rows) {
	defer rows.Close()
	cols, _ := rows.Columns()
	out := make([]map[string]any, 0)
	for rows.Next() {
		vals := make([]any, len(cols))
		ptr := make([]any, len(cols))
		for i := range vals {
			ptr[i] = &vals[i]
		}
		if rows.Scan(ptr...) != nil {
			continue
		}
		m := map[string]any{}
		for i, c := range cols {
			if b, ok := vals[i].([]byte); ok {
				m[c] = string(b)
			} else {
				m[c] = vals[i]
			}
		}
		out = append(out, m)
	}
	jsonResponse(w, 200, out)
}
func (s *Server) query(w http.ResponseWriter, q string) {
	rows, err := s.db.Query(q)
	if err != nil {
		jsonResponse(w, 500, apiError{"query failed"})
		return
	}
	rowsJSON(w, rows)
}
func (s *Server) publicServices(w http.ResponseWriter, _ *http.Request) {
	s.query(w, "SELECT id,slug,title,summary FROM services WHERE active=1 ORDER BY sort_order")
}
func (s *Server) publicLocales(w http.ResponseWriter, _ *http.Request) {
	s.query(w, "SELECT code,name,native_name FROM locales WHERE enabled=1 ORDER BY sort_order,code")
}
func (s *Server) publicTrainings(w http.ResponseWriter, _ *http.Request) {
	s.query(w, "SELECT id,slug,code,title,summary,duration FROM trainings WHERE active=1 ORDER BY id")
}
func (s *Server) publicProjects(w http.ResponseWriter, _ *http.Request) {
	s.query(w, "SELECT id,slug,title,category,location,project_year,image_url,featured FROM projects WHERE published=1 ORDER BY project_year DESC,id DESC")
}
func (s *Server) publicPosts(w http.ResponseWriter, _ *http.Request) {
	posts, err := s.posts(`SELECT id,slug,category,COALESCE(image_url,''),published,published_at,updated_at FROM posts WHERE published=1 ORDER BY published_at DESC`)
	if err != nil {
		jsonResponse(w, http.StatusInternalServerError, apiError{"query failed"})
		return
	}
	jsonResponse(w, http.StatusOK, posts)
}
func (s *Server) publicPost(w http.ResponseWriter, r *http.Request) {
	posts, err := s.posts(`SELECT id,slug,category,COALESCE(image_url,''),published,published_at,updated_at FROM posts WHERE slug=? AND published=1`, r.PathValue("slug"))
	if err == nil && len(posts) == 0 {
		jsonResponse(w, http.StatusNotFound, apiError{"post not found"})
		return
	}
	if err != nil {
		jsonResponse(w, http.StatusInternalServerError, apiError{"query failed"})
		return
	}
	jsonResponse(w, http.StatusOK, posts[0])
}
func (s *Server) publicSchedules(w http.ResponseWriter, _ *http.Request) {
	s.query(w, "SELECT id,program,batch,start_date,end_date,location,seats FROM schedules WHERE active=1 ORDER BY start_date")
}

func (s *Server) createLead(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Name    string `json:"name"`
		Phone   string `json:"phone"`
		Email   string `json:"email"`
		Service string `json:"service"`
		Message string `json:"message"`
	}
	if decode(r, &in) != nil || strings.TrimSpace(in.Name) == "" || strings.TrimSpace(in.Phone) == "" || strings.TrimSpace(in.Service) == "" {
		jsonResponse(w, 422, apiError{"name, phone, and service are required"})
		return
	}
	res, err := s.db.Exec("INSERT INTO leads(name,phone,email,service,message) VALUES(?,?,?,?,?)", strings.TrimSpace(in.Name), strings.TrimSpace(in.Phone), strings.TrimSpace(in.Email), strings.TrimSpace(in.Service), strings.TrimSpace(in.Message))
	if err != nil {
		jsonResponse(w, 500, apiError{"could not save enquiry"})
		return
	}
	id, _ := res.LastInsertId()
	jsonResponse(w, 201, map[string]any{"id": id, "status": "received"})
}
func (s *Server) createRegistration(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Name    string `json:"name"`
		Phone   string `json:"phone"`
		Email   string `json:"email"`
		Program string `json:"program"`
		Message string `json:"message"`
	}
	if decode(r, &in) != nil || strings.TrimSpace(in.Name) == "" || strings.TrimSpace(in.Phone) == "" || strings.TrimSpace(in.Program) == "" {
		jsonResponse(w, 422, apiError{"name, phone, and program are required"})
		return
	}
	res, err := s.db.Exec("INSERT INTO registrations(name,phone,email,program,message) VALUES(?,?,?,?,?)", in.Name, in.Phone, in.Email, in.Program, in.Message)
	if err != nil {
		jsonResponse(w, 500, apiError{"could not save registration"})
		return
	}
	id, _ := res.LastInsertId()
	jsonResponse(w, 201, map[string]any{"id": id, "status": "received"})
}
func (s *Server) adminLeads(w http.ResponseWriter, _ *http.Request) {
	s.query(w, "SELECT id,name,phone,email,service,message,status,created_at FROM leads ORDER BY created_at DESC LIMIT 100")
}
func (s *Server) adminRegistrations(w http.ResponseWriter, _ *http.Request) {
	s.query(w, "SELECT id,name,phone,email,program,message,status,created_at FROM registrations ORDER BY created_at DESC LIMIT 100")
}
func (s *Server) updateLead(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	var in struct {
		Status string `json:"status"`
	}
	if err != nil || decode(r, &in) != nil || !map[string]bool{"new": true, "contacted": true, "qualified": true, "closed": true}[in.Status] {
		jsonResponse(w, 422, apiError{"invalid id or status"})
		return
	}
	res, err := s.db.Exec("UPDATE leads SET status=?,updated_at=CURRENT_TIMESTAMP WHERE id=?", in.Status, id)
	if err != nil {
		jsonResponse(w, 500, apiError{"update failed"})
		return
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		jsonResponse(w, 404, apiError{"lead not found"})
		return
	}
	jsonResponse(w, 200, map[string]string{"status": "updated"})
}
func (s *Server) updateRegistration(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	var in struct {
		Status string `json:"status"`
	}
	if err != nil || decode(r, &in) != nil || !map[string]bool{"new": true, "contacted": true, "qualified": true, "closed": true}[in.Status] {
		jsonResponse(w, 422, apiError{"invalid id or status"})
		return
	}
	res, err := s.db.Exec("UPDATE registrations SET status=?,updated_at=CURRENT_TIMESTAMP WHERE id=?", in.Status, id)
	if err != nil {
		jsonResponse(w, 500, apiError{"update failed"})
		return
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		jsonResponse(w, 404, apiError{"registration not found"})
		return
	}
	jsonResponse(w, 200, map[string]string{"status": "updated"})
}
func (s *Server) adminSummary(w http.ResponseWriter, _ *http.Request) {
	var leads, regs int
	s.db.QueryRow("SELECT COUNT(*) FROM leads WHERE status='new'").Scan(&leads)
	s.db.QueryRow("SELECT COUNT(*) FROM registrations WHERE status='new'").Scan(&regs)
	jsonResponse(w, 200, map[string]int{"open_leads": leads, "open_registrations": regs})
}

func (s *Server) adminPosts(w http.ResponseWriter, _ *http.Request) {
	posts, err := s.posts(`SELECT id,slug,category,COALESCE(image_url,''),published,published_at,updated_at FROM posts ORDER BY updated_at DESC`)
	if err != nil {
		jsonResponse(w, http.StatusInternalServerError, apiError{"query failed"})
		return
	}
	jsonResponse(w, http.StatusOK, posts)
}

func (s *Server) posts(query string, args ...any) ([]postRecord, error) {
	rows, err := s.db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	posts := make([]postRecord, 0)
	for rows.Next() {
		var post postRecord
		var published int
		if err := rows.Scan(&post.ID, &post.Slug, &post.Category, &post.ImageURL, &published, &post.PublishedAt, &post.UpdatedAt); err != nil {
			return nil, err
		}
		post.Published = published == 1
		post.Translations = map[string]postTranslation{}
		posts = append(posts, post)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	for i := range posts {
		translations, err := s.db.Query(`SELECT locale,title,excerpt,body FROM post_translations WHERE post_id=? ORDER BY locale`, posts[i].ID)
		if err != nil {
			return nil, err
		}
		for translations.Next() {
			var locale string
			var value postTranslation
			if err := translations.Scan(&locale, &value.Title, &value.Excerpt, &value.Body); err != nil {
				translations.Close()
				return nil, err
			}
			posts[i].Translations[locale] = value
		}
		if err := translations.Close(); err != nil {
			return nil, err
		}
	}
	return posts, nil
}

var nonSlug = regexp.MustCompile(`[^a-z0-9]+`)
var localeCode = regexp.MustCompile(`^[a-z]{2,8}(-[a-z0-9]{2,8})*$`)

func slugify(value string) string {
	value = strings.ToLower(strings.TrimSpace(value))
	value = nonSlug.ReplaceAllString(value, "-")
	return strings.Trim(value, "-")
}

func normalizePost(in *postInput) bool {
	in.Category = strings.TrimSpace(in.Category)
	in.ImageURL = strings.TrimSpace(in.ImageURL)
	in.Slug = slugify(in.Slug)
	for originalLocale, value := range in.Translations {
		locale := strings.ToLower(strings.TrimSpace(originalLocale))
		value.Title = strings.TrimSpace(value.Title)
		value.Excerpt = strings.TrimSpace(value.Excerpt)
		value.Body = strings.TrimSpace(value.Body)
		delete(in.Translations, originalLocale)
		in.Translations[locale] = value
	}
	primary, ok := in.Translations["id"]
	if in.Slug == "" {
		in.Slug = slugify(primary.Title)
	}
	if !ok || in.Slug == "" || in.Category == "" || primary.Title == "" || primary.Excerpt == "" || primary.Body == "" {
		return false
	}
	for locale, value := range in.Translations {
		if !localeCode.MatchString(locale) || value.Title == "" || value.Excerpt == "" || value.Body == "" {
			return false
		}
	}
	return true
}

func (s *Server) createPost(w http.ResponseWriter, r *http.Request) {
	var in postInput
	if decode(r, &in) != nil || !normalizePost(&in) {
		jsonResponse(w, http.StatusUnprocessableEntity, apiError{"a complete Indonesian translation, category, and valid translations are required"})
		return
	}
	published := 0
	if in.Published {
		published = 1
	}
	tx, err := s.db.Begin()
	if err != nil {
		jsonResponse(w, http.StatusInternalServerError, apiError{"post could not be saved"})
		return
	}
	result, err := tx.Exec(`INSERT INTO posts(slug,category,image_url,published,published_at,updated_at) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`, in.Slug, in.Category, in.ImageURL, published)
	if err != nil {
		_ = tx.Rollback()
		jsonResponse(w, http.StatusConflict, apiError{"slug already exists or post could not be saved"})
		return
	}
	id, _ := result.LastInsertId()
	if err = saveTranslations(tx, id, in.Translations); err != nil {
		_ = tx.Rollback()
		jsonResponse(w, http.StatusUnprocessableEntity, apiError{"one or more locales are invalid or incomplete"})
		return
	}
	if err = tx.Commit(); err != nil {
		jsonResponse(w, http.StatusInternalServerError, apiError{"post could not be saved"})
		return
	}
	jsonResponse(w, http.StatusCreated, map[string]any{"id": id, "slug": in.Slug, "status": "created"})
}

func (s *Server) updatePost(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	var in postInput
	if err != nil || decode(r, &in) != nil || !normalizePost(&in) {
		jsonResponse(w, http.StatusUnprocessableEntity, apiError{"invalid post data"})
		return
	}
	published := 0
	if in.Published {
		published = 1
	}
	tx, err := s.db.Begin()
	if err != nil {
		jsonResponse(w, http.StatusInternalServerError, apiError{"post could not be updated"})
		return
	}
	result, err := tx.Exec(`UPDATE posts SET slug=?,category=?,image_url=?,published=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`, in.Slug, in.Category, in.ImageURL, published, id)
	if err != nil {
		_ = tx.Rollback()
		jsonResponse(w, http.StatusConflict, apiError{"slug already exists or post could not be updated"})
		return
	}
	affected, _ := result.RowsAffected()
	if affected == 0 {
		_ = tx.Rollback()
		jsonResponse(w, http.StatusNotFound, apiError{"post not found"})
		return
	}
	if _, err = tx.Exec(`DELETE FROM post_translations WHERE post_id=?`, id); err != nil {
		_ = tx.Rollback()
		jsonResponse(w, http.StatusInternalServerError, apiError{"translations could not be updated"})
		return
	}
	if err = saveTranslations(tx, int64(id), in.Translations); err != nil {
		_ = tx.Rollback()
		jsonResponse(w, http.StatusUnprocessableEntity, apiError{"one or more locales are invalid or incomplete"})
		return
	}
	if err = tx.Commit(); err != nil {
		jsonResponse(w, http.StatusInternalServerError, apiError{"post could not be updated"})
		return
	}
	jsonResponse(w, http.StatusOK, map[string]string{"slug": in.Slug, "status": "updated"})
}

func saveTranslations(tx *sql.Tx, postID int64, translations map[string]postTranslation) error {
	for locale, value := range translations {
		if _, err := tx.Exec(`INSERT INTO post_translations(post_id,locale,title,excerpt,body,updated_at) VALUES(?,?,?,?,?,CURRENT_TIMESTAMP)`, postID, locale, value.Title, value.Excerpt, value.Body); err != nil {
			return err
		}
	}
	return nil
}

func (s *Server) deletePost(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		jsonResponse(w, http.StatusUnprocessableEntity, apiError{"invalid post id"})
		return
	}
	tx, err := s.db.Begin()
	if err != nil {
		jsonResponse(w, http.StatusInternalServerError, apiError{"delete failed"})
		return
	}
	if _, err = tx.Exec("DELETE FROM post_translations WHERE post_id=?", id); err != nil {
		_ = tx.Rollback()
		jsonResponse(w, http.StatusInternalServerError, apiError{"delete failed"})
		return
	}
	result, err := tx.Exec("DELETE FROM posts WHERE id=?", id)
	if err != nil {
		_ = tx.Rollback()
		jsonResponse(w, http.StatusInternalServerError, apiError{"delete failed"})
		return
	}
	affected, _ := result.RowsAffected()
	if affected == 0 {
		_ = tx.Rollback()
		jsonResponse(w, http.StatusNotFound, apiError{"post not found"})
		return
	}
	if err = tx.Commit(); err != nil {
		jsonResponse(w, http.StatusInternalServerError, apiError{"delete failed"})
		return
	}
	jsonResponse(w, http.StatusOK, map[string]string{"status": "deleted"})
}
