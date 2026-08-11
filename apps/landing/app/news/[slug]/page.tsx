import type { Metadata } from "next";
import { cache } from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NewsArticleContent } from "../../components/NewsArticleContent";
import { posts } from "../../data";
import { createMetadata, normalizeLocale, StructuredData, type RuntimeArticle } from "../../seo";

const API_URL = (process.env.SERVER_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080").replace(/\/+$/, "");

const getPublishedPost = cache(async (slug: string): Promise<RuntimeArticle | null> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/posts/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!response.ok) return null;
    const post = await response.json() as RuntimeArticle;
    return post.slug === slug ? post : null;
  } catch {
    return null;
  }
});

export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const requestHeaders = await headers();
  const locale = normalizeLocale(requestHeaders.get("x-prorope-locale"));
  const livePost = await getPublishedPost(slug);
  return createMetadata(`/news/${slug}`, locale, livePost || undefined);
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fallback = posts.find(post => post.slug === slug);
  const livePost = await getPublishedPost(slug);
  if (!livePost && !fallback) notFound();

  const initialPost = livePost || { slug, category: fallback!.category, image_url: fallback!.image, published_at: fallback!.date, translations: { id: { title: fallback!.title, excerpt: fallback!.excerpt }, en: { title: fallback!.titleEn, excerpt: fallback!.excerptEn } } };
  const locale = normalizeLocale((await headers()).get("x-prorope-locale"));
  const needsRuntimeStructuredData = livePost && !fallback;
  return <>{needsRuntimeStructuredData && <StructuredData pathname={`/news/${slug}`} locale={locale} runtimeArticle={livePost} />}<NewsArticleContent slug={slug} initialPost={initialPost} /></>;
}
