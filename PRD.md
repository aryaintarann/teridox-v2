# PRD — Website Company Profile Teridox

**Versi:** 1.0
**Tanggal:** 6 Agustus 2026
**Pemilik Produk:** Arya — Founder Teridox
**Status:** Draft untuk eksekusi

---

## 1. Ringkasan Produk

Teridox membutuhkan website company profile yang merepresentasikan brand sebagai penyedia jasa digital solutions (web development, mobile app development, SaaS). Website ini harus mampu menampilkan portofolio, layanan, dan konten blog secara profesional, mudah dikelola sendiri tanpa developer (lewat admin panel), serta dioptimalkan agar mudah ditemukan baik oleh mesin pencari tradisional (Google) maupun mesin pencari berbasis AI (ChatGPT, Perplexity, Google AI Overview, dsb).

## 2. Tujuan Produk

1. Membangun kredibilitas dan kepercayaan calon klien terhadap Teridox sebagai digital agency.
2. Menjadi kanal akuisisi lead (form contact, WhatsApp, email) dari target pasar.
3. Memudahkan Arya mengelola konten (about, services, project, blog, contact) tanpa perlu deploy ulang kode.
4. Memaksimalkan visibilitas organik: SEO, GEO (Generative Engine Optimization), dan AI Search Friendly agar Teridox muncul saat calon klien bertanya ke Google maupun AI assistant.

## 3. Target Pengguna

| Segmen | Kebutuhan Utama |
|---|---|
| Pemilik usaha kecil-menengah | Butuh website/sistem digital, cari vendor terpercaya, riset lewat Google/AI sebelum kontak |
| UMKM | Budget terbatas, butuh solusi cepat & jelas paketnya, sering cari lewat Instagram/Google |
| Personal profesional (freelancer, konsultan, klinik, dsb) | Butuh portofolio/personal branding, company profile, atau sistem sederhana |

## 4. Problem Statement

Saat ini Teridox belum punya company profile yang representatif dan mudah dikelola. Konten (project, layanan, blog) sulit di-update tanpa developer, dan website belum dioptimalkan agar mudah ditemukan lewat pencarian AI, padahal target pasar makin sering riset vendor lewat AI assistant sebelum menghubungi.

## 5. Ruang Lingkup (Scope)

### 5.1 Halaman Publik
1. **Home** — Hero section, value proposition, ringkasan services, highlight project, testimoni (opsional), CTA kontak.
2. **About** — Cerita Teridox, visi-misi, keunggulan, tim (opsional), foto/branding.
3. **Services** — Daftar layanan (web dev, mobile app, SaaS), deskripsi, paket/harga (opsional), CTA per layanan.
4. **Project** — Portofolio project dengan filter kategori, detail per project (deskripsi, tech stack, hasil, gambar/screenshot).
5. **Blog** — Daftar artikel, halaman detail artikel, kategori/tag, search.
6. **Contact** — Form kontak, info kontak (email, WhatsApp, alamat/lokasi), integrasi peta (opsional), tautan sosial media.

### 5.2 Admin Panel (Internal, Login-Protected)
Admin dapat mengelola konten dinamis berikut tanpa menyentuh kode:
- **About**: edit teks, visi-misi, upload/replace foto.
- **Services**: CRUD (create, read, update, delete) daftar layanan, urutan tampil, ikon/gambar, deskripsi, status aktif/nonaktif.
- **Project**: CRUD portofolio — judul, deskripsi, kategori, tech stack, gambar/galeri, link demo, status (published/draft), urutan/featured.
- **Blog**: CRUD artikel — judul, slug, konten (rich text/markdown), cover image, kategori/tag, SEO meta (title, description), status (draft/published), tanggal publish.
- **Contact**: melihat & mengelola pesan masuk dari form contact (inbox sederhana: baru/dibaca/ditindaklanjuti), serta edit info kontak yang tampil di halaman publik (nomor WA, email, alamat, link sosial media).
- **Site Settings** (pendukung): logo, favicon, meta default, social links, analytics ID — agar semua bisa diubah tanpa redeploy.

### 5.3 Fitur Cross-Cutting
- **Dark/Light Mode** — toggle di semua halaman, tersimpan preferensi user (persist), default mengikuti system preference.
- **SEO Friendly** — meta tag dinamis per halaman/konten, sitemap.xml otomatis, robots.txt, canonical URL, structured data (JSON-LD: Organization, Service, Article, BreadcrumbList).
- **GEO Friendly (Generative Engine Optimization)** — konten terstruktur dengan jawaban langsung di awal paragraf, heading jelas, FAQ terstruktur, konten yang mudah "dikutip" oleh AI.
- **AI Search Friendly** — markup semantik, `llms.txt`, konten yang factual & terstruktur, schema.org lengkap agar mudah diparse crawler AI (GPTBot, PerplexityBot, ClaudeBot, dll — lihat kebijakan crawler masing-masing).
- **Responsive** — mobile-first, semua halaman & admin panel harus optimal di HP, tablet, desktop.

## 6. Fitur Detail per Halaman

### 6.1 Home
- Hero dengan headline, sub-headline, CTA utama (contoh: "Konsultasi Gratis").
- Section ringkasan layanan (ambil dari data Services, tampil 3-4 unggulan).
- Section highlight project (featured project dari data Project).
- Section keunggulan/value proposition Teridox.
- Section CTA akhir (dorong ke Contact).
- Testimoni klien (opsional, bisa dikelola di admin sebagai bagian dari About/Settings).

