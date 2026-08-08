# Pro Rope API

REST API Go untuk website dan admin Pro Rope. Data disimpan di SQLite sehingga development dapat berjalan tanpa layanan eksternal.

## Run

```bash
cp .env.example .env
go mod tidy
go run ./cmd/api
```

Default admin development: `admin@prorope.id` / `prorope123`. Ganti `ADMIN_PASSWORD` dan `AUTH_SECRET` sebelum deployment.

## Endpoints

- `GET /health`
- `GET /api/v1/{services,trainings,projects,posts,schedules}`
- `GET /api/v1/posts/{slug}`
- `POST /api/v1/leads`
- `POST /api/v1/registrations`
- `POST /api/v1/auth/login`
- `GET /api/v1/admin/{leads,registrations,summary}`
- `PATCH /api/v1/admin/leads/{id}`
- `GET|POST /api/v1/admin/posts`
- `PATCH|DELETE /api/v1/admin/posts/{id}`
