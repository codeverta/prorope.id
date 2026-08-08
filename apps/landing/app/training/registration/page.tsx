import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { LeadForm } from "../../components/LeadForm";
import { SiteHeader } from "../../components/SiteHeader";
export const metadata: Metadata = { title: "Training Registration" };
export default function Registration() { return <><main className="form-page"><SiteHeader /><div className="shell form-page__grid"><div><p className="eyebrow">Training registration</p><h1>READY TO<br /><em>LEVEL UP?</em></h1><p>Pilih program yang Anda minati. Tim kami akan mengirimkan detail jadwal, biaya, persyaratan, dan tahapan pendaftaran.</p><div className="form-contact"><span>Prefer a quick chat?</span><a href="https://www.instagram.com/prorope.services/" target="_blank" rel="noreferrer">◎ @prorope.services ↗</a></div></div><div className="form-panel"><h2>Participant details</h2><LeadForm kind="training" /></div></div></main><Footer /></>; }
