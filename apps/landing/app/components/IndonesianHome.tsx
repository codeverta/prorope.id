import { Footer } from "./Footer";
import { SiteHeader } from "./SiteHeader";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WhatsAppLink } from "./WhatsAppLink";
import { posts, projects } from "../data";

const priorityServices = [
  { href: "/id/services/painting-blasting", title: "Jasa pengecatan gedung di Jogja", summary: "Pengecatan fasad, eksterior, dan struktur dengan lingkup, persiapan permukaan, serta metode akses yang ditetapkan setelah survei." },
  { href: "/id/services/rope-access", title: "Jasa rope access Jogja & Yogyakarta", summary: "Akses tali untuk pembersihan, pengecatan, perawatan, dan inspeksi pada area tinggi apabila sesuai kondisi dan risiko lokasi." },
  { href: "/id/services/maintenance", title: "Perawatan fasad dan gedung", summary: "Diskusikan perawatan sealant, kebocoran, cladding, serta komponen eksterior yang membutuhkan akses khusus." },
  { href: "/id/services/cleaning", title: "Pembersihan kaca dan fasad", summary: "Rencanakan metode pembersihan berdasarkan material, noda, akses, dan perlindungan area di bawah pekerjaan." },
];

const featuredArticles = ["biaya-pengecatan-gedung-faktor-penawaran", "memilih-metode-akses-untuk-fasad"]
  .map(slug => posts.find(post => post.slug === slug))
  .filter((post): post is (typeof posts)[number] => Boolean(post));

