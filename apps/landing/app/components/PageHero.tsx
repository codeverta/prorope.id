import { SiteHeader } from "./SiteHeader";

export function PageHero({ eyebrow, title, text, image, index }: { eyebrow: string; title: string; text: string; image?: string; index?: string }) {
  return (
    <section className="page-hero" style={image ? { backgroundImage: `linear-gradient(90deg,rgba(7,9,8,.92),rgba(7,9,8,.42)),url(${image})` } : undefined}>
      <SiteHeader dark />
      <div className="shell page-hero__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__lead">{text}</p>
        {index && <span className="page-index">{index}</span>}
      </div>
    </section>
  );
}
