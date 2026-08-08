import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { LeadForm } from "../components/LeadForm";
import { SiteHeader } from "../components/SiteHeader";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() { return <><main className="form-page"><SiteHeader /><div className="shell form-page__grid"><div><p className="eyebrow">Start a project</p><h1>LET’S REACH<br /><em>THE ANSWER.</em></h1><p>Ceritakan kebutuhan, lokasi, dan target waktu Anda. Kami akan membantu menyusun langkah awal yang masuk akal.</p><div className="contact-details"><div><span>Based in</span><strong>Yogyakarta, Indonesia</strong></div><div><span>Email</span><a href="mailto:hello@prorope.id">hello@prorope.id</a></div><div><span>Instagram</span><a href="https://www.instagram.com/prorope.services/" target="_blank" rel="noreferrer">@prorope.services ↗</a></div></div></div><div className="form-panel"><h2>Project details</h2><LeadForm /></div></div></main><Footer /></>; }
