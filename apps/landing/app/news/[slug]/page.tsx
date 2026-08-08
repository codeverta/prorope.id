import { NewsArticleContent } from "../../components/NewsArticleContent";
import { posts } from "../../data";

export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fallback = posts.find(post => post.slug === slug) || posts[0];
  return <NewsArticleContent slug={slug} initialPost={{ slug, category: fallback.category, image_url: fallback.image, published_at: fallback.date, translations: { id: { title: fallback.title, excerpt: fallback.excerpt }, en: { title: fallback.titleEn, excerpt: fallback.excerptEn } } }} />;
}
