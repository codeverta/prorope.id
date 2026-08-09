export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  icon: string;
  image: string;
  capabilities: string[];
  applications: string[];
  deliverables: string[];
  assurance: string;
};

export type Training = {
  slug: string;
  title: string;
  code: string;
  summary: string;
  duration: string;
  certification: string;
  modules: string[];
  overview: string;
  audience: string[];
  outcomes: string[];
  requirements: string[];
};

export const services: Service[] = [
  {
    slug: "inspection",
    title: "Inspection",
    eyebrow: "Integrity at every height",
    summary: "Inspeksi visual dan teknis untuk fasad, struktur, tower, serta area yang sulit dijangkau.",
    description: "Tim teknisi kami membantu menemukan potensi kegagalan lebih awal melalui dokumentasi yang rapi, metode kerja berbasis risiko, dan laporan yang mudah ditindaklanjuti.",
    icon: "⌖",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=85",
    capabilities: ["Visual & close-up inspection", "Thickness measurement", "Bolt & structure checking", "Photo and finding report"],
    applications: ["Fasad dan building envelope", "Tower, chimney, silo, dan struktur baja", "Pipe rack serta fasilitas industri", "Area sempit atau sulit dijangkau"],
    deliverables: ["Site survey dan access plan", "Dokumentasi foto bertanda lokasi", "Daftar temuan dan tingkat prioritas", "Laporan rekomendasi tindak lanjut"],
    assurance: "Inspeksi dilakukan dari posisi kerja yang stabil dengan sistem akses dua tali, exclusion zone, dan rescue plan yang sesuai lokasi.",
  },
  {
    slug: "cleaning",
    title: "High-Rise Cleaning",
    eyebrow: "Clear view, minimal disruption",
    summary: "Pembersihan kaca dan fasad gedung tinggi tanpa scaffolding, cepat dan minim gangguan.",
    description: "Metode rope access memungkinkan tim menjangkau seluruh sudut bangunan dengan area kerja yang ringkas. Cocok untuk perkantoran, hotel, rumah sakit, dan fasilitas industri.",
    icon: "✦",
    image: "https://images.unsplash.com/photo-1693497160196-f96968d26790?auto=format&fit=crop&w=1600&q=85",
    capabilities: ["Glass facade cleaning", "ACP & cladding cleaning", "Post-construction cleaning", "Difficult-access cleaning"],
    applications: ["Gedung perkantoran dan hotel", "Rumah sakit dan pusat perbelanjaan", "Atrium, skylight, dan canopy", "Fasad ACP, kaca, dan cladding"],
    deliverables: ["Penilaian kondisi permukaan", "Proteksi area dan pedestrian control", "Pembersihan sistematis per elevasi", "Final check dan dokumentasi hasil"],
    assurance: "Pemilihan chemical, tools, dan metode bilas disesuaikan dengan material fasad untuk membantu mencegah noda, goresan, atau kerusakan sealant.",
  },
  {
    slug: "maintenance",
    title: "Building Maintenance",
    eyebrow: "Keep assets performing",
    summary: "Perbaikan sealant, kebocoran, cladding, lampu, dan komponen eksterior di ketinggian.",
    description: "Kami menggabungkan akses tali dan keahlian teknis untuk menyelesaikan pekerjaan perawatan secara presisi tanpa mengganggu operasional di bawahnya.",
    icon: "◆",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85",
    capabilities: ["Sealant replacement", "Leak repair", "Facade & cladding repair", "Signage and lighting work"],
    applications: ["Sambungan facade dan curtain wall", "Atap, talang, dan area kebocoran", "Cladding longgar atau rusak", "Signage, lampu, dan perangkat eksterior"],
    deliverables: ["Identifikasi sumber masalah", "Metode repair dan material proposal", "Pelaksanaan serta quality check", "Before–after record dan handover"],
    assurance: "Pekerjaan dikendalikan dengan proteksi benda jatuh, tool tethering, dan pemeriksaan hasil pada setiap zona sebelum berpindah.",
  },
  {
    slug: "painting-blasting",
    title: "Painting & Blasting",
    eyebrow: "Protection that lasts",
    summary: "Persiapan permukaan, pengecatan protektif, dan coating untuk aset industri maupun bangunan.",
    description: "Eksekusi terkontrol mulai dari persiapan permukaan hingga pemeriksaan hasil akhir, dengan proteksi area dan prosedur keselamatan yang disiplin.",
    icon: "◒",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=85",
    capabilities: ["Surface preparation", "Protective coating", "Touch-up painting", "Industrial structure painting"],
    applications: ["Tower dan struktur baja", "Tank, stack, dan pipe support", "Fasad serta elemen arsitektural", "Area korosi lokal yang sulit diakses"],
    deliverables: ["Surface condition assessment", "Persiapan dan cleanliness check", "Aplikasi coating sesuai spesifikasi", "Dry film/visual check dan report"],
    assurance: "Kontrol debu, overspray, cuaca, dan kompatibilitas coating direncanakan sebelum pekerjaan dimulai untuk menjaga keselamatan dan mutu lapisan.",
  },
  {
    slug: "equipment-supplier",
    title: "Equipment Supplier",
    eyebrow: "Gear you can trust",
    summary: "Peralatan rope access, rescue, dan work-at-height terpilih untuk tim profesional.",
    description: "Kami membantu memilih perlengkapan yang sesuai aplikasi, standar, dan kebutuhan operasional—dari personal protective equipment hingga rescue kit.",
    icon: "⬡",
    image: "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1600&q=85",
    capabilities: ["Harness & helmet", "Rope & connectors", "Descender & ascender", "Rescue and rigging kit"],
    applications: ["Personal rope access kit", "Work-at-height fall protection", "Rescue team equipment", "Rigging dan hauling system"],
    deliverables: ["Needs and compatibility review", "Product recommendation", "Kit configuration support", "Basic care and inspection guidance"],
    assurance: "Pemilihan alat mempertimbangkan fungsi, kompatibilitas antarkomponen, kebutuhan inspeksi, dan standar yang relevan untuk aplikasinya.",
  },
];

