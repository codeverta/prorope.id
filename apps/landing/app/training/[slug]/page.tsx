import { Footer } from "../../components/Footer";
import { PageHero } from "../../components/PageHero";
import { trainings } from "../../data";

export function generateStaticParams() { return trainings.map(t => ({ slug: t.slug })); }

export default async function TrainingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = trainings.find(t => t.slug === slug) || trainings[0];
  return <>
    <main>
      <PageHero eyebrow={`${training.code} training`} title={training.title.toUpperCase()} text={training.summary} image="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1800&q=90" />
      <section className="section">
        <div className="shell training-detail">
          <div><p className="eyebrow">Program overview</p><h2 className="display-title">Learn it.<br /><em>Practice it.</em></h2><p className="detail-lead">{training.overview}</p><div className="training-facts"><div><span>Duration</span><strong>{training.duration}</strong></div><div><span>Certification</span><strong>{training.certification}</strong></div><div><span>Location</span><strong>Yogyakarta / On-site</strong></div></div></div>
          <aside><p className="eyebrow">Key modules</p>{training.modules.map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}<a className="button" href="/training/registration">Register interest <span>↗</span></a></aside>
        </div>
      </section>
      <section className="section curriculum-section">
        <div className="shell curriculum-grid">
          <article><span className="curriculum-index">01</span><p className="eyebrow">Who should attend</p><h2>Designed for the team.</h2><ul>{training.audience.map(item => <li key={item}>{item}</li>)}</ul></article>
          <article><span className="curriculum-index">02</span><p className="eyebrow">Learning outcomes</p><h2>Skills after training.</h2><ul>{training.outcomes.map(item => <li key={item}>{item}</li>)}</ul></article>
          <article><span className="curriculum-index">03</span><p className="eyebrow">Requirements</p><h2>Before you attend.</h2><ul>{training.requirements.map(item => <li key={item}>{item}</li>)}</ul></article>
        </div>
      </section>
      <section className="section training-method"><div className="shell"><p className="eyebrow eyebrow--light">Learning method</p><h2>Brief. Demonstrate. Practice. Evaluate.</h2><p>Instruktur menjelaskan prinsip dan risiko, mendemonstrasikan teknik, lalu mendampingi praktik berulang sebelum peserta menghadapi skenario evaluasi.</p><div><span>Classroom</span><span>Hands-on practice</span><span>Team scenario</span><span>Assessment</span></div></div></section>
      <section className="section about-cta"><div className="shell about-cta__inner"><div><p className="eyebrow">Need a private class?</p><h2 className="display-title">Bring the training<br /><em>to your team.</em></h2></div><div className="training-cta-stack"><a className="button" href="/training/registration">Register now <span>↗</span></a><a className="text-link" href="/contact">Discuss an in-house class →</a></div></div></section>
    </main>
    <Footer />
  </>;
}
