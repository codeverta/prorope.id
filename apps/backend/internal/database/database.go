package database

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"
)

func Open(path string) (*sql.DB, error) {
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return nil, err
	}
	db, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, err
	}
	if _, err = db.Exec(schema); err != nil {
		db.Close()
		return nil, fmt.Errorf("migrate: %w", err)
	}
	if err = migrateLegacyPosts(db); err != nil {
		db.Close()
		return nil, fmt.Errorf("normalize post translations: %w", err)
	}
	if _, err = db.Exec(seed); err != nil {
		db.Close()
		return nil, fmt.Errorf("seed: %w", err)
	}
	if _, err = db.Exec(indexes); err != nil {
		db.Close()
		return nil, fmt.Errorf("indexes: %w", err)
	}
	return db, nil
}

func tableHasColumn(db *sql.DB, table, column string) (bool, error) {
	rows, err := db.Query("PRAGMA table_info(" + table + ")")
	if err != nil {
		return false, err
	}
	defer rows.Close()
	for rows.Next() {
		var cid, notNull, primaryKey int
		var name, columnType string
		var defaultValue any
		if err := rows.Scan(&cid, &name, &columnType, &notNull, &defaultValue, &primaryKey); err != nil {
			return false, err
		}
		if name == column {
			return true, nil
		}
	}
	return false, rows.Err()
}

// migrateLegacyPosts converts the old one-column-per-language model into a
// normalized translation table. It runs once and preserves ids and timestamps.
func migrateLegacyPosts(db *sql.DB) error {
	legacy, err := tableHasColumn(db, "posts", "title")
	if err != nil || !legacy {
		return err
	}
	hasEnglish, err := tableHasColumn(db, "posts", "title_en")
	if err != nil {
		return err
	}
	titleEN, excerptEN, bodyEN := "title", "excerpt", "body"
	if hasEnglish {
		titleEN, excerptEN, bodyEN = "title_en", "excerpt_en", "body_en"
	}
	if _, err := db.Exec("PRAGMA foreign_keys=OFF"); err != nil {
		return err
	}
	defer db.Exec("PRAGMA foreign_keys=ON")
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	rollback := func(cause error) error { _ = tx.Rollback(); return cause }
	if _, err = tx.Exec(`CREATE TEMP TABLE legacy_post_content AS SELECT id,title,excerpt,body,` + titleEN + ` AS title_en,` + excerptEN + ` AS excerpt_en,` + bodyEN + ` AS body_en FROM posts`); err != nil {
		return rollback(err)
	}
	if _, err = tx.Exec(`CREATE TABLE posts_normalized (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		slug TEXT NOT NULL UNIQUE,
		category TEXT NOT NULL,
		image_url TEXT,
		published INTEGER NOT NULL DEFAULT 1,
		published_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
	)`); err != nil {
		return rollback(err)
	}
	if _, err = tx.Exec(`INSERT INTO posts_normalized(id,slug,category,image_url,published,published_at,created_at,updated_at) SELECT id,slug,category,image_url,published,published_at,created_at,updated_at FROM posts`); err != nil {
		return rollback(err)
	}
	if _, err = tx.Exec(`DROP TABLE posts`); err != nil {
		return rollback(err)
	}
	if _, err = tx.Exec(`ALTER TABLE posts_normalized RENAME TO posts`); err != nil {
		return rollback(err)
	}
	if _, err = tx.Exec(`INSERT OR REPLACE INTO post_translations(post_id,locale,title,excerpt,body)
		SELECT id,'id',title,excerpt,body FROM legacy_post_content`); err != nil {
		return rollback(err)
	}
	if _, err = tx.Exec(`INSERT OR REPLACE INTO post_translations(post_id,locale,title,excerpt,body)
		SELECT id,'en',CASE WHEN title_en='' THEN title ELSE title_en END,CASE WHEN excerpt_en='' THEN excerpt ELSE excerpt_en END,CASE WHEN body_en='' THEN body ELSE body_en END FROM legacy_post_content`); err != nil {
		return rollback(err)
	}
	if _, err = tx.Exec(`DROP TABLE legacy_post_content`); err != nil {
		return rollback(err)
	}
	return tx.Commit()
}