export function IndonesianHome() {
  return <>
    <main data-scroll-reveal-root>
      <section className="hero">
        <SiteHeader dark />
        <div className="shell hero__content">
          <p className="eyebrow eyebrow--light">Pro Rope Services · Berbasis di Yogyakarta</p>
          <h1>JASA ROPE ACCESS<br /><em>& PENGECATAN</em><br />GEDUNG DI JOGJA</h1>
          <p className="hero__lead">Pekerjaan fasad dan area tinggi dimulai dari survei, pemilihan metode akses, pengendalian risiko, serta lingkup hasil yang jelas.</p>
          <div className="hero__actions">
            <WhatsAppLink className="button" href="https://wa.me/6282210401004?text=Halo%20Pro%20Rope%2C%20saya%20ingin%20konsultasi%20pekerjaan%20gedung.%20Lokasi%20proyek%3A%20" target="_blank" rel="noreferrer">Konsultasi Proyek <WhatsAppIcon width={16} height={16} className="button__icon" /></WhatsAppLink>
            <a className="text-link text-link--light" href="/id/services">Lihat layanan <span>→</span></a>
          </div>
          <div className="hero__meta"><span><b>01</b> Survei lokasi</span><span><b>02</b> Metode sesuai risiko</span><span><b>03</b> Berbasis di Yogyakarta</span></div>
        </div>
        <div className="hero__sidecopy">AKSES • PENGECATAN • PERAWATAN</div>
      </section>

      <section className="intro section">
        <div className="shell intro-grid"><div><p className="eyebrow">Pekerjaan di ketinggian</p><h2 className="display-title">Solusi untuk fasad dan area yang <em>sulit dijangkau.</em></h2></div><div className="intro-copy"><p>Pro Rope Services berbasis di Yogyakarta dan menangani pekerjaan akses tali serta pekerjaan gedung seperti pembersihan fasad, pengecatan, perawatan, dan inspeksi sesuai lingkup yang disepakati.</p><p>Setiap lokasi perlu ditinjau terlebih dahulu. Metode rope access tidak otomatis menjadi pilihan untuk semua gedung atau semua jenis pekerjaan.</p><a className="text-link" href="/id/about">Tentang Pro Rope <span>→</span></a></div></div>
        <div className="shell metric-strip"><div><strong>01</strong><span>Mulai dari kondisi lokasi</span></div><div><strong>02</strong><span>Metode dan lingkup disepakati</span></div><div><strong>03</strong><span>Risiko kerja direncanakan</span></div><div><strong>ID</strong><span>Berbasis di Yogyakarta</span></div></div>
      </section>

      <section className="services-section section section--dark">
        <div className="shell section-heading section-heading--split"><div><p className="eyebrow eyebrow--light">Layanan prioritas</p><h2 className="display-title">Pengecatan gedung<br />dan <em>rope access.</em></h2></div><p>Ruang lingkup, akses, jadwal, dan penawaran disesuaikan dengan informasi serta kondisi proyek yang sebenarnya.</p></div>
        <div className="shell service-list">{priorityServices.map((service, index) => <a className="service-row" href={service.href} key={service.href}><span className="service-row__number">0{index + 1}</span><span className="service-row__icon">{index < 2 ? "↗" : "◆"}</span><div><h3>{service.title}</h3><p>{service.summary}</p></div><span className="service-row__arrow">↗</span></a>)}</div>
      </section>

      <section className="visual-break"><div className="visual-break__image" /><div className="shell visual-break__card"><p className="eyebrow eyebrow--light">Metode kerja</p><h2>Metode akses<br />mengikuti kondisi.</h2><p>Anchor, bentuk gedung, area kerja, aktivitas di bawah, cuaca, dan kebutuhan akses ulang ikut menentukan pilihan metode.</p><a className="button button--light" href="/id/news/memilih-metode-akses-untuk-fasad">Bandingkan metode akses <span>↗</span></a></div></section>

      <section className="section projects-preview"><div className="shell section-heading section-heading--split"><div><p className="eyebrow">Portofolio Pro Rope</p><h2 className="display-title">Contoh pekerjaan<br /><em>di lapangan.</em></h2></div><div><p>Lokasi yang tercantum adalah lokasi dalam catatan portofolio, bukan klaim bahwa proyek tersebut dikerjakan di Yogyakarta.</p><a className="text-link" href="/id/projects">Lihat portofolio <span>→</span></a></div></div><div className="project-marquee">{projects.slice(0, 4).map((project, index) => <a className={`project-tile project-tile--${index + 1}`} href="/id/projects" key={project.slug} style={{ backgroundImage: `linear-gradient(0deg,rgba(7,9,8,.85),transparent 70%),url(${project.image})` }}><span>{project.category} · {project.year}</span><h3>{project.title}</h3><p>{project.location} ↗</p></a>)}</div></section>

      <section className="section values-section"><div className="shell"><p className="eyebrow">Cara kerja</p><div className="value-grid"><article><span>01</span><h3>Survei sebelum metode</h3><p>Lokasi dan lingkup ditinjau sebelum akses, peralatan, dan tahapan kerja ditentukan.</p></article><article><span>02</span><h3>Pengendalian risiko</h3><p>Perlindungan area, potensi benda jatuh, koordinasi penghuni, dan rencana penyelamatan perlu dipertimbangkan.</p></article><article><span>03</span><h3>Lingkup yang disepakati</h3><p>Target pekerjaan, batas tanggung jawab, kriteria pemeriksaan, dan dokumentasi dibahas sebelum pelaksanaan.</p></article><article><span>04</span><h3>Penawaran berdasarkan kebutuhan</h3><p>Biaya dipengaruhi permukaan, akses, spesifikasi, waktu, mobilisasi, serta pengamanan lokasi.</p></article></div></div></section>

      <section className="section news-preview"><div className="shell section-heading section-heading--split"><div><p className="eyebrow">Panduan proyek</p><h2 className="display-title">Informasi sebelum<br /><em>memulai kerja.</em></h2></div><a className="text-link" href="/id/news">Semua artikel <span>→</span></a></div><div className="shell news-grid">{featuredArticles.map(post => <a href={`/id/news/${post.slug}`} className="news-card" key={post.slug}><div className="news-card__image" style={{ backgroundImage: `url(${post.image})` }} /><div><span>{post.category} · {post.date}</span><h3>{post.title}</h3><p>{post.excerpt}</p><i>Baca panduan →</i></div></a>)}</div></section>

      <section className="contact-band"><div className="shell contact-band__grid"><div><p className="eyebrow eyebrow--light">Minta survei dan penawaran</p><h2>Ceritakan kondisi proyek Anda.</h2><p>Kirim lokasi, foto area, jenis pekerjaan, kondisi permukaan, dan target waktu. Tim akan mengonfirmasi informasi berikutnya yang diperlukan.</p><a className="instagram-pill" href="/id/contact">Formulir kontak ↗</a></div><WhatsAppLink className="button button--light" href="https://wa.me/6282210401004?text=Halo%20Pro%20Rope%2C%20saya%20ingin%20konsultasi%20pekerjaan%20gedung.%20Lokasi%20proyek%3A%20" target="_blank" rel="noreferrer">WhatsApp Pro Rope <WhatsAppIcon width={16} height={16} /></WhatsAppLink></div></section>
    </main>
    <Footer />
  </>;
}
