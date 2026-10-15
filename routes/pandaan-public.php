<?php

use Illuminate\Support\Facades\Route;

/*
| Salin file ini ke routes/pandaan-public.php di aplikasi Laravel 13,
| lalu tambahkan require __DIR__.'/pandaan-public.php'; di routes/web.php.
| Halaman saat ini berupa HTML statis; ganti response()->file dengan view/controller
| saat model, CMS, dan backend sudah tersedia.
*/
$servePandaanPage = static function (string $file) {
    return response()->file(public_path('site/'.$file), [
        'Content-Type' => 'text/html; charset=UTF-8',
        'X-Content-Type-Options' => 'nosniff',
        'Referrer-Policy' => 'strict-origin-when-cross-origin',
    ]);
};

Route::get('/', static fn () => $servePandaanPage('index.html'))->name('public.home');
Route::get('/berita', static fn () => $servePandaanPage('berita/index.html'))->name('public.berita');
Route::get('/berita/akhir-pekan-di-kaki-arjuno', static fn () => $servePandaanPage('berita/akhir-pekan-di-kaki-arjuno/index.html'))->name('public.berita.sample');
Route::get('/info-jalan', static fn () => $servePandaanPage('info-jalan/index.html'))->name('public.info-jalan');
Route::get('/info-jalan/road-1', static fn () => $servePandaanPage('info-jalan/road-1/index.html'))->name('public.info-jalan.sample');
Route::get('/direktori', static fn () => $servePandaanPage('direktori/index.html'))->name('public.direktori');
Route::get('/direktori/kafe-and-nongkrong/kedai-sore', static fn () => $servePandaanPage('direktori/kafe-and-nongkrong/kedai-sore/index.html'))->name('public.direktori.sample');
Route::get('/event', static fn () => $servePandaanPage('event/index.html'))->name('public.event');
Route::get('/event/pasar-kreatif-pandaan', static fn () => $servePandaanPage('event/pasar-kreatif-pandaan/index.html'))->name('public.event.sample');
Route::get('/tentang', static fn () => $servePandaanPage('tentang/index.html'))->name('public.tentang');
Route::get('/kerja-sama', static fn () => $servePandaanPage('kerja-sama/index.html'))->name('public.kerja-sama');
Route::get('/kontribusi', static fn () => $servePandaanPage('kontribusi/index.html'))->name('public.kontribusi');
Route::get('/offline', static fn () => $servePandaanPage('offline.html'))->name('public.offline');

// Biarkan Laravel memakai halaman 404 HTML ini sambil mempertahankan HTTP 404.
Route::fallback(static function () use ($servePandaanPage) {
    $response = $servePandaanPage('404.html');
    $response->setStatusCode(404);
    return $response;
});
