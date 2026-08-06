# Architecture — Website Company Profile Teridox

**Versi:** 1.0
**Tanggal:** 6 Agustus 2026
**Terkait:** PRD.md

---

## 1. Gambaran Arsitektur

Arsitektur menggunakan pendekatan **Jamstack modern** dengan Next.js App Router sebagai frontend + backend layer (Server Components & Server Actions), Supabase sebagai backend-as-a-service (Postgres, Auth, Storage), dan Vercel sebagai hosting/CI-CD.

```
┌─────────────────────────────────────────────────────────┐
│                         Browser                          │
│   Public Site (SSR/ISR)        Admin Panel (CSR + Auth)  │
└───────────────┬─────────────────────────┬────────────────┘
                 │                         │
                 ▼                         ▼
        ┌─────────────────────────────────────────┐
        │        Next.js App Router (Vercel)       │
        │  - Server Components (fetch data)        │
        │  - Server Actions (mutasi data)           │
        │  - Route Handlers (/api, sitemap, RSS)    │
        │  - Middleware (auth guard admin)          │
        └───────────────┬───────────────────────────┘
                         │ Supabase JS Client (SSR & CSR)
                         ▼
        ┌─────────────────────────────────────────┐
        │                Supabase                  │
        │  - Postgres DB (RLS enabled)              │
        │  - Auth (email/password admin)            │
        │  - Storage (gambar project, blog, about)  │
        └─────────────────────────────────────────┘
```

## 2. Tech Stack & Rationale

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | Next.js (App Router) | SSR/ISR untuk SEO, React Server Components untuk performa, native metadata API |
| Database | Supabase Postgres | Relational, mendukung RLS untuk keamanan admin vs publik, gratis untuk skala awal |
| Auth | Supabase Auth | Built-in, cukup untuk 1-2 admin, integrasi mudah dengan middleware Next.js |
| Storage | Supabase Storage | Untuk gambar project/blog/about, terintegrasi langsung dengan DB |
| UI Base | shadcn/ui | Komponen accessible, headless (Radix), mudah dikustom sesuai brand Teridox |
| Skeleton Loading | phantom-ui | Web Component skeleton loader otomatis berbasis DOM measurement — dipasang di area yang fetch data dinamis (list project, blog, admin table) |
| Toast/Notification | gooey-toast | Notifikasi UX di admin panel (sukses simpan, error) dan form contact publik |
| Animasi/Interactive | React Bits | Komponen animasi untuk hero section, transisi, elemen visual di Home/About agar lebih hidup |
| Hosting | Vercel | Native untuk Next.js, edge caching, preview deployment per PR |
| Styling | Tailwind CSS | Basis dari shadcn/ui, konsisten dengan dark/light mode via CSS variables |
| Theme | next-themes | Standar de-facto untuk dark/light mode di Next.js, persist ke localStorage + support `prefers-color-scheme` |

> **Catatan integrasi library niche**: `phantom-ui` adalah Web Component (Lit-based) — dipasang via custom element (`<phantom-ui>` wrapper) di sekitar komponen React yang butuh skeleton, bukan komponen React native. `gooey-toast` adalah library toast khusus React — dipasang seperti provider (`<Toaster />`) di root layout. React Bits sebagian besar berupa kode komponen yang di-copy langsung ke project (seperti pola shadcn), bukan npm package biasa — perlu disesuaikan ke struktur folder `components/reactbits/`.

## 3. Struktur Folder (Next.js App Router)

