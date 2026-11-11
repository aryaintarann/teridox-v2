# Blog harian otomatis dengan AI — Desain

Tanggal: 2026-11-11 · Status: menunggu review pemilik

## Tujuan

Satu artikel blog baru terbit otomatis setiap hari di teridox.com, ditulis AI (Kimi K3.1 Pro lewat Shiteru) lengkap dengan gambar header AI. Topik tetap: teknologi, website, dan cyberattack. Setiap artikel ditutup dengan promosi Teridox dan Arya Intaran sebagai pemilik Teridox. Konten harus aman untuk SEO, GEO, dan pencarian AI, jadi sumbernya wajib terpercaya dan tercantum.

## Keputusan yang sudah disetujui

| Hal | Keputusan |
|---|---|
| Penyedia teks | Shiteru `POST https://shiteru.id/v1/chat/completions`, model `kimi-k3.1-pro` (satu-satunya model di akun, sudah dites HTTP 200) |
| Penyedia gambar | Pollinations (`image.pollinations.ai`, tanpa key). Shiteru tidak punya endpoint gambar (404). Gemini gambar gagal: kredit prepaid habis (402) |
| Cadangan gambar | Cover dari kode (`next/og`) bila Pollinations gagal |
| Jadwal | Vercel Cron, 1x/hari |
| Status posting | Langsung `published` bila lolos cek mutu; `draft` bila gagal cek mutu |
| Bahasa artikel | Inggris |
| Sumber | Daftar putih tetap di kode, AI tidak boleh memilih sumber |

## Alur

```
Vercel Cron -> GET /api/cron/daily-blog
 1. Cek header Authorization == Bearer CRON_SECRET, selain itu 401
 2. Ambil RSS dari daftar putih, hanya item <= 72 jam, buang yang source_url-nya sudah ada di blog_posts
 3. Pilih satu item (prioritas sumber tingkat 1, lalu terbaru)
 4. Ambil teks artikel sumber, kirim ke Kimi, minta JSON:
    title, category, excerpt, seo_title, seo_description, content (HTML), image_prompt
 5. Sanitasi HTML, tambah bagian Sources dan penutup promosi dari kode
 6. Cek mutu otomatis
 7. generateCover(image_prompt) -> unggah ke bucket `uploads` (folder blog/), atau cadangan next/og
 8. Insert ke blog_posts (published atau draft), revalidate /blog dan /sitemap.xml
```

## Daftar sumber (sudah diuji hidup pada 2026-11-11)

**Tingkat 1, primer:** CISA Advisories (`cisa.gov/cybersecurity-advisories/all.xml`), Microsoft Security Blog, Google Security Blog, Cloudflare Security, Chrome Developers Blog, web.dev.

**Tingkat 2, jurnalisme keamanan:** BleepingComputer, The Hacker News, Krebs on Security, WIRED Security, Schneier on Security.

Feed keamanan Ars Technica 404 dan tidak dipakai. Daftar disimpan sebagai konstanta; menambah atau mengurangi sumber berarti mengubah kode, bukan konfigurasi AI.

## Aturan editorial

1. Setiap artikel memuat bagian **Sources**: nama sumber dan tautan ke artikel asli.
2. Kimi hanya memakai fakta yang ada di teks sumber. Dilarang menambah kutipan, angka, nomor CVE, nama, atau tanggal yang tidak ada di sumber. Bila fakta kurang, jalankan berikutnya dengan item lain; bila semua gagal, tidak ada artikel hari itu.
3. Artikel adalah analisis asli dengan sudut pandang pemilik bisnis dan developer web, bukan salinan kalimat sumber.
4. Satu `source_url` hanya dipakai sekali.
5. Satu baris transparansi: "Ditulis dengan bantuan AI dan ditinjau secara editorial" (teks akhir ditentukan saat implementasi, dalam bahasa Inggris sesuai artikel).
6. Penutup promosi berasal dari template tetap di kode (bukan dari model): menyebut Arya Intaran sebagai pemilik Teridox, tanpa klaim harga, klien, penghargaan, atau garansi.

## Cek mutu otomatis (sebelum `published`)

Lolos hanya bila semua benar: JSON valid dan semua kolom terisi; isi minimal sekitar 600 kata; ada bagian Sources dengan tautan dari domain daftar putih; ada penutup Teridox dan Arya Intaran; tidak ada frasa sisa AI ("As an AI", "I cannot"); slug unik. Bila ada yang gagal, simpan sebagai `draft` dan catat alasannya di log.

