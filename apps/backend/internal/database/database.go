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
