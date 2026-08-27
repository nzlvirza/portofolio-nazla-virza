# portfolio-virza-vue

Portfolio website untuk **Nazla Virza Rahman** — dibangun dengan Vue 3, Vite, Tailwind CSS, dan @vueuse/motion.

Replikasi dari project Laravel `portfolio-virza` (tampilan & fitur semirip mungkin, tanpa dependensi PHP/Laravel).

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite
- Tailwind CSS v4
- @vueuse/motion (animasi scroll-reveal / entrance)
- JavaScript

## Struktur Project

```text
portfolio-virza-vue/
├── public/
│   ├── images/profile.jpg
│   ├── cv/Nazla-Virza-Rahman-CV.pdf
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/main.css        # Tailwind theme + custom components
│   ├── components/            # Vue components (Navbar, Hero, About, dsb.)
│   ├── data/portfolio.js      # Single source of truth untuk konten
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── vercel.json
```

## Menjalankan

```bash
npm install
npm run dev
```

## Build Produksi

```bash
npm run build
```

Output di folder `dist/`.

## Deployment (Vercel)

Framework preset: **Vite**, output directory: `dist` (lihat `vercel.json`).

## Catatan

- Single-page portfolio (anchor navigation antar section), tidak membutuhkan Vue Router.
- Contact form hanya UI preview (sama seperti versi Laravel) — backend menyusul.