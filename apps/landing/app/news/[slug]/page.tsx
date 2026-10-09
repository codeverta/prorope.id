import type { Metadata } from "next";
import { cache } from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NewsArticleContent } from "../../components/NewsArticleContent";
import { posts, type Post } from "../../data";
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

function toRuntimeArticle(post: Post): RuntimeArticle {
  const publishedAt = new Date(post.date);
  return {
    slug: post.slug,
    category: post.category,
    image_url: post.image,
    published_at: Number.isNaN(publishedAt.valueOf()) ? post.date : publishedAt.toISOString(),
    updated_at: post.updatedAt,
    translations: {
      id: { title: post.title, excerpt: post.excerpt, body: post.body },
      en: { title: post.titleEn, excerpt: post.excerptEn, body: post.bodyEn },
    },
  };
}

function preferredPost(fallback: Post | undefined, cmsPost: RuntimeArticle | null) {
  if (!fallback) return cmsPost;
  if (!cmsPost || !fallback.updatedAt) return cmsPost;
  const localModified = Date.parse(fallback.updatedAt);
  const cmsModified = Date.parse(cmsPost.updated_at || cmsPost.published_at || "");
  return Number.isFinite(localModified) && (!Number.isFinite(cmsModified) || cmsModified < localModified)
    ? toRuntimeArticle(fallback)
    : cmsPost;
}

export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const requestHeaders = await headers();
  const locale = normalizeLocale(requestHeaders.get("x-prorope-locale"));
  const fallback = posts.find(post => post.slug === slug);
  const livePost = preferredPost(fallback, await getPublishedPost(slug));
  return createMetadata(`/news/${slug}`, locale, livePost || undefined);
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fallback = posts.find(post => post.slug === slug);
  const livePost = preferredPost(fallback, await getPublishedPost(slug));
  if (!livePost && !fallback) notFound();

  const initialPost = livePost || { slug, category: fallback!.category, image_url: fallback!.image, published_at: fallback!.date, updated_at: fallback!.updatedAt, translations: { id: { title: fallback!.title, excerpt: fallback!.excerpt, body: fallback!.body }, en: { title: fallback!.titleEn, excerpt: fallback!.excerptEn, body: fallback!.bodyEn } } };
  const locale = normalizeLocale((await headers()).get("x-prorope-locale"));
  const articleForStructuredData = livePost || (fallback ? toRuntimeArticle(fallback) : undefined);
  return <><StructuredData pathname={`/news/${slug}`} locale={locale} runtimeArticle={articleForStructuredData} /><NewsArticleContent slug={slug} initialPost={initialPost} /></>;
}
