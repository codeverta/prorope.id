export type ServiceQuestion = { question: string; answer: string };

export type IndonesianServiceContent = {
  h1: string;
  eyebrow: string;
  summary: string;
  metaDescription: string;
  scopeHeading: string;
  scopeIntro: string;
  scope: string[];
  procedureHeading: string;
  procedure: { title: string; description: string }[];
  pricingHeading: string;
  pricingIntro: string;
  pricingFactors: string[];
  locationHeading: string;
  locationCopy: string;
  projectHeading: string;
  projectSlugs: string[];
  relatedArticles: string[];
  faqs: ServiceQuestion[];
};

export const indonesianServiceContent: Record<string, IndonesianServiceContent> = {
  "painting-blasting": {
    h1: "Jasa Pengecatan Gedung di Jogja",
    eyebrow: "Pengecatan gedung dan fasad · Yogyakarta",
    summary: "Pengecatan eksterior, fasad, dan struktur pada area yang membutuhkan perencanaan akses serta persiapan permukaan yang tepat.",
    metaDescription: "Jasa pengecatan gedung di Jogja dan Yogyakarta untuk fasad, eksterior, dan struktur. Lingkup, metode akses, serta penawaran ditentukan setelah survei lokasi.",
    scopeHeading: "Pengecatan dimulai dari kondisi permukaan",
    scopeIntro: "Setiap gedung memiliki material, paparan cuaca, kerusakan, dan batas operasional yang berbeda. Lingkup pekerjaan disepakati setelah kondisi lokasi dan target hasil dibahas.",
    scope: [
      "Pengecatan fasad dan elemen eksterior gedung.",
      "Pengecatan ulang atau touch-up pada bagian yang disetujui.",
      "Persiapan permukaan yang sesuai kondisi, termasuk pembersihan atau penghilangan lapisan yang tidak melekat bila aman dan disepakati.",
      "Pengecatan protektif pada struktur baja atau elemen bangunan sesuai spesifikasi material dan sistem coating yang dipilih.",
    ],
    procedureHeading: "Tahapan kerja dan pemeriksaan",
    procedure: [
      { title: "Diskusi kebutuhan", description: "Tentukan lokasi, material, area, kondisi cat, target hasil, batas waktu, dan aktivitas di sekitar gedung." },
      { title: "Survei dan metode", description: "Periksa akses, titik kerja, kondisi permukaan, potensi gangguan, cuaca, dan kebutuhan pengendalian area sebelum menyiapkan lingkup serta penawaran." },
      { title: "Persiapan dan aplikasi", description: "Laksanakan persiapan permukaan dan sistem pengecatan yang telah disepakati. Metode akses dipilih berdasarkan hasil survei, bukan diasumsikan selalu menggunakan tali." },
      { title: "Pemeriksaan dan serah terima", description: "Periksa hasil sesuai kriteria yang disepakati, catat temuan atau area pengecualian, lalu serahkan dokumentasi pekerjaan yang termasuk dalam lingkup." },
    ],
    pricingHeading: "Apa yang memengaruhi biaya pengecatan gedung?",
    pricingIntro: "Harga tidak dapat dipastikan hanya dari jumlah lantai. Penawaran disusun setelah kebutuhan, kondisi aktual, spesifikasi, dan metode kerja cukup jelas.",
    pricingFactors: [
      "Luas dan bentuk area yang dicat serta jumlah zona kerja.",
      "Kondisi permukaan, kerusakan cat, kebutuhan pembersihan, perbaikan lokal, dan tingkat persiapan.",
      "Jenis material, spesifikasi cat atau coating, jumlah lapisan, dan persyaratan aplikasinya.",
      "Ketinggian, geometri fasad, akses, kondisi anchor, serta pilihan metode kerja yang layak.",
      "Kebutuhan perlindungan dari debu atau overspray, pengamanan area bawah, dan koordinasi dengan penghuni atau operasional gedung.",
      "Jadwal, cuaca, mobilisasi, pemeriksaan mutu, serta dokumentasi yang diminta.",
    ],
    locationHeading: "Layanan pengecatan gedung di Yogyakarta",
    locationCopy: "Pro Rope berbasis di Yogyakarta. Untuk lokasi di luar area tersebut, ketersediaan tim, mobilisasi, metode, dan jadwal perlu dikonfirmasi berdasarkan alamat serta lingkup pekerjaan. Kami tidak mencantumkan cakupan kabupaten atau waktu respons yang belum diverifikasi.",
    projectHeading: "Contoh pekerjaan dalam portofolio",
    projectSlugs: ["painting-fortuna-jember"],
    relatedArticles: ["biaya-pengecatan-gedung-faktor-penawaran", "memilih-metode-akses-untuk-fasad"],
    faqs: [
      { question: "Apakah Pro Rope melayani pengecatan gedung di Jogja?", answer: "Pro Rope berbasis di Yogyakarta dan menerima konsultasi pekerjaan pengecatan gedung, fasad, eksterior, serta struktur. Kelayakan lingkup dan jadwal dikonfirmasi setelah lokasi dan kondisi pekerjaan dibahas." },
      { question: "Apakah semua pekerjaan pengecatan dilakukan dengan rope access?", answer: "Tidak. Akses tali dipertimbangkan bila sesuai dengan bentuk gedung, anchor, kondisi lokasi, risiko, dan lingkup pekerjaan. Scaffolding, gondola, atau metode lain dapat lebih sesuai pada kondisi tertentu." },
      { question: "Bagaimana cara meminta perkiraan biaya pengecatan gedung?", answer: "Kirim alamat proyek, foto area, jenis permukaan, perkiraan luas atau jumlah zona, kondisi cat, dan target waktu. Penawaran yang lebih tepat mungkin memerlukan survei dan konfirmasi spesifikasi." },
      { question: "Apakah tersedia harga per meter persegi?", answer: "Tidak ada tarif umum yang dapat dipastikan untuk setiap gedung. Luas hanyalah salah satu faktor; akses, persiapan, kondisi permukaan, spesifikasi bahan, dan pengendalian lokasi turut memengaruhi penawaran." },
    ],
  },
  "rope-access": {
    h1: "Jasa Rope Access Jogja & Yogyakarta",
    eyebrow: "Akses tali profesional · Yogyakarta",
    summary: "Pekerjaan pada fasad dan area tinggi dengan metode akses tali jika hasil survei menunjukkan metode tersebut layak dan sesuai dengan risikonya.",
    metaDescription: "Jasa rope access Jogja dan Yogyakarta untuk pembersihan fasad, pengecatan, perawatan, dan inspeksi area sulit dijangkau. Metode ditentukan melalui survei dan penilaian risiko.",
    scopeHeading: "Ruang lingkup rope access",
    scopeIntro: "Akses tali adalah metode untuk mencapai titik kerja, bukan pengganti penilaian teknis terhadap pekerjaan itu sendiri. Lingkup dan pilihan metode disesuaikan dengan gedung, material, akses, serta aktivitas di lokasi.",
    scope: [
      "Pembersihan kaca dan fasad pada area yang sulit dijangkau.",
      "Pengecatan, touch-up, atau aplikasi coating pada area yang disepakati.",
      "Perawatan sealant, komponen eksterior, dan perbaikan lokal yang dapat dilakukan dari posisi kerja akses tali.",
      "Inspeksi visual, dokumentasi temuan, dan pekerjaan teknis lain setelah kompetensi serta kebutuhan alat dikonfirmasi.",
    ],
    procedureHeading: "Rencana akses sebelum pekerjaan",
    procedure: [
      { title: "Kenali lokasi", description: "Kumpulkan alamat, foto, bentuk bangunan, titik pekerjaan, material, aktivitas di bawah, batas akses, serta kebutuhan operasional." },
      { title: "Tinjau metode dan risiko", description: "Survei untuk menilai akses, anchor yang dapat digunakan, cuaca, perlindungan benda jatuh, pembatasan area, kebutuhan izin, personel, alat, dan rencana penyelamatan." },
      { title: "Konfirmasi lingkup", description: "Sebelum mobilisasi, sepakati metode yang layak, langkah kerja, tanggung jawab koordinasi, hasil yang diharapkan, dan batas pekerjaan. Bila kelayakan akses tali tidak dapat dipastikan, metode ini tidak dipaksakan." },
      { title: "Pelaksanaan dan dokumentasi", description: "Lakukan briefing serta pemeriksaan sesuai rencana, kendalikan area kerja, dan dokumentasikan hasil atau temuan yang termasuk dalam lingkup." },
    ],
    pricingHeading: "Faktor yang menentukan penawaran rope access",
    pricingIntro: "Penawaran bergantung pada pekerjaan yang dilakukan sekaligus kompleksitas aksesnya. Foto awal membantu diskusi, tetapi tidak selalu menggantikan survei.",
    pricingFactors: [
      "Jenis pekerjaan, jumlah titik atau zona, luas, dan tingkat detail hasil yang diminta.",
      "Tinggi dan bentuk gedung, jalur turun, posisi anchor, tepi tajam, dan hambatan akses.",
      "Kebutuhan survei, izin, personel, peralatan, sistem proteksi, serta rencana penyelamatan spesifik lokasi.",
      "Pengamanan pejalan kaki, kendaraan, penghuni, dan operasi gedung di area bawah.",
      "Durasi, jam kerja yang diizinkan, kondisi cuaca, mobilisasi, dan kebutuhan akses ulang.",
      "Bahan atau material pekerjaan, pemeriksaan hasil, dokumentasi, dan batas lingkup yang disepakati.",
    ],
    locationHeading: "Rope access berbasis Yogyakarta",
    locationCopy: "Tim Pro Rope berbasis di Yogyakarta. Permintaan jasa rope access terdekat dari lokasi Anda tetap perlu dikonfirmasi: jarak, ketersediaan tim, kelayakan akses, mobilisasi, dan jadwal bergantung pada informasi proyek. Kirim alamat atau titik lokasi agar cakupan dapat diperiksa; kami tidak membuat klaim area layanan yang belum diverifikasi.",
    projectHeading: "Contoh pekerjaan rope access dalam portofolio",
    projectSlugs: ["glass-facade-cleaning-bekasi", "facade-sealant-replacement", "painting-fortuna-jember"],
    relatedArticles: ["memilih-metode-akses-untuk-fasad", "biaya-pengecatan-gedung-faktor-penawaran"],
    faqs: [
      { question: "Layanan apa yang dapat menggunakan rope access?", answer: "Rope access dapat dipertimbangkan untuk pekerjaan pembersihan fasad, pengecatan, perawatan, dan inspeksi di area tinggi. Kesesuaian untuk proyek tertentu ditentukan setelah lingkup, kondisi bangunan, akses, dan risiko ditinjau." },
      { question: "Apakah rope access selalu lebih cepat atau lebih murah dari scaffolding?", answer: "Tidak selalu. Waktu dan biaya dipengaruhi oleh durasi, luas kerja, kebutuhan mobilisasi, bentuk gedung, anchor, area bawah, dan akses berulang. Perbandingan harus menggunakan lingkup yang sama serta mempertimbangkan keselamatan." },
      { question: "Apa yang diperiksa sebelum teknisi bekerja dengan tali?", answer: "Survei mempertimbangkan jalur akses, anchor, kondisi tepi, cuaca, zona eksklusi, potensi benda jatuh, koordinasi lokasi, perlengkapan, kompetensi personel, serta rencana penyelamatan yang sesuai pekerjaan." },
      { question: "Saya mencari jasa rope access terdekat. Apakah Pro Rope melayani lokasi saya?", answer: "Pro Rope berbasis di Yogyakarta. Kirim alamat atau titik proyek dan lingkup pekerjaan agar tim dapat mengonfirmasi ketersediaan, mobilisasi, jadwal, serta kelayakan metode untuk lokasi tersebut." },
    ],
  },
};
