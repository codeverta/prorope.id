import { Footer } from "./components/Footer";
import { LeadForm } from "./components/LeadForm";
import { SiteHeader } from "./components/SiteHeader";
import { ScrollReveal } from "./components/ScrollReveal";
import { HeroCarousel } from "./components/HeroCarousel";
import { HeroRope } from "./components/HeroRope";
import { posts, projects, services, trainings, values } from "./data";

export default function Home() {
  return <>
    <ScrollReveal />
    <main data-scroll-reveal-root>
      <section className="hero">
        <SiteHeader dark />
        <HeroCarousel />
        <HeroRope />
        <div className="shell hero__content">
          <p className="eyebrow eyebrow--light">Professional rope access · Yogyakarta</p>
          <h1 data-no-translate><em>BEYOND</em><br />DIFFICULT<br />ACCESS</h1>
          <p className="hero__lead">Pekerjaan vertikal yang aman, efisien, dan presisi—dari inspeksi hingga perawatan gedung.</p>
          <div className="hero__actions"><a className="button" href="https://wa.me/6282210401004" target="_blank" rel="noreferrer">WhatsApp Sekarang <svg className="button__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.45L3.5 20.5l1.4-4.25A8.5 8.5 0 1 1 20.5 11.7Z" /><path d="M8.2 7.65c.25-.3.58-.27.83-.08l1.16 1.48c.2.25.15.53-.03.78l-.58.73c-.16.2-.12.43 0 .64.54.94 1.3 1.7 2.24 2.25.22.12.45.16.65 0l.78-.62c.24-.2.52-.23.77-.04l1.42 1.08c.28.21.31.55.1.84-.48.66-1.23 1.05-2.05.95-1.67-.2-3.7-1.52-5.12-2.94-1.4-1.42-2.71-3.42-2.9-5.07-.1-.78.28-1.52.81-2Z" /></svg></a><a className="text-link text-link--light" href="/services">Explore services <span>→</span></a></div>
          <div className="hero__meta"><span><b>01</b> Safe by design</span><span><b>02</b> Certified team</span><span><b>03</b> Based in Yogyakarta</span></div>
        </div>
        <div className="hero__sidecopy">SAFE • EFFICIENT • CERTIFIED</div>
      </section>

      <section className="intro section">
        <div className="shell intro-grid"><div><p className="eyebrow">Who we are</p><h2 className="display-title">Solusi untuk tempat yang <em>sulit dijangkau.</em></h2></div><div className="intro-copy"><p>Pro Rope Services adalah tim profesional rope access untuk painting, glass cleaning, sealant, building maintenance, inspeksi, dan pekerjaan teknis di ketinggian.</p><p>Metode kami menjaga area kerja tetap ringkas, mobilisasi cepat, dan hasil dapat dipertanggungjawabkan.</p><a className="text-link" href="/about">Tentang Pro Rope <span>→</span></a></div></div>
        <div className="shell metric-strip"><div><strong>100%</strong><span>Safety-first mindset</span></div><div><strong>360°</strong><span>Vertical access capability</span></div><div><strong>24/7</strong><span>Project consultation</span></div><div><strong>ID</strong><span>Local team, national reach</span></div></div>
      </section>

      <section className="services-section section section--dark">
        <div className="shell section-heading section-heading--split"><div><p className="eyebrow eyebrow--light">Our expertise</p><h2 className="display-title">Built for the<br /><em>vertical world.</em></h2></div><p>Satu tim, beberapa disiplin, dengan metode kerja yang disesuaikan pada risiko dan kondisi setiap lokasi.</p></div>
        <div className="shell service-list">{services.map((service, index) => <a className="service-row" href={`/services/${service.slug}`} key={service.slug}><span className="service-row__number">0{index + 1}</span><span className="service-row__icon">{service.icon}</span><div><h3>{service.title}</h3><p>{service.summary}</p></div><span className="service-row__arrow">↗</span></a>)}</div>
      </section>

      <section className="visual-break"><div className="visual-break__image" /><div className="shell visual-break__card"><p className="eyebrow eyebrow--light">Why rope access</p><h2>No scaffold.<br />No compromise.</h2><p>Akses cepat ke area kompleks dengan jejak kerja minimal—tanpa mengurangi standar keselamatan dan kualitas.</p><a className="button button--light" href="/services">See our approach <span>↗</span></a></div></section>

      <section className="section training-preview"><div className="shell section-heading section-heading--split"><div><p className="eyebrow">Training programs</p><h2 className="display-title">Skills that keep<br />people <em>safe.</em></h2></div><div><p>Pelatihan berbasis praktik untuk pekerja, teknisi, dan emergency response team.</p><a className="text-link" href="/training/schedule">Lihat jadwal <span>→</span></a></div></div>
        <div className="shell training-grid">{trainings.map((item, i) => <a className="training-card" href={`/training/${item.slug}`} key={item.slug}><span>0{i + 1}</span><b>{item.code}</b><h3>{item.title}</h3><p>{item.summary}</p><i>Explore program ↗</i></a>)}</div>
      </section>

      <section className="section projects-preview"><div className="shell section-heading section-heading--split"><div><p className="eyebrow">Selected work</p><h2 className="display-title">Proof at<br /><em>every height.</em></h2></div><a className="text-link" href="/projects">View all projects <span>→</span></a></div><div className="project-marquee">{projects.slice(0, 4).map((project, i) => <a className={`project-tile project-tile--${i + 1}`} href="/projects" key={project.title} style={{ backgroundImage: `linear-gradient(0deg,rgba(7,9,8,.85),transparent 70%),url(${project.image})` }}><span>{project.category} · {project.year}</span><h3>{project.title}</h3><p>{project.location} ↗</p></a>)}</div></section>

      <section className="section values-section"><div className="shell"><p className="eyebrow">How we work</p><div className="value-grid">{values.map(value => <article key={value.number}><span>{value.number}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></div></section>

      <section className="section news-preview"><div className="shell section-heading section-heading--split"><div><p className="eyebrow">Field notes</p><h2 className="display-title">Knowledge from<br /><em>the field.</em></h2></div><a className="text-link" href="/news">All stories <span>→</span></a></div><div className="shell news-grid">{posts.map(post => <a href={`/news/${post.slug}`} className="news-card" key={post.slug}><div className="news-card__image" style={{ backgroundImage: `url(${post.image})` }} /><div><span>{post.category} · {post.date}</span><h3>{post.title}</h3><p>{post.excerpt}</p><i>Read story →</i></div></a>)}</div></section>

      <section className="contact-band"><div className="shell contact-band__grid"><div><p className="eyebrow eyebrow--light">Start a conversation</p><h2>Got a hard-to-reach challenge?</h2><p>Kirim kebutuhan singkat Anda. Kami akan membantu menilai metode akses, risiko, dan langkah berikutnya.</p><a className="instagram-pill" href="https://www.instagram.com/prorope.id/" target="_blank" rel="noreferrer">◎ @prorope.id ↗</a></div><LeadForm compact /></div></section>
    </main><Footer />
  </>;
}
