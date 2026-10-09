import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import { Footer } from "../../components/Footer";
import { IndonesianServicePage } from "../../components/IndonesianServicePage";
import { SiteHeader } from "../../components/SiteHeader";
import { normalizeLocale } from "../../seo";
import { services, values } from "../../data";

export function generateStaticParams() { return services.map(service => ({ slug: service.slug })); }

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] ${light ? "text-white/65" : "text-neutral-600"}`}>
      <span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />
      {children}
    </p>
  );
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  const locale = normalizeLocale((await headers()).get("x-prorope-locale"));
  if (locale === "id" && (slug === "painting-blasting" || slug === "rope-access")) {
    return <IndonesianServicePage slug={slug} />;
  }
  const isInspection = service.slug === "inspection";

  return (
    <>
      <main className="overflow-hidden bg-[#f4f3ed] text-[#0b0d0c]">
        <section
          className={`relative flex min-h-[680px] items-end overflow-hidden bg-[#090b0a] text-white ${isInspection ? "inspection-service-hero" : ""}`}
          style={isInspection ? undefined : { backgroundImage: `linear-gradient(90deg,rgba(7,9,8,.94) 0%,rgba(7,9,8,.72) 42%,rgba(7,9,8,.18) 100%),url(${service.image})`, backgroundPosition: "center", backgroundSize: "cover" }}
        >
          <SiteHeader dark />
          {isInspection && <div className="inspection-service-hero__gallery" aria-label="Dokumentasi pekerjaan inspeksi">
            <figure><Image fill unoptimized sizes="(max-width: 767px) 50vw, 28vw" src="/images/revisi/services/inspection.webp" alt="Teknisi melakukan inspeksi di area atap" /></figure>
            <figure><Image fill unoptimized sizes="(max-width: 767px) 50vw, 28vw" src="/images/revisi/services/inspection-2.webp" alt="Teknisi menyiapkan akses tali untuk pekerjaan inspeksi" /></figure>
          </div>}
          <div className={`relative z-10 mx-auto w-full max-w-[1240px] px-6 pb-20 pt-52 md:px-8 md:pb-24 md:pt-60 ${isInspection ? "inspection-service-hero__content" : ""}`}>
            <SectionLabel light>{service.eyebrow}</SectionLabel>
            <h1 className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(64px,10vw,144px)] font-extrabold uppercase leading-[.78] tracking-[-.04em]">
              {service.title}
            </h1>
            <div className="mt-9 flex max-w-3xl flex-col gap-7 border-l-4 border-[#ffd100] pl-5 md:flex-row md:items-end md:justify-between md:pl-7">
              <p className="m-0 max-w-2xl text-base leading-7 text-white/75 md:text-lg">{service.summary}</p>
              <a href="/contact" className="inline-flex shrink-0 items-center gap-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#ffd100] transition hover:gap-6 hover:text-white">
                Request a quote <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 lg:py-32">
          <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-6 md:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
            <aside className="self-start lg:sticky lg:top-36">
              <SectionLabel>Service scope</SectionLabel>
              <nav className="overflow-hidden border border-black/10 bg-white/45" aria-label="Service scope">
                {services.map((item, index) => (
                  <a
                    className={`group flex items-center gap-3 border-b border-black/10 px-4 py-4 text-sm transition last:border-b-0 hover:bg-white ${item.slug === service.slug ? "bg-[#ffd100] font-bold" : ""}`}
                    href={`/services/${item.slug}`}
                    key={item.slug}
                  >
                    <span className={`text-[9px] tracking-[.12em] ${item.slug === service.slug ? "text-black/60" : "text-neutral-500"}`}>0{index + 1}</span>
                    <span className="flex-1 leading-5">{item.title}</span>
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </a>
                ))}
              </nav>
            </aside>

            <article className="min-w-0">
              <SectionLabel>The approach</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(50px,7vw,96px)] font-bold uppercase leading-[.88] tracking-[-.035em]">
                Access precisely.<br /><span className="text-[#e7bd00]">Execute safely.</span>
              </h2>
              <p className="mt-8 max-w-4xl text-lg leading-8 text-neutral-600 md:text-[22px] md:leading-9">{service.description}</p>

              <div className="mt-14 grid border-l border-t border-black/10 sm:grid-cols-2">
                {service.capabilities.map((item, index) => (
                  <div className="group min-h-56 border-b border-r border-black/10 bg-white/35 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_50px_rgba(11,13,12,.08)] md:p-8" key={item}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[.15em] text-[#d7ae00]">0{index + 1}</span>
                      <span className="h-8 w-8 rounded-full border border-black/10 transition group-hover:border-[#ffd100] group-hover:bg-[#ffd100]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold uppercase leading-none md:text-[28px]">{item}</h3>
                    <p className="mt-4 text-sm leading-6 text-neutral-500">Metode dan kontrol kualitas ditentukan berdasarkan kondisi lokasi, material, serta target hasil pekerjaan.</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="bg-[#e9e8e1] py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-[1240px] gap-px overflow-hidden border border-black/10 bg-black/10 px-0 md:grid-cols-2">
            <article className="bg-[#f4f3ed] p-7 md:p-12 lg:p-14">
              <SectionLabel>Typical applications</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-5xl font-bold uppercase leading-[.9] md:text-6xl">Where we<br />can help.</h2>
              <ul className="mt-10 divide-y divide-black/10">
                {service.applications.map((item, index) => (
                  <li className="flex items-start gap-5 py-5" key={item}>
                    <span className="mt-0.5 text-[10px] font-bold tracking-[.12em] text-[#d7ae00]">0{index + 1}</span>
                    <span className="text-base leading-6 md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="bg-[#0b0d0c] p-7 text-white md:p-12 lg:p-14">
              <SectionLabel light>What you receive</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-5xl font-bold uppercase leading-[.9] md:text-6xl">Clear project<br /><span className="text-[#ffd100]">outputs.</span></h2>
              <ul className="mt-10 divide-y divide-white/15">
                {service.deliverables.map((item, index) => (
                  <li className="flex items-start gap-5 py-5" key={item}>
                    <span className="mt-0.5 text-[10px] font-bold tracking-[.12em] text-[#ffd100]">0{index + 1}</span>
                    <span className="text-base leading-6 text-white/80 md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8">
            <div className="grid gap-5 bg-[#ffd100] p-7 md:mt-0 md:grid-cols-[220px_1fr] md:items-center md:p-10">
              <strong className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide">Safety assurance</strong>
              <p className="m-0 border-black/20 text-sm leading-7 md:border-l md:pl-9 md:text-base">{service.assurance}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#0b0d0c] py-20 text-white md:py-28">
          <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8">
            <SectionLabel light>Project flow</SectionLabel>
            <div className="mt-10 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {["Site conversation", "Survey & method", "Safe execution", "Report & handover"].map((item, index) => (
                <article className="min-h-64 border-b border-r border-white/15 p-6 md:p-8" key={item}>
                  <span className="text-[10px] font-bold tracking-[.15em] text-[#ffd100]">0{index + 1}</span>
                  <h3 className="mt-16 font-[family-name:var(--font-display)] text-[28px] font-semibold uppercase leading-none">{item}</h3>
                  <p className="mt-5 text-sm leading-6 text-white/55">{values[index].text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 bg-[#f4f3ed] py-20 md:py-28">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start justify-between gap-10 px-6 md:px-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel>Ready to discuss</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(54px,8vw,108px)] font-bold uppercase leading-[.84] tracking-[-.035em]">
                Your next<br /><span className="text-[#e7bd00]">{service.title}?</span>
              </h2>
            </div>
            <a className="group inline-flex min-w-56 items-center justify-between gap-8 bg-[#ffd100] px-6 py-5 text-xs font-bold uppercase tracking-[.12em] transition hover:-translate-y-1 hover:bg-[#0b0d0c] hover:text-white" href="/contact">
              Request a quote <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