```
teridox-website/
├── app/
│   ├── (public)/                    # Route group halaman publik
│   │   ├── layout.tsx                # Layout publik (navbar, footer, theme provider)
│   │   ├── page.tsx                  # Home
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx       # Detail layanan (opsional, untuk SEO)
│   │   ├── project/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/                        # Route group admin (protected)
│   │   ├── layout.tsx                # Layout admin (sidebar, auth guard)
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── project/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── contact/page.tsx          # Inbox pesan masuk
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── contact/route.ts          # Handle submit form contact
│   │   └── revalidate/route.ts       # On-demand ISR revalidation setelah admin update
│   ├── sitemap.ts                    # Sitemap dinamis
│   ├── robots.ts                     # robots.txt dinamis
│   └── layout.tsx                    # Root layout (theme provider, toaster)
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── reactbits/                    # Komponen React Bits yang dipakai
│   ├── shared/                       # Navbar, Footer, ThemeToggle, dsb
│   └── admin/                        # Komponen khusus admin (table, form, editor)
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Supabase client (browser)
│   │   ├── server.ts                 # Supabase client (server component)
│   │   └── middleware.ts             # Helper untuk auth di middleware
│   ├── seo/
│   │   ├── metadata.ts               # Generator metadata per halaman
│   │   └── jsonld.ts                 # Generator structured data (JSON-LD)
│   └── validations/                  # Zod schema untuk form (contact, admin forms)
├── public/
│   └── llms.txt                      # File AI-search friendly
├── middleware.ts                     # Proteksi route /admin/*
└── types/
    └── database.types.ts             # Generated types dari Supabase
```

## 4. Skema Database (Supabase Postgres)

### 4.1 Tabel `about`
Konten About biasanya single-row (bukan list).
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| title | text | Judul section |
| content | text | Rich text/markdown |
| vision | text | |
| mission | text | |
| photo_url | text | Referensi ke Supabase Storage |
| updated_at | timestamptz | |

### 4.2 Tabel `services`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| title | text | |
| slug | text (unique) | Untuk detail page & SEO |
| short_description | text | |
| full_description | text | |
| icon | text | Nama ikon/path |
| price_info | text | Opsional |
| order_index | int | Urutan tampil |
| is_active | boolean | |
| created_at / updated_at | timestamptz | |

### 4.3 Tabel `projects`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| title | text | |
| slug | text (unique) | |
| category | text | web / mobile / saas |
| summary | text | |
| description | text (rich text) | |
| tech_stack | text[] | Array |
| cover_image_url | text | |
| gallery_urls | text[] | |
| demo_url | text | Opsional |
| is_featured | boolean | Tampil di Home |
| status | text | draft / published |
| order_index | int | |
| created_at / updated_at | timestamptz | |

### 4.4 Tabel `blog_posts`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| title | text | |
| slug | text (unique) | |
| excerpt | text | |
| content | text (rich text/markdown) | |
| cover_image_url | text | |
| category | text | |
| tags | text[] | |
| seo_title | text | Override meta title |
| seo_description | text | Override meta description |
| status | text | draft / published |
| published_at | timestamptz | |
| created_at / updated_at | timestamptz | |

### 4.5 Tabel `contact_messages`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| name | text | |
| email | text | |
| phone | text | |
| subject | text | |
| message | text | |
| status | text | new / read / followed_up |
| created_at | timestamptz | |

### 4.6 Tabel `site_settings`
Single-row untuk pengaturan global.
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| site_title | text | |
| logo_url | text | |
| favicon_url | text | |
| whatsapp_number | text | |
| contact_email | text | |
| address | text | |
| social_links | jsonb | `{instagram, tiktok, linkedin, ...}` |
| default_meta_description | text | |

### 4.7 Row Level Security (RLS)
- Semua tabel: **SELECT** publik hanya diizinkan untuk baris dengan `status = 'published'` (untuk `projects` & `blog_posts`) atau tanpa filter status (`about`, `services` yang `is_active = true`, `site_settings`).
- **INSERT/UPDATE/DELETE**: hanya untuk role `authenticated` (admin login), diverifikasi lewat Supabase Auth JWT.
- Tabel `contact_messages`: **INSERT** boleh publik (anonim, lewat Server Action/Route Handler dengan service role terbatas), **SELECT/UPDATE** hanya admin.

## 5. Autentikasi Admin

- Menggunakan **Supabase Auth** (email + password) — cukup untuk 1-2 admin (Arya/tim internal).
- Session dikelola via cookie (Supabase SSR helper `@supabase/ssr`).
- `middleware.ts` mengecek session pada setiap request ke `/admin/*`, redirect ke `/admin/login` bila belum login.
- Tidak ada self-registration — akun admin dibuat manual lewat Supabase dashboard.

## 6. Alur Data (Data Flow)

**Halaman publik (SSR/ISR):**
1. Server Component fetch data langsung dari Supabase (server client, tanpa expose service key ke browser).
2. Halaman list (Project, Blog) pakai **ISR** (`revalidate: 3600` atau on-demand) agar cepat tapi tetap update.
3. Setelah admin publish/update konten, panggil `revalidatePath()`/`revalidateTag()` (via Server Action) agar cache halaman publik langsung update tanpa tunggu interval.

