import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { PageHero } from "../../components/PageHero";
import { trainings } from "../../data";
import { trainingHeroImages } from "../../media";

export function generateStaticParams() { return trainings.map(training => ({ slug: training.slug })); }

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] ${light ? "text-white/60" : "text-neutral-600"}`}>
      <span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />
      {children}
    </p>
  );
}

export default async function TrainingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = trainings.find(item => item.slug === slug);
  if (!training) notFound();

  const curriculum = [
    { index: "01", label: "Who should attend", title: "Designed for the team.", items: training.audience },
    { index: "02", label: "Learning outcomes", title: "Skills after training.", items: training.outcomes },
    { index: "03", label: "Requirements", title: "Before you attend.", items: training.requirements },
  ];

  return (
    <>
      <main className="overflow-hidden bg-[#f4f3ed] text-[#0b0d0c]">
        <PageHero eyebrow={`${training.code} training`} title={training.title.toUpperCase()} text={training.summary} image={trainingHeroImages[training.slug]} />

        <section className="py-20 md:py-28 lg:py-32">
          <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-6 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:gap-20">
            <article>
              <SectionLabel>Program overview</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(52px,7vw,96px)] font-bold uppercase leading-[.86] tracking-[-.035em]">
                Learn it.<br /><span className="text-[#e7bd00]">Practice it.</span>
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-600 md:text-[21px] md:leading-9">{training.overview}</p>

              <dl className="mt-12 grid border-l border-t border-black/10 sm:grid-cols-3">
                {[
                  ["Duration", training.duration],
                  ["Certification", training.certification],
                  ["Location", "Yogyakarta / On-site"],
                ].map(([label, value]) => (
                  <div className="min-h-28 border-b border-r border-black/10 bg-white/35 p-5" key={label}>
                    <dt className="text-[9px] font-bold uppercase tracking-[.14em] text-neutral-500">{label}</dt>
                    <dd className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold uppercase leading-tight">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <aside className="self-start border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(11,13,12,.06)] md:p-8 lg:sticky lg:top-36">
              <SectionLabel>Key modules</SectionLabel>
              <div className="divide-y divide-black/10 border-t border-black/10">
                {training.modules.map((item, index) => (
                  <div className="grid grid-cols-[42px_1fr] gap-3 py-5" key={item}>
                    <span className="text-[10px] font-bold tracking-[.14em] text-[#d7ae00]">0{index + 1}</span>
                    <strong className="font-[family-name:var(--font-display)] text-xl font-semibold uppercase leading-tight">{item}</strong>
                  </div>
                ))}
              </div>
              <a className="group mt-8 inline-flex w-full items-center justify-between gap-8 bg-[#ffd100] px-6 py-5 text-xs font-bold uppercase tracking-[.12em] transition hover:-translate-y-1 hover:bg-[#0b0d0c] hover:text-white" href="/training/registration">
                Register interest <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
              </a>
            </aside>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-[1240px] border-l border-t border-black/10 px-0 md:grid-cols-3">
            {curriculum.map(card => (
              <article className="min-w-0 border-b border-r border-black/10 p-7 md:p-8 lg:p-10" key={card.index}>
                <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-[#e7bd00]">{card.index}</span>
                <div className="mt-10"><SectionLabel>{card.label}</SectionLabel></div>
                <h2 className="font-[family-name:var(--font-display)] text-[36px] font-semibold uppercase leading-[.95]">{card.title}</h2>
                <ul className="mt-8 divide-y divide-black/10 border-t border-black/10">
                  {card.items.map(item => <li className="flex gap-3 py-4 text-sm leading-6 text-neutral-600" key={item}><span className="font-bold text-[#d7ae00]">+</span>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#0b0d0c] py-20 text-white md:py-28 lg:py-32">
          <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 md:px-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionLabel light>Learning method</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(54px,7vw,94px)] font-bold uppercase leading-[.84] tracking-[-.035em]">Brief.<br />Demonstrate.<br /><span className="text-[#ffd100]">Practice.</span><br />Evaluate.</h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="max-w-xl text-base leading-8 text-white/60 md:text-lg">Instruktur menjelaskan prinsip dan risiko, mendemonstrasikan teknik, lalu mendampingi praktik berulang sebelum peserta menghadapi skenario evaluasi.</p>
              <div className="mt-10 grid border-l border-t border-white/15 sm:grid-cols-2">
                {["Classroom", "Hands-on practice", "Team scenario", "Assessment"].map((item, index) => (
                  <span className="border-b border-r border-white/15 p-5 text-[10px] font-bold uppercase tracking-[.14em] text-[#ffd100]" key={item}>0{index + 1} · {item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 bg-[#e9e8e1] py-20 md:py-28">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start justify-between gap-10 px-6 md:px-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel>Need a private class?</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(52px,8vw,106px)] font-bold uppercase leading-[.84] tracking-[-.035em]">Bring the training<br /><span className="text-[#e7bd00]">to your team.</span></h2>
            </div>
            <div className="flex flex-col items-start gap-5">
              <a className="group inline-flex min-w-56 items-center justify-between gap-8 bg-[#ffd100] px-6 py-5 text-xs font-bold uppercase tracking-[.12em] transition hover:-translate-y-1 hover:bg-[#0b0d0c] hover:text-white" href="/training/registration">Register now <span className="transition-transform group-hover:translate-x-1">↗</span></a>
              <a className="border-b border-black pb-2 text-[10px] font-bold uppercase tracking-[.14em] transition hover:border-[#d7ae00] hover:text-[#a58400]" href="/contact">Discuss an in-house class →</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
