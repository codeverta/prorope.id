# prorope.id

Full-stack website Pro Rope Services.

## Structure

```text
apps/
  landing/   Public website and admin (Vinext / React)
  backend/   Go REST API and SQLite database
```

## Local development

Terminal 1:

```bash
cd apps/backend
go mod tidy
go run ./cmd/api
```

Terminal 2:

```bash
cd apps/landing
npm install
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/admin`.

Development admin: `admin@prorope.id` / `prorope123`. Configure strong values for `ADMIN_PASSWORD` and `AUTH_SECRET` in production.

## Docker Compose

Compose menjalankan frontend dan backend pada external Docker network
`malabar-trail-run_zenit_net`. Buat network tersebut jika belum tersedia:

```bash
docker network create malabar-trail-run_zenit_net
```

Siapkan konfigurasi production lalu jalankan aplikasinya:

```bash
cp .env.example .env
# Edit URL, password admin, dan AUTH_SECRET di .env terlebih dahulu.
docker compose up -d --build
```

Service frontend dapat diakses oleh reverse proxy sebagai
`prorope-frontend:3000`, sedangkan backend sebagai `prorope-backend:8080`.
Compose sengaja tidak mem-publish port ke host karena keduanya diakses melalui
reverse proxy pada network `zenit_net`.