export const trainings: Training[] = [
  {
    slug: "tkpk",
    title: "Tenaga Kerja Pada Ketinggian",
    code: "TKPK",
    summary: "Pembinaan kompetensi bekerja aman pada bangunan dan struktur tinggi sesuai kebutuhan industri.",
    duration: "3–5 hari",
    certification: "Sertifikasi sesuai program",
    modules: ["Dasar K3 ketinggian", "Fall protection", "Sistem akses & anchorage", "Praktik evakuasi dasar"],
    overview: "Pembinaan TKPK membekali pekerja dengan pengetahuan dan praktik dasar untuk bekerja aman pada struktur, bangunan, serta area dengan risiko jatuh dari ketinggian.",
    audience: ["Pekerja konstruksi dan maintenance", "Teknisi gedung dan fasilitas", "Supervisor pekerjaan ketinggian", "Personel yang menggunakan fall protection"],
    outcomes: ["Mengenali bahaya jatuh dan kontrolnya", "Memilih serta memeriksa APD", "Menggunakan sistem penahan dan pencegah jatuh", "Merespons keadaan darurat dasar"],
    requirements: ["Sehat jasmani dan tidak memiliki kontraindikasi ketinggian", "Membawa identitas dan dokumen sesuai program", "Mengikuti seluruh sesi teori dan praktik"],
  },
  {
    slug: "tkbt",
    title: "Teknisi Akses Tali",
    code: "TKBT",
    summary: "Pelatihan teknis akses tali untuk pekerjaan vertikal yang efektif, terukur, dan aman.",
    duration: "5–7 hari",
    certification: "Sertifikasi sesuai program",
    modules: ["Equipment inspection", "Ascending & descending", "Rope maneuver", "Work positioning & rescue"],
    overview: "Program TKBT berfokus pada keterampilan teknis akses tali, pergerakan vertikal, work positioning, rigging dasar, serta prosedur penyelamatan rekan kerja.",
    audience: ["Calon teknisi rope access", "Teknisi maintenance dan inspection", "Pekerja tower atau struktur", "Personel rescue vertikal"],
    outcomes: ["Melakukan ascending dan descending terkendali", "Berpindah sistem dan melewati deviasi", "Menata area kerja dan melindungi tali", "Melaksanakan rescue dasar berbasis tim"],
    requirements: ["Kondisi fisik memadai untuk latihan intensif", "Tidak memiliki kontraindikasi bekerja di ketinggian", "Menyelesaikan evaluasi teori dan praktik"],
  },
  {
    slug: "confined-space",
    title: "Confined Space",
    code: "CS",
    summary: "Kesiapan bekerja dan melakukan penyelamatan pada ruang terbatas dengan kontrol bahaya.",
    duration: "3 hari",
    certification: "Certificate of completion",
    modules: ["Hazard identification", "Gas testing", "Entry procedure", "Confined-space rescue"],
    overview: "Pelatihan ruang terbatas membangun kesiapan peserta untuk mengendalikan atmosfer berbahaya, menjalankan entry permit, menjaga komunikasi, dan merespons keadaan darurat.",
    audience: ["Authorized entrant", "Standby person atau attendant", "Entry supervisor", "Emergency response team"],
    outcomes: ["Mengidentifikasi karakteristik ruang terbatas", "Menggunakan alat ukur gas dengan benar", "Menjalankan entry, communication, dan permit", "Menyiapkan sistem retrieval dan rescue"],
    requirements: ["Sehat jasmani dan siap menggunakan PPE", "Mampu bekerja dalam tim dan mengikuti instruksi", "Private class memerlukan data ruang terbatas perusahaan"],
  },
  {
    slug: "rescue-training",
    title: "High Angle Rescue",
    code: "HART",
    summary: "Teknik penyelamatan vertikal untuk emergency response team dan pekerja ketinggian.",
    duration: "3–5 hari",
    certification: "Certificate of completion",
    modules: ["Rescue planning", "Mechanical advantage", "Pick-off rescue", "Team-based scenario"],
    overview: "High Angle Rescue Training mengembangkan kemampuan tim untuk merencanakan dan melakukan penyelamatan vertikal menggunakan sistem tali secara terkoordinasi.",
    audience: ["Emergency response team", "Fire and rescue personnel", "Rope access supervisor", "Tim tanggap darurat fasilitas"],
    outcomes: ["Menyusun size-up dan rescue plan", "Membangun anchor serta hauling system", "Menangani casualty pada lintasan vertikal", "Menjalankan komunikasi dan command system"],
    requirements: ["Memiliki kebugaran dan kemampuan dasar tali", "Membawa PPE pribadi bila diinformasikan", "Skenario lanjutan memerlukan pengalaman dasar rescue"],
  },
  {
    slug: "tree-climbing",
    title: "Tree Climbing",
    code: "TREE",
    summary: "Teknik akses, positioning, dan keselamatan untuk pekerjaan arborikultur profesional.",
    duration: "3 hari",
    certification: "Certificate of completion",
    modules: ["Tree risk assessment", "Anchor selection", "Climbing system", "Aerial rescue"],
    overview: "Tree Climbing Training membahas akses pohon, pemilihan anchor, work positioning, penggunaan peralatan arborist, dan aerial rescue secara aman.",
    audience: ["Arborist dan tree worker", "Tim landscape dan taman kota", "Petugas pemangkasan pohon", "Rescue personnel untuk lingkungan pohon"],
    outcomes: ["Menilai kondisi pohon dan zona kerja", "Memasang climbing system yang sesuai", "Bergerak dan bekerja dengan positioning stabil", "Melakukan aerial rescue dasar"],
    requirements: ["Sehat jasmani dan nyaman beraktivitas di luar ruang", "Menggunakan pakaian kerja serta sepatu yang sesuai", "Mengikuti briefing risiko lingkungan"],
  },
];

