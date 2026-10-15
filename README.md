# pandaan.id — Static HTML

Situs publik pandaan.id sebagai **HTML statis murni**: HTML + Bootstrap 5.3 (CDN) + Phosphor Icons (CDN) + CSS khusus + JavaScript native.

**Bukan Laravel.** Tidak ada PHP, Blade, backend, database, CMS, Node.js/npm, Vite, atau proses build. Setiap halaman adalah file `.html` biasa yang bisa dibuka langsung atau di-host di static hosting mana pun.

## Struktur

Struktur folder = struktur URL. Folder berisi `index.html` agar URL bersih bekerja di static hosting:

```
index.html                                → /
berita/index.html                         → /berita/
berita/akhir-pekan-di-kaki-penanggungan/        → /berita/akhir-pekan-di-kaki-penanggungan/
info-jalan/index.html                     → /info-jalan/
info-jalan/road-1/                        → /info-jalan/road-1/
direktori/index.html                      → /direktori/
direktori/kafe-and-nongkrong/kedai-sore/  → /direktori/kafe-and-nongkrong/kedai-sore/
event/index.html                          → /event/
event/pasar-kreatif-pandaan/              → /event/pasar-kreatif-pandaan/
tentang/  kerja-sama/  kontribusi/        → /tentang/ /kerja-sama/ /kontribusi/
404.html                                  halaman tidak ditemukan
offline.html                              halaman offline (PWA)
assets/css/pandaan.css                    gaya khusus
assets/js/pandaan.js                      JavaScript native
manifest.webmanifest, sw.js, icon-*       PWA
robots.txt, sitemap.xml                   SEO
docs/                                   dokumen internal & skrip (TIDAK ikut diterbitkan)
```

## Pratinjau lokal

Hanya butuh Python 3, tanpa memasang paket apa pun:

```bash
python3 docs/scripts/preview.py
# buka http://localhost:4173
```

Alternatif lain, dari root repo:

```bash
python3 -m http.server 4173
# atau
npx serve .
```

## Deploy

Upload **seluruh isi root repo ini** (kecuali `.git/`, dokumen `*.md`, dan `scripts/`) ke static hosting apa pun — misalnya Netlify, Vercel, Cloudflare Pages, GitHub Pages, atau Nginx/Apache biasa:

- Build command: *(kosong / tidak ada)*
- Output / publish directory: `.` (root repo; di Netlify/Vercel cukup arahkan root-nya ke repo ini)
- File `404.html` di root otomatis dipakai sebagai halaman 404 oleh mayoritas static host.

Tidak ada variabel lingkungan, migrasi database, atau langkah build yang perlu dijalankan.

## Menambah / mengubah halaman

1. Buat folder baru + `index.html` di dalamnya untuk URL baru (mis. `promo/index.html` → `/promo/`).
2. Salin struktur `<head>`, header, dan footer dari halaman yang sudah ada agar konsisten.
3. Link antar halaman memakai path absolut dari root: `/berita/`, `/assets/css/pandaan.css`, dst.
4. Formulir Kontribusi dan tombol WhatsApp usaha tampil sebagai jalur pengiriman utama. Untuk pengiriman otomatis dari situs statis, sambungkan `action` formulir ke Web3Forms/Formspree (+ Cloudflare Turnstile) — cukup satu baris, tanpa backend sendiri.

## Catatan konten dan SEO

Situs ini adalah **pratinjau dengan data contoh** dan keputusan ini berlaku konsisten di semua tempat: semua halaman memakai `noindex, follow`, menampilkan banner "Versi pratinjau — data contoh", dan `sitemap.xml` sengaja dikosongkan. Nama usaha, harga, jadwal, dan laporan jalan di halaman-halaman ini adalah contoh tampilan, bukan fakta terverifikasi; nomor telepon contoh sudah dicabut dan tidak ada tautan WhatsApp ke nomor placeholder.