## SEO, GEO, dan AI search

- JSON-LD `Article` di halaman detail: `author` Arya Intaran, `publisher` Teridox, `datePublished`, `dateModified`, `image`, `mainEntityOfPage`.
- `seo_title`, `seo_description`, canonical, Open Graph; alt text pada gambar header.
- Artikel baru masuk `sitemap.ts` otomatis (sudah ada di proyek; diverifikasi saat implementasi).
- Struktur HTML bersih (`h2`, `p`, `ul`, ringkasan di awal) agar mudah dikutip mesin AI.

## Komponen dan file

| File | Tugas |
|---|---|
| `src/app/api/cron/daily-blog/route.ts` | Pintu masuk cron, cek `CRON_SECRET`, mengatur alur |
| `src/lib/daily-blog/sources.ts` | Daftar putih dan pengambilan RSS, filter 72 jam, deteksi duplikat |
| `src/lib/daily-blog/write-article.ts` | Panggilan Kimi lewat Shiteru, parsing JSON, prompt |
| `src/lib/daily-blog/quality.ts` | Cek mutu, sanitasi HTML, template Sources dan promosi |
| `src/lib/daily-blog/generate-cover.ts` | Pollinations, crop watermark, unggah ke Storage, cadangan `next/og` |
| `vercel.json` | `crons` 1x/hari, `maxDuration` untuk route |
| Migrasi Supabase | Kolom `source_url text unique` di `blog_posts` |

Rute lama `/api/generate-blog` (Gemini, manual dari admin) tidak diubah dalam pekerjaan ini.

## Keamanan

- `SHITERU_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET` hanya di env server (`.env.local` dan Vercel), tidak di frontend dan tidak di GitHub. `.env.local` sudah ada di `.gitignore` dan `SHITERU_API_KEY` sudah terpasang.
- Route cron menolak semua permintaan tanpa `Bearer CRON_SECRET`.
- HTML dari AI disanitasi (allowlist tag) sebelum disimpan. Tautan hanya `http(s)`.
- Insert memakai service role di server (melewati RLS yang memang admin-only). Service role tidak pernah sampai ke client.
- Teks sumber yang diambil dari web diperlakukan sebagai data, bukan instruksi, dan tidak boleh mengubah prompt sistem.

## Penanganan kegagalan

| Kegagalan | Perilaku |
|---|---|
| RSS mati atau tidak ada item baru | Tidak ada artikel, log, respons 200 |
| Kimi error, timeout, atau JSON rusak | Coba item sumber lain (maks 2 kali), lalu berhenti tanpa artikel |
| Cek mutu gagal | Simpan `draft` dengan alasan di log |
| Pollinations gagal | Pakai cover `next/og` |
| Insert Supabase gagal | Respons 500, tidak ada artikel setengah jadi |

## Pengujian

- Tes kecil: parsing dan validasi JSON model, filter item 72 jam dan duplikat, pembuatan slug, cek mutu (lolos dan gagal), sanitasi HTML.
- Satu kali jalan manual (`curl` dengan `CRON_SECRET`) di lokal, lalu periksa artikel dan gambar nyata sebelum deploy.
- Verifikasi setelah deploy: cron terdaftar di Vercel, artikel muncul di `/blog` dan `/sitemap.xml`, JSON-LD valid.

## Risiko dan batasan yang diketahui

- **Pollinations tidak punya jaminan layanan.** Endpoint lama bisa berhenti atau meminta key (endpoint baru `gen.pollinations.ai` sudah 401). Gambar hasil tes membawa watermark kecil di pojok kanan bawah, jadi perlu di-crop. Mengganti penyedia hanya mengubah `generate-cover.ts` (kandidat: Cloudflare Workers AI).
- **Langsung publish berarti tanpa tinjauan manusia.** Cek mutu otomatis mengurangi kesalahan fakta, tidak menjaminnya. Akun admin tetap bisa mengedit atau menghapus artikel kapan saja.
- **Kimi memakai reasoning**, jadi token terpakai lebih banyak dari panjang jawaban dan butuh `maxDuration` yang cukup. Batas ini dikonfirmasi saat implementasi.
- Hak cipta: sumber hanya diringkas dan dianalisis dengan tautan balik, tidak disalin.