**Admin panel (CSR + Server Actions):**
1. Form admin (create/edit) submit lewat **Server Action**, langsung mutasi ke Supabase dari server (aman, tidak expose logic ke client).
2. Setelah sukses, tampilkan **gooey-toast** notifikasi, lalu redirect/refresh data.
3. List data admin (table project/blog) memakai `phantom-ui` sebagai skeleton saat loading data.

**Form Contact (publik):**
1. Submit lewat Server Action/Route Handler → validasi (Zod) → insert ke `contact_messages` → tampilkan toast sukses.
2. Opsional: trigger email notifikasi ke admin (via Resend/SMTP) saat ada pesan baru.
3. Proteksi spam: honeypot field + rate limiting sederhana (per IP, cek di route handler).

## 7. Komponen UI & Styling

- **shadcn/ui** sebagai basis komponen (Button, Card, Dialog, Form, Table, Input, dsb) — dipakai di admin panel (table, form) dan elemen umum publik.
- **React Bits** dipakai selektif di area yang butuh kesan visual kuat: hero section Home, transisi antar section di About, efek hover di Project card. Tidak dipakai berlebihan agar performa tetap terjaga.
- **phantom-ui** dipasang membungkus komponen yang fetch data async: list project publik, list blog publik, table di admin panel — otomatis generate skeleton sesuai bentuk komponen aslinya.
- **gooey-toast** dipasang sebagai global provider di root layout, dipanggil di semua aksi admin (save/delete) dan form contact publik.
- **Tailwind CSS** + CSS variables untuk tema, kompatibel dengan shadcn/ui dan `next-themes`.

## 8. Dark/Light Mode

- Menggunakan `next-themes` dengan `attribute="class"` (Tailwind dark mode strategy `class`).
- `ThemeProvider` dipasang di root layout, `defaultTheme="system"` agar ikut preferensi OS user.
- Toggle button (ikon sun/moon) di Navbar, tersedia di semua halaman publik & admin.
- Semua warna didefinisikan via CSS variables (`--background`, `--foreground`, dst) sesuai konvensi shadcn/ui agar konsisten di kedua mode.
- Perlu QA kontras warna (WCAG AA) khusus di dark mode, terutama untuk teks di atas gambar hero (React Bits animasi).

## 9. SEO, GEO, dan AI Search Friendly

### 9.1 SEO Tradisional
- **Metadata API Next.js**: setiap route punya `generateMetadata()` dinamis (title, description, canonical, OG image) — untuk Blog & Project diambil dari field `seo_title`/`seo_description` di database (fallback ke default).
- **Sitemap dinamis** (`app/sitemap.ts`): generate otomatis dari semua project & blog post yang `published`.
- **robots.txt dinamis** (`app/robots.ts`): allow semua crawler standar, referensi ke sitemap.
- **Structured Data (JSON-LD)**: 
  - `Organization` schema di layout root (nama, logo, kontak, sosial media Teridox).
  - `Service` schema di halaman Services.
  - `Article`/`BlogPosting` schema di setiap blog post.
  - `BreadcrumbList` di halaman detail (project, blog).
  - `FAQPage` schema jika ada section FAQ (bagus untuk rich snippet & GEO).
- **Semantic HTML**: heading hierarki jelas (`h1` sekali per halaman, `h2`/`h3` terstruktur), `alt` text wajib untuk semua gambar (divalidasi di admin form).
- **Core Web Vitals**: gambar via `next/image` (otomatis lazy load, resize, format WebP/AVIF), font optimization via `next/font`.

### 9.2 GEO (Generative Engine Optimization)
- Setiap halaman/artikel dibuka dengan **jawaban ringkas/definisi langsung** di paragraf awal (memudahkan AI mengutip jawaban langsung).
- Gunakan format terstruktur: heading yang menjawab pertanyaan spesifik (misal "Berapa biaya jasa web development di Bali?"), list, tabel — format yang mudah "dipecah" jadi snippet oleh AI.
- Section **FAQ** di halaman Services & Home dengan `FAQPage` schema — format tanya-jawab adalah salah satu konten favorit AI search engine.
- Konten blog fokus pada **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness): tulis dari pengalaman nyata project Teridox, sertakan data/contoh konkret.

