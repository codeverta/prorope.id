# Checklist implementasi SEO Pro Rope

Pembaruan: 9 Oktober 2026. Dokumen ini mencatat pekerjaan repositori setelah rencana disetujui. Ini bukan bukti bahwa perubahan sudah tayang di situs produksi.

## Status implementasi

| Area | Status | Catatan |
| --- | --- | --- |
| Redirect kanonis HTTP/www → HTTPS non-www | Selesai di kode | Redirect permanen 308 mempertahankan path dan query pada domain situs. Validasi produksi masih menunggu deploy dan pemeriksaan URL live. |
| HTML awal Indonesia dan halaman utama | Selesai di kode | `/id` menampilkan H1, ringkasan, navigasi, dan tautan layanan Indonesia dari server. |
| Halaman pengecatan gedung Jogja | Selesai di kode | URL `/id/services/painting-blasting` dipertahankan; isi mencakup lingkup, tahapan, faktor penawaran, area yang dapat dikonfirmasi, portofolio, FAQ, dan CTA. |
| Halaman rope access Jogja/Yogyakarta | Selesai di kode | Halaman `/id/services/rope-access` baru; mencakup metode, risiko/prosedur, faktor penawaran, jangkauan yang tidak dilebihkan, bukti portofolio, FAQ, dan CTA. |
| Artikel pendukung dan renderer Markdown aman | Selesai di kode | Artikel perbandingan akses diperbarui dan panduan faktor biaya ditambahkan. CMS live belum tersambung untuk memastikan sinkronisasi/penerbitan konten CMS. |
| Tautan internal dan navigasi prioritas | Selesai di kode | Homepage, navigasi, layanan, artikel, serta portofolio saling menautkan. |
| Structured data dan bahasa alternatif | Selesai di kode; perlu verifikasi live | Service/FAQ dan metadata halaman dipasang. Alternate hanya dicantumkan bila versi bahasa tersedia; validasi Google belum dilakukan. |
| Sitemap dan `lastmod` | Selesai di kode; cakupan CMS belum terverifikasi | Sitemap dibangun dari rute aktif, konten statis, dan endpoint CMS bila tersedia; tanggal CMS memakai `updated_at`/`published_at`. Tidak ada koneksi API produksi pada lingkungan kerja ini. |
| Pengukuran WhatsApp dan formulir | Sebagian selesai | Event klik membawa konteks sesi/entry; submit formulir hanya dilaporkan setelah server menerima data. Klik bukan lead berkualitas. Konfigurasi trigger GTM/Ads tidak tersedia untuk memastikan atau menghilangkan kemungkinan event konversi ganda. |
| Google Search Console, Google Analytics, Google Business Profile | Menunggu akses akun | Tidak ada integrasi/kredensial akun aktif di workspace. Status indeks, canonical pilihan Google, query-page, konfigurasi profil, ulasan, alamat, jam, dan area layanan belum diperiksa atau diubah. |
| Ulasan, foto/studi kasus tambahan, backlink/mitra | Menunggu bukti dan koordinasi bisnis | Tidak membuat testimoni, klaim proyek Jogja, jaminan, tarif, atau outreach tanpa bukti/persetujuan. |
| Deploy dan pemeriksaan produksi | Belum dilakukan | Perubahan lokal belum dipublikasikan. Jalankan alur rilis proyek setelah review dan persetujuan operasional. |

## Validasi lokal

- `npm test`: lulus, 6 dari 6 tes untuk build, canonical redirect, HTML Indonesia, halaman layanan, Markdown aman, dan sitemap.
- `npm run build`: lulus.
- `npm run lint`: belum dapat berjalan karena dependensi yang sudah terpasang tidak lengkap (`es-abstract/2024/ArraySpeciesCreate`).
- `npx tsc --noEmit`: tertahan oleh tipe Cloudflare yang tidak tersedia (`cloudflare:workers`, `Fetcher`, `D1Database`). Pemeriksaan tipe terisolasi untuk data/isi baru lolos.
- `go test ./...`: binary tes backend dapat dikompilasi, tetapi eksekusi tes HTTP API gagal di lingkungan macOS karena error loader `missing LC_UUID load command`; hasil runtime backend belum terverifikasi.

## Prosedur evaluasi minggu 5–8

Mulai setelah halaman benar-benar tayang dan cukup waktu untuk pengumpulan data. Simpan tanggal deploy dan ekspor baseline terlebih dahulu.

1. Di Search Console, pilih properti domain, tipe pencarian Web, negara Indonesia, lalu bandingkan 28 hari terakhir dengan 28 hari sebelumnya. Catat klik, tayangan, CTR, dan posisi; jangan campur dengan ekspor lama yang periodenya tidak lengkap.
2. Ekspor query dan halaman secara terpisah. Kelompokkan brand (`prorope`, `pro rope`), pengecatan (`pengecatan`, `cat gedung`, `fasad`), rope access lokal (`rope access`, `akses tali`, `Jogja`, `Yogyakarta`, `terdekat`), serta pendukung. Periksa pasangan query–halaman yang benar-benar tersedia; jangan menyimpulkan query dari tabel halaman saja.
3. Periksa URL Inspection untuk `/id`, dua halaman layanan, dan artikel pendukung. Catat status indeks, Google-selected canonical, tanggal crawl terakhir, serta alasan bila URL tidak terindeks. Selesaikan masalah indeks sebelum menambah konten.
4. Di GA4 atau analitik yang disetujui, bandingkan sesi organik Indonesia dan halaman masuk. Pisahkan event klik WhatsApp menurut halaman asal dan sumber sesi. Cocokkan secara manual dengan catatan pertanyaan yang benar-benar masuk; klik WhatsApp bukan bukti percakapan, lead berkualitas, penawaran, atau proyek jadi.
5. Uji satu klik WhatsApp dan satu pengiriman formulir pada GTM Preview/Ads diagnostics. Pastikan jumlah event, event ID/label, halaman asal, serta atribusi organik; bandingkan trigger GTM dan tag Ads langsung agar satu aksi tidak tercatat dua kali sebagai konversi. Jangan ubah konfigurasi akun sebelum kepemilikan dan dampaknya jelas.
6. Tafsirkan hasil: belum terindeks → perbaiki indeks/canonical; terindeks tanpa tayangan sasaran → evaluasi relevansi, tautan internal, dan bukti lokal; tayangan naik tetapi CTR rendah → tinjau judul/deskripsi setelah volume memadai; kunjungan tanpa permintaan yang sesuai → periksa scope, kepercayaan, CTA, respons, dan alur kontak.
7. Catat perubahan yang dibuat dan ulangi perbandingan 28 hari. Volume kecil dan perubahan campuran query tidak cukup untuk menyatakan keberhasilan atau kegagalan berdasarkan satu metrik.

## Data/izin yang dibutuhkan untuk menutup pekerjaan tertunda

- Deploy melalui workflow hosting yang disetujui serta akses untuk memeriksa redirect, canonical, alternate, konten HTML, dan sitemap live.
- Search Console, Google Analytics, dan GTM/Google Ads yang berwenang untuk URL Inspection, baseline, serta uji duplikasi event.
- Google Business Profile yang benar-benar dimiliki bisnis dan konfirmasi nama/alamat atau pengaturan area layanan, jam, nomor, dan kategori yang boleh dipublikasikan.
- Persetujuan pemilik bisnis atas foto, studi kasus, kompetensi, harga, cakupan, dan klaim komersial apa pun sebelum dipublikasikan.
- Akses CMS/API bila artikel perlu diedit atau diverifikasi pada data produksi, bukan hanya fallback konten situs.