Formulir Kontribusi tidak mengirim apa pun: ia hanya menyusun ringkasan kiriman (dengan kolom khusus per jenis: waktu/lokasi/foto untuk laporan jalan, alamat/jam/harga untuk usaha, tanggal/lokasi/penyelenggara untuk event) agar pelapor dapat meneruskannya sendiri. Jangan menampilkan pesan "sudah diterima" sebelum formulir benar-benar terhubung ke layanan pengiriman (mis. Web3Forms/Formspree + Turnstile).

Saat mengganti data contoh dengan data lapangan yang terverifikasi, pertahankan kelengkapan field yang sama (nama, alamat, jam, harga, kontak, sumber, waktu), lalu lepas `noindex`, hapus banner pratinjau, dan isi kembali `sitemap.xml`. Foto halaman saat ini berasal dari Unsplash — ganti dengan dokumentasi asli Pandaan (warung, jalan, event) dengan tetap mencantumkan keterangan foto.

Dokumen perencanaan (`PRD-pandaan-id-website-publik.md`, `pandaan-id-portal-proposal.md`) hanya referensi produk dan bukan bagian dari situs yang di-deploy.

## Font & identitas visual

- **Judul: Fraunces** (serif variable, italic untuk nuansa nostalgia) · **Isi/UI: Schibsted Grotesk** (variable, dirancang untuk media berita) · **Stempel waktu Info Jalan: DM Mono** (`12 menit lalu · 14.32 WIB`, dirender `Intl.RelativeTimeFormat` zona `Asia/Jakarta` untuk elemen `<time data-relative datetime="…">`).
- Ketiganya **self-host** di `assets/fonts/` (`.woff2`, subset Latin, `font-display: swap`, lisensi OFL disertakan), font judul di-`preload`. Fallback: `Georgia, serif` dan `system-ui, sans-serif`. Tidak ada font dari CDN.
- Palet hangat: krem kertas `#F5F0E6`, tinta `#1F2933`, merah bata `#B3402A`, hijau lereng `#2F5D46`. Tanpa gradient ungu-biru, glow, atau glassmorphism.

## GitHub Pages

Repo ini diterbitkan GitHub Pages dari branch, dan `_config.yml` mengecualikan `docs/` (PRD, proposal, skrip) serta `README.md` dari hasil terbit — dokumen internal tidak bisa diakses publik. (Workflow Actions khusus tidak dipakai; token integrasi sesi tidak memiliki izin `workflows`.) **Semua path internal relatif** (`./`, `../`) sehingga situs jalan di subpath `username.github.io/nama-repo/` maupun domain sendiri. File `CNAME` sudah dihapus dari repo: canonical/OG di HTML menunjuk domain produksi yang dituju, `https://pandaan.id/`. Bila domain produksi berubah, ganti string domain itu di semua `<link rel="canonical">`, `og:url`, dan `og:image`, lalu tambahkan kembali `CNAME` berisi domain baru. `404.html` dan `offline.html` mandiri (CSS inline, `noindex`) agar tetap benar di URL bertingkat. `sitemap.xml` ditulis manual dan selama pratinjau dikosongkan; saat rilis isi setiap `<url>` dengan `<loc>` + `<lastmod>` (tanggal pembaruan halaman itu). OG image absolut: `https://pandaan.id/assets/og-pandaan.jpg` (1200×630). Canonical dan `og:url` selalu memakai trailing slash (`/berita/`) agar konsisten dengan sitemap.

Catatan: GitHub Pages melarang situs yang *terutama* untuk transaksi komersial. Landing/pitch aman; bila nanti ada iklan & listing berbayar, pindah ke Cloudflare Pages/Netlify (tinggal arahkan ke repo yang sama, tanpa build).

## Library (tanpa build tool)

Prinsip: sesedikit mungkin, versi terkunci, tidak ada `@latest`.

