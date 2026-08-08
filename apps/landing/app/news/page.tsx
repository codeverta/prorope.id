import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { NewsListing } from "../components/NewsListing";
import { PageHero } from "../components/PageHero";
import { posts } from "../data";

export const metadata: Metadata = { title: "News & Insights" };

export default function News() {
  return <><main><PageHero eyebrow="News & field notes" title="LEARN FROM THE VERTICAL WORLD." text="Catatan keselamatan, praktik lapangan, informasi pelatihan, dan cerita dari pekerjaan yang kami lakukan." image={posts[1].image} index="05 / 06" /><NewsListing /></main><Footer /></>;
}