const schema = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS locales (code TEXT PRIMARY KEY, name TEXT NOT NULL, native_name TEXT NOT NULL, enabled INTEGER NOT NULL DEFAULT 1, sort_order INTEGER NOT NULL DEFAULT 0, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, summary TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS trainings (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL UNIQUE, code TEXT NOT NULL, title TEXT NOT NULL, summary TEXT NOT NULL, duration TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, category TEXT NOT NULL, location TEXT NOT NULL, project_year TEXT NOT NULL, image_url TEXT, featured INTEGER NOT NULL DEFAULT 0, published INTEGER NOT NULL DEFAULT 1, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL UNIQUE, category TEXT NOT NULL, image_url TEXT, published INTEGER NOT NULL DEFAULT 1, published_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS post_translations (post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE, locale TEXT NOT NULL REFERENCES locales(code), title TEXT NOT NULL, excerpt TEXT NOT NULL, body TEXT NOT NULL DEFAULT '', updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(post_id,locale));
CREATE TABLE IF NOT EXISTS schedules (id INTEGER PRIMARY KEY AUTOINCREMENT, program TEXT NOT NULL, batch TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT, location TEXT NOT NULL, seats INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT, service TEXT NOT NULL, message TEXT, status TEXT NOT NULL DEFAULT 'new', created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS registrations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT, program TEXT NOT NULL, message TEXT, status TEXT NOT NULL DEFAULT 'new', created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
`

const indexes = `
CREATE INDEX IF NOT EXISTS idx_leads_status_created ON leads(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_status_created ON registrations(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_translations_locale ON post_translations(locale,post_id);
PRAGMA optimize;
`

const seed = `
INSERT OR IGNORE INTO locales(code,name,native_name,sort_order) VALUES
('id','Indonesian','Indonesia',1),('en','English','English',2),('zh','Chinese','中文',3),('ja','Japanese','日本語',4);
INSERT OR IGNORE INTO services (slug,title,summary,sort_order) VALUES
('inspection','Inspection','Inspeksi visual dan teknis untuk area sulit dijangkau.',1),
('cleaning','High-Rise Cleaning','Pembersihan kaca dan fasad gedung tinggi.',2),
('maintenance','Building Maintenance','Perawatan sealant, cladding, dan komponen eksterior.',3),
('painting-blasting','Painting & Blasting','Persiapan permukaan dan protective coating.',4),
('equipment-supplier','Equipment Supplier','Peralatan rope access dan rescue terpilih.',5);
INSERT OR IGNORE INTO trainings (slug,code,title,summary,duration) VALUES
('tkpk','TKPK','Tenaga Kerja Pada Ketinggian','Kompetensi bekerja aman di ketinggian.','3–5 hari'),
('tkbt','TKBT','Teknisi Akses Tali','Pelatihan teknik akses tali profesional.','5–7 hari'),
('confined-space','CS','Confined Space','Kesiapan kerja dan rescue ruang terbatas.','3 hari'),
('rescue-training','HART','High Angle Rescue','Penyelamatan vertikal untuk response team.','3–5 hari'),
('tree-climbing','TREE','Tree Climbing','Akses dan positioning untuk arborikultur.','3 hari');
INSERT OR IGNORE INTO projects (slug,title,category,location,project_year,featured) VALUES
('glass-cleaning-hotel','Glass Cleaning — Hotel Facade','Cleaning','Yogyakarta','2026',1),
('industrial-stack-inspection','Industrial Stack Inspection','Inspection','Central Java','2026',1),
('facade-sealant-replacement','Facade Sealant Replacement','Maintenance','Yogyakarta','2025',1);
INSERT OR IGNORE INTO posts(slug,category) VALUES
('memilih-metode-akses-untuk-fasad','Insight'),('persiapan-tim-rescue','Safety');
INSERT OR IGNORE INTO posts(slug,category,image_url,published_at) VALUES
('panduan-maintenance-dan-kebersihan-gedung','Maintenance','/images/revisi/home/glass-facade-cleaning-bekasi.webp','2026-08-13 08:00:00');

INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'id','Maintenance Gedung: Panduan Pembersihan dan Perawatan','Panduan memilih jasa kebersihan kantor, pembersihan gedung tinggi, cleaning service gedung, dan cuci kaca gedung yang aman serta terukur.','Gedung yang bersih, aman, dan terawat tidak tercipta dari pekerjaan reaktif sesekali. Hasil yang konsisten membutuhkan program maintenance gedung yang menggabungkan inspeksi, pembersihan rutin, perawatan preventif, dan perbaikan berdasarkan prioritas risiko. Bagi pengelola fasilitas, pendekatan ini membantu menjaga kenyamanan pengguna sekaligus melindungi kondisi aset dalam jangka panjang.

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

Pro Rope membantu pekerjaan pembersihan kaca dan fasad, inspeksi, serta maintenance pada area sulit dijangkau dengan metode akses yang disesuaikan terhadap kondisi lokasi. Konsultasikan kebutuhan gedung Anda agar scope, metode kerja, pengendalian risiko, dan dokumentasi hasil dapat direncanakan sejak awal.' FROM posts WHERE slug='panduan-maintenance-dan-kebersihan-gedung';
INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'en','Building Maintenance: A Guide to Cleaning and Care','A practical guide to choosing office cleaning, high-rise cleaning, building cleaning services, and professional glass cleaning safely.','A clean, safe, and well-maintained building is not the result of occasional reactive work. Consistent outcomes require a building maintenance programme that combines inspection, routine cleaning, preventive care, and risk-based repairs.

## What does building maintenance include?

Building maintenance is a planned series of inspections and tasks intended to preserve a property''s function, cleanliness, safety, and appearance. Its scope may include daily housekeeping, periodic deep cleaning, facade inspection, roof and gutter care, sealant checks, leak repairs, and work on exterior components.

A practical programme normally separates routine, preventive, and corrective work. This makes budgets easier to control and allows teams to act before a minor defect becomes a costly disruption.

## Office cleaning and facade work serve different needs

Office cleaning focuses on occupied areas such as floors, workstations, toilets, pantries, lobbies, lifts, and shared spaces. Exterior work deals with pollution, water spots, biological growth, and construction residue on glass, ACP, cladding, canopies, and walls, often beyond the reach of standard housekeeping equipment.

## When is high-rise cleaning needed?

Do not wait until a facade looks severely neglected. Use visual inspections and consider the building location, material, pollution exposure, season, and presentation standards. Cloudy glass, uneven water marks, biological growth, construction residue, and inaccessible gutters or signage are common reasons to schedule specialist cleaning.

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

Pro Rope supports glass and facade cleaning, inspection, and maintenance in difficult-to-reach areas using access methods suited to site conditions. Discuss your building requirements with our team so the scope, work method, risk controls, and result documentation can be planned from the start.' FROM posts WHERE slug='panduan-maintenance-dan-kebersihan-gedung';

INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'id','Memilih metode akses yang tepat untuk perawatan fasad','Pertimbangan keselamatan, waktu, dan area kerja sebelum proyek dimulai.','Pekerjaan di ketinggian membutuhkan keputusan metode yang tepat sebelum teknisi memasang tali pertama. Kondisi struktur, aktivitas di bawah, durasi kerja, dan kebutuhan akses ulang sama-sama memengaruhi rencana.

## Mulai dari kondisi nyata di lapangan

Survey membantu tim memahami titik anchor, jalur akses, potensi benda jatuh, kondisi cuaca, serta interaksi dengan operasional pengguna gedung.

> Metode akses yang efisien mengendalikan risiko sekaligus mendukung kualitas hasil pekerjaan.' FROM posts WHERE slug='memilih-metode-akses-untuk-fasad';
INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'en','Choosing the right access method for facade maintenance','Safety, timing, and work-area considerations before a project begins.','Work at height requires the right access decision before a technician installs the first rope. Structural conditions, activity below, work duration, and repeat access all shape the plan.

## Start with real site conditions

A survey helps the team understand anchor points, access routes, dropped-object risks, weather, and interaction with building operations.

> An efficient access method controls risk while supporting work quality.' FROM posts WHERE slug='memilih-metode-akses-untuk-fasad';
INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'zh','如何为外墙维护选择合适的作业方式','项目开始前需要综合考虑安全、工期和作业区域。','高空作业人员安装第一根绳索之前，就必须确定合适的作业方式。结构条件、下方活动、作业时间以及是否需要重复进入，都会影响整体计划。

## 从现场实际情况出发

现场勘查可以帮助团队了解锚点、通行路线、坠物风险、天气条件以及与建筑运营之间的影响。

> 高效的作业方式既要控制风险，也要保证工作质量。' FROM posts WHERE slug='memilih-metode-akses-untuk-fasad';
INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'ja','外壁メンテナンスに適したアクセス方法の選び方','プロジェクト開始前に、安全性・工期・作業範囲を総合的に検討します。','高所作業では、技術者が最初のロープを設置する前に、適切なアクセス方法を決める必要があります。構造の状態、下部の活動、作業期間、再アクセスの必要性が計画に影響します。

## 現場の実状から始める

現地調査により、アンカーポイント、アクセスルート、落下物リスク、天候、建物運用への影響を把握します。

> 効率的なアクセス方法とは、リスクを管理しながら作業品質を支える方法です。' FROM posts WHERE slug='memilih-metode-akses-untuk-fasad';

INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'id','Lima hal yang harus siap sebelum tim bekerja di ketinggian','Rescue plan adalah bagian aktif dari setiap pekerjaan vertikal.','Pekerjaan vertikal yang baik dimulai jauh sebelum tim naik. Kompetensi personel, inspeksi peralatan, metode kerja, pengendalian area, dan rescue plan harus benar-benar siap.

## Rescue plan harus spesifik

Rencana penyelamatan harus mempertimbangkan lokasi korban, jalur evakuasi, jumlah personel, sistem komunikasi, dan akses layanan darurat.' FROM posts WHERE slug='persiapan-tim-rescue';
INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'en','Five things to prepare before a team works at height','A rescue plan is an active part of every vertical job, not a supporting document.','Good vertical work begins long before the team leaves the ground. Competent personnel, inspected equipment, a work method, area controls, and a practical rescue plan must all be ready.

## The rescue plan must be specific

It must account for casualty location, evacuation route, team size, communication systems, and emergency-service access.' FROM posts WHERE slug='persiapan-tim-rescue';
INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'zh','高空作业团队必须提前准备的五件事','救援计划不是附属文件，而是每项垂直作业的重要组成部分。','可靠的垂直作业早在团队离开地面之前就已经开始。合格的人员、经过检查的设备、作业方法、区域管控以及可执行的救援计划都必须准备到位。

## 救援计划必须具体

计划必须考虑伤员位置、疏散路线、团队人数、通信系统以及紧急服务的进入方式。' FROM posts WHERE slug='persiapan-tim-rescue';
INSERT OR IGNORE INTO post_translations(post_id,locale,title,excerpt,body) SELECT id,'ja','高所作業チームが事前に準備すべき5つのこと','救助計画は補足資料ではなく、すべての高所作業を支える重要な要素です。','質の高い高所作業は、チームが地面を離れる前から始まります。適格な人員、点検済みの機材、作業方法、エリア管理、実行可能な救助計画を準備する必要があります。

## 救助計画は具体的に

要救助者の位置、避難経路、チーム人数、通信手段、緊急サービスの進入経路を考慮します。' FROM posts WHERE slug='persiapan-tim-rescue';
`
