import Link from "next/link";
import { Brand } from "./SiteHeader";
import { services, trainings } from "../data";
import { WhatsAppLink } from "./WhatsAppLink";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Brand inverse />
          <p>Layanan Rope Access Profesional untuk pekerjaan vertikal yang aman, efisien, dan tersertifikasi.</p>
          <a className="instagram-pill" href="https://www.instagram.com/prorope.id/" target="_blank" rel="noreferrer"><span>◎</span> @prorope.id ↗</a>
        </div>
        <div><h3>Services</h3>{services.slice(0, 5).map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>)}</div>
        <div><h3>Training</h3>{trainings.map(t => <Link key={t.slug} href={`/training/${t.slug}`}>{t.code}</Link>)}<Link href="/training/schedule">Schedule</Link></div>
        <div><h3>Contact</h3><p>Based in Yogyakarta, Indonesia</p><a href="mailto:contact@prorope.id">contact@prorope.id</a><WhatsAppLink href="https://wa.me/6282210401004" target="_blank" rel="noreferrer">+62 822-1040-1004 (Faris)</WhatsAppLink></div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Pro Rope Services.</span>
        <span>Safe • Efficient • Certified</span>
        <span>Website by <a href="https://codeverta.com" target="_blank" rel="noreferrer">Codeverta</a></span>
      </div>
    </footer>
  );
}
