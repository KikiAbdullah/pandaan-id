# PRD — Website Publik Portal Informasi & Direktori Lokal Pandaan Raya

**Produk:** pandaan.id (nama kerja) · **Cakupan dokumen:** sisi publik (front-end pengunjung) saja
**Versi:** 1.0 (draf) · **Tanggal:** 14 Oktober 2026 · **Status:** Siap ditinjau
**Dokumen terkait:** *Blueprint & Bahan Pitch Portal Pandaan Raya* (`pandaan-id-portal-proposal.md`). PRD ini menggantikan struktur URL/sitemap pada blueprint tersebut bila ada perbedaan.

> **Di luar cakupan dokumen ini:** panel admin/CMS, dashboard pemilik usaha, ticketing, ulasan pengunjung, akun pengunjung. Semuanya akan dibahas di PRD terpisah. Bagian 8 mendefinisikan **data yang dikonsumsi situs publik** supaya PRD admin nantinya selaras.

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Pengguna & Skenario Utama](#2-pengguna--skenario-utama)
3. [Prinsip Produk & UX](#3-prinsip-produk--ux)
4. [Arsitektur Informasi & Navigasi](#4-arsitektur-informasi--navigasi)
5. [Spesifikasi Halaman](#5-spesifikasi-halaman)
6. [Komponen Global & Reusable](#6-komponen-global--reusable)
7. [Formulir & Validasi](#7-formulir--validasi)
8. [Model Data Publik](#8-model-data-publik)
9. [SEO](#9-seo)
10. [Analitik & Pelacakan](#10-analitik--pelacakan)
11. [Kebutuhan Non-Fungsional](#11-kebutuhan-non-fungsional)
12. [Panduan Desain UI](#12-panduan-desain-ui)
13. [Asumsi Teknis](#13-asumsi-teknis)
14. [Konten Awal & Aset yang Dibutuhkan](#14-konten-awal--aset-yang-dibutuhkan)
15. [Rencana Rilis & Kriteria Penerimaan](#15-rencana-rilis--kriteria-penerimaan)
16. [Risiko, Asumsi, Pertanyaan Terbuka](#16-risiko-asumsi-pertanyaan-terbuka)
17. [Lampiran](#17-lampiran)

---

## 1. Pendahuluan

### 1.1 Latar Belakang
@pandaan.id adalah media lokal berbasis sosial media. Kontennya cepat tenggelam di feed, sulit ditemukan lewat Google, dan monetisasinya masih manual lewat DM. Website publik ini menjadi **rumah digital**: arsip konten yang awet, pintu masuk pencarian Google, etalase direktori usaha lokal, dan pusat informasi real-time warga.

### 1.2 Tujuan Produk

| # | Tujuan | Ukuran keberhasilan (contoh, tetapkan baseline di bulan pertama) |
|---|---|---|
| T1 | Membuat konten @pandaan.id awet dan dapat ditemukan di Google | Trafik organik naik tiap bulan |
| T2 | Menjadi sumber rujukan info lokal (berita, jalan, event) | Kunjungan berulang, klik halaman Info Jalan |
| T3 | Menyediakan direktori usaha lokal yang berguna dan bisa dimonetisasi | Klik WhatsApp/rute dari halaman listing |
| T4 | Menyediakan jalur formal untuk kerja sama dan iklan | Permintaan penawaran masuk lewat form |
| T5 | Memungkinkan warga dan komunitas berkontribusi (lapor, daftar usaha, kirim event) | Jumlah kiriman valid per bulan |

### 1.3 Ruang Lingkup

**Dalam cakupan (publik):**
- Beranda, Berita, Info Jalan & Lapor Warga, Direktori, Event, Kerja Sama, Tentang, Kontak, Pencarian
- Formulir publik: lapor warga, daftarkan usaha, kirim event, permintaan kerja sama, kontak, langganan newsletter, laporkan data listing
- Halaman legal & redaksi, halaman error, PWA dasar

**Di luar cakupan (v1 publik):**
- Panel admin/CMS dan moderasi (PRD terpisah)
- Komentar artikel, akun/login pengunjung, ulasan pengunjung
- Pembayaran online, tiket, marketplace
- Aplikasi native
- Multi-bahasa (v1 hanya Bahasa Indonesia)

### 1.4 Definisi

| Istilah | Arti |
|---|---|
| **Listing** | Entri usaha/tempat di direktori |
| **Tier** | Tingkat listing: Gratis, Plus, Premium, Featured |
| **Info Jalan** | Pembaruan singkat kondisi jalan/lalu lintas (berbeda dari artikel berita) |
| **Laporan warga** | Kiriman info dari pengunjung; tayang setelah dimoderasi |
| **Label konten** | Penanda jenis artikel: Terverifikasi, Dari Warga, Update Berjalan, Kerja Sama |
| **Slot iklan** | Posisi tampilan iklan yang telah ditetapkan |
| **Evergreen/Pilar** | Artikel panduan yang tetap relevan dalam jangka panjang |
| **WIB** | Zona waktu acuan seluruh tampilan waktu (Asia/Jakarta) |

### 1.5 Asumsi & Dependensi
- Konten, listing, event, dan pembaruan Info Jalan diinput lewat admin (PRD terpisah). Sebelum admin siap, pengembangan memakai data dummy dan seeder sesuai Bagian 8.
- Identitas visual (logo, warna, tipografi) mengikuti brand @pandaan.id. Bila belum ada, gunakan token desain pada Bagian 12.
- Domain, hosting, dan akun pihak ketiga (analitik, peta, anti-spam) disiapkan sebelum UAT.

---

## 2. Pengguna & Skenario Utama

### 2.1 Persona

| Persona | Kebutuhan | Perangkat umum |
|---|---|---|
| **Warga lokal** | Berita, kondisi jalan, event akhir pekan, tempat makan | HP, koneksi bervariasi |
| **Pengunjung/wisatawan transit** | Kuliner, wisata, penginapan; datang dari Google | HP, sering di perjalanan |
| **Pelaku usaha/UMKM** | Dilihat di Google, didaftarkan, dihubungi pelanggan | HP dan laptop |
| **Komunitas/penyelenggara event** | Mengumumkan acara | HP dan laptop |
| **Calon pengiklan/brand** | Mengetahui jangkauan, paket, harga, cara memesan | Laptop dan HP |

### 2.2 User Story Utama

| ID | Sebagai… | Saya ingin… | Supaya… | Prioritas |
|---|---|---|---|---|
| US-01 | Pengunjung | mencari "bakso Pandaan" lalu langsung melihat daftar, jam buka, dan rute | cepat memutuskan tempat makan | Must |
| US-02 | Pengunjung | menghubungi usaha lewat satu ketukan WhatsApp | tidak perlu menyalin nomor | Must |
| US-03 | Warga | melihat kondisi jalan terbaru dan kapan diperbarui | memilih rute | Must |
| US-04 | Warga | mengirim laporan kejadian lengkap dengan foto dan lokasi | info sampai ke warga lain | Should |
| US-05 | Pengunjung | melihat event minggu ini dan menambahkannya ke kalender | tidak ketinggalan acara | Must |
| US-06 | Pelaku usaha | mendaftarkan usaha lewat form sederhana | usaha saya muncul di direktori | Must |
| US-07 | Penyelenggara | mengirim event untuk ditayangkan | acara saya diketahui warga | Should |
| US-08 | Calon pengiklan | melihat paket, statistik, dan contoh hasil kerja sama | meminta penawaran dengan percaya diri | Must |
| US-09 | Pembaca | membagikan artikel ke WhatsApp dengan pratinjau yang rapi | teman saya ikut membaca | Must |
| US-10 | Pembaca | menemukan artikel lama berdasarkan kategori atau pencarian | memakai arsip | Must |
| US-11 | Pembaca | melaporkan data listing yang salah atau mengklaim usaha | data tetap akurat | Should |
| US-12 | Pembaca | berlangganan ringkasan mingguan | tidak perlu membuka situs setiap hari | Could |

---

## 3. Prinsip Produk & UX

1. **Mobile first.** Mayoritas pengunjung memakai HP. Semua halaman dirancang mulai dari lebar 360 px.
2. **Cepat sebelum cantik.** Halaman harus terbuka cepat di jaringan seluler biasa. Gambar dioptimasi, skrip pihak ketiga dimuat tunda.
3. **Satu ketukan menuju aksi.** WhatsApp, telepon, rute, bagikan, tambah ke kalender: selalu terlihat dan mudah dijangkau jempol.
4. **Jelas mana yang editorial, warga, dan berbayar.** Setiap konten non-editorial diberi label yang tidak bisa disembunyikan.
5. **Informasi waktu selalu eksplisit.** Setiap Info Jalan menampilkan waktu relatif dan waktu absolut (WIB).
6. **Ramah data seluler.** Tidak ada autoplay video; embed sosial dimuat saat diklik atau saat terlihat.
7. **Nada bahasa:** informatif, hangat, lugas. Bahasa Indonesia baku-santai, tanpa clickbait.

---

## 4. Arsitektur Informasi & Navigasi

### 4.1 Peta Situs & URL

| Halaman | URL | Indeks Google |
|---|---|:---:|
| Beranda | `/` | Ya |
| Daftar berita | `/berita` | Ya |
| Berita per kategori | `/berita/kategori/{slug}` | Ya |
| Berita per tag | `/berita/tag/{slug}` | Ya (bila ≥ 3 artikel) |
| Detail berita | `/berita/{slug}` | Ya |
| Info Jalan | `/info-jalan` | Ya |
| Detail Info Jalan | `/info-jalan/{slug}` | Ya (selama aktif + 7 hari) |
| Form lapor warga | `/lapor` | Ya |
| Direktori (utama) | `/direktori` | Ya |
| Direktori per kategori | `/direktori/{kategori-slug}` | Ya |
| Detail listing | `/direktori/{kategori-slug}/{listing-slug}` | Ya |
| Peta direktori | `/direktori/peta` | Ya |
| Daftarkan usaha | `/daftarkan-usaha` | Ya |
| Event (daftar & kalender) | `/event` | Ya |
| Detail event | `/event/{slug}` | Ya |
| Kirim event | `/kirim-event` | Ya |
| Kerja sama (landing) | `/kerja-sama` | Ya |
| Paket & rate card | `/kerja-sama/paket` | Ya |
| Portofolio | `/kerja-sama/portofolio` | Ya |
| Detail portofolio | `/kerja-sama/portofolio/{slug}` | Ya |
| Permintaan penawaran | `/kerja-sama/pesan` | Tidak (noindex) |
| Tentang | `/tentang` | Ya |
| Kontak | `/kontak` | Ya |
| Pencarian | `/cari` | Tidak (noindex) |
| Kebijakan privasi | `/kebijakan-privasi` | Ya |
| Syarat & ketentuan | `/syarat-ketentuan` | Ya |
| Pedoman redaksi | `/pedoman-redaksi` | Ya |
| Kebijakan konten pengguna | `/kebijakan-konten-pengguna` | Ya |
| Peta situs (HTML) | `/peta-situs` | Ya |
| Halaman terima kasih (form) | `/terima-kasih/{jenis}` | Tidak (noindex) |
| Offline (PWA) | `/offline` | Tidak |
| Pengalihan iklan | `/go/{kode}` | Tidak (noindex, nofollow) |
| Sitemap XML / robots | `/sitemap.xml`, `/robots.txt` | – |

**Aturan slug:** huruf kecil, dipisah tanda hubung, tanpa tanggal; unik per jenis; perubahan slug otomatis membuat pengalihan 301.

### 4.2 Menu Header (Desktop)

| Urutan | Label | URL | Submenu | Catatan |
|:--:|---|---|---|---|
| 1 | **Berita** | `/berita` | Terbaru · Kuliner · Wisata · Event · Sejarah · Nostalgia · Lalu Lintas | Dropdown saat hover/fokus |
| 2 | **Info Jalan** | `/info-jalan` | – | Menampilkan titik status (hijau/kuning/merah) bila ada gangguan aktif |
| 3 | **Direktori** | `/direktori` | Kuliner · Kafe & Nongkrong · Wisata · Penginapan · Jasa · Belanja · *Lihat Semua* · *Peta* | Mega menu dua kolom |
| 4 | **Event** | `/event` | Minggu Ini · Bulan Ini · Kalender | – |
| 5 | **Kerja Sama** | `/kerja-sama` | Paket & Harga · Portofolio · Pesan Penawaran | – |
| Aksi | **Ikon Cari** | overlay pencarian | – | Pintasan `/` atau `Ctrl+K` |
| Aksi (CTA) | **Daftarkan Usaha** | `/daftarkan-usaha` | – | Tombol utama (primer) |

**Top bar** (di atas header, desktop): tanggal hari ini (WIB) · cuaca ringkas Pandaan · ringkasan 1 baris Info Jalan terbaru (menautkan ke `/info-jalan`) · ikon tautan Instagram, TikTok, Facebook, WhatsApp Channel.

### 4.3 Navigasi Mobile

- **Header ringkas:** logo di kiri, ikon cari, ikon menu (hamburger).
- **Menu hamburger** (offcanvas dari kanan): Beranda · Berita (accordion kategori) · Info Jalan · Direktori (accordion kategori) · Event · Kerja Sama · Tentang · Kontak · tombol **Daftarkan Usaha** · tombol **Lapor Warga** · tautan sosial.
- **Bottom navigation** (tetap di bawah, 5 item): Beranda · Berita · Direktori · Event · Info Jalan. Disembunyikan saat keyboard terbuka dan pada halaman form panjang.
- **Tombol WhatsApp melayang** hanya pada detail listing (diganti bar aksi, lihat 5.9).

### 4.4 Menu Footer

| Kolom | Isi |
|---|---|
| **Tentang pandaan.id** | Deskripsi 2 kalimat, logo, ikon sosial |
| **Jelajahi** | Berita · Info Jalan · Direktori · Event · Peta Direktori |
| **Berkontribusi** | Lapor Warga · Daftarkan Usaha · Kirim Event · Laporkan Data Salah |
| **Kerja Sama** | Paket & Harga · Portofolio · Pesan Penawaran |
| **Informasi** | Tentang · Kontak · Pedoman Redaksi · Kebijakan Konten Pengguna · Kebijakan Privasi · Syarat & Ketentuan · Peta Situs |
| **Baris bawah** | Hak cipta · "Dibuat untuk warga Pandaan Raya" · tombol kembali ke atas |

### 4.5 Breadcrumb
Tampil di semua halaman kecuali Beranda. Format: `Beranda › Direktori › Kuliner › Nama Usaha`. Memakai markup `BreadcrumbList`. Pada mobile, hanya menampilkan satu tingkat induk dengan panah kembali bila terlalu panjang.

---

## 5. Spesifikasi Halaman

> **Konvensi ID:** `FR-{MODUL}-{no}`. **Prioritas:** M = Must (wajib v1), S = Should, C = Could.
> Setiap halaman memuat: tujuan, komponen (urutan atas ke bawah), aturan data, interaksi/state, SEO, dan kriteria penerimaan (KP).

---

### 5.1 Beranda `/`

**Tujuan:** memperkenalkan situs dalam sekali lihat dan mengarahkan ke empat jalur utama: berita, info jalan, direktori, event.

**Susunan section (atas → bawah):**

| # | Section | Isi & aturan | Prioritas |
|:--:|---|---|:--:|
| 1 | Top bar + header | Lihat 4.2 | M |
| 2 | Slot iklan `HOME-TOP` | Leaderboard; dapat kosong (tidak menyisakan ruang kosong) | S |
| 3 | **Sorotan utama** | 1 berita utama besar (gambar, kategori, judul, 1 kalimat lead, waktu) + 4 berita pilihan (grid 2×2 desktop, daftar di mobile). Dipilih admin lewat flag `featured`; bila kosong, ambil terbaru | M |
| 4 | **Info Jalan Terkini** | 3 pembaruan aktif terbaru: ikon jenis, judul, lokasi, badge status, waktu relatif. Tautan "Lihat semua". Bila tidak ada gangguan: tampilkan pesan "Belum ada gangguan yang dilaporkan." dengan waktu terakhir diperiksa | M |
| 5 | **Berita Terbaru** | Tab: Semua · Berita · Kuliner · Wisata · Event (tab mengganti daftar tanpa muat ulang halaman). 8 kartu; tombol "Berita lainnya" | M |
| 6 | **Event Mendatang** | Carousel horizontal 6 event terdekat: chip tanggal, judul, lokasi, harga/gratis. Tautan "Lihat kalender" | M |
| 7 | **Jelajahi Direktori** | Grid 6 ikon kategori + kotak pencarian cepat (kata kunci + pilih area) | M |
| 8 | **Listing Pilihan** | Carousel 6–8 listing tier Featured (rotasi adil, lihat 5.7), label "Pilihan" | S |
| 9 | **Panduan Pandaan** | 3–4 artikel evergreen (flag `pillar`) dengan gambar besar | S |
| 10 | **Band ajakan: Lapor Warga** | Teks singkat + tombol "Kirim Laporan" | S |
| 11 | **Band ajakan: Usaha & Kerja Sama** | Dua kartu: "Daftarkan usaha Anda (gratis)" dan "Pasang iklan / kerja sama" | M |
| 12 | **Slot iklan** `HOME-MID` | Di antara section 5 dan 6 | S |
| 13 | **Feed sosial** | Grid 6 kiriman Instagram/TikTok terbaru (gambar + tautan keluar), dimuat tunda | C |
| 14 | **Newsletter / WhatsApp Channel** | Form email singkat + tombol "Gabung WhatsApp Channel" | C |
| 15 | Footer | Lihat 4.4 | M |

**Aturan & state:**
- Setiap section yang datanya kosong disembunyikan sepenuhnya (kecuali section 4 yang menampilkan pesan kosong).
- Konten di-cache (cache halaman tamu singkat, dibersihkan otomatis saat konten tayang/berubah).
- Skeleton loader pada tab Berita Terbaru saat berpindah tab.

**SEO:** `<title>` "pandaan.id — Berita, Info Jalan, Kuliner & Event Pandaan Raya"; deskripsi ±150 karakter; skema `WebSite` (dengan `SearchAction`) dan `Organization`.

**Kriteria Penerimaan:**
- [ ] Beranda memuat tanpa galat dengan data lengkap maupun kosong
- [ ] Tab Berita Terbaru berganti tanpa memuat ulang halaman dan dapat dioperasikan keyboard
- [ ] Skor LCP mobile ≤ 2,5 detik pada profil 4G lambat
- [ ] Tidak ada pergeseran tata letak akibat slot iklan atau gambar (CLS < 0,1)

---

### 5.2 Daftar Berita `/berita`

**Tujuan:** arsip seluruh artikel, mudah dijelajahi.

**Komponen:**
1. Breadcrumb, judul halaman "Berita"
2. **Bar kategori** (chip horizontal yang dapat digeser): Semua · Berita · Kuliner · Wisata · Event · Sejarah · Nostalgia · Lalu Lintas
3. Sortir: Terbaru (bawaan) · Terpopuler (7 hari) *(S)*
4. **Daftar artikel:** kartu (gambar 16:9, kategori, judul maks 2 baris, ringkasan maks 2 baris di desktop, penulis, tanggal relatif, label konten). Halaman pertama menampilkan 1 artikel besar + sisanya grid
5. Sidebar (desktop): kotak cari, Terpopuler (5), tag populer, slot `SIDEBAR-1`, ajakan Lapor/Daftar
6. **Pagination:** 12 artikel per halaman, nomor halaman + Berikutnya/Sebelumnya (bukan infinite scroll, demi SEO dan arsip)

**Aturan:** hanya artikel berstatus tayang dan tanggal tayang ≤ sekarang. Label "Kerja Sama" selalu terlihat di kartu.

**SEO:** `rel="prev/next"` tidak wajib; gunakan kanonikal per halaman; judul halaman 2+ memuat "Halaman 2". Skema `CollectionPage`.

**KP:**
- [ ] Filter kategori menghasilkan URL `/berita/kategori/{slug}` yang dapat dibagikan
- [ ] Pagination mempertahankan kategori terpilih
- [ ] State kosong: "Belum ada artikel di kategori ini" + tautan ke Semua

---

### 5.3 Detail Berita `/berita/{slug}`

**Tujuan:** pengalaman membaca terbaik dan mudah dibagikan.

**Komponen (urutan):**
1. Breadcrumb · badge kategori · **label konten** (Terverifikasi / Dari Warga / Update Berjalan / Kerja Sama)
2. **Judul (H1)** · lead/subjudul (opsional)
3. **Byline:** nama penulis (tautan ke arsip penulis bila ada), tanggal terbit, tanggal diperbarui (bila ada), estimasi waktu baca
4. **Gambar utama** + keterangan + kredit foto
5. **Bar bagikan:** WhatsApp (utama), Facebook, X, Telegram, Salin tautan; di mobile menggunakan Web Share API bila tersedia. Bar menempel (sticky) di sisi (desktop) atau bawah (mobile) saat menggulir
6. **Daftar isi otomatis** (bila ≥ 4 subjudul H2 atau ≥ 1.200 kata), dapat dilipat
7. **Isi artikel:** paragraf, H2/H3, daftar, tabel (dapat digulir horizontal di mobile), kutipan, gambar + keterangan, galeri (lightbox), embed Instagram/TikTok/YouTube (muat saat diklik), kotak "Info Penting"
8. **Kotak "Pembaruan"** untuk label *Update Berjalan*: linimasa entri pembaruan berstempel waktu, yang terbaru di atas
9. Slot iklan `ARTICLE-INLINE` (setelah paragraf ke-4; maksimal 1) dan `ARTICLE-TOP`
10. **Tag** (tautan ke `/berita/tag/{slug}`)
11. **Kotak penulis** (nama, bio singkat)
12. **Terkait:** *Listing disebut dalam artikel* (kartu mini), *Event terkait*, *Artikel terkait* (3–4, berdasarkan kategori + tag)
13. Kotak **"Ada koreksi atau info tambahan?"** → tautan ke `/kontak?subjek=koreksi&ref={slug}`
14. Ajakan: ikuti Instagram/TikTok, gabung WhatsApp Channel

**Aturan:**
- Label *Kerja Sama* menampilkan pernyataan "Artikel ini adalah konten kerja sama" di atas isi dan pada kartu mana pun.
- Artikel tidak menerima komentar di v1; arahkan ke Instagram untuk diskusi.
- Tautan keluar dalam konten berbayar memakai `rel="sponsored noopener"`.
- Kutipan dan sumber dicantumkan sesuai Pedoman Redaksi.

**SEO:** skema `NewsArticle` (headline, image, datePublished, dateModified, author, publisher); Open Graph dan Twitter Card (gambar 1200×630) agar pratinjau WhatsApp rapi; kanonikal; `og:type=article`.

**KP:**
- [ ] Pratinjau tautan di WhatsApp menampilkan judul, gambar, dan deskripsi yang benar
- [ ] Embed sosial tidak memuat skrip pihak ketiga sebelum diklik
- [ ] Tabel lebar tidak merusak tata letak mobile
- [ ] Artikel dengan label Kerja Sama menampilkan pernyataan keterbukaan di dalam artikel dan kartu

---

### 5.4 Kategori & Tag `/berita/kategori/{slug}` · `/berita/tag/{slug}`

- Sama dengan 5.2, dengan **judul + deskripsi kategori/tag** (teks 1–2 kalimat untuk SEO) di atas daftar.
- Kategori "Sejarah" dan "Nostalgia" memiliki header bergaya khusus (opsional) dan tampil sebagai serial bila artikel memiliki `series`.
- 404 bila slug tidak ada; tag dengan < 3 artikel diberi `noindex`.

---

### 5.5 Info Jalan `/info-jalan`

**Tujuan:** satu tempat untuk kondisi jalan terkini di Pandaan Raya.

**Komponen:**
1. Judul "Info Jalan & Lalu Lintas" + waktu "Diperbarui: {waktu relatif} ({jam WIB})"
2. **Ringkasan status** (chip hitung): Lancar · Padat · Terhambat · Ditutup (berdasarkan pembaruan aktif)
3. Widget **cuaca** Pandaan (ikon, suhu, kondisi, prakiraan beberapa jam; sumber dicantumkan)
4. **Filter:** jenis (macet, kecelakaan, jalan ditutup, perbaikan jalan, banjir/genangan, kendaraan mogok, lainnya) · area · status (Aktif/Semua)
5. **Daftar pembaruan** (terbaru di atas): ikon jenis, judul, lokasi (area + patokan), badge status, sumber (*Redaksi* / *Warga*), waktu relatif + jam, foto (jika ada, dalam lightbox), tautan "Baca selengkapnya" bila terhubung ke artikel
6. Tab **Aktif** (bawaan) dan **Riwayat 7 hari**
7. Tombol **"Lihat di Google Maps (lalu lintas)"** — membuka Maps dengan lapisan lalu lintas (tautan keluar)
8. Kotak ajakan: **Lapor Warga** (tombol → `/lapor`)
9. **Penafian:** "Informasi bersifat sementara dan dapat berubah. Dalam keadaan darurat hubungi 112."

**Status pembaruan:** `Baru` (belum dikonfirmasi) · `Terkonfirmasi` · `Sudah Normal`. Warna dan ikon harus dibedakan **tanpa bergantung pada warna saja**.

**Interaksi:**
- Pembaruan otomatis (polling tiap 60 detik) saat tab aktif; tampilkan toast "Ada {n} pembaruan baru" dengan tombol muat.
- Pembaruan `Sudah Normal` pindah ke Riwayat setelah 2 jam (nilai dapat diatur) dan dikeluarkan dari Riwayat setelah 7 hari.
- Laporan warga hanya tampil setelah dimoderasi dan diberi sumber *Warga*.

**SEO:** skema `ItemList`; setiap pembaruan memiliki halaman detail `/info-jalan/{slug}` (ringan), `noindex` setelah 7 hari.

**KP:**
- [ ] Waktu tampil WIB dan relatif ("12 menit lalu")
- [ ] Status dapat dibedakan oleh pengguna buta warna (ikon + teks)
- [ ] Halaman tetap berguna saat daftar kosong
- [ ] Polling berhenti saat tab tidak aktif

---

### 5.6 Lapor Warga `/lapor`

**Tujuan:** menerima laporan warga yang berguna, dengan hambatan serendah mungkin.

**Susunan halaman:**
1. Judul + penjelasan singkat ("Laporan akan diperiksa redaksi sebelum tayang")
2. Kotak peringatan darurat: "Kondisi darurat? Hubungi 112 lebih dulu."
3. **Formulir** (lihat 7.1 untuk field & validasi)
4. Sisi/bawah: tips laporan yang baik (foto jelas, sebut patokan lokasi, jangan menyertakan data pribadi orang lain), tautan Kebijakan Konten Pengguna

**Interaksi:**
- Tombol **"Gunakan lokasi saya"** (izin geolokasi opsional) mengisi koordinat; pengguna tetap dapat menulis lokasi manual.
- Pratinjau foto sebelum kirim dan tombol hapus.
- Kompres gambar di sisi klien bila memungkinkan; metadata lokasi (EXIF GPS) dihapus di server demi privasi.
- Setelah kirim: halaman `/terima-kasih/lapor` dengan **kode referensi** dan teks "Laporan Anda sedang diperiksa".

**KP:**
- [ ] Formulir dapat dikirim hanya dengan field wajib
- [ ] Kesalahan validasi tampil di samping field dan dapat dibaca pembaca layar
- [ ] Data tidak hilang bila validasi gagal
- [ ] Upload foto melebihi batas ditolak dengan pesan jelas

---

### 5.7 Direktori `/direktori`

**Tujuan:** menemukan tempat/usaha lokal dengan cepat.

**Komponen:**
1. Hero pencarian: kata kunci · kategori · area · tombol Cari
2. **Grid kategori** (ikon + jumlah listing): Kuliner · Kafe & Nongkrong · Wisata · Penginapan · Jasa · Belanja
3. **Filter** (sidebar desktop, offcanvas "Filter" di mobile):
   - Kategori & sub-kategori
   - Area/kecamatan
   - Kisaran harga (Rp / Rp Rp / Rp Rp Rp)
   - Fasilitas (parkir, mushola, toilet, Wi-Fi, ramah keluarga, AC, area merokok/non-rokok, ramah difabel, pesan antar)
   - **Buka sekarang** (dihitung berdasarkan jam buka dan WIB)
   - Terverifikasi saja
4. **Sortir:** Relevan (bawaan) · Terbaru · A–Z · Terdekat (butuh izin lokasi)
5. **Toggle tampilan:** Daftar · Peta
6. **Kartu listing** (lihat 6.3): foto, nama, kategori, area, kisaran harga, status buka/tutup, lencana tier/verifikasi, tombol cepat WhatsApp
7. Pagination 12 per halaman
8. Slot iklan `DIRECTORY-TOP`
9. Ajakan di bawah: "Usaha Anda belum ada? Daftarkan gratis"

**Aturan urutan "Relevan":**
1. Hasil cocok kata kunci/filter terlebih dahulu
2. Urutan tier: Featured → Premium → Plus → Gratis
3. **Di dalam tier yang sama, urutan diacak adil** (seed per sesi, stabil saat halaman berganti) agar tidak ada yang selalu di puncak
4. Listing kedaluwarsa (masa premium habis) otomatis turun ke tier Gratis

**Tampilan peta** (`/direktori/peta` dan toggle): peta dengan penanda per kategori, kluster saat jauh, klik penanda memunculkan kartu mini (nama, kategori, tombol rute, tautan detail). Peta dimuat tunda (saat toggle diklik), dengan fallback daftar bila gagal.

**State:** hasil kosong → "Tidak ada hasil" + saran melonggarkan filter + tautan Daftarkan Usaha.

**URL filter:** `?q=&kategori=&area=&harga=&fasilitas[]=&buka=1&urut=&hal=`. Kombinasi filter diberi `noindex, follow`; halaman kategori murni boleh diindeks.

**KP:**
- [ ] Filter dan sortir bekerja bersamaan dan tetap saat berpindah halaman
- [ ] "Buka sekarang" akurat berdasarkan jam WIB, termasuk jam lewat tengah malam
- [ ] Mode peta tidak memperlambat muat awal halaman
- [ ] Tier mempengaruhi urutan tetapi tidak menampilkan hasil yang tidak relevan di atas hasil yang cocok

---

### 5.8 Direktori per Kategori `/direktori/{kategori-slug}`

- Sama dengan 5.7 dengan kategori terkunci, judul H1 "{Kategori} di Pandaan" (mis. "Kuliner di Pandaan"), teks pengantar 80–150 kata (SEO), sub-kategori sebagai chip, dan "Artikel terkait kategori ini" (3 artikel).
- Skema `ItemList` untuk 12 listing pertama.

---

### 5.9 Detail Listing `/direktori/{kategori-slug}/{listing-slug}`

**Tujuan:** memberi semua informasi untuk memutuskan datang atau menghubungi, dan menjadi halaman yang bagus di hasil pencarian lokal.

**Komponen (urutan):**
1. Breadcrumb
2. **Header:** nama usaha (H1) · lencana (*Terverifikasi*, *Pilihan*) · kategori & sub-kategori · area · kisaran harga · **status Buka/Tutup** (misalnya "Buka · tutup 21.00")
3. **Galeri foto:** gambar utama + gambar kecil, lightbox, jumlah foto sesuai tier
4. **Bar aksi:** **WhatsApp** · **Telepon** · **Rute** (Google Maps) · **Bagikan** · *(C)* **Simpan** (favorit lokal di perangkat). Di mobile, bar ini **menempel di bawah layar**
5. **Deskripsi** (teks singkat; "Selengkapnya" bila panjang)
6. **Informasi:** alamat lengkap + patokan, tabel jam buka per hari (hari ini ditandai), kisaran harga, fasilitas (ikon + teks), tautan Instagram/TikTok/situs
7. **Peta** (lokasi pin; dimuat tunda) + tombol "Buka di Google Maps"
8. **Menu / produk unggulan** (tier Premium ke atas): daftar item + harga + foto
9. **Promo aktif** (tier Premium ke atas): judul, periode, syarat singkat
10. **"Kata Redaksi"** (tier Featured): ulasan editorial singkat
11. **Artikel terkait** (artikel yang menyebut listing ini)
12. **Listing serupa / terdekat** (4 kartu)
13. **Aksi komunitas:** "Data tidak sesuai? **Laporkan**" · "Pemilik usaha ini? **Klaim listing**" (keduanya ke form di 7.6 dan 7.2 dengan data listing terisi otomatis)
14. Slot iklan: tidak ditampilkan pada halaman listing demi kepercayaan dan performa

**Aturan:**
- Tombol WhatsApp muncul hanya bila listing memiliki nomor WhatsApp; tautan `https://wa.me/{nomor}?text={pesan awal}` dengan pesan awal bawaan "Halo, saya melihat {nama} di pandaan.id".
- Nomor telepon/WhatsApp ditampilkan sesuai data listing; tidak memakai nomor pribadi submitter.
- Halaman listing kedaluwarsa/nonaktif memunculkan 410 bila dihapus, atau banner "Informasi mungkin tidak terbaru" bila belum diverifikasi ulang > 12 bulan.
- Foto Premium/Featured diutamakan, tetapi semua tier harus punya minimal 1 foto agar tampil.

**SEO:** skema `LocalBusiness` (atau subtipe seperti `Restaurant`, `LodgingBusiness`, `TouristAttraction`) lengkap dengan `address`, `geo`, `openingHoursSpecification`, `telephone`, `image`, `priceRange`; title: "{Nama} — {Kategori} di {Area} | pandaan.id".

**KP:**
- [ ] Bar aksi tetap terlihat di mobile dan tidak menutupi konten penting
- [ ] Status Buka/Tutup akurat untuk semua hari dan jam khusus (libur/jam istimewa)
- [ ] Fitur Premium/Featured tidak tampil bila usaha bertier Gratis
- [ ] Skema valid pada uji Rich Results

---

### 5.10 Daftarkan Usaha `/daftarkan-usaha`

**Susunan:**
1. Judul "Daftarkan Usaha Anda — Gratis" dan manfaat singkat (ditemukan di Google, tombol WhatsApp, peta)
2. Langkah proses (3 langkah): Isi formulir → Kami verifikasi → Tayang
3. **Formulir bertahap** (stepper, lihat 7.2): Data usaha → Lokasi & jam buka → Foto → Kontak pengusul & persetujuan
4. Tabel perbandingan tier (Gratis/Plus/Premium/Featured) dengan tombol "Hubungi kami untuk upgrade" (menuju `/kerja-sama/pesan?paket=listing`)
5. FAQ singkat (berapa lama verifikasi, siapa yang boleh mendaftar, cara mengubah data)

**Interaksi:** simpan sementara di perangkat (draf lokal) agar tidak hilang saat berpindah halaman; pratinjau tampilan listing sebelum kirim *(C)*.

**KP:**
- [ ] Setiap langkah divalidasi sebelum lanjut
- [ ] Draf lokal dipulihkan saat halaman dimuat ulang
- [ ] Setelah kirim, pengguna mendapat kode referensi dan perkiraan waktu verifikasi

---

### 5.11 Event `/event`

**Tujuan:** menemukan acara berdasarkan waktu dengan cepat.

**Komponen:**
1. Judul + toggle **Daftar | Kalender**
2. **Filter cepat (chip):** Hari ini · Akhir pekan · Minggu ini · Bulan ini · Pilih tanggal
3. **Filter lanjutan:** kategori event (konser, karnaval/parade, pasar/bazar, olahraga, budaya, keagamaan, komunitas, pendidikan) · harga (Gratis/Berbayar) · area
4. **Tampilan Daftar:** dikelompokkan per tanggal, kartu event (poster, judul, waktu, lokasi, harga, penyelenggara)
5. **Tampilan Kalender:** kalender bulanan dengan penanda jumlah event per hari; klik hari → daftar event hari itu di bawah/samping; navigasi bulan sebelumnya/berikutnya
6. Tautan **"Kirim Event"** dan **"Langganan kalender (iCal)"** *(C)*
7. Slot iklan `EVENT-TOP`

**Aturan:**
- Default menampilkan event yang belum lewat. Tab/filter "Sudah berlalu" menampilkan arsip.
- Event multi-hari muncul pada setiap hari yang dicakup.
- Event yang dibatalkan tampil dengan label "Dibatalkan" (tidak dihapus bila sudah dipublikasi), dan yang ditunda berlabel "Ditunda".

**KP:**
- [ ] Zona waktu WIB konsisten di daftar dan kalender
- [ ] Kalender dapat dipakai dengan keyboard dan layar sentuh
- [ ] Event multi-hari dan dibatalkan tampil benar

---

### 5.12 Detail Event `/event/{slug}`

**Komponen:**
1. Breadcrumb · poster/gambar utama · badge kategori · status (Akan datang / Sedang berlangsung / Selesai / Dibatalkan / Ditunda)
2. **Judul (H1)** · penyelenggara
3. **Kotak info utama:** tanggal & jam (WIB), lokasi (tautan ke peta/listing bila terkait), harga/tiket, kontak panitia
4. **Aksi:** **Tambah ke Google Calendar** · **Unduh .ics** · **Bagikan** · **Rute** · tombol **Tiket/Daftar** (tautan keluar bila ada; berlabel "Situs penyelenggara")
5. Deskripsi lengkap + jadwal acara (linimasa) + syarat/ketentuan
6. Peta lokasi
7. Galeri/poster tambahan
8. Terkait: artikel tentang event, listing sekitar (kuliner/penginapan terdekat), event serupa
9. Ajakan: "Punya acara? Kirim event"

**SEO:** skema `Event` (name, startDate, endDate, eventStatus, eventAttendanceMode, location, image, offers, organizer). Event selesai tetap diindeks dengan status yang tepat.

**KP:**
- [ ] File .ics valid dan terbuka di Google/Apple/Outlook Calendar
- [ ] Status event mengikuti waktu dan data admin
- [ ] Tautan tiket keluar memakai `rel="noopener"` dan ditandai tautan eksternal

---

### 5.13 Kirim Event `/kirim-event`
Halaman penjelasan singkat + formulir (7.3). Setelah kirim: `/terima-kasih/event` dengan kode referensi. Menyebut syarat event (acara terbuka untuk umum di Pasuruan Raya, informasi lengkap, tidak mengandung SARA/ujaran kebencian).

---

### 5.14 Kerja Sama (Landing) `/kerja-sama`

**Tujuan:** meyakinkan calon pengiklan dan mengarahkan ke permintaan penawaran.

**Komponen:**
1. **Hero:** pernyataan nilai ("Jangkau warga Pandaan Raya lewat media yang mereka baca setiap hari") + tombol "Lihat Paket" dan "Minta Penawaran"
2. **Angka jangkauan:** pengikut Instagram/TikTok/Facebook, rata-rata jangkauan bulanan, pengunjung web bulanan, komposisi audiens (area, rentang usia, jam aktif). Nilai diinput admin; tampilkan tanggal pembaruan data
3. **Layanan:** kartu — Banner, Advertorial, Listing Premium, Liputan Event, Pembuatan Konten, Paket Gabungan
4. **Cara kerja:** 4 langkah (Konsultasi → Penawaran → Produksi/Tayang → Laporan)
5. **Paket ringkas** (3 paket unggulan) → tautan ke `/kerja-sama/paket`
6. **Portofolio unggulan** (carousel 3–6)
7. **Klien/mitra:** logo (hanya yang sudah memberi izin)
8. **FAQ:** durasi tayang, laporan hasil, penjadwalan, label advertorial, ketentuan konten
9. **Band CTA akhir:** tombol WhatsApp + tombol form

**KP:**
- [ ] Angka jangkauan menampilkan tanggal pembaruan dan sumbernya
- [ ] Logo klien hanya tampil bila ada izin (data `consent=true`)

---

### 5.15 Paket & Rate Card `/kerja-sama/paket`

**Komponen:**
1. Tab produk: Banner · Advertorial · Listing Premium · Liputan Event · Konten · Gabungan
2. **Kartu/tabel paket:** nama, isi, durasi, hasil yang didapat, harga (format "mulai dari Rp X" atau "Hubungi kami", sesuai pengaturan), tombol "Pilih paket" → `/kerja-sama/pesan?paket={kode}`
3. **Spesifikasi iklan** (ukuran banner per slot, format berkas, tenggat materi, ketentuan konten)
4. **Unduh Media Kit** (PDF)
5. Catatan transparansi: konten berbayar selalu berlabel

**KP:**
- [ ] Parameter `?paket=` mengisi otomatis formulir penawaran
- [ ] Harga mengikuti pengaturan tampil/sembunyi

---

### 5.16 Portofolio `/kerja-sama/portofolio` & Detail
- Grid studi kasus: gambar, nama mitra, jenis kerja sama, hasil singkat.
- Detail: tantangan, solusi, hasil (angka bila ada izin), contoh materi (gambar/embed), kutipan testimoni **nyata** (dengan izin), tombol "Minta penawaran serupa".

---

### 5.17 Permintaan Penawaran `/kerja-sama/pesan`
Formulir (7.4). Parameter URL `paket` dan `ref` mengisi bagian terkait. Setelah kirim: `/terima-kasih/kerja-sama` dengan kode referensi, ringkasan permintaan, dan tombol "Lanjut via WhatsApp" (pesan awal terisi).

---

### 5.18 Tentang `/tentang`
Cerita singkat pandaan.id, misi, cara redaksi bekerja (verifikasi, koreksi, label konten), tim/kontributor (nama + peran, foto opsional), kanal sosial, angka dampak (opsional), tautan kerja sama dan kontak.

### 5.19 Kontak `/kontak`
Dua kolom: **informasi** (email, WhatsApp, Instagram, alamat/kota, jam respons) dan **formulir** (7.5). Parameter `?subjek=` dan `?ref=` mengisi otomatis (untuk koreksi/hak jawab). Peta area kerja (opsional).

---

### 5.20 Pencarian `/cari?q=`

**Komponen:**
1. **Overlay pencarian** (dari ikon header): input fokus otomatis, **saran instan** (debounce 300 ms, minimal 2 karakter, maks 5 hasil per jenis: Berita, Listing, Event), riwayat pencarian terakhir (lokal), pintasan populer
2. **Halaman hasil:** tab Semua · Berita · Direktori · Event; jumlah hasil; kata kunci disorot
3. Hasil kosong: pesan, saran ejaan/sinonim sederhana, tautan jelajah (kategori populer)

**Aturan:** pencarian mencakup judul, isi, tag, nama usaha, kategori, area; pengurutan berdasarkan relevansi lalu tanggal. Halaman hasil `noindex, follow`.

**KP:**
- [ ] Saran muncul < 500 ms pada koneksi normal
- [ ] Input dibersihkan dari karakter berbahaya; tidak ada XSS lewat query
- [ ] Keyboard: panah naik/turun memilih saran, Enter menuju hasil, Esc menutup

---

### 5.21 Halaman Legal & Redaksi

| Halaman | Isi minimum |
|---|---|
| **Kebijakan Privasi** | Data yang dikumpulkan (formulir, analitik), tujuan, retensi, hak pengguna (akses, koreksi, hapus), kontak pengendali data, cookie |
| **Syarat & Ketentuan** | Penggunaan situs, hak cipta, tanggung jawab, tautan keluar, batasan layanan |
| **Pedoman Redaksi** | Standar verifikasi, jenis & label konten, kebijakan koreksi, **hak jawab**, perlakuan data korban/anak, etika foto |
| **Kebijakan Konten Pengguna** | Apa yang boleh/tidak dikirim (lapor, usaha, event), moderasi, hak menolak/menghapus, tanggung jawab pengirim |
| **Peta Situs (HTML)** | Daftar tautan halaman utama dan kategori |

*Catatan: teks hukum perlu ditinjau oleh pihak yang berwenang sebelum peluncuran.*

### 5.22 Halaman Error & Khusus

| Halaman | Perilaku |
|---|---|
| **404** | Pesan ramah, kotak cari, tautan ke Berita/Direktori/Event, 5 artikel populer. Kode status 404 sungguhan |
| **410** | Untuk konten yang sengaja dihapus (mis. listing dihapus) |
| **500** | Pesan singkat, tombol coba lagi, tanpa detail teknis |
| **503/Pemeliharaan** | Pesan pemeliharaan + perkiraan waktu |
| **Offline (PWA)** | Pesan "Anda sedang offline" + daftar artikel/halaman yang tersimpan |
| **Terima kasih** | Satu template untuk lapor, usaha, event, kerja sama, kontak; berisi kode referensi, langkah berikutnya, tombol kembali |

### 5.23 Langganan Newsletter & WhatsApp Channel *(C)*
Kotak email di beranda dan footer; persetujuan eksplisit; konfirmasi email (double opt-in); tautan berhenti langganan pada setiap email. Tombol "Gabung WhatsApp Channel" (tautan keluar).

---

## 6. Komponen Global & Reusable

### 6.1 Kartu Berita
Gambar 16:9 · badge kategori · label konten (Kerja Sama/Dari Warga/Update Berjalan/Terverifikasi) · judul (maks 2 baris) · ringkasan (maks 2 baris, hanya ≥ md) · penulis + waktu relatif. Varian: besar (utama), standar, kompak (tanpa gambar), horizontal (terkait).

### 6.2 Kartu Event
Chip tanggal (hari + bulan) · poster · judul · jam + lokasi · harga/Gratis · badge status (Dibatalkan/Ditunda/Sedang berlangsung).

### 6.3 Kartu Listing
Foto 4:3 · lencana tier/verifikasi · nama · kategori · area · kisaran harga · status Buka/Tutup · tombol cepat WhatsApp (bila ada) · tautan ke detail. Kartu Featured memiliki bingkai/label "Pilihan" yang jelas tetapi tidak mengganggu.

### 6.4 Kartu Info Jalan
Ikon jenis · judul · lokasi · badge status (ikon + teks + warna) · sumber (Redaksi/Warga) · waktu relatif + jam · foto kecil.

### 6.5 Bar Bagikan
WhatsApp, Facebook, X, Telegram, Salin tautan. Menggunakan Web Share API pada perangkat yang mendukung. Tautan berisi parameter UTM bawaan (`utm_source={kanal}&utm_medium=share`).

### 6.6 Slot Iklan

| Kode | Lokasi | Ukuran (desktop / mobile) |
|---|---|---|
| `HOME-TOP` | Di bawah header, Beranda | 728×90 / 320×100 |
| `HOME-MID` | Tengah Beranda | 970×250 atau 728×90 / 300×250 |
| `ARTICLE-TOP` | Di atas isi artikel | 728×90 / 320×100 |
| `ARTICLE-INLINE` | Dalam isi artikel (setelah paragraf ke-4) | 300×250 / 300×250 |
| `SIDEBAR-1` | Sidebar desktop (berita) | 300×250 |
| `DIRECTORY-TOP` | Atas daftar direktori | 728×90 / 320×100 |
| `EVENT-TOP` | Atas daftar event | 728×90 / 320×100 |

**Aturan:** berlabel "Iklan" atau "Kerja Sama"; tinggi dicadangkan agar tidak menggeser tata letak; dimuat tunda; maksimum 2 slot terlihat per layar; tautan melewati `/go/{kode}` untuk mencatat klik, dengan `rel="sponsored noopener"`; slot kosong disembunyikan penuh; **tidak ada iklan pada halaman form, legal, dan detail listing**.

### 6.7 Elemen Umum

| Komponen | Aturan |
|---|---|
| **Pagination** | Nomor halaman + Sebelumnya/Berikutnya, maks 7 nomor terlihat, berlabel ARIA |
| **Filter chip** | Dapat digeser horizontal di mobile; status terpilih jelas |
| **Toast/notifikasi** | Muncul 5 detik, dapat ditutup, `aria-live="polite"` |
| **Skeleton loader** | Untuk daftar dan tab yang memuat data dinamis |
| **Lightbox galeri** | Geser, zoom, tutup dengan Esc, fokus terkunci di dalam |
| **Tombol kembali ke atas** | Muncul setelah menggulir 800 px |
| **Banner persetujuan cookie** | Ringkas, tautan ke Kebijakan Privasi, pilihan Terima/Tolak analitik; preferensi disimpan |
| **Banner pembaruan PWA** | "Versi baru tersedia" dengan tombol Muat ulang |
| **Tombol WhatsApp** | Warna hijau khas, ikon + teks, tautan `wa.me` |
| **Label konten** | Terverifikasi (centang), Dari Warga (ikon orang), Update Berjalan (ikon jam), Kerja Sama (ikon label) |
| **Status buka/tutup** | Dihitung di server berdasarkan WIB, dengan penyegaran saat halaman dimuat |

---

## 7. Formulir & Validasi

**Aturan umum semua formulir:**
- Validasi di sisi klien (kemudahan) dan **wajib di sisi server** (keamanan)
- Pesan galat berbahasa Indonesia, spesifik, berada di dekat field, dan diumumkan ke pembaca layar
- Perlindungan spam: **honeypot** + **pembatasan laju** (mis. maks 5 kiriman/IP/jam untuk tiap formulir) + captcha ramah privasi (mis. Turnstile atau hCaptcha; lihat pertanyaan terbuka)
- Token CSRF, sanitasi seluruh input, tombol kirim dinonaktifkan saat memproses (cegah kirim ganda)
- Setiap kiriman menghasilkan **kode referensi** (mis. `LPR-20261014-A7K2`)
- Nomor telepon dinormalisasi ke format internasional Indonesia (`+62…`); nomor/email pengirim **tidak pernah ditampilkan publik**
- Unggahan gambar: JPG/PNG/WebP, maks 5 MB per berkas, divalidasi MIME dan isi berkas, EXIF GPS dihapus, nama berkas diganti acak
- Persetujuan eksplisit (checkbox tidak terisi bawaan) untuk pemrosesan data

### 7.1 Lapor Warga

| Field | Tipe | Wajib | Aturan |
|---|---|:--:|---|
| Jenis laporan | Pilihan | Ya | Macet / Kecelakaan / Jalan ditutup / Perbaikan jalan / Banjir-genangan / Kendaraan mogok / Kehilangan-penemuan / Lainnya |
| Lokasi (teks) | Teks | Ya | 5–150 karakter; sebut jalan/patokan |
| Area | Pilihan | Ya | Daftar area/kecamatan |
| Koordinat | Tersembunyi | Tidak | Dari "Gunakan lokasi saya" |
| Waktu kejadian | Tanggal-jam | Ya | Bawaan: sekarang; tidak boleh di masa depan; maksimal 24 jam ke belakang |
| Keterangan | Teks panjang | Ya | 20–500 karakter |
| Foto | Berkas | Tidak | Maks 3 foto |
| Nama | Teks | Tidak | Maks 60 karakter; ditampilkan hanya bila dicentang "Tampilkan nama saya" |
| WhatsApp | Telepon | Tidak | Untuk konfirmasi redaksi; tidak tampil publik |
| Persetujuan | Checkbox | Ya | Menyetujui Kebijakan Konten Pengguna |

### 7.2 Daftarkan Usaha (bertahap)

**Langkah 1 — Data usaha**

| Field | Tipe | Wajib | Aturan |
|---|---|:--:|---|
| Nama usaha | Teks | Ya | 3–80 karakter |
| Kategori | Pilihan | Ya | Kategori utama + sub-kategori |
| Deskripsi singkat | Teks panjang | Ya | 50–500 karakter |
| Kisaran harga | Pilihan | Tidak | Rp / Rp Rp / Rp Rp Rp |
| Fasilitas | Centang ganda | Tidak | Daftar baku |

**Langkah 2 — Lokasi & jam buka**

| Field | Tipe | Wajib | Aturan |
|---|---|:--:|---|
| Alamat lengkap | Teks | Ya | 10–200 karakter |
| Area/kecamatan | Pilihan | Ya | – |
| Tautan Google Maps / koordinat | Teks | Tidak | Validasi URL; pin di peta *(C)* |
| Jam buka | Tabel hari | Ya | Per hari: Buka/Tutup + jam; dukung dua sesi dan 24 jam |

**Langkah 3 — Foto & tautan**

| Field | Tipe | Wajib | Aturan |
|---|---|:--:|---|
| Foto | Berkas | Ya (min 1) | Maks 5 foto |
| WhatsApp usaha | Telepon | Tidak | Untuk tombol di halaman listing |
| Telepon usaha | Telepon | Tidak | – |
| Instagram / TikTok / Situs | URL/handle | Tidak | Validasi format |

**Langkah 4 — Pengusul**

| Field | Tipe | Wajib | Aturan |
|---|---|:--:|---|
| Nama pengusul | Teks | Ya | – |
| Hubungan dengan usaha | Pilihan | Ya | Pemilik / Pengelola / Karyawan / Pihak lain |
| WhatsApp/email pengusul | Telepon/Email | Ya | Untuk verifikasi; tidak tampil publik |
| Persetujuan | Checkbox | Ya | Data benar + setuju kebijakan |

### 7.3 Kirim Event

| Field | Tipe | Wajib | Aturan |
|---|---|:--:|---|
| Judul event | Teks | Ya | 5–100 karakter |
| Kategori | Pilihan | Ya | – |
| Tanggal & jam mulai | Tanggal-jam | Ya | Tidak boleh di masa lalu |
| Tanggal & jam selesai | Tanggal-jam | Tidak | ≥ waktu mulai |
| Lokasi | Teks | Ya | + area |
| Deskripsi | Teks panjang | Ya | 50–1.500 karakter |
| Harga | Pilihan + teks | Ya | Gratis / Berbayar + keterangan |
| Poster | Berkas | Ya | 1 gambar, disarankan rasio 4:5 atau 1:1 |
| Tautan tiket/pendaftaran | URL | Tidak | – |
| Penyelenggara & kontak | Teks + telepon | Ya | Kontak tidak tampil publik kecuali dicentang |
| Persetujuan | Checkbox | Ya | – |

### 7.4 Permintaan Penawaran

| Field | Tipe | Wajib | Aturan |
|---|---|:--:|---|
| Nama | Teks | Ya | – |
| Nama bisnis/organisasi | Teks | Ya | – |
| Jabatan | Teks | Tidak | – |
| WhatsApp | Telepon | Ya | – |
| Email | Email | Tidak | Validasi format |
| Paket diminati | Pilihan ganda | Ya | Terisi dari `?paket=` |
| Tujuan kampanye | Pilihan | Ya | Pengenalan merek / Promo / Event / Pembukaan usaha / Lainnya |
| Periode diinginkan | Rentang tanggal | Tidak | – |
| Perkiraan anggaran | Pilihan rentang | Tidak | Bisa "Belum tahu" |
| Keterangan tambahan | Teks panjang | Tidak | Maks 1.000 karakter |
| Persetujuan | Checkbox | Ya | – |

### 7.5 Kontak

| Field | Tipe | Wajib | Aturan |
|---|---|:--:|---|
| Nama | Teks | Ya | – |
| Email atau WhatsApp | Teks | Ya | Minimal salah satu valid |
| Subjek | Pilihan | Ya | Pertanyaan umum / Koreksi berita / Hak jawab / Laporan konten bermasalah / Kerja sama / Lainnya |
| Referensi tautan | URL | Tidak | Terisi dari `?ref=` |
| Pesan | Teks panjang | Ya | 20–1.500 karakter |

### 7.6 Laporkan Data Listing / Klaim Listing

| Field | Tipe | Wajib | Aturan |
|---|---|:--:|---|
| Listing | Tersembunyi | Ya | Terisi otomatis |
| Jenis | Pilihan | Ya | Info salah / Tutup permanen / Pindah lokasi / Klaim sebagai pemilik |
| Keterangan | Teks panjang | Ya | 20–500 karakter |
| Bukti | Berkas | Tidak | Untuk klaim; maks 2 berkas |
| Kontak | Telepon/Email | Ya | Tidak tampil publik |

### 7.7 Newsletter *(C)*
Email (wajib), persetujuan (wajib), double opt-in lewat email konfirmasi.

---

## 8. Model Data Publik

> Data berikut **dikelola lewat admin** (PRD terpisah). Situs publik hanya membaca status yang berlaku. Waktu disimpan UTC atau WIB secara konsisten dan **ditampilkan WIB**.

### 8.1 Entitas Konten

**Artikel (`articles`)**

| Field | Catatan |
|---|---|
| id, slug, judul, lead/subjudul | Slug unik |
| isi | HTML aman (disanitasi), mendukung embed terdaftar |
| gambar_utama, keterangan_gambar, kredit_foto | Wajib untuk tayang |
| kategori_id, tag (banyak) | – |
| label | `terverifikasi` / `dari_warga` / `update_berjalan` / `kerja_sama` / null |
| penulis_id | – |
| status | `draft` / `terjadwal` / `tayang` / `arsip` |
| tanggal_tayang, diperbarui_pada | Tampil hanya bila ≤ sekarang |
| featured (bool), pillar (bool), series | Untuk sorotan, panduan, serial |
| pembaruan (daftar) | Waktu + teks (untuk *Update Berjalan*) |
| meta_title, meta_description, og_image | Opsional (override otomatis) |

**Kategori Artikel:** nama, slug, deskripsi, urutan. Bawaan: Berita, Kuliner, Wisata, Event, Sejarah, Nostalgia, Lalu Lintas.
**Tag:** nama, slug. **Penulis:** nama, slug, bio, foto.

**Info Jalan (`road_updates`)**

| Field | Catatan |
|---|---|
| id, slug, judul, keterangan | – |
| jenis | Enum jenis (lihat 5.5) |
| status | `baru` / `terkonfirmasi` / `sudah_normal` |
| lokasi_teks, area_id, lat, lng | Koordinat opsional |
| sumber | `redaksi` / `warga` |
| foto (maks 3) | – |
| artikel_id | Tautan opsional |
| waktu_kejadian, diperbarui_pada, selesai_pada | – |
| tampil (bool) | Setelah moderasi |

**Listing (`listings`)**

| Field | Catatan |
|---|---|
| id, slug, nama, kategori_id, subkategori_id, area_id | – |
| deskripsi | Teks terbatas |
| alamat, lat, lng, patokan | – |
| kisaran_harga | 1–3 |
| jam_buka | Struktur per hari: sesi (buka-tutup), 24 jam, libur; **jam khusus** (tanggal tertentu) |
| kontak | whatsapp, telepon, instagram, tiktok, situs |
| fasilitas | Relasi banyak |
| foto | Urutan, keterangan, batas sesuai tier |
| tier | `gratis` / `plus` / `premium` / `featured` |
| tier_berakhir_pada | Setelah lewat → perlakukan sebagai `gratis` |
| terverifikasi (bool), diverifikasi_pada | – |
| menu_item (premium) | Nama, harga, foto, deskripsi |
| promo (premium) | Judul, periode, syarat |
| kata_redaksi (featured) | Teks |
| status | `draft` / `tayang` / `nonaktif` / `dihapus` |

**Kategori Listing & Sub-kategori:** nama, slug, ikon, deskripsi SEO, urutan. Contoh sub: Kuliner → Bakso, Soto, Warung Nasi, Seafood, Jajanan, Oleh-oleh; Penginapan → Hotel, Penginapan murah, Villa; Jasa → Bengkel, Salon, Laundry, Fotografi, dll.
**Area:** nama, slug, jenis (kecamatan/desa/kota), urutan. Contoh awal: Pandaan, Gempol, Beji, Prigen, Bangil, Sukorejo, Purwosari, Kota Pasuruan *(daftar final ditetapkan bersama admin)*.
**Fasilitas:** nama, ikon.

**Event (`events`)**

| Field | Catatan |
|---|---|
| id, slug, judul, deskripsi, poster, galeri | – |
| kategori_event_id | – |
| mulai_pada, selesai_pada, seharian (bool) | – |
| lokasi_teks, area_id, listing_id (opsional), lat, lng | – |
| harga_tipe, harga_keterangan, tautan_tiket | – |
| penyelenggara, kontak_publik (opsional) | – |
| status | `tayang` / `dibatalkan` / `ditunda` / `arsip` |
| jadwal_acara | Daftar waktu + kegiatan (opsional) |

**Portofolio (`portfolio_items`):** slug, judul, mitra (nama, logo, `consent`), jenis_kerja_sama, ringkasan, tantangan, solusi, hasil, media, testimoni (teks, nama, `consent`), tayang.
**Paket Kerja Sama (`ad_packages`):** kode, nama, produk, isi (daftar), durasi, harga, tampil_harga (bool), urutan, aktif.
**Slot Iklan & Kampanye (`ad_slots`, `ad_campaigns`):** slot_kode, materi (gambar/html aman), url_tujuan, periode, aktif, hitungan tayang/klik.
**Halaman Statis (`pages`):** slug, judul, isi, meta.
**Pengaturan Situs (`settings`):** nama situs, deskripsi, tautan sosial, kontak, angka jangkauan (+ tanggal pembaruan), tampil harga paket, ambang waktu Info Jalan, kode analitik, dll.

### 8.2 Entitas Kiriman Publik (ditulis oleh situs publik, dimoderasi di admin)

| Entitas | Status | Data utama |
|---|---|---|
| `report_submissions` | `pending` / `approved` / `rejected` / `merged` | Isi formulir 7.1, IP-hash, waktu, kode referensi |
| `listing_submissions` | idem | Isi 7.2 |
| `event_submissions` | idem | Isi 7.3 |
| `partner_requests` | `baru` / `dihubungi` / `penawaran` / `deal` / `batal` | Isi 7.4 |
| `contact_messages` | `baru` / `dibaca` / `ditangani` | Isi 7.5 |
| `listing_reports` | `baru` / `ditangani` | Isi 7.6 |
| `newsletter_subscribers` | `pending` / `aktif` / `berhenti` | Email, waktu persetujuan |
| `page_views`, `click_events` | – | Statistik ringan (listing dan iklan) tanpa data pribadi |

**Aturan retensi (usulan):** kiriman ditolak dihapus dalam 90 hari; IP disimpan sebagai hash; data kontak pengirim dihapus saat diminta atau setelah masa penanganan.

---

## 9. SEO

### 9.1 Template Meta

| Halaman | `<title>` | Deskripsi |
|---|---|---|
| Beranda | pandaan.id — Berita, Info Jalan, Kuliner & Event Pandaan Raya | Ringkasan nilai situs |
| Detail berita | {Judul} — pandaan.id | Lead / 150 karakter pertama |
| Kategori berita | Berita {Kategori} Pandaan — pandaan.id | Deskripsi kategori |
| Info Jalan | Info Jalan & Lalu Lintas Pandaan Hari Ini — pandaan.id | Ringkasan status terkini |
| Direktori | Direktori Usaha & Tempat di Pandaan — pandaan.id | – |
| Kategori direktori | {Kategori} di Pandaan: Daftar & Peta — pandaan.id | Teks pengantar kategori |
| Detail listing | {Nama} — {Kategori} di {Area} \| pandaan.id | Deskripsi + jam buka |
| Event | Event & Agenda Pandaan Raya — pandaan.id | – |
| Detail event | {Judul} — {Tanggal} di {Lokasi} \| pandaan.id | Ringkasan event |
| Kerja Sama | Pasang Iklan & Kerja Sama Media — pandaan.id | – |

### 9.2 Teknis

- **Render sisi server** (HTML lengkap tanpa bergantung JavaScript untuk konten utama)
- URL bersih, kanonikal pada semua halaman, `hreflang` tidak diperlukan (satu bahasa)
- `sitemap.xml` terpisah per jenis (berita, listing, event, halaman) + sitemap berita untuk artikel 48 jam terakhir; `robots.txt` mengizinkan situs, memblokir `/cari`, `/go/`, `/terima-kasih/`, `/kerja-sama/pesan`
- **Skema data terstruktur:** `WebSite`+`SearchAction`, `Organization`, `NewsArticle`, `LocalBusiness` (subtipe), `Event`, `BreadcrumbList`, `ItemList`, `FAQPage` (halaman FAQ)
- Open Graph + Twitter Card di seluruh halaman; gambar 1200×630 otomatis dari gambar utama bila tidak ada
- Gambar: `alt` wajib (artikel/listing), nama berkas deskriptif, WebP dengan `srcset`
- Pengalihan 301 otomatis saat slug berubah; 410 untuk konten yang dihapus permanen
- Tautan internal: artikel ↔ listing ↔ event; modul "terkait" tidak boleh kosong bila ada kandidat
- **Penanganan halaman filter:** kombinasi filter `noindex, follow`; kanonikal ke halaman induk
- Halaman paginasi: kanonikal ke dirinya sendiri; judul memuat nomor halaman

---

## 10. Analitik & Pelacakan

**Alat:** Google Analytics 4 + Google Search Console (dasar). Pelacakan analitik aktif **setelah persetujuan cookie** (sesuai pilihan pengguna).

| Peristiwa | Parameter |
|---|---|
| `page_view` | Otomatis |
| `search` | `q`, jumlah hasil, tab |
| `click_whatsapp` | `listing_id`/`event_id`, posisi (kartu/detail/bar) |
| `click_phone` | `listing_id` |
| `click_directions` | `listing_id`/`event_id` |
| `click_ticket` | `event_id` |
| `add_to_calendar` | `event_id`, jenis (Google/ics) |
| `share` | kanal, `content_type`, `content_id` |
| `form_start` / `form_submit` / `form_error` | jenis formulir |
| `filter_apply` | modul, filter terpakai |
| `view_map` | modul |
| `click_ad` | `slot_kode`, `campaign_id` |
| `newsletter_subscribe` | sumber |

**Statistik ringan internal (tanpa data pribadi):** jumlah dilihat dan klik per listing dan per iklan, untuk laporan ke pemilik usaha/pengiklan.
**Parameter UTM:** diberlakukan pada semua tautan keluar sosial dan bar bagikan agar sumber trafik terbaca.

---

## 11. Kebutuhan Non-Fungsional

### 11.1 Kinerja

| Metrik | Target (mobile, 4G) |
|---|---|
| LCP | ≤ 2,5 s |
| INP | ≤ 200 ms |
| CLS | < 0,1 |
| Total bobot muat awal Beranda | ≤ 1,5 MB (gambar di bawah lipatan dimuat tunda) |
| TTFB (halaman ter-cache) | ≤ 600 ms |

Taktik: gambar WebP + `srcset` + `loading="lazy"`, ukuran gambar dicadangkan (`width`/`height`), font ≤ 2 keluarga dengan `font-display: swap`, CSS/JS dikompres dan di-minify, skrip pihak ketiga ditunda, cache halaman untuk tamu, CDN untuk aset.

### 11.2 Responsif

| Breakpoint | Lebar | Perilaku utama |
|---|---|---|
| xs | < 576 px | 1 kolom, bottom nav, filter offcanvas |
| sm | ≥ 576 px | 1–2 kolom |
| md | ≥ 768 px | 2–3 kolom, tab/chip tidak menggulir |
| lg | ≥ 992 px | Sidebar, menu header penuh |
| xl | ≥ 1200 px | Kontainer maks. 1140–1320 px |

### 11.3 Aksesibilitas (target WCAG 2.1 AA)
- Kontras teks ≥ 4,5:1 (teks besar ≥ 3:1)
- Seluruh fungsi dapat dioperasikan keyboard; fokus terlihat jelas; urutan fokus logis
- Landmark semantik (`header`, `nav`, `main`, `footer`), heading berurutan, tautan "Lewati ke konten"
- `alt` untuk gambar bermakna; ikon dekoratif disembunyikan dari pembaca layar
- Status tidak mengandalkan warna saja (Info Jalan, Buka/Tutup, status event)
- Formulir: label terhubung, galat diumumkan (`aria-live`), petunjuk format
- Target sentuh ≥ 44×44 px; menghormati `prefers-reduced-motion`
- Teks dapat diperbesar 200% tanpa kehilangan fungsi

### 11.4 Keamanan & Privasi
- HTTPS wajib, HSTS, header keamanan (CSP, X-Content-Type-Options, Referrer-Policy, Frame-Options)
- Proteksi CSRF, XSS (sanitasi isi dan keluaran), SQL injection (query berparameter), rate limiting pada formulir dan pencarian
- Unggahan: validasi tipe/ukuran/isi, disimpan di luar akar publik atau dengan nama acak, penghapusan EXIF
- Data pribadi minimum; kontak pengirim tidak pernah tampil publik; pembatasan akses internal
- Cookie: hanya yang perlu; analitik setelah persetujuan; kebijakan privasi mudah dijangkau
- Embed pihak ketiga dimuat setelah interaksi pengguna
- Pencadangan harian dan rencana pemulihan (ditentukan pada PRD teknis/infrastruktur)

### 11.5 Kompatibilitas
- Dua versi utama terbaru Chrome, Safari (termasuk iOS), Firefox, Edge, Samsung Internet
- Android 8+ dan iOS 14+
- Fungsi inti tetap bekerja tanpa JavaScript (baca konten, navigasi, kirim formulir dasar); fitur interaktif (peta, kalender dinamis, saran cari) meningkat bertahap

### 11.6 PWA (dasar)
- `manifest.webmanifest` (nama, ikon, warna tema, `display: standalone`)
- Service worker: cache aset statis, halaman `/offline`, cache halaman yang baru dibaca
- Prompt "Pasang ke layar utama" tidak mengganggu (muncul setelah ≥ 2 kunjungan, dapat ditutup)

### 11.7 Ketersediaan & Operasional
- Target uptime 99%+; pemantauan uptime; halaman pemeliharaan 503 terencana
- Log galat dan peringatan untuk lonjakan galat

---

## 12. Panduan Desain UI

> Sesuaikan dengan identitas visual @pandaan.id. Berikut token awal agar pengembangan dapat berjalan.

### 12.1 Token Desain (contoh)

| Token | Nilai awal | Penggunaan |
|---|---|---|
| `--brand-primary` | (ikuti logo) | Tombol utama, tautan, aksen |
| `--brand-secondary` | (ikuti logo) | Aksen kedua |
| `--text` / `--text-muted` | #1F2933 / #5F6B76 | Teks isi / sekunder |
| `--bg` / `--bg-alt` | #FFFFFF / #F6F7F9 | Latar halaman / section selang-seling |
| `--success` / `--warning` / `--danger` / `--info` | hijau / kuning / merah / biru | Status (selalu disertai ikon+teks) |
| `--whatsapp` | #25D366 | Tombol WhatsApp |
| Radius | 8 px (kartu 12 px) | – |
| Bayangan | Ringan | Kartu, dropdown |

### 12.2 Tipografi
Judul: huruf sans-serif tegas; isi: sans-serif mudah dibaca. Ukuran isi artikel ≥ 16 px (mobile) / 18 px (desktop), tinggi baris 1,6–1,7, lebar teks isi maks ±70 karakter.

| Elemen | Mobile | Desktop |
|---|---|---|
| H1 | 28 px | 40 px |
| H2 | 22 px | 30 px |
| H3 | 18 px | 24 px |
| Isi | 16 px | 17–18 px |
| Keterangan | 13 px | 14 px |

### 12.3 Gambar & Media

| Penggunaan | Rasio | Ukuran sumber minimum |
|---|---|---|
| Gambar utama artikel | 16:9 | 1280×720 |
| Kartu listing | 4:3 | 800×600 |
| Poster event | 4:5 atau 1:1 | 1080×1350 / 1080×1080 |
| Gambar OG | 1.91:1 | 1200×630 |
| Avatar penulis | 1:1 | 256×256 |
| Logo mitra | bebas, latar transparan | SVG/PNG ≥ 400 px |

### 12.4 Pola Interaksi
- Tombol utama = satu per tampilan (mis. "Daftarkan Usaha" di header; "WhatsApp" pada listing)
- Tampilan kosong selalu menyertakan ajakan tindakan (bukan layar hampa)
- Animasi minimal (150–250 ms), menghormati `prefers-reduced-motion`
- Micro-copy ramah dan jelas, contoh: *"Belum ada gangguan yang dilaporkan. Terakhir diperiksa 5 menit lalu."*

### 12.5 Wireframe Teks (referensi)

**Beranda (mobile):**
```
[ logo ]                    [🔍] [☰]
-----------------------------------
[ iklan HOME-TOP ]
[ BERITA UTAMA  (gambar besar)    ]
[ judul .......................... ]
 • berita pilihan 1
 • berita pilihan 2
-----------------------------------
INFO JALAN TERKINI        Lihat semua
 ● Macet — Exit Tol Pandaan  12 mnt
 ● Jalan ditutup — ...       1 jam
-----------------------------------
BERITA TERBARU
[Semua][Berita][Kuliner][Wisata]...
 [kartu] [kartu] [kartu] ...
-----------------------------------
EVENT MENDATANG  → carousel
-----------------------------------
JELAJAHI DIREKTORI
 [🍜][☕][🏞][🏨][🔧][🛍]
 LISTING PILIHAN → carousel
-----------------------------------
[ Lapor Warga ]  [ Daftarkan Usaha ]
-----------------------------------
[ footer ]
[Beranda][Berita][Direktori][Event][Jalan]
```

**Detail listing (desktop):**
```
Beranda › Direktori › Kuliner › Nama Usaha
[ Nama Usaha  ✔Terverifikasi ]  Buka · tutup 21.00
Kuliner · Pandaan · Rp Rp
+------------------+  [ WhatsApp ][ Telepon ]
|   galeri foto    |  [ Rute ][ Bagikan ]
+------------------+
Deskripsi ......................
Alamat | Jam buka (tabel) | Fasilitas
[ Peta ]
Menu unggulan | Promo | Kata Redaksi
Artikel terkait
Listing serupa
Laporkan data salah · Klaim listing
```

---

## 13. Asumsi Teknis

> Berikut asumsi untuk PRD ini; dapat disesuaikan pada dokumen teknis.

| Aspek | Asumsi |
|---|---|
| Framework | Laravel (render sisi server dengan Blade) |
| UI | Bootstrap 5 + JavaScript/TypeScript tanpa framework SPA |
| Basis data | MySQL/MariaDB |
| Pencarian | Full-text di basis data pada v1; Meilisearch bila volume tumbuh |
| Peta | Leaflet + OpenStreetMap (tanpa biaya API) atau Google Maps Embed; tautan "Rute" selalu ke Google Maps |
| Cuaca | Penyedia API cuaca dengan cache ≥ 30 menit (mis. BMKG/penyedia lain; dipilih saat implementasi) |
| Analitik | GA4 + Search Console |
| Anti-spam | Honeypot + rate limit + Turnstile/hCaptcha |
| Email | SMTP/penyedia transaksional (konfirmasi newsletter, notifikasi admin) |
| Antrean | Queue untuk pemrosesan gambar, email, notifikasi |
| Cache | Cache halaman tamu + cache data (Redis/file); pembersihan saat konten berubah |
| Gambar | Pembuatan varian (ukuran/WebP) otomatis saat unggah |
| Zona waktu | `Asia/Jakarta` pada aplikasi dan tampilan |
| Lingkungan | Local → Staging → Production |

**Struktur rute (ringkas):** rute publik sesuai Bagian 4.1; kontrol terpisah untuk tiap modul (Home, Article, RoadUpdate, Listing, Event, Partner, Page, Search, Form submissions, Sitemap, Redirect); lapisan layanan untuk logika "buka sekarang", urutan tier, dan pembuatan `.ics`.

---

## 14. Konten Awal & Aset yang Dibutuhkan

| Item | Jumlah minimum saat rilis | Catatan |
|---|---|---|
| Artikel (hasil olah ulang dari konten IG/TikTok) | 25–30 | Mencakup semua kategori |
| Artikel pilar/evergreen | 5–8 | Contoh: panduan kuliner, wisata, sejarah |
| Listing terverifikasi | 40–50 | Foto, jam buka, kontak lengkap |
| Event | 5+ | Minimal 1 bulan ke depan |
| Info Jalan | 3–5 contoh | Untuk uji tampilan |
| Paket kerja sama + spesifikasi iklan | Lengkap | Harga final dari admin |
| Portofolio | 2–3 | Hanya yang berizin |
| Halaman statis & legal | Semua di 5.18–5.21 | Perlu tinjauan hukum |
| Logo (SVG), favicon, ikon PWA (192/512 px), gambar OG bawaan | Lengkap | – |
| Foto/kredit | – | Lisensi/izin jelas |
| Teks microcopy (galat, kosong, sukses) | Lengkap | Bahasa Indonesia |

---

## 15. Rencana Rilis & Kriteria Penerimaan

### 15.1 Tahapan (usulan)

| Tahap | Cakupan | Estimasi (ilustrasi) |
|---|---|---|
| **T0 — Fondasi** | Setup proyek, tata letak global, header/footer, token desain, halaman statis | 1 minggu |
| **T1 — Konten** | Berita (daftar, detail, kategori, tag), Beranda versi awal, SEO dasar | 1,5 minggu |
| **T2 — Direktori** | Daftar, filter, detail, peta, form daftar usaha | 2 minggu |
| **T3 — Event & Info Jalan** | Event (daftar, kalender, detail), Info Jalan, Lapor Warga | 1,5 minggu |
| **T4 — Kerja Sama & Pencarian** | Landing, paket, portofolio, form penawaran, pencarian | 1 minggu |
| **T5 — Penyempurnaan** | PWA, aksesibilitas, kinerja, analitik, uji lintas perangkat | 1 minggu |
| **T6 — UAT & Rilis** | Uji penerimaan, perbaikan, migrasi konten, peluncuran | 1 minggu |

*Estimasi mengasumsikan satu pengembang utama dan panel admin berjalan paralel. Sesuaikan setelah PRD ditinjau.*

### 15.2 Definition of Done (per fitur)
- Memenuhi kriteria penerimaan halaman terkait
- Berjalan di breakpoint xs–xl dan peramban target
- Lolos pemeriksaan aksesibilitas dasar (keyboard + pembaca layar + kontras)
- Metadata SEO dan skema terpasang dan valid
- Peristiwa analitik terkait terpasang
- Tidak ada galat di konsol; kinerja dalam anggaran
- Teks dan microcopy final berbahasa Indonesia

### 15.3 Kriteria Siap Rilis
- [ ] Semua item **Must (M)** selesai dan lolos UAT
- [ ] Konten awal (Bagian 14) tersedia
- [ ] Skor Lighthouse mobile: Kinerja ≥ 85, Aksesibilitas ≥ 90, SEO ≥ 95, Praktik Terbaik ≥ 90 *(target awal)*
- [ ] Skema valid pada uji Rich Results untuk Artikel, Listing, Event
- [ ] Sitemap dikirim ke Search Console; `robots.txt` diperiksa
- [ ] Semua formulir diuji (sukses, galat, spam, batas unggah) dan notifikasi ke admin berfungsi
- [ ] Halaman legal ditinjau; banner cookie aktif
- [ ] Cadangan dan pemantauan uptime aktif
- [ ] Pengalihan dan kanonikal diuji; HTTPS dan header keamanan aktif

### 15.4 Skenario UAT Inti
1. Pengunjung mencari "bakso" → memfilter "Buka sekarang" → membuka detail → menekan WhatsApp
2. Pengunjung membuka Info Jalan → memfilter jenis → membuka pembaruan berfoto
3. Warga mengirim laporan dengan foto dari HP → menerima kode referensi
4. Pengunjung membuka Event → beralih ke Kalender → menambahkan event ke Google Calendar
5. Pelaku usaha mengisi Daftarkan Usaha sampai selesai, termasuk pulih dari draf lokal
6. Calon pengiklan membuka Paket → memilih paket → mengirim permintaan penawaran
7. Pembaca membagikan artikel ke WhatsApp → pratinjau benar
8. Pengguna keyboard/pembaca layar menyelesaikan salah satu formulir
9. Pengunjung membuka halaman yang tidak ada → 404 yang membantu

---

## 16. Risiko, Asumsi, Pertanyaan Terbuka

### 16.1 Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten awal tidak cukup saat rilis | Situs terkesan kosong | Tetapkan ambang konten minimum (Bagian 14) sebagai syarat rilis |
| Laporan warga berisi hoaks/konten sensitif | Reputasi dan risiko hukum | Moderasi wajib, label sumber, Kebijakan Konten Pengguna, penafian |
| Slot iklan merusak pengalaman/kinerja | Pengunjung pergi | Batas jumlah slot, tinggi dicadangkan, muat tunda |
| Data listing cepat usang | Kepercayaan turun | Tanggal verifikasi, tombol laporkan, penandaan "mungkin tidak terbaru" |
| Biaya API (peta/cuaca) membengkak | Biaya tak terduga | Pakai Leaflet/OSM, cache cuaca |
| Ketergantungan pada embed sosial | Lambat/terblokir | Embed dimuat saat diklik, fallback tautan |
| Kebijakan privasi dan perlindungan data tidak memadai | Risiko kepatuhan | Tinjauan hukum, minimalisasi data, retensi jelas |

### 16.2 Pertanyaan Terbuka

| # | Pertanyaan | Mempengaruhi |
|---|---|---|
| Q1 | Identitas visual final (logo, warna, font)? | Bagian 12 |
| Q2 | Domain final dan siapa pemiliknya? | Rilis, SEO |
| Q3 | Harga paket ditampilkan publik, atau "hubungi kami"? | 5.15 |
| Q4 | Captcha mana yang dipakai (Turnstile/hCaptcha/reCAPTCHA)? | Formulir |
| Q5 | Peta: Leaflet/OSM atau Google Maps Embed? | 5.7, 5.9 |
| Q6 | Sumber data cuaca? | 5.5 |
| Q7 | Daftar area/kecamatan final dan cakupan geografis awal? | Filter, data |
| Q8 | Apakah artikel Info Jalan tertentu perlu notifikasi push (v1 atau nanti)? | PWA |
| Q9 | Apakah media kit diunduh bebas atau lewat pengisian email? | 5.15 |
| Q10 | Kebijakan pemakaian foto warga: perlu izin tertulis atau cukup persetujuan formulir? | 7.1, legal |
| Q11 | Apakah akan mendaftar sebagai perusahaan pers (berdampak pada Pedoman Redaksi dan label)? | 5.21 |
| Q12 | Batas waktu "Sudah Normal" pindah ke Riwayat (bawaan 2 jam) sudah sesuai? | 5.5 |

---

## 17. Lampiran

### 17.1 Daftar Prioritas Fitur (Ringkasan)

| Modul | Must (M) | Should (S) | Could (C) |
|---|---|---|---|
| Global | Header/footer, navigasi mobile, breadcrumb, pencarian dasar, cookie banner, halaman error | PWA dasar, slot iklan | Pintasan keyboard, favorit lokal |
| Beranda | Sorotan, Info Jalan, Berita Terbaru, Event, Direktori, ajakan | Listing Pilihan, Panduan | Feed sosial, newsletter |
| Berita | Daftar, detail, kategori, tag, bagikan, SEO artikel | Terpopuler, daftar isi, kotak pembaruan | Arsip penulis, serial |
| Info Jalan | Daftar, filter, status, waktu | Cuaca, polling otomatis, riwayat, halaman detail | Notifikasi push |
| Lapor Warga | Formulir + foto + kode referensi | Geolokasi | – |
| Direktori | Daftar, filter, detail, aksi WhatsApp/rute, daftar usaha | Peta, sortir terdekat, laporkan/klaim, kata redaksi | Simpan favorit, pratinjau |
| Event | Daftar, detail, tambah ke kalender | Kalender bulanan, kirim event | Langganan iCal |
| Kerja Sama | Landing, paket, form penawaran | Portofolio, media kit | – |
| Statis | Tentang, kontak, legal | Peta situs | – |

### 17.2 Contoh Microcopy

| Situasi | Teks |
|---|---|
| Info Jalan kosong | "Belum ada gangguan yang dilaporkan. Terakhir diperiksa 5 menit lalu." |
| Hasil cari kosong | "Tidak ada hasil untuk '{kata}'. Coba kata lain atau jelajahi kategori di bawah." |
| Direktori kosong | "Belum ada tempat yang cocok. Coba longgarkan filter, atau daftarkan usaha ini." |
| Form sukses | "Terima kasih! Kiriman Anda sudah kami terima dengan kode {kode}. Kami akan memeriksanya sebelum tayang." |
| Galat unggah | "Foto terlalu besar. Maksimal 5 MB per foto." |
| Label kerja sama | "Konten ini adalah kerja sama dengan {mitra}." |
| Penafian Info Jalan | "Informasi bersifat sementara dan dapat berubah. Dalam keadaan darurat hubungi 112." |
| Offline | "Anda sedang offline. Beberapa halaman yang pernah dibuka tetap bisa dibaca." |

### 17.3 Riwayat Revisi

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 14 Okt 2026 | Draf awal PRD website publik |

---

*Dokumen ini adalah draf kerja. Pertanyaan terbuka (16.2) perlu diputuskan bersama admin sebelum tahap desain dan implementasi dimulai.*