- CSS/JS framework: Bootstrap 5.3.3 via CDN (SRI terkunci) — dipertahankan agar konsisten di semua halaman yang sudah terlanjur memakai grid/komponennya; CSS khusus di `assets/css/pandaan.css`.
- Ikon: Phosphor via CDN versi terkunci (2.1.1). Interaksi (tab, filter, menu) cukup JS native di `assets/js/pandaan.js` — tidak perlu Alpine/jQuery untuk skala ini.
- Yang **tidak** dipakai & alasannya: jQuery, Swiper/FullCalendar (berat), AOS (terlihat generik). Carousel cukup CSS `scroll-snap`; peta Leaflet+OSM hanya dimuat saat elemen terlihat/diklik bila nanti ditambahkan.
- Form statis tidak bisa mengirim data: form saat ini demo + honeypot `name="website"`. Saat rilis, sambungkan ke Web3Forms/Formspree (+ Cloudflare Turnstile) — cukup ganti `action` form, tanpa backend.
- Analitik: belum dipasang. Bila perlu, pakai GoatCounter/Cloudflare Web Analytics, atau GA4 hanya setelah persetujuan cookie.

## Arsitektur informasi

- Navbar desktop: Beranda, Berita, Info Jalan, Direktori, Event + tombol **Cari usaha** (memang hanya mencari direktori — labelnya dibuat jujur) dan **Kontribusi**. Kerja Sama (urusan B2B/iklan) tidak lagi di navbar; tautannya ada di footer bersama Kebijakan Privasi dan Pedoman Redaksi.
- Dock mobile memuat tepat 5 item yang muat penuh di lebar 360–375px tanpa digeser: Beranda, Berita, Info Jalan, Direktori, Event. Cari dan Kontribusi tetap tersedia di header/menu hamburger.
- Berita punya halaman **Arsip** (`berita/arsip/`) dan **kategori** (`berita/kategori/panduan|komunitas|kuliner/`). Dengan 6 artikel, paginasi belum diperlukan; tambahkan saat arsip melewati ±24 artikel.

## Kepatuhan & analytics

- `kebijakan-privasi/` menjelaskan data formulir dan hak subjek data menurut UU PDP No. 27/2022 (draf pratinjau — wajib ditinjau ahli hukum sebelum operasi penuh).
- `pedoman-redaksi/` memuat standar verifikasi, label Kerja Sama, susunan redaksi, serta mekanisme hak jawab/koreksi (konfirmasikan kebutuhan persisnya ke ahli hukum/Dewan Pers).
- Analytics **sengaja belum dipasang**, jadi tidak ada klaim audiens di halaman Kerja Sama. Saat dibutuhkan, pakai GoatCounter atau Cloudflare Web Analytics (ringan, tanpa cookie pelacak) dan perbarui Kebijakan Privasi sebelum mengaktifkannya.

## Menjaga layout tetap seragam

Header/footer/modal/dock tersalin di tiap file HTML (konsekuensi situs statis tanpa build). Cegah drift dengan menjalankan pemeriksa ini setiap selesai mengedit banyak halaman:

```bash
python3 docs/scripts/check_layout.py
```

Skrip itu gagal (exit 1) bila ada halaman yang navbar/dock/modal/footer-nya menyimpang dari pola baku.

## Data Info Jalan (data-driven)

Daftar laporan di `info-jalan/` tidak di-hardcode di HTML. Laporan dibaca dari
`assets/data/road-reports.json` (bidang: type, title, location, observedAt,
validUntil, state, note, detailUrl) dan dirender oleh `assets/js/pandaan.js`.

- Status **Aktif** dihitung dari `validUntil` terhadap waktu pengunjung; laporan
  yang lewat masa berlakunya otomatis pindah ke Riwayat 7 hari. Evaluasi diulang
  tiap menit selama halaman terbuka, dan angka pada tab selalu dihitung dari data.
- Bila nanti ada backend/CMS, cukup hasilkan berkas JSON yang sama — tampilan
  tidak perlu diubah.
