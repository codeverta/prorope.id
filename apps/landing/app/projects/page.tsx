import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { ProjectGallery } from "../components/ProjectGallery";
import { projects } from "../data";

export default function Projects() {
  return <>
    <main>
      <PageHero eyebrow="Selected projects" title="WORK THAT SPEAKS AT SCALE." text="Kumpulan pekerjaan rope access, inspeksi, perawatan, cleaning, coating, dan pelatihan dari berbagai kondisi lapangan." image={projects[0].image} index="04 / 06" />
      <section className="section">
        <ProjectGallery projects={projects} />
      </section>
      <section className="contact-band contact-band--simple"><div className="shell"><div><p className="eyebrow eyebrow--light">Your project could be next</p><h2>Let’s solve the access challenge.</h2></div><a className="button button--light" href="/contact">Start a project <span>↗</span></a></div></section>
    </main>
    <Footer />
  </>;
}
