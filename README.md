# ConnectCom website

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide.

```bash
npm install
cp .env.example .env.local   # fill in real contact details
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Structure
- `src/app` – layout, page, `/api/enquiry`, privacy, terms, robots, sitemap
- `src/components/ui` – 21st.dev components (Image Stream Hero by Ruixen UI, Liquid Glass Button)
- `src/components/sections` – one file per homepage section
- `src/components/shared` – motion helpers, device artwork, logo
- `src/data/content.ts` – all copy and product data (edit here)
- `src/lib/site.ts` – brand + contact config (env driven; empty values hide the link)

## Before launch
1. Set `NEXT_PUBLIC_WHATSAPP_NUMBER`, phone, email, socials in `.env.local` (nothing is invented; unset = hidden).
2. Set `ENQUIRY_WEBHOOK_URL` so consultation forms reach you. Without it the form reports failure rather than losing leads silently.
3. Replace device illustrations with real photos: set `photo` on each item in `src/data/products.ts`-style list in `src/data/content.ts`.
4. Replace Unsplash lifestyle photos in `public/images` if you have your own; have the legal pages reviewed.
