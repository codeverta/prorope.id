"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Footer } from "./Footer";
import { PageHero } from "./PageHero";
import type { PublicPost } from "./NewsListing";
import { useLanguage } from "./LanguageProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
type ArticlePost = PublicPost;

function ArticleBody({ body, language }: { body: string; language: string }) {
  // CMS payloads may contain escaped newlines ("\\n") instead of actual
  // line breaks. Normalize both forms before splitting markdown blocks.
  const normalizedBody = body.replace(/\\r?\\n/g, "\n");
  const renderInline = (value: string): ReactNode[] => {
    const nodes: ReactNode[] = [];
    const pattern = /(\*\*([^*]+)\*\*|__([^_]+)__|\[([^\]]+)\]\(([^\s)]+)\)|\*([^*]+)\*|_([^_]+)_)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(value))) {
      if (match.index > lastIndex) nodes.push(value.slice(lastIndex, match.index));
      if (match[2] || match[3]) nodes.push(<strong key={`${match.index}-strong`}>{match[2] || match[3]}</strong>);
      else if (match[4] && match[5]) {
        const href = safeMarkdownHref(match[5], language);
        nodes.push(href
          ? <a key={`${match.index}-link`} href={href.href} {...(href.external ? { target: "_blank", rel: "noreferrer" } : {})}>{match[4]}</a>
          : match[0]);
      } else nodes.push(<em key={`${match.index}-em`}>{match[6] || match[7]}</em>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < value.length) nodes.push(value.slice(lastIndex));
    return nodes;
  };
  const blocks = normalizedBody.split(/\n\s*\n/).map(block => block.trim()).filter(Boolean);
  return <>{blocks.map((block, index) => {
    // The article title is already the page's H1; render Markdown H1 as the
    // article's first section heading to keep one clear page-level heading.
    if (block.startsWith("# ")) return <h2 key={index}>{renderInline(block.slice(2))}</h2>;
    if (block.startsWith("### ")) return <h3 key={index}>{renderInline(block.slice(4))}</h3>;
    if (block.startsWith("## ")) return <h2 key={index}>{renderInline(block.slice(3))}</h2>;
    if (block.startsWith("> ")) return <blockquote key={index}>{renderInline(block.slice(2))}</blockquote>;
    const lines = block.split("\n");
    if (lines.every(line => /^[-*] /.test(line))) return <ul key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{renderInline(line.slice(2))}</li>)}</ul>;
    if (lines.every(line => /^\d+[.)] /.test(line))) return <ol key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{renderInline(line.replace(/^\d+[.)] /, ""))}</li>)}</ol>;
    return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{lineIndex > 0 && <br />}{renderInline(line)}</span>)}</p>;
  })}</>;
}

function safeMarkdownHref(value: string, language: string): { href: string; external: boolean } | undefined {
  if (value.startsWith("#")) return { href: value, external: false };
  if (value.startsWith("/") && !value.startsWith("//")) {
    const url = new URL(value, "https://prorope.id");
    const segments = url.pathname.split("/").filter(Boolean);
    if (["id", "en", "zh", "ja"].includes(segments[0])) segments.shift();
    url.pathname = `/${language}${segments.length ? `/${segments.join("/")}` : ""}`;
    return { href: `${url.pathname}${url.search}${url.hash}`, external: false };
  }
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return { href: url.toString(), external: true };
  } catch {
    return undefined;
  }
}

export function NewsArticleContent({ slug, initialPost }: { slug: string; initialPost: ArticlePost }) {
  const { language, t } = useLanguage();
  const [post, setPost] = useState(initialPost);
  useEffect(() => {
    fetch(`${API_URL}/api/v1/posts/${encodeURIComponent(slug)}`)
      .then(response => response.ok ? response.json() : Promise.reject())
      .then((data: ArticlePost) => {
        const localModified = Date.parse(initialPost.updated_at || "");
        const cmsModified = Date.parse(data.updated_at || data.published_at || "");
        if (Number.isFinite(localModified) && (!Number.isFinite(cmsModified) || cmsModified < localModified)) return;
        setPost({ ...data, image_url: data.image_url || initialPost.image_url });
      })
      .catch(() => undefined);
  }, [slug, initialPost.image_url, initialPost.updated_at]);
  const locale = language === "id" ? "id-ID" : language === "zh" ? "zh-CN" : language === "ja" ? "ja-JP" : "en-GB";
  const date = post.published_at ? new Date(post.published_at).toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" }) : t("Catatan Lapangan", "Field Note");
  const fallbackBody = "Pekerjaan di ketinggian membutuhkan keputusan metode yang tepat sebelum teknisi memasang tali pertama. Kondisi struktur, aktivitas di bawah, durasi kerja, dan kebutuhan akses ulang sama-sama memengaruhi rencana.\n\n## Mulai dari kondisi nyata di lapangan\n\nSurvey membantu tim memahami titik anchor, jalur akses, potensi benda jatuh, kondisi cuaca, serta interaksi dengan operasional pengguna gedung. Informasi ini kemudian diterjemahkan menjadi metode kerja, kebutuhan personel, peralatan, dan rescue plan.\n\n> Metode akses yang efisien adalah metode yang mengendalikan risiko sekaligus mendukung kualitas hasil pekerjaan.\n\n## Dokumentasi sama pentingnya dengan eksekusi\n\nCatatan inspeksi peralatan, toolbox meeting, foto pekerjaan, temuan, dan handover membuat pekerjaan dapat diverifikasi.";
  const fallbackBodyEN = "Work at height requires the right access decision before a technician installs the first rope. Structural conditions, activity below, work duration, and the need for repeat access all shape the plan.\n\n## Start with real site conditions\n\nA survey helps the team understand anchor points, access routes, dropped-object risks, weather conditions, and interaction with building operations. This information becomes the work method, personnel and equipment requirements, and rescue plan.\n\n> An efficient access method controls risk while supporting the quality of the work.\n\n## Documentation matters as much as execution\n\nEquipment inspection records, toolbox meetings, work photos, findings, and handover documents make the work verifiable.";
  const translation = post.translations[language] || post.translations.en || post.translations.id;
  const title = translation.title;
  const excerpt = translation.excerpt;
  const body = translation.body || (language === "id" ? fallbackBody : fallbackBodyEN);
  return <><main><PageHero eyebrow={`${post.category} · ${date}`} title={title.toUpperCase()} text={excerpt} image={post.image_url} /><article className="article-body"><ArticleBody body={body} language={language} /></article><section className="section about-cta"><div className="shell about-cta__inner"><h2 className="display-title">{t("Punya tantangan", "Have a vertical")}<br /><em>{t("vertikal?", "challenge?")}</em></h2><a className="button" href="/contact">{t("Bicara dengan Pro Rope", "Talk to Pro Rope")} <span>↗</span></a></div></section></main><Footer /></>;
}
