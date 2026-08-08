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
# prorope.id
