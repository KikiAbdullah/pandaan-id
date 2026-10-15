# pandaan.id — HTML + Bootstrap 5 untuk Laravel 13

Antarmuka publik ini menggunakan HTML statis, Bootstrap 5.3 dari CDN, Phosphor Icons dari CDN, CSS khusus, dan JavaScript native. **Tidak ada proses build, Node.js, npm, Vite, React, atau dependency frontend.**

## Pratinjau lokal

Prasyarat hanya Python 3 (tidak memasang paket):

```bash
python3 scripts/preview.py
```

Buka `http://localhost:4173`. Server pratinjau memetakan URL bersih (`/berita`, `/info-jalan`, `/direktori`, `/event`) ke file HTML di `public/site/` dan mengirim halaman 404 dengan status HTTP 404 untuk rute yang tidak dikenal.

## Integrasi ke Laravel 13

Salin berkas dari proyek ini ke aplikasi Laravel:

- `public/site/` → `public/site/`
- `public/assets/` → `public/assets/`
- `public/icon*`, `public/manifest.webmanifest`, `public/sw.js`, `public/offline.html`, `public/robots.txt`, dan `public/sitemap.xml` → direktori `public/` Laravel
- `routes/pandaan-public.php` → `routes/pandaan-public.php` Laravel

Lalu tambahkan baris berikut **paling akhir** pada `routes/web.php` Laravel:

```php
require __DIR__.'/pandaan-public.php';
```

File route tersebut melayani halaman HTML statis melalui Laravel dan mempertahankan status 404 untuk URL yang tidak dikenal. Setelah model/CMS/backend disiapkan, ganti respons `response()->file(...)` dengan route controller dan Blade yang menggunakan data Laravel. Formulir saat ini hanya simulasi dan tidak mengirim atau menyimpan data.

Bootstrap dan Phosphor dimuat dari CDN—tidak perlu menjalankan `npm install`, `npm run build`, atau `npm run dev`. CSS dan JavaScript khusus sudah disediakan di `public/assets/`.

## Catatan konten dan SEO

Seluruh isi berita, agenda, listing usaha, cuaca, dan kartu Info Jalan yang tersedia adalah **data contoh**. Setiap halaman pratinjau memakai `noindex`; detail sumber, kontak, alamat presisi, harga, waktu pengamatan, dan status verifikasi tidak dibuat-buat. Peta direktori hanya menampilkan area umum tanpa pin usaha.

Sebelum publikasi:

1. Ganti fixture dengan data yang sudah ditinjau dan punya sumber/provenance.
2. Hubungkan formulir ke endpoint Laravel, validasi server, CSRF, dan penyimpanan yang sesuai.
3. Hapus `noindex` setelah konten siap dan buat sitemap dari data publik yang valid.
4. Pastikan URL gambar Unsplash, CDN Bootstrap, CDN Phosphor, PWA, serta kebijakan cache sesuai lingkungan produksi.

Halaman Bootstrap ini tidak memerlukan pipeline aset. Untuk kebijakan CSP yang ketat, izinkan domain CDN yang dipakai atau self-host file Bootstrap/Phosphor di `public/`.
