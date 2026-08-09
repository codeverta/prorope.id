import Link from "next/link";
import { Footer } from "../../components/Footer";
import { PageHero } from "../../components/PageHero";
import { schedules } from "../../data";
import { trainingScheduleImage } from "../../media";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-neutral-600"><span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />{children}</p>;
}

export default function Schedule() {
  return (
    <>
      <main className="overflow-hidden bg-[#f4f3ed] text-[#0b0d0c]">
        <PageHero eyebrow="2026 training calendar" title="PLAN YOUR NEXT LEVEL." text="Jadwal kelas reguler dan opsi private training untuk perusahaan, komunitas, dan emergency response team." image={trainingScheduleImage} index="Schedule" />

        <section className="py-20 md:py-28 lg:py-32">
          <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-6 md:px-8 lg:grid-cols-[330px_minmax(0,1fr)] lg:gap-20">
            <aside className="self-start lg:sticky lg:top-36">
              <SectionLabel>Upcoming batches</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(50px,6vw,82px)] font-bold uppercase leading-[.86] tracking-[-.035em]">Choose a date.<br /><span className="text-[#e7bd00]">Build the skill.</span></h2>
              <p className="mt-7 text-base leading-7 text-neutral-600">Kuota dapat berubah mengikuti konfirmasi peserta. Hubungi tim kami untuk jadwal terbaru dan persyaratan setiap program.</p>
              <a className="mt-8 inline-flex items-center gap-5 border-b border-black pb-2 text-[10px] font-bold uppercase tracking-[.14em] transition hover:border-[#d7ae00] hover:text-[#a58400]" href="/contact">Request private schedule <span>↗</span></a>
            </aside>

            <div className="divide-y divide-black/10 border-y border-black/10">
              {schedules.map((schedule, index) => (
                <article className="group grid gap-6 py-7 transition md:grid-cols-[38px_minmax(180px,1.3fr)_1fr_1fr_.7fr_80px] md:items-center md:gap-5 md:py-8" key={`${schedule.program}-${schedule.batch}`}>
                  <span className="text-[10px] font-bold tracking-[.14em] text-[#d7ae00]">0{index + 1}</span>
                  <div>
                    <small className="block text-[9px] font-bold uppercase tracking-[.13em] text-neutral-500">{schedule.batch}</small>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-[28px] font-semibold uppercase leading-none transition group-hover:text-[#a58400]">{schedule.program}</h3>
                  </div>
                  <dl className="grid grid-cols-3 gap-4 border-l border-black/10 pl-5 md:contents">
                    <div><dt className="text-[9px] font-bold uppercase tracking-[.12em] text-neutral-500">Date</dt><dd className="mt-1 text-xs font-bold leading-5">{schedule.date}</dd></div>
                    <div><dt className="text-[9px] font-bold uppercase tracking-[.12em] text-neutral-500">Location</dt><dd className="mt-1 text-xs font-bold leading-5">{schedule.location}</dd></div>
                    <div><dt className="text-[9px] font-bold uppercase tracking-[.12em] text-neutral-500">Available</dt><dd className="mt-1 text-xs font-bold leading-5">{schedule.seats} seats</dd></div>
                  </dl>
                  <Link className="inline-flex items-center justify-between bg-[#ffd100] px-4 py-3 text-[9px] font-bold uppercase tracking-[.12em] transition group-hover:bg-[#0b0d0c] group-hover:text-white md:bg-transparent md:p-0 md:text-[#a58400]" href="/training/registration">Register <span>↗</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b0d0c] py-20 text-white md:py-24">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start justify-between gap-9 px-6 md:px-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#ffd100]">Company & community class</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(44px,6vw,78px)] font-bold uppercase leading-[.88]">Tanggal belum cocok?<br />Kami datang ke tim Anda.</h2>
            </div>
            <a className="group inline-flex min-w-56 items-center justify-between gap-8 bg-[#ffd100] px-6 py-5 text-xs font-bold uppercase tracking-[.12em] text-black transition hover:-translate-y-1 hover:bg-white" href="/contact">Discuss a class <span className="transition-transform group-hover:translate-x-1">↗</span></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
