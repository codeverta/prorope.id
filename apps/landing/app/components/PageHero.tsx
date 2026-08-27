import { SiteHeader } from "./SiteHeader";

export function PageHero({ eyebrow, title, text, image, index, imageFit = "cover" }: { eyebrow: string; title: string; text: string; image?: string; index?: string; imageFit?: "cover" | "contain" }) {
  return (
    <section
      className="relative flex min-h-[620px] items-end overflow-hidden bg-[#090b0a] bg-cover bg-center text-white md:min-h-[680px]"
      style={{
        backgroundImage: image ? `linear-gradient(90deg,rgba(7,9,8,.96) 0%,rgba(7,9,8,.75) 44%,rgba(7,9,8,.2) 100%),url(${image})` : "linear-gradient(135deg,#090b0a 0%,#242823 100%)",
        backgroundSize: image ? (imageFit === "contain" ? "cover, contain" : "cover") : "cover",
        backgroundPosition: imageFit === "contain" ? "center, right center" : "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SiteHeader dark />
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 pb-16 pt-48 md:px-8 md:pb-24 md:pt-56">
        <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/65">
          <span className="h-0.5 w-8 bg-[#ffd100]" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(36px,5vw,72px)] font-extrabold uppercase leading-[.88] tracking-[-.035em]">{title}</h1>
        <div className="mt-8 flex max-w-3xl items-end justify-between gap-8 border-l-4 border-[#ffd100] pl-5 md:pl-7">
          <p className="m-0 max-w-2xl text-base leading-7 text-white/75 md:text-lg">{text}</p>
          {index && <span className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[.17em] text-[#ffd100] sm:block">{index}</span>}
        </div>
      </div>
    </section>
  );
}