export const projects = [
  { title: "Glass Cleaning — Hotel Facade", category: "Cleaning", location: "Yogyakarta", year: "2026", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85" },
  { title: "Industrial Stack Inspection", category: "Inspection", location: "Central Java", year: "2026", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85" },
  { title: "Facade Sealant Replacement", category: "Maintenance", location: "Yogyakarta", year: "2025", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85" },
  { title: "High Angle Rescue Drill", category: "Training", location: "Sleman", year: "2025", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=85" },
  { title: "Tower Protective Coating", category: "Painting", location: "East Java", year: "2025", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85" },
  { title: "Roof & Gutter Maintenance", category: "Maintenance", location: "Solo", year: "2024", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85" },
];

export const productCategories = [
  "Harness & body support",
  "Helmets & head protection",
  "Ropes & lanyards",
  "Connectors & carabiners",
  "Descenders & ascenders",
  "Rigging & rescue equipment",
];

export const posts = [
  { slug: "memilih-metode-akses-untuk-fasad", date: "02 Aug 2026", category: "Insight", title: "Memilih metode akses yang tepat untuk perawatan fasad", titleEn: "Choosing the right access method for facade maintenance", excerpt: "Rope access, gondola, atau scaffolding? Kenali pertimbangan keselamatan, waktu, dan area kerja sebelum proyek dimulai.", excerptEn: "Rope access, gondola, or scaffolding? Understand the safety, timing, and work-area considerations before a project begins.", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85" },
  { slug: "persiapan-tim-rescue", date: "18 Jul 2026", category: "Safety", title: "Lima hal yang harus siap sebelum tim bekerja di ketinggian", titleEn: "Five things to prepare before a team works at height", excerpt: "Perencanaan rescue bukan dokumen pelengkap. Ini adalah bagian aktif dari setiap pekerjaan vertikal.", excerptEn: "A rescue plan is not a supporting document. It is an active part of every vertical job.", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=85" },
  { slug: "inspeksi-peralatan-harian", date: "06 Jun 2026", category: "Equipment", title: "Checklist inspeksi harian peralatan rope access", titleEn: "Daily rope access equipment inspection checklist", excerpt: "Pemeriksaan sederhana yang konsisten membantu mencegah penggunaan alat rusak dan menjaga catatan peralatan tetap rapi.", excerptEn: "Simple, consistent checks help prevent damaged equipment from being used and keep equipment records organized.", image: "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?auto=format&fit=crop&w=1200&q=85" },
];

export const schedules = [
  { program: "TKPK", batch: "Batch 09", date: "14–18 September 2026", location: "Yogyakarta", seats: 8 },
  { program: "TKBT", batch: "Batch 06", date: "05–10 October 2026", location: "Yogyakarta", seats: 6 },
  { program: "Confined Space", batch: "Batch 04", date: "26–28 October 2026", location: "Yogyakarta", seats: 10 },
  { program: "High Angle Rescue", batch: "Private Class", date: "By request", location: "On-site / Yogyakarta", seats: 12 },
];

export const values = [
  { number: "01", title: "Safe by design", text: "Setiap pekerjaan dimulai dari identifikasi bahaya, metode kerja, dan rencana penyelamatan." },
  { number: "02", title: "Efficient access", text: "Mobilisasi ringkas dan jejak kerja minimal menjaga aktivitas di sekitar tetap berjalan." },
  { number: "03", title: "Certified people", text: "Teknisi kompeten, perlengkapan terinspeksi, dan komunikasi lapangan yang disiplin." },
  { number: "04", title: "Documented result", text: "Foto, temuan, dan laporan tersusun agar hasil pekerjaan mudah diverifikasi." },
];