### 9.3 AI Search Friendly
- **`llms.txt`** di root domain (`/llms.txt`) — file markdown ringkas berisi ringkasan Teridox, link ke halaman-halaman penting (about, services, project, blog), agar AI crawler bisa memahami struktur situs dengan cepat.
- Pastikan `robots.txt` tidak memblokir user-agent crawler AI yang relevan (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`) — perlu keputusan sadar apakah ingin diizinkan (untuk visibilitas) sesuai kebijakan yang berlaku saat implementasi.
- Konten harus **factual, konsisten, dan tidak duplikat** — hindari halaman thin-content, karena AI crawler cenderung mengutip sumber yang paling jelas & konsisten datanya.
- Data kontak & identitas bisnis (NAP — Name, Address, Phone) konsisten di seluruh halaman + schema `Organization` agar AI search mengenali Teridox sebagai entitas bisnis yang jelas.

## 10. Media & Storage

- Semua upload gambar (about photo, project gallery, blog cover, logo) disimpan di **Supabase Storage**, dikelompokkan per bucket: `about/`, `projects/`, `blog/`, `settings/`.
- Admin panel upload lewat komponen drag-and-drop (shadcn + custom), preview langsung, validasi ukuran & tipe file di client & server.
- URL publik Supabase Storage disimpan di kolom `*_url` masing-masing tabel.
- Optimasi gambar tetap lewat `next/image` dengan `remotePatterns` mengarah ke domain Supabase Storage.

## 11. Deployment & CI/CD

- **Vercel** terhubung ke repo GitHub Teridox — auto-deploy tiap push ke branch `main` (production) dan preview deployment tiap PR.
- Environment variables (Supabase URL, anon key, service role key — service role **hanya** dipakai di server-side, tidak pernah di-expose ke client) diatur di Vercel dashboard.
- Domain `teridox.com` diarahkan ke Vercel via DNS (A/CNAME record).
- On-demand revalidation (`/api/revalidate`) dipanggil dari Server Action setelah admin publish konten, agar tidak perlu redeploy manual.

## 12. Keamanan

- RLS aktif di semua tabel Supabase (lihat bagian 4.7).
- `service_role` key Supabase **tidak pernah** dipakai di client-side, hanya di Server Action/Route Handler tertentu yang butuh bypass RLS (misal insert contact message anonim, jika didesain lewat service role terbatas).
- Middleware proteksi seluruh route `/admin/*`.
- Validasi & sanitasi semua input form (Zod schema) — baik form contact publik maupun form admin (cegah XSS pada konten rich text, misal sanitize HTML sebelum simpan/tampilkan).
- Rate limiting sederhana pada endpoint form contact untuk mencegah spam/abuse.

## 13. Performance

- **ISR** untuk halaman list & detail Project/Blog (fresh tapi tetap cepat, cache di edge Vercel).
- **Static Generation** untuk halaman yang jarang berubah (Home, About, Services) dengan revalidate on-demand saat admin update.
- `next/image` untuk semua gambar, `next/font` untuk font.
- Lazy load komponen berat (animasi React Bits) memakai dynamic import (`next/dynamic`) agar tidak membebani initial load.
- phantom-ui membantu perceived performance saat data sedang fetch (skeleton, bukan blank/spinner).

## 14. Rangkuman Keputusan Arsitektur Utama

| Keputusan | Alasan |
|---|---|
| App Router + Server Components | Native SEO metadata, performa lebih baik, cocok untuk konten-heavy site |
| Supabase (bukan headless CMS terpisah) | Satu platform untuk DB + Auth + Storage, cukup untuk skala company profile, biaya rendah di awal |
| ISR + on-demand revalidation | Konten selalu fresh setelah admin update, tanpa redeploy, tetap cepat karena caching |
| RLS di level database | Keamanan data tidak bergantung hanya pada logic aplikasi |
| phantom-ui, gooey-toast, React Bits | Menambah polish UX (skeleton, notifikasi, animasi) sesuai preferensi stack yang diminta, diintegrasikan secara selektif agar tidak mengorbankan performance/SEO |