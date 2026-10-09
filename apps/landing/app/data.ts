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

export type Post = {
  slug: string;
  date: string;
  updatedAt?: string;
  category: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  image: string;
  body?: string;
  bodyEn?: string;
};

export const services: Service[] = [
  {
    slug: "inspection",
    title: "Inspection",
    eyebrow: "Integrity at every height",
    summary: "Inspeksi visual dan teknis untuk fasad, struktur, tower, serta area yang sulit dijangkau.",
    description: "Tim teknisi kami membantu menemukan potensi kegagalan lebih awal melalui dokumentasi yang rapi, metode kerja berbasis risiko, dan laporan yang mudah ditindaklanjuti.",
    icon: "⌖",
    image: "/images/revisi/services/inspection.webp",
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
    image: "/images/revisi/services/high-rise-cleaning.webp",
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
    image: "/images/revisi/services/building-maintenance.webp",
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
    image: "/images/revisi/services/painting-blasting.webp",
    capabilities: ["Surface preparation", "Protective coating", "Touch-up painting", "Industrial structure painting"],
    applications: ["Tower dan struktur baja", "Tank, stack, dan pipe support", "Fasad serta elemen arsitektural", "Area korosi lokal yang sulit diakses"],
    deliverables: ["Surface condition assessment", "Persiapan dan cleanliness check", "Aplikasi coating sesuai spesifikasi", "Dry film/visual check dan report"],
    assurance: "Kontrol debu, overspray, cuaca, dan kompatibilitas coating direncanakan sebelum pekerjaan dimulai untuk menjaga keselamatan dan mutu lapisan.",
  },
  {
    slug: "rope-access",
    title: "Rope Access Yogyakarta",
    eyebrow: "Akses tali di Yogyakarta",
    summary: "Metode akses tali untuk pembersihan, pengecatan, perawatan, dan inspeksi area tinggi setelah kelayakan lokasi dinilai.",
    description: "Setiap pekerjaan akses tali direncanakan berdasarkan kondisi bangunan, anchor, risiko di area bawah, aktivitas lokasi, kompetensi personel, dan kebutuhan penyelamatan.",
    icon: "↕",
    image: "/images/revisi/home/why-rope-access.webp",
    capabilities: ["Akses dan positioning pada area tinggi", "Pembersihan fasad dan kaca", "Pengecatan dan perawatan eksterior", "Inspeksi visual dan dokumentasi"],
    applications: ["Fasad gedung dan area sulit dijangkau", "Pekerjaan pengecatan atau coating", "Perawatan sealant dan komponen eksterior", "Inspeksi visual setelah lingkup dikonfirmasi"],
    deliverables: ["Survei kondisi lokasi dan akses", "Metode kerja serta pengendalian risiko", "Perlindungan area dan koordinasi pekerjaan", "Pemeriksaan serta dokumentasi hasil sesuai lingkup"],
    assurance: "Akses tali hanya dipilih jika anchor, jalur kerja, personel, pengendalian area, kondisi cuaca, dan rescue plan dapat dinilai sesuai untuk pekerjaan tersebut.",
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
  { slug: "glass-facade-cleaning-bekasi", title: "Glass & Facade Cleaning", category: "Cleaning", location: "Bekasi", year: "2026", image: "/images/revisi/home/glass-facade-cleaning-bekasi.webp" },
  { slug: "facade-sealant-replacement", title: "Facade Sealant Replacement", category: "Maintenance", location: "Solo Grand Mall", year: "2026", image: "/images/revisi/home/facade-sealant-solo-grand-mall.webp" },
  { slug: "sticker-removal-bpjs-kebumen", title: "Sticker Removal", category: "Cleaning", location: "BPJS Kebumen", year: "2026", image: "/images/revisi/home/sticker-cleaning-bpjs-kebumen.webp" },
  { slug: "painting-fortuna-jember", title: "Fortuna Building Painting", category: "Painting", location: "Jember", year: "2026", image: "/images/revisi/home/painting-fortuna-jember.webp" },
  { slug: "tower-protective-coating", title: "Tower Protective Coating", category: "Painting", location: "East Java", year: "2025", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85" },
  { slug: "roof-gutter-maintenance", title: "Roof & Gutter Maintenance", category: "Maintenance", location: "Solo", year: "2024", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85" },
];

export const productCategories = [
  "Harness & body support",
  "Helmets & head protection",
  "Ropes & lanyards",
  "Connectors & carabiners",
  "Descenders & ascenders",
  "Rigging & rescue equipment",
];

export const posts: Post[] = [
  {
    slug: "panduan-maintenance-dan-kebersihan-gedung",
    date: "13 Aug 2026",
    category: "Maintenance",
    title: "Maintenance Gedung: Panduan Pembersihan dan Perawatan",
    titleEn: "Building Maintenance: A Guide to Cleaning and Care",
    excerpt: "Panduan memilih jasa kebersihan kantor, pembersihan gedung tinggi, cleaning service gedung, dan cuci kaca gedung yang aman serta terukur.",
    excerptEn: "A practical guide to choosing office cleaning, high-rise cleaning, building cleaning services, and professional glass cleaning safely.",
    image: "/images/revisi/home/glass-facade-cleaning-bekasi.webp",
    body: `Gedung yang bersih, aman, dan terawat tidak tercipta dari pekerjaan reaktif sesekali. Hasil yang konsisten membutuhkan program maintenance gedung yang menggabungkan inspeksi, pembersihan rutin, perawatan preventif, dan perbaikan berdasarkan prioritas risiko. Bagi pengelola fasilitas, pendekatan ini membantu menjaga kenyamanan pengguna sekaligus melindungi kondisi aset dalam jangka panjang.

Kebutuhan setiap properti berbeda. Kantor bertingkat rendah mungkin lebih banyak memerlukan perawatan area dalam, sedangkan hotel, rumah sakit, pusat perbelanjaan, dan gedung tinggi membutuhkan pengendalian tambahan untuk fasad, kaca luar, sealant, talang, signage, serta area yang sulit dijangkau.

## Apa yang dimaksud maintenance gedung?

Maintenance gedung adalah rangkaian pemeriksaan dan pekerjaan terencana untuk mempertahankan fungsi, kebersihan, keselamatan, dan tampilan bangunan. Ruang lingkupnya dapat mencakup housekeeping harian, pembersihan berkala, inspeksi fasad, perawatan atap dan talang, pengecekan sambungan sealant, perbaikan kebocoran, hingga pekerjaan pada komponen eksterior.

Program yang baik biasanya dibagi menjadi tiga lapisan:

- Perawatan rutin untuk area yang digunakan setiap hari.
- Perawatan preventif untuk mencegah kerusakan berkembang.
- Perawatan korektif untuk menangani temuan yang sudah memengaruhi fungsi atau keselamatan.

Pembagian ini membuat anggaran lebih mudah dikendalikan. Tim tidak perlu menunggu kerusakan besar sebelum bertindak, dan pekerjaan dapat dijadwalkan saat dampaknya terhadap operasional paling kecil.

## Bedakan jasa kebersihan kantor dan pekerjaan fasad

Jasa kebersihan kantor berfokus pada ruang yang dipakai penghuni setiap hari, seperti lantai, meja kerja, toilet, pantry, lobi, lift, dan area bersama. Frekuensinya cenderung harian atau mingguan, dengan indikator hasil berupa kebersihan visual, higienitas, kelengkapan bahan, dan respons terhadap kebutuhan pengguna.

Pekerjaan eksterior memiliki karakter berbeda. Debu, polusi, air hujan, jamur, sisa konstruksi, serta mineral dari air dapat menempel pada kaca, ACP, cladding, canopy, atau dinding. Aksesnya juga sering berada di luar jangkauan alat housekeeping biasa. Karena itu, jasa cleaning service gedung untuk properti bertingkat perlu memiliki metode, peralatan, kompetensi personel, dan pengendalian area yang sesuai dengan setiap zona kerja.

## Kapan pembersihan gedung tinggi diperlukan?

Pembersihan gedung tinggi sebaiknya tidak hanya dilakukan ketika fasad sudah tampak sangat kotor. Jadwal dapat ditentukan melalui inspeksi visual dan mempertimbangkan lokasi bangunan, jenis material, tingkat paparan polusi, musim, serta standar penampilan properti.

Beberapa tanda pekerjaan perlu dijadwalkan antara lain:

- Kaca mulai buram, berbercak, atau mengganggu masuknya cahaya.
- Debu dan noda air terlihat tidak merata pada fasad.
- Muncul lumut, jamur, atau kotoran pada area yang lembap.
- Ada sisa stiker, sealant, semen, atau material pascakonstruksi.
- Talang, canopy, signage, atau sudut fasad sulit dijangkau tim internal.

Survey awal penting untuk membedakan noda yang dapat dibersihkan dari kerusakan material. Goresan, delaminasi, sealant getas, atau coating yang menurun memerlukan tindakan berbeda dan tidak akan selesai hanya dengan proses pencucian.

## Memilih metode jasa cuci kaca gedung

Metode akses harus mengikuti bentuk bangunan, ketinggian, durasi pekerjaan, titik anchor, aktivitas di bawah, dan kondisi permukaan. Untuk area tertentu, petugas dapat menggunakan telescopic pole, mobile elevated work platform, gondola, scaffolding, atau rope access.

Rope access sering efektif untuk jasa cuci kaca gedung ketika area kerja vertikal sulit dijangkau dan ruang mobilisasi di bawah terbatas. Sistem ini memungkinkan teknisi mencapai banyak titik dengan jejak kerja yang ringkas. Namun, penggunaannya tetap harus didahului survey, pemeriksaan anchor, penyusunan metode kerja, pembatasan area, dan rescue plan yang spesifik terhadap lokasi.

Pemilihan alat dan cairan pembersih juga tidak boleh disamaratakan. Kaca, laminated glass, frame aluminium, sealant, ACP, batu alam, dan coating memiliki respons berbeda terhadap bahan kimia maupun gesekan. Uji coba pada area kecil membantu menilai kompatibilitas sebelum pekerjaan dilanjutkan dalam skala penuh.

## Checklist memilih jasa cleaning service gedung

Harga penting, tetapi bukan satu-satunya dasar keputusan. Sebelum menunjuk penyedia, pengelola gedung sebaiknya memeriksa hal-hal berikut:

- Scope of work menjelaskan area, material, jenis noda, dan batas pekerjaan.
- Survey lokasi dilakukan sebelum metode dan harga final ditetapkan.
- Personel memiliki kompetensi yang relevan dengan akses dan pekerjaannya.
- Peralatan kerja dan alat pelindung diperiksa serta memiliki catatan yang rapi.
- Dokumen metode kerja, penilaian risiko, toolbox meeting, dan rescue plan tersedia.
- Area di bawah dikendalikan untuk melindungi penghuni, kendaraan, dan aset.
- Bahan pembersih sesuai dengan material serta memiliki petunjuk penggunaan yang jelas.
- Hasil pekerjaan memiliki pemeriksaan akhir, dokumentasi, dan mekanisme handover.

Penyedia yang baik juga akan menjelaskan keterbatasan hasil. Noda permanen, korosi, kaca tergores, atau kerusakan coating tidak seharusnya dijanjikan hilang melalui pembersihan biasa.

## Menyusun jadwal maintenance yang realistis

Tidak ada satu frekuensi yang cocok untuk semua gedung. Area dengan lalu lintas tinggi membutuhkan perhatian lebih sering, sementara fasad dapat dijadwalkan berdasarkan hasil inspeksi dan tingkat paparan lingkungan. Mulailah dengan inventaris area, material, kondisi, risiko, serta standar hasil yang diinginkan.

Selanjutnya, kelompokkan pekerjaan menjadi harian, mingguan, bulanan, semesteran, atau berbasis kondisi. Catat temuan dan foto pada lokasi yang sama agar perubahan dapat dibandingkan. Data sederhana ini membantu facility manager menentukan prioritas dan menghindari keputusan yang hanya berdasarkan perkiraan.

Koordinasi waktu juga berpengaruh besar. Pekerjaan kaca dan fasad perlu mempertimbangkan cuaca, arah angin, paparan matahari, lalu lintas pejalan kaki, parkir, serta aktivitas penyewa. Jadwal yang tepat meningkatkan kualitas hasil sekaligus mengurangi gangguan operasional.

## Satukan kebersihan, inspeksi, dan perbaikan

Momen pembersihan memberi kesempatan untuk mengamati kondisi bangunan dari jarak dekat. Teknisi dapat mendokumentasikan sealant yang retak, sambungan terbuka, panel longgar, korosi, atau tanda rembesan untuk ditinjau lebih lanjut. Temuan tersebut bukan pengganti inspeksi teknis, tetapi dapat menjadi peringatan awal yang berguna.

Program maintenance gedung akan lebih efektif ketika jasa kebersihan kantor, pembersihan gedung tinggi, dan pekerjaan perbaikan tidak berjalan sebagai aktivitas yang terpisah tanpa catatan bersama. Satu riwayat kondisi yang konsisten membantu pengelola memahami apa yang sudah dilakukan, masalah yang berulang, dan tindakan berikutnya.

> Tujuan perawatan bukan sekadar membuat gedung terlihat bersih hari ini, tetapi menjaga bangunan tetap aman, berfungsi, dan layak digunakan dalam jangka panjang.

Pro Rope membantu pekerjaan pembersihan kaca dan fasad, inspeksi, serta maintenance pada area sulit dijangkau dengan metode akses yang disesuaikan terhadap kondisi lokasi. Konsultasikan kebutuhan gedung Anda agar scope, metode kerja, pengendalian risiko, dan dokumentasi hasil dapat direncanakan sejak awal.`,
    bodyEn: `A clean, safe, and well-maintained building is not the result of occasional reactive work. Consistent outcomes require a building maintenance programme that combines inspection, routine cleaning, preventive care, and risk-based repairs.

## What does building maintenance include?

Building maintenance is a planned series of inspections and tasks intended to preserve a property's function, cleanliness, safety, and appearance. Its scope may include daily housekeeping, periodic deep cleaning, facade inspection, roof and gutter care, sealant checks, leak repairs, and work on exterior components.

A practical programme normally separates routine, preventive, and corrective work. This makes budgets easier to control and allows teams to act before a minor defect becomes a costly disruption.

## Office cleaning and facade work serve different needs

Office cleaning focuses on occupied areas such as floors, workstations, toilets, pantries, lobbies, lifts, and shared spaces. Exterior work deals with pollution, water spots, biological growth, and construction residue on glass, ACP, cladding, canopies, and walls—often beyond the reach of standard housekeeping equipment.

## When is high-rise cleaning needed?

Do not wait until a facade looks severely neglected. Use visual inspections and consider the building's location, material, pollution exposure, season, and presentation standards. Cloudy glass, uneven water marks, biological growth, construction residue, and inaccessible gutters or signage are common reasons to schedule specialist cleaning.

An initial survey should distinguish removable contamination from material damage. Scratches, delamination, failed sealant, or deteriorated coatings require a different response.

## Choosing a glass-cleaning access method

The access method should reflect building geometry, height, work duration, anchor points, activity below, and surface condition. Options include telescopic poles, elevated platforms, gondolas, scaffolding, and rope access.

Rope access can be effective when a vertical work area is difficult to reach and ground-level mobilisation space is limited. It still requires a site survey, anchor assessment, work method, controlled exclusion zone, and location-specific rescue plan.

Cleaning tools and chemicals must also suit the substrate. Glass, aluminium frames, sealant, ACP, natural stone, and coated surfaces respond differently to chemicals and abrasion. A small test area helps confirm compatibility before full-scale work begins.

## Checklist for selecting a building cleaning provider

- A defined scope covering areas, materials, contamination, and exclusions.
- A site survey before the final method and quotation.
- Personnel competent for both the access method and the task.
- Inspected equipment and organised records.
- A work method, risk assessment, briefing, and practical rescue plan.
- Controls protecting occupants, vehicles, and assets below.
- Material-compatible cleaning products with clear instructions.
- Final inspection, documentation, and handover.

## Build a realistic maintenance schedule

There is no universal frequency for every property. Start with an inventory of areas, materials, condition, risk, and expected outcomes. Group tasks as daily, weekly, monthly, semi-annual, or condition-based. Record findings and repeat photographs from the same locations so changes can be compared.

Cleaning also creates an opportunity to observe the building at close range. Technicians can document cracked sealant, open joints, loose panels, corrosion, or signs of water ingress for further review. These observations do not replace a technical inspection, but they can provide useful early warnings.

> Maintenance is not only about making a building look clean today; it is about keeping the property safe, functional, and fit for long-term use.

Pro Rope supports glass and facade cleaning, inspection, and maintenance in difficult-to-reach areas using access methods suited to site conditions. Discuss your building requirements with our team so the scope, work method, risk controls, and result documentation can be planned from the start.`,
  },
  {
    slug: "memilih-metode-akses-untuk-fasad",
    date: "02 Aug 2026",
    updatedAt: "2026-10-09",
    category: "Pengecatan gedung",
    title: "Rope Access atau Scaffolding untuk Pengecatan Gedung?",
    titleEn: "Rope Access or Scaffolding for Building Painting?",
    excerpt: "Bandingkan akses tali, scaffolding, gondola, dan lift kerja berdasarkan luas cat, akses, anchor, durasi, dan risiko lokasi.",
    excerptEn: "Compare rope access, scaffolding, gondolas, and lifts by surface area, access, anchors, duration, and site risk.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85",
    body: `Tidak ada satu metode akses yang selalu paling cepat, murah, atau aman untuk semua pekerjaan pengecatan gedung. Pilihan harus mengikuti luas dan bentuk fasad, kondisi permukaan, durasi, titik kerja, operasional di bawah, serta risiko yang dapat dikendalikan.

# Pertimbangan akses untuk proyek pengecatan gedung

## Kapan akses tali dapat dipertimbangkan?

Rope access dapat dipertimbangkan ketika titik kerja berada di elevasi, ruang mobilisasi peralatan dari tanah terbatas, dan survei menunjukkan anchor serta jalur kerja dapat digunakan dengan aman. Untuk pengecatan lokal atau sejumlah zona yang tersebar, metode ini dapat mengurangi kebutuhan membangun platform di seluruh sisi bangunan. Itu bukan jaminan bahwa total waktu atau biaya pasti lebih rendah.

Sebelum digunakan, tim perlu memahami anchor, tepi tajam, perubahan arah tali, perlindungan benda jatuh, pembatasan area di bawah, cuaca, akses penyelamatan, dan kecocokan metode dengan pekerjaan pengecatan. Jika faktor penting tidak dapat dipastikan, akses tali tidak seharusnya dipaksakan.

## Kapan scaffolding mungkin lebih sesuai?

Scaffolding dapat menyediakan platform kerja berkelanjutan untuk permukaan luas, pekerjaan berulang, atau kegiatan yang membutuhkan material dan alat berada di dekat bidang kerja. Pertimbangannya meliputi ruang pemasangan, kapasitas dan desain sistem, kondisi tanah atau tumpuan, akses penghuni, durasi pemasangan serta pembongkaran, dan perlindungan dari gangguan di sekitar.

Scaffolding bukan otomatis lebih aman maupun lebih murah. Pemasangan dan penggunaannya tetap memerlukan perencanaan, personel yang kompeten, inspeksi, pengamanan tepi, serta pengendalian area.

## Bandingkan lingkup yang sama

Gondola, mobile elevating work platform, atau kombinasi metode juga mungkin relevan. Untuk membandingkan penawaran, pastikan setiap opsi mencakup zona cat, persiapan permukaan, spesifikasi bahan, jam kerja, pengamanan area bawah, mobilisasi, pemeriksaan mutu, dan dokumentasi yang sebanding.

Keputusan akhir memerlukan informasi tentang tinggi dan bentuk bangunan, kondisi permukaan, kemungkinan akses kendaraan, titik anchor, aktivitas di sekitar, cuaca, serta berapa lama titik kerja perlu dijangkau. Di Yogyakarta maupun di kota lain, kondisi aktual lokasi tetap menjadi dasar pemilihan metode.

Pro Rope berbasis di Yogyakarta. Kirim foto, alamat proyek, perkiraan area, jenis permukaan, dan target waktu agar lingkup awal dapat dibahas. Lihat layanan [rope access](/id/services/rope-access) dan [pengecatan gedung](/id/services/painting-blasting); metode serta penawaran akan dikonfirmasi setelah kebutuhan dan kondisi lokasi ditinjau.`,
    bodyEn: `No single access method is always the fastest, cheapest, or safest choice for every building-painting project. The decision should reflect facade area and geometry, surface condition, duration, work locations, activity below, and risks that can be controlled.

# Access considerations for building painting

## When might rope access be considered?

Rope access may be considered for elevated work when ground-level mobilisation is limited and a survey confirms usable anchors and a suitable work route. It can reduce the need to build a platform along an entire facade for localized painting or separated work zones, but that does not guarantee a lower total cost or shorter duration.

The survey should consider anchors, sharp edges, rope deviations, dropped-object controls, exclusion zones, weather, rescue access, and whether the method suits the painting task. Rope access should not be forced when a critical condition cannot be verified.

## When might scaffolding be more suitable?

Scaffolding can provide a continuous platform for broad surfaces, repeat work, or tasks that need tools and materials close to the work face. Its planning should account for installation space, system design and capacity, ground or support conditions, building access, setup and dismantling time, and protection from surrounding activity.

Scaffolding is not automatically safer or cheaper. Planning, competent personnel, inspection, edge protection, and area controls remain necessary.

## Compare equivalent scopes

Gondolas, mobile elevating work platforms, or a combination may also fit. For a fair comparison, align the painted zones, surface preparation, coating specification, work hours, controls below, mobilisation, quality checks, and documentation.

The final decision needs information about building height and shape, surface condition, vehicle access, anchors, surrounding activity, weather, and repeat access. Site conditions—not the city name—determine the method.

Pro Rope is based in Yogyakarta. Share photos, the project address, approximate area, surface type, and target timing to discuss the initial scope. See our [rope access](/en/services/rope-access) and [building painting](/en/services/painting-blasting) services; the method and quote are confirmed after the requirements and site are reviewed.`,
  },
  { slug: "persiapan-tim-rescue", date: "18 Jul 2026", category: "Safety", title: "Lima hal yang harus siap sebelum tim bekerja di ketinggian", titleEn: "Five things to prepare before a team works at height", excerpt: "Perencanaan rescue bukan dokumen pelengkap. Ini adalah bagian aktif dari setiap pekerjaan vertikal.", excerptEn: "A rescue plan is not a supporting document. It is an active part of every vertical job.", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=85" },
  { slug: "inspeksi-peralatan-harian", date: "06 Jun 2026", category: "Equipment", title: "Checklist inspeksi harian peralatan rope access", titleEn: "Daily rope access equipment inspection checklist", excerpt: "Pemeriksaan sederhana yang konsisten membantu mencegah penggunaan alat rusak dan menjaga catatan peralatan tetap rapi.", excerptEn: "Simple, consistent checks help prevent damaged equipment from being used and keep equipment records organized.", image: "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?auto=format&fit=crop&w=1200&q=85" },
  {
    slug: "biaya-pengecatan-gedung-faktor-penawaran",
    date: "09 Oct 2026",
    updatedAt: "2026-10-09",
    category: "Pengecatan gedung",
    title: "Biaya Pengecatan Gedung: Faktor yang Menentukan Penawaran",
    titleEn: "Building Painting Cost: What Shapes a Quote",
    excerpt: "Kenali pengaruh kondisi permukaan, persiapan, spesifikasi cat, akses, pengamanan, dan jadwal sebelum meminta penawaran pengecatan gedung.",
    excerptEn: "Understand how surface condition, preparation, coating specifications, access, controls, and timing shape a building-painting quote.",
    image: "/images/revisi/home/painting-fortuna-jember.webp",
    body: `Biaya pengecatan gedung tidak dapat ditentukan hanya dari tinggi bangunan atau harga per meter persegi. Dua fasad dengan luas serupa bisa membutuhkan waktu, persiapan, bahan, akses, dan pengamanan yang berbeda. Penawaran yang bertanggung jawab dimulai dari lingkup kerja dan kondisi lokasi yang jelas.

# Faktor yang memengaruhi biaya pengecatan gedung

## Faktor utama dalam penawaran

- Luas, bentuk, dan pembagian zona: banyaknya bidang, sudut, balkon, lis, atau detail dapat memengaruhi volume dan urutan kerja.
- Kondisi permukaan: cat mengelupas, retak, kotoran, korosi, kelembapan, dan lapisan lama dapat menambah kebutuhan pemeriksaan atau persiapan.
- Sistem bahan: jenis substrat, primer, cat atau coating, jumlah lapisan, warna, dan spesifikasi yang disetujui menentukan bahan serta proses aplikasi.
- Metode akses: rope access, scaffolding, gondola, lift kerja, atau kombinasi dipilih setelah akses, anchor, ruang mobilisasi, dan risiko ditinjau.
- Pengamanan dan koordinasi: penghuni, lalu lintas, kendaraan, jendela kerja, pencegahan debu atau overspray, serta kebutuhan izin dapat memengaruhi rencana.
- Jadwal dan mutu: batas waktu, jam kerja, cuaca, mobilisasi, pemeriksaan hasil, dan dokumentasi juga masuk dalam perhitungan.

## Informasi yang membantu survei awal

Untuk meminta pembahasan awal, siapkan:

1. Alamat atau titik lokasi gedung.
2. Foto fasad dari beberapa sudut dan perkiraan luas atau jumlah bidang.
3. Jenis permukaan, kondisi cat saat ini, serta bagian yang ingin dikerjakan.
4. Akses yang tersedia, target waktu, dan area yang tetap beroperasi.

Data ini membantu menyusun pertanyaan dan kebutuhan survei; foto saja belum tentu cukup untuk memastikan anchor atau kondisi tersembunyi.

Sebelum menyetujui penawaran, periksa apakah batas pekerjaan, persiapan, bahan, jumlah lapisan, perlindungan area, pemeriksaan mutu, pengecualian, dan dokumentasi sudah dijelaskan. Perbaikan retak atau kerusakan struktural sebaiknya dipisahkan dan dikonfirmasi sebagai lingkup tersendiri bila diperlukan.

## Mengapa tidak mencantumkan tarif umum?

Angka tanpa survei mudah menyesatkan karena belum memperhitungkan akses, kondisi lapangan, dan spesifikasi. Tidak ada harga per meter persegi yang dapat diterapkan ke semua gedung. Mintalah penawaran berdasarkan proyek, lalu bandingkan lingkup yang setara—bukan hanya angka akhirnya.

Pro Rope berbasis di Yogyakarta. Untuk membahas [jasa pengecatan gedung di Jogja](/id/services/painting-blasting), kirim lokasi, foto, permukaan, perkiraan area, dan jadwal yang diharapkan. Tim akan mengonfirmasi apakah survei atau informasi tambahan dibutuhkan sebelum menyusun penawaran.`,
    bodyEn: `Building painting cost cannot be determined from height or a per-square-metre rate alone. Two facades of similar size may need different preparation, materials, access, controls, and working time. A responsible quote starts with a clear scope and site conditions.

# Factors that shape a building-painting quote

## Main factors in a quote

- Area, shape, and work zones: the number of elevations, corners, balconies, trims, and details affects quantities and sequencing.
- Surface condition: peeling paint, cracks, contamination, corrosion, moisture, and old coatings may require additional checks or preparation.
- Coating system: substrate, primer, paint or coating, coat count, colour, and approved specification determine materials and application steps.
- Access method: rope access, scaffolding, gondola, a work platform, or a combination should follow a review of access, anchors, mobilisation space, and risks.
- Protection and coordination: occupants, traffic, vehicles, work windows, dust or overspray controls, and permits may change the plan.
- Timing and quality: deadlines, allowed hours, weather, mobilisation, inspection, and documentation also affect the estimate.

## Information that helps an initial review

For an initial discussion, prepare:

1. The building address or map location.
2. Facade photos from several angles and an approximate area or number of sections.
3. The surface type, current paint condition, and requested work zones.
4. Available access, target timing, and areas that must remain operational.

This helps identify survey needs; photographs alone may not confirm anchors or hidden conditions.

Before accepting a quote, check that scope limits, preparation, materials, coat count, area protection, quality checks, exclusions, and documentation are clear. Structural repairs should be confirmed as a separate scope if needed.

## Why not publish one general rate?

A number without a site review can mislead because access, site conditions, and specifications vary. No per-square-metre price applies to every building. Request a project-specific quote and compare equivalent scopes, not only the final number.

Pro Rope is based in Yogyakarta. To discuss [building painting in Jogja](/en/services/painting-blasting), share the location, photos, surface, approximate area, and target schedule. The team will confirm whether a survey or more information is needed before preparing a quote.`,
  },
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
