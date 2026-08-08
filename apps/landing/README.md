# Pro Rope Landing & Admin

Public website dan admin workspace untuk `prorope.id`, dibangun dengan React, Vinext, dan Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Frontend membaca API dari `NEXT_PUBLIC_API_URL`, default `http://localhost:8080`.

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080 npm run dev
```

## Routes

- Public: `/`, `/about`, `/services`, `/training`, `/projects`, `/news`, `/products`, `/contact`
- Training: `/training/schedule`, `/training/registration`, dan seluruh detail program
- Admin: `/admin`

## Build

```bash
npm run build
```
