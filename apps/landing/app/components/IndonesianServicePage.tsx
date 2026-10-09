import { Footer } from "./Footer";
import { SiteHeader } from "./SiteHeader";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WhatsAppLink } from "./WhatsAppLink";
import { indonesianServiceContent } from "../indonesian-service-content";
import { posts, projects, services } from "../data";

export function IndonesianServicePage({ slug }: { slug: "painting-blasting" | "rope-access" }) {
  const content = indonesianServiceContent[slug];
  const service = services.find(item => item.slug === slug)!;
  const relatedArticles = content.relatedArticles
    .map(articleSlug => posts.find(post => post.slug === articleSlug))
    .filter((post): post is (typeof posts)[number] => Boolean(post));
  const projectEvidence = content.projectSlugs
    .map(projectSlug => projects.find(project => project.slug === projectSlug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const contactMessage = `Halo Pro Rope, saya ingin konsultasi tentang ${content.h1}. Lokasi proyek: `;
  const whatsAppHref = `https://wa.me/6282210401004?text=${encodeURIComponent(contactMessage)}`;

  return <>
    <main className="overflow-hidden bg-[#f4f3ed] text-[#0b0d0c]">
      <section className="relative flex min-h-[640px] items-end overflow-hidden bg-[#090b0a] bg-cover bg-center text-white md:min-h-[700px]" style={{ backgroundImage: `linear-gradient(90deg,rgba(7,9,8,.96) 0%,rgba(7,9,8,.75) 50%,rgba(7,9,8,.24) 100%),url(${service.image})` }}>
        <SiteHeader dark />
        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 pb-20 pt-52 md:px-8 md:pb-24 md:pt-60">
          <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/70"><span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />{content.eyebrow}</p>
          <h1 className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(46px,8vw,104px)] font-extrabold uppercase leading-[.86] tracking-[-.04em]">{content.h1}</h1>
          <div className="mt-9 flex max-w-4xl flex-col gap-7 border-l-4 border-[#ffd100] pl-5 md:flex-row md:items-end md:justify-between md:pl-7">
            <p className="m-0 max-w-2xl text-base leading-7 text-white/80 md:text-lg">{content.summary}</p>
            <WhatsAppLink className="inline-flex shrink-0 items-center gap-3 self-start bg-[#ffd100] px-5 py-4 text-xs font-bold uppercase tracking-[.1em] text-black transition hover:-translate-y-1 hover:bg-white" href={whatsAppHref} target="_blank" rel="noreferrer">
              Konsultasi proyek <WhatsAppIcon width={16} height={16} />
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 md:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-neutral-600"><span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />Lingkup layanan</p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(42px,6vw,76px)] font-bold uppercase leading-[.9] tracking-[-.035em]">{content.scopeHeading}</h2>
          </div>
          <div>
            <p className="m-0 max-w-3xl text-lg leading-8 text-neutral-600">{content.scopeIntro}</p>
            <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
              {content.scope.map((item, index) => <li className="flex gap-5 py-5" key={item}><span className="mt-1 text-[10px] font-bold tracking-[.12em] text-[#b09200]">0{index + 1}</span><span className="text-base leading-7 md:text-lg">{item}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0d0c] py-20 text-white md:py-28">
        <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/65"><span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />Dari survei hingga serah terima</p>
          <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(42px,6vw,76px)] font-bold uppercase leading-[.9] tracking-[-.035em]">{content.procedureHeading}</h2>
          <div className="mt-10 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {content.procedure.map((step, index) => <article className="min-h-64 border-b border-r border-white/15 p-6 md:p-8" key={step.title}>
              <span className="text-[10px] font-bold tracking-[.15em] text-[#ffd100]">0{index + 1}</span>
              <h3 className="mt-12 font-[family-name:var(--font-display)] text-2xl font-semibold uppercase leading-tight md:text-[28px]">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/65">{step.description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e1] py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-neutral-600"><span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />Penawaran berdasarkan lingkup</p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(42px,6vw,76px)] font-bold uppercase leading-[.9] tracking-[-.035em]">{content.pricingHeading}</h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-600">{content.pricingIntro}</p>
            <a className="mt-6 inline-flex items-center gap-4 border-b border-black pb-2 text-xs font-bold uppercase tracking-[.12em] hover:text-[#806900]" href={`/id/news/${content.relatedArticles[0]}`}>Baca panduan terkait <span aria-hidden="true">↗</span></a>
          </div>
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {content.pricingFactors.map((item, index) => <li className="flex gap-5 py-5" key={item}><span className="mt-1 text-[10px] font-bold tracking-[.12em] text-[#b09200]">0{index + 1}</span><span className="text-base leading-7">{item}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 md:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-neutral-600"><span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />Jangkauan layanan</p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(42px,6vw,76px)] font-bold uppercase leading-[.9] tracking-[-.035em]">{content.locationHeading}</h2>
          </div>
          <div className="border-l-4 border-[#ffd100] bg-white/65 p-6 md:p-9">
            <p className="m-0 max-w-3xl text-lg leading-8 text-neutral-700">{content.locationCopy}</p>
            <a className="mt-6 inline-flex items-center gap-4 border-b border-black pb-2 text-xs font-bold uppercase tracking-[.12em]" href="/id/contact">Kirim lokasi proyek <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      {projectEvidence.length > 0 && <section className="bg-[#0b0d0c] py-20 text-white md:py-28">
        <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/65"><span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />Portofolio Pro Rope</p><h2 className="font-[family-name:var(--font-display)] text-[clamp(42px,6vw,76px)] font-bold uppercase leading-[.9] tracking-[-.035em]">{content.projectHeading}</h2></div>
            <a className="inline-flex items-center gap-4 border-b border-white/50 pb-2 text-xs font-bold uppercase tracking-[.12em]" href="/id/projects">Lihat portofolio <span aria-hidden="true">↗</span></a>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-white/60">Lokasi berikut mengikuti catatan portofolio yang tersedia; proyek-proyek ini bukan klaim pekerjaan di Yogyakarta.</p>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projectEvidence.map(project => <a className="group min-h-64 bg-cover bg-center p-6 transition hover:-translate-y-1" href="/id/projects" key={project.slug} style={{ backgroundImage: `linear-gradient(0deg,rgba(7,9,8,.92),rgba(7,9,8,.15)),url(${project.image})` }}>
              <span className="text-xs font-bold uppercase tracking-[.12em] text-[#ffd100]">{project.category} · {project.year}</span>
              <div className="mt-24"><h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold uppercase leading-tight">{project.title}</h3><p className="mt-2 text-sm text-white/75">Lokasi: {project.location}</p></div>
            </a>)}
          </div>
        </div>
      </section>}

      <section className="py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 md:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div><p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-neutral-600"><span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />Pertanyaan umum</p><h2 className="font-[family-name:var(--font-display)] text-[clamp(42px,6vw,76px)] font-bold uppercase leading-[.9] tracking-[-.035em]">Sebelum meminta penawaran</h2></div>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {content.faqs.map(item => <details className="group py-5" key={item.question}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold leading-7 marker:hidden">{item.question}<span className="text-2xl text-[#a98900] transition group-open:rotate-45" aria-hidden="true">+</span></summary>
              <p className="mb-1 mt-4 max-w-3xl text-base leading-7 text-neutral-600">{item.answer}</p>
            </details>)}
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && <section className="bg-[#e9e8e1] py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8"><div className="mb-8 flex items-end justify-between gap-6"><div><p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-neutral-600">Bacaan lanjutan</p><h2 className="font-[family-name:var(--font-display)] text-4xl font-bold uppercase leading-none">Panduan sebelum proyek</h2></div><a className="border-b border-black pb-2 text-xs font-bold uppercase tracking-[.12em]" href="/id/news">Semua artikel ↗</a></div>
          <div className="grid gap-4 md:grid-cols-2">{relatedArticles.map(post => <a className="bg-white/75 p-6 transition hover:bg-white md:p-8" href={`/id/news/${post.slug}`} key={post.slug}><span className="text-[10px] font-bold uppercase tracking-[.13em] text-neutral-500">{post.category}</span><h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold uppercase leading-tight">{post.title}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">{post.excerpt}</p><span className="mt-5 inline-block text-xs font-bold uppercase tracking-[.12em]">Baca artikel ↗</span></a>)}</div>
        </div>
      </section>}

      <section className="bg-[#ffd100] py-14 md:py-20">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-8">
          <div><p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em]">Langkah berikutnya</p><h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(40px,6vw,72px)] font-bold uppercase leading-[.9]">Diskusikan lingkup dan lokasi pekerjaan</h2><p className="mt-4 max-w-2xl text-base leading-7">Kirim kebutuhan awal, foto, alamat proyek, dan target waktu. Tim akan mengonfirmasi informasi yang diperlukan untuk survei dan penawaran.</p></div>
          <WhatsAppLink className="inline-flex shrink-0 items-center gap-3 bg-[#0b0d0c] px-6 py-5 text-xs font-bold uppercase tracking-[.12em] text-white transition hover:bg-white hover:text-black" href={whatsAppHref} target="_blank" rel="noreferrer">WhatsApp Pro Rope <WhatsAppIcon width={16} height={16} /></WhatsAppLink>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
