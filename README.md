# BZZT_ â€” Abdelhamid Bezzot

Bilingual personal portfolio (English default, French available) focused on full-stack products and applied AI.

## Local

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (redirects to `/en`). The locale switcher links `/en` and `/fr` without a full reload in the navigation experience.

## Production

```bash
npm run build
npm run start
```

## Content

Project content currently lives in `src/lib/constants.ts`. The Prisma schema in `prisma/schema.prisma` contains bilingual-ready project and stack fields for a future CMS connection. Project artwork intentionally stays as a neutral placeholder until real visuals are supplied.

## Brand options

Monogram proposals: `BZZT_` (selected), `AB / BUILD`, `BEZZOT.AI`.

Light palette proposals: electric lime (selected), lemon yellow, soft AI violet.
## Cloudflare R2 uploads

Project images are uploaded by the authenticated admin API directly to Cloudflare R2. Files are not written to Vercel's filesystem, and Neon stores only the resulting public URL in `Project.imageUrl`.

Configure these server-only variables locally and in Vercel before enabling uploads:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_URL` — the public custom-domain URL for the bucket, without a trailing slash

The upload endpoint accepts JPG, PNG, WEBP, and GIF images up to 5 MB. It validates the admin session, declared MIME type, and file signature; R2 credentials are never sent to the browser. Existing external image URLs continue to render. When a saved project image is replaced or a project is deleted, the API deletes its old R2 object only after confirming no other project references that exact URL.
