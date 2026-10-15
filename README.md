# pandaan.id — Static HTML

Situs publik pandaan.id sebagai **HTML statis murni**: HTML + Bootstrap 5.3 (CDN) + Phosphor Icons (CDN) + CSS khusus + JavaScript native.

**Bukan Laravel.** Tidak ada PHP, Blade, backend, database, CMS, Node.js/npm, Vite, atau proses build. Setiap halaman adalah file `.html` biasa yang bisa dibuka langsung atau di-host di static hosting mana pun.

## Struktur

Struktur folder = struktur URL. Folder berisi `index.html` agar URL bersih bekerja di static hosting:

```
index.html                                → /
berita/index.html                         → /berita/
berita/akhir-pekan-di-kaki-arjuno/        → /berita/akhir-pekan-di-kaki-arjuno/
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
scripts/preview.py                        server pratinjau lokal (Python 3)
```

## Pratinjau lokal

Hanya butuh Python 3, tanpa memasang paket apa pun:

```bash
python3 scripts/preview.py
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
4. Formulir saat ini hanya **simulasi di browser** — tidak mengirim/menyimpan data. Jika nanti butuh pengiriman data, arahkan formulir ke layanan form pihak ketiga (mis. Formspree) atau API eksternal; tetap tidak perlu backend sendiri.

## Catatan konten dan SEO

Seluruh isi berita, agenda, listing usaha, cuaca, dan kartu Info Jalan adalah **data contoh**. Setiap halaman memakai `noindex`; detail sumber, kontak, alamat presisi, harga, waktu pengamatan, dan status verifikasi tidak dibuat-buat. Peta direktori hanya menampilkan area umum tanpa pin usaha.

Sebelum publikasi:

1. Ganti data contoh dengan data yang sudah ditinjau dan punya sumber.
2. Hapus `noindex` setelah konten siap dan isi `sitemap.xml` dari URL publik yang valid.
3. Pastikan URL gambar Unsplash, CDN Bootstrap, dan CDN Phosphor sesuai kebijakan produksi. Untuk CSP yang ketat, izinkan domain CDN tersebut atau self-host file-nya di `assets/`.

Dokumen perencanaan (`PRD-pandaan-id-website-publik.md`, `pandaan-id-portal-proposal.md`) hanya referensi produk dan bukan bagian dari situs yang di-deploy.
