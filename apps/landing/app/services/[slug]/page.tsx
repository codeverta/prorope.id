import { Footer } from "../../components/Footer";
import { PageHero } from "../../components/PageHero";
import { services, values } from "../../data";

export function generateStaticParams() { return services.map(s => ({ slug: s.slug })); }

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug) || services[0];
  return <>
    <main>
      <PageHero eyebrow={service.eyebrow} title={service.title.toUpperCase()} text={service.summary} image={service.image} />
      <section className="section">
        <div className="shell detail-layout">
          <aside><p className="eyebrow">Service scope</p>{services.map(s => <a className={s.slug === service.slug ? "active" : ""} href={`/services/${s.slug}`} key={s.slug}>{s.title}<span>→</span></a>)}</aside>
          <article>
            <p className="eyebrow">The approach</p>
            <h2 className="display-title">Access precisely.<br /><em>Execute safely.</em></h2>
            <p className="detail-lead">{service.description}</p>
            <div className="capability-grid">{service.capabilities.map((item, i) => <div key={item}><span>0{i + 1}</span><h3>{item}</h3><p>Metode dan kontrol kualitas ditentukan berdasarkan kondisi lokasi, material, serta target hasil pekerjaan.</p></div>)}</div>
          </article>
        </div>
      </section>
      <section className="section detail-content-section">
        <div className="shell detail-content-grid">
          <article><p className="eyebrow">Typical applications</p><h2>Where we can help.</h2><ul>{service.applications.map((item, i) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ul></article>
          <article><p className="eyebrow">What you receive</p><h2>Clear project outputs.</h2><ul>{service.deliverables.map((item, i) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ul></article>
        </div>
        <div className="shell assurance-note"><span>Safety assurance</span><p>{service.assurance}</p></div>
      </section>
      <section className="section process-section"><div className="shell"><p className="eyebrow eyebrow--light">Project flow</p><div className="value-grid value-grid--dark">{["Site conversation", "Survey & method", "Safe execution", "Report & handover"].map((item, i) => <article key={item}><span>0{i + 1}</span><h3>{item}</h3><p>{values[i].text}</p></article>)}</div></div></section>
      <section className="section about-cta"><div className="shell about-cta__inner"><h2 className="display-title">Ready to discuss<br /><em>{service.title}?</em></h2><a className="button" href="/contact">Request a quote <span>↗</span></a></div></section>
    </main>
    <Footer />
  </>;
}
