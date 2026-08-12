"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Locale, useLanguage } from "./LanguageProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
type Translation = { title: string; excerpt: string; body: string };
type AdminPost = {
  id: number; slug: string; category: string; image_url: string; published: number | boolean; published_at: string;
  translations: Record<string, Translation>;
};
type Draft = Omit<AdminPost, "id" | "published_at" | "published"> & { published: boolean };
const blankTranslation = (): Translation => ({ title: "", excerpt: "", body: "" });
const emptyDraft = (locales: Locale[]): Draft => ({ slug: "", category: "News", image_url: "", published: true, translations: Object.fromEntries(locales.map(locale => [locale.code, blankTranslation()])) });

export function NewsManager({ token }: { token: string }) {
  const { locales } = useLanguage();
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [draft, setDraft] = useState<Draft>(() => emptyDraft(locales));
  const [activeLocale, setActiveLocale] = useState("id");
  const [editingID, setEditingID] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setDraft(current => ({ ...current, translations: { ...Object.fromEntries(locales.map(locale => [locale.code, blankTranslation()])), ...current.translations } }));
  }, [locales]);

  const load = useCallback(async () => {
    const response = await fetch(`${API_URL}/api/v1/admin/posts`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error("Gagal memuat artikel");
    setPosts(await response.json());
  }, [token]);

  useEffect(() => { load().catch(() => setNotice("Backend belum aktif atau sesi sudah berakhir.")); }, [load]);

  function edit(post: AdminPost) {
    setEditingID(post.id);
    setDraft({ slug: post.slug, category: post.category, image_url: post.image_url || "", published: Boolean(post.published), translations: { ...Object.fromEntries(locales.map(locale => [locale.code, blankTranslation()])), ...post.translations } });
    setActiveLocale("id"); setNotice("");
  }
  function reset() { setEditingID(null); setDraft(emptyDraft(locales)); setActiveLocale("id"); setNotice(""); }
  function updateTranslation(field: keyof Translation, value: string) {
    setDraft(current => ({ ...current, translations: { ...current.translations, [activeLocale]: { ...(current.translations[activeLocale] || blankTranslation()), [field]: value } } }));
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    const translations = Object.fromEntries(Object.entries(draft.translations).filter(([, value]) => value.title.trim() || value.excerpt.trim() || value.body.trim()));
    const incomplete = Object.entries(translations).find(([, value]) => !value.title.trim() || !value.excerpt.trim() || !value.body.trim());
    if (incomplete) { setActiveLocale(incomplete[0]); setNotice(`Lengkapi judul, ringkasan, dan isi untuk locale ${incomplete[0].toUpperCase()}.`); setBusy(false); return; }
    const endpoint = editingID ? `${API_URL}/api/v1/admin/posts/${editingID}` : `${API_URL}/api/v1/admin/posts`;
    try {
      const response = await fetch(endpoint, { method: editingID ? "PATCH" : "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...draft, translations }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Artikel tidak dapat disimpan");
      await load(); reset(); setNotice(editingID ? "Artikel berhasil diperbarui." : "Artikel berhasil dibuat.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Artikel tidak dapat disimpan."); }
    finally { setBusy(false); }
  }

  async function remove(post: AdminPost) {
    const title = post.translations.id?.title || post.translations.en?.title || post.slug;
    if (!window.confirm(`Hapus artikel “${title}”? Tindakan ini tidak dapat dibatalkan.`)) return;
    setBusy(true); setNotice("");
    try { const response = await fetch(`${API_URL}/api/v1/admin/posts/${post.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); if (!response.ok) throw new Error(); await load(); if (editingID === post.id) reset(); setNotice("Artikel berhasil dihapus."); }
    catch { setNotice("Artikel tidak dapat dihapus."); }
    finally { setBusy(false); }
  }

  const translation = draft.translations[activeLocale] || blankTranslation();
  const activeLocaleInfo = useMemo(() => locales.find(locale => locale.code === activeLocale), [activeLocale, locales]);

  return <div className="news-manager">
    <section className="cms-list">
      <div className="admin-section-title"><div><p className="eyebrow">Content library</p><h2>News articles</h2></div><button onClick={() => load()}>Refresh ↻</button></div>
      <div className="cms-count"><strong>{posts.length}</strong><span>Total articles</span><i>{posts.filter(post => Boolean(post.published)).length} published</i></div>
      <div className="cms-posts">{posts.map(post => { const title = post.translations.id?.title || post.translations.en?.title || post.slug; return <article className={editingID === post.id ? "is-editing" : ""} key={post.id}><div className="cms-post-image" style={{ backgroundImage: post.image_url ? `url(${post.image_url})` : undefined }}>{!post.image_url && "PR"}</div><div><span>{post.category} · {post.published ? "Published" : "Draft"} · {Object.keys(post.translations).length} languages</span><h3>{title}</h3><small>/news/{post.slug}</small></div><div className="cms-post-actions"><button onClick={() => edit(post)}>Edit</button><a href={`/news/${post.slug}`} target="_blank">View ↗</a><button className="danger" onClick={() => remove(post)} disabled={busy}>Delete</button></div></article>; })}</div>
    </section>
    <form className="cms-editor" onSubmit={save}>
      <div className="admin-section-title"><div><p className="eyebrow">{editingID ? "Edit article" : "New article"}</p><h2>{editingID ? "Update story" : "Create story"}</h2></div>{editingID && <button type="button" onClick={reset}>Cancel</button>}</div>
      {notice && <p className="cms-notice">{notice}</p>}
      <div className="cms-fields"><label>Slug<input value={draft.slug} onChange={event => setDraft({ ...draft, slug: event.target.value })} placeholder="Otomatis dari judul Indonesia" /></label><label>Category<input required value={draft.category} onChange={event => setDraft({ ...draft, category: event.target.value })} placeholder="Safety" /></label></div>
      <div className="cms-image-field">
        <label htmlFor="cover-image-url">Cover image URL</label>
        <input id="cover-image-url" type="url" value={draft.image_url} onChange={event => setDraft({ ...draft, image_url: event.target.value })} placeholder="https://cdn.domain.com/news/cover.webp" aria-describedby="cover-image-help" />
        <div className="cms-image-guide" id="cover-image-help">
          <strong>Cara menambahkan gambar</strong>
          <ol>
            <li>Upload gambar ke penyimpanan media publik, misalnya Cloudinary Media Library atau CDN/storage perusahaan.</li>
            <li>Salin <b>delivery URL</b> atau <b>public/direct URL</b> gambarnya, lalu tempel di kolom ini.</li>
            <li>Pastikan URL dapat dibuka tanpa login dan langsung menampilkan gambar—bukan halaman berbagi Google Drive.</li>
          </ol>
          <p>Contoh: <code>https://res.cloudinary.com/nama-cloud/image/upload/news/cover.webp</code></p>
          <p>Jika memakai Cloudflare R2 untuk production, gunakan URL custom domain seperti <code>https://assets.prorope.id/news/cover.webp</code>.</p>
        </div>
        {draft.image_url && <div className="cms-cover-preview" role="img" aria-label="Preview cover image" style={{ backgroundImage: `url(${draft.image_url})` }}><span>Preview cover</span></div>}
      </div>
      <div className="cms-locale-tabs" aria-label="Article translations">{locales.map(locale => <button type="button" className={activeLocale === locale.code ? "active" : ""} onClick={() => setActiveLocale(locale.code)} key={locale.code}>{locale.native_name}{draft.translations[locale.code]?.title ? " ✓" : ""}</button>)}</div>
      <div className="cms-language-heading"><span>{activeLocale.toUpperCase()}</span><strong>{activeLocaleInfo?.name || activeLocale} {activeLocale === "id" ? "· wajib" : "· optional"}</strong></div>
      <label>Title<input required={activeLocale === "id"} value={translation.title} onChange={event => updateTranslation("title", event.target.value)} placeholder={`Article title · ${activeLocaleInfo?.native_name || activeLocale}`} /></label>
      <label>Excerpt<textarea required={activeLocale === "id"} rows={3} value={translation.excerpt} onChange={event => updateTranslation("excerpt", event.target.value)} placeholder="Short summary for the article card" /></label>
      <label>Article body<textarea required={activeLocale === "id"} rows={11} value={translation.body} onChange={event => updateTranslation("body", event.target.value)} placeholder={"Use blank lines between paragraphs.\n\n## Subheading\n\n> Quote\n\n- List item"} /></label>
      <label className="cms-publish"><input type="checkbox" checked={draft.published} onChange={event => setDraft({ ...draft, published: event.target.checked })} /><span><strong>Publish article</strong><small>Jika dimatikan, artikel disimpan sebagai draft.</small></span></label>
      <button className="button" disabled={busy}>{busy ? "Saving..." : editingID ? "Save changes →" : "Publish article →"}</button>
    </form>
  </div>;
}
