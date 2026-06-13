# ladyfai.com

The LadyF AI website. Next.js 14, TypeScript, Tailwind CSS, Supabase, Kit.

Full specification: see PRODUCT.md. Working agreement and project rules: see CLAUDE.md.

## Run locally

```
npm install
npm run dev
```

Open http://localhost:3000

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. The public site works with none of them set; Supabase keys activate the admin panel (`/lf-studio`), blog publishing, videos, and brand enquiries storage. The Kit form ID activates real email capture. The Verd AI URL points the primary buttons at the product.

## Supabase setup

Run `supabase-schema.sql` in the Supabase SQL editor after creating the project.
