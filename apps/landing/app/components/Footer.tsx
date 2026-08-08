import { Brand } from "./SiteHeader";
import { services, trainings } from "../data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Brand inverse />
          <p>Layanan Rope Access Profesional untuk pekerjaan vertikal yang aman, efisien, dan tersertifikasi.</p>
          <a className="instagram-pill" href="https://www.instagram.com/prorope.services/" target="_blank" rel="noreferrer"><span>◎</span> @prorope.services ↗</a>
        </div>
        <div><h3>Services</h3>{services.slice(0, 5).map(s => <a key={s.slug} href={`/services/${s.slug}`}>{s.title}</a>)}</div>
        <div><h3>Training</h3>{trainings.map(t => <a key={t.slug} href={`/training/${t.slug}`}>{t.code}</a>)}<a href="/training/schedule">Schedule</a></div>
        <div><h3>Contact</h3><p>Based in Yogyakarta, Indonesia</p><a href="mailto:hello@prorope.id">hello@prorope.id</a><a href="tel:+6280000000000">+62 800 0000 0000</a></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Pro Rope Services.</span><span>Safe • Efficient • Certified</span></div>
    </footer>
  );
}
