"use client";

import { useEffect, useState } from "react";
import { posts as fallbackPosts } from "../data";
import { useLanguage } from "./LanguageProvider";
import { generatedTranslations } from "../generatedTranslations";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export type PublicPost = {
  id?: number;
  slug: string;
  category: string;
  image_url?: string;
  published_at?: string;
  translations: Record<string, { title: string; excerpt: string; body?: string }>;
};

const initialPosts: PublicPost[] = fallbackPosts.map(post => ({
  slug: post.slug, category: post.category, image_url: post.image, published_at: post.date,
  translations: {
    id: { title: post.title, excerpt: post.excerpt },
    en: { title: post.titleEn, excerpt: post.excerptEn },
    zh: { title: generatedTranslations[post.title]?.zh || post.titleEn, excerpt: generatedTranslations[post.excerpt]?.zh || post.excerptEn },
    ja: { title: generatedTranslations[post.title]?.ja || post.titleEn, excerpt: generatedTranslations[post.excerpt]?.ja || post.excerptEn },
  },
}));

function imageFor(post: PublicPost, index: number) { return post.image_url || fallbackPosts[index % fallbackPosts.length].image; }
function dateFor(value: string | undefined, language: string) { if (!value) return language === "id" ? "Catatan Lapangan" : "Field Note"; const parsed = new Date(value); const locale = language === "id" ? "id-ID" : language === "zh" ? "zh-CN" : language === "ja" ? "ja-JP" : "en-GB"; return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" }); }

export function NewsListing() {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<PublicPost[]>(initialPosts);
  const [live, setLive] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/posts`).then(response => response.ok ? response.json() : Promise.reject()).then((data: PublicPost[]) => { setPosts(data); setLive(true); }).catch(() => setLive(false));
  }, []);

  if (!posts.length) return <div className="shell news-empty"><span>◎</span><h2>Belum ada artikel.</h2><p>Artikel yang dipublikasikan dari admin akan tampil di sini.</p></div>;
  const [featured, ...archive] = posts;
  const local = (post: PublicPost) => post.translations[language] || post.translations.en || post.translations.id;
  return <section className="section">
    <div className="shell news-source"><span className={live ? "is-live" : ""} />{live ? t("Tersinkron dengan CMS Pro Rope", "Synced with Pro Rope CMS") : t("Menampilkan pilihan editorial", "Showing editorial highlights")}</div>
    <div className="shell news-feature"><div style={{ backgroundImage: `url(${imageFor(featured, 0)})` }} /><article><span>{featured.category} · {dateFor(featured.published_at, language)}</span><h2>{local(featured).title}</h2><p>{local(featured).excerpt}</p><a className="button button--small" href={`/news/${featured.slug}`}>{t("Baca artikel", "Read article")} ↗</a></article></div>
    <div className="shell news-grid news-grid--archive">{archive.map((post, index) => <a href={`/news/${post.slug}`} className="news-card" key={post.slug}><div className="news-card__image" style={{ backgroundImage: `url(${imageFor(post, index + 1)})` }} /><div><span>{post.category} · {dateFor(post.published_at, language)}</span><h3>{local(post).title}</h3><p>{local(post).excerpt}</p><i>{t("Baca artikel", "Read story")} →</i></div></a>)}</div>
  </section>;
}