### 6.2 About
- Cerita/latar belakang Teridox.
- Visi & misi.
- Value/keunggulan (bullet atau card).
- Foto tim/founder (opsional).
- Semua field dikelola lewat admin panel (rich text editor).

### 6.3 Services
- List semua layanan aktif (web dev, mobile app, SaaS, dst).
- Setiap layanan: ikon, nama, deskripsi singkat & lengkap, opsional paket harga.
- CTA per layanan ke Contact (dengan pre-fill subjek pesan).
- Detail page opsional per layanan (jika dibutuhkan untuk SEO — 1 URL per layanan).

### 6.4 Project
- Grid/list portofolio dengan filter kategori (web, mobile, SaaS).
- Card project: thumbnail, judul, kategori, ringkasan.
- Detail page per project: deskripsi lengkap, tech stack, galeri gambar, link demo/live site (jika ada), testimoni klien (opsional).

### 6.5 Blog
- List artikel dengan pagination, filter kategori/tag, search.
- Detail artikel: konten lengkap, gambar cover, meta SEO, share button, related articles.
- Mendukung format konten kaya (heading, gambar, code block, quote) — penting untuk GEO/AI-friendly content.

### 6.6 Contact
- Form kontak: nama, email, nomor WA/telepon, subjek/pesan.
- Validasi input + anti-spam (honeypot/captcha).
- Info kontak statis (email, WA, alamat, jam operasional).
- Link sosial media (Instagram, TikTok, dll).
- Notifikasi ke admin (email atau tersimpan di admin panel inbox) saat ada pesan masuk.

### 6.7 Admin Panel
- Login aman (auth), hanya untuk Arya/tim internal.
- Dashboard ringkas (jumlah project, blog post, pesan masuk baru).
- Menu CRUD: About, Services, Project, Blog, Contact/Inbox, Site Settings.
- Rich text/markdown editor untuk konten panjang (About, Blog).
- Upload gambar terintegrasi (drag & drop, preview, otomatis resize/optimize).
- Preview sebelum publish (khusus Blog & Project).

## 7. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|---|---|
| Performance | Lighthouse score 90+ (Performance, SEO, Accessibility, Best Practices), gambar teroptimasi, lazy loading |
| SEO | Meta tag dinamis, sitemap.xml, robots.txt, structured data (JSON-LD), Open Graph & Twitter Card |
| GEO/AI Search | Konten terstruktur & factual, FAQ schema, llms.txt, heading hierarki jelas, jawaban ringkas di awal konten |
| Keamanan | Admin panel hanya bisa diakses via login, proteksi route, RLS di database, validasi & sanitasi input form |
| Aksesibilitas | Kontras warna sesuai WCAG AA (termasuk dark mode), alt text gambar wajib diisi admin |
| Skalabilitas | Struktur data & arsitektur mendukung penambahan halaman/fitur baru ke depan (misal: careers, testimonial page) |
| Maintainability | Semua konten dikelola non-teknis lewat admin panel, tanpa perlu sentuh kode/redeploy untuk update konten |

## 8. Tech Stack (Ringkasan)

Detail lengkap ada di `architecture.md`. Ringkasan:
- **Framework**: Next.js (App Router)
- **Database & Auth**: Supabase (Postgres + Auth + Storage)
- **UI Components**: shadcn/ui
- **Skeleton Loader**: phantom-ui
- **Toast/Notification**: gooey-toast
- **Animasi/Interaktif UI**: React Bits
- **Hosting**: Vercel

## 9. Out of Scope (v1)

- Multi-bahasa (i18n) — bisa jadi fase berikutnya.
- E-commerce/payment gateway.
- Live chat widget (bisa pakai WA link dulu).
- Multi-admin dengan role granular (v1 cukup 1-2 admin, role sederhana).

## 10. Asumsi & Risiko

**Asumsi:**
- Konten awal (teks, foto project, tulisan blog) disiapkan oleh Arya.
- Domain teridox.com sudah tersedia dan siap diarahkan ke Vercel.

**Risiko:**
- Library pihak ketiga yang relatif niche (phantom-ui, gooey-toast) — perlu dicek kompatibilitas versi Next.js & React terbaru, serta rencana fallback bila library tidak lagi di-maintain.
- SEO/GEO hasil butuh waktu (bulan) untuk terlihat efeknya — perlu ekspektasi realistis di awal.

## 11. Milestone (Usulan Fase Pengerjaan)

1. **Fase 1 — Fondasi**: setup Next.js + Supabase + shadcn, skema database, auth admin.
2. **Fase 2 — Halaman Publik Statis**: Home, About, Services, Contact (dengan data dummy/manual dulu).
3. **Fase 3 — Admin Panel**: CRUD About, Services, Project, Blog, Contact inbox.
4. **Fase 4 — Project & Blog Publik**: hubungkan halaman publik ke data dari admin panel.
5. **Fase 5 — Polish**: dark/light mode, animasi (React Bits), skeleton loading (phantom-ui), toast (gooey-toast).
6. **Fase 6 — SEO/GEO/AI Search**: sitemap, structured data, llms.txt, testing Lighthouse & rich results.
7. **Fase 7 — QA & Launch**: testing responsive, testing form, deploy production ke domain teridox.com.

## 12. Metrik Keberhasilan (KPI)

- Website terindex penuh di Google Search Console dalam 2-4 minggu setelah launch.
- Muncul di hasil AI search (uji manual: tanya ke ChatGPT/Perplexity "jasa web development Bali") dalam 1-3 bulan.
- Jumlah submission form contact per bulan sebagai indikator lead.
- Lighthouse score konsisten 90+ di semua halaman utama.