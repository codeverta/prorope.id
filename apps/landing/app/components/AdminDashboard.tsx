"use client";

import { FormEvent, useEffect, useState } from "react";
import { NewsManager } from "./NewsManager";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
type Lead = { id: number; name: string; phone: string; service: string; status: string; created_at: string };
type View = "overview" | "leads" | "news";

export function AdminDashboard() {
  const [token, setToken] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [view, setView] = useState<View>("overview");

  useEffect(() => { const saved = sessionStorage.getItem("prorope_admin_token"); if (saved) { setToken(saved); load(saved); } }, []);

  async function load(auth: string) {
    try { const response = await fetch(`${API_URL}/api/v1/admin/leads`, { headers: { Authorization: `Bearer ${auth}` } }); if (!response.ok) throw new Error(); setLeads(await response.json()); setError(""); }
    catch { setError("Backend belum aktif atau sesi sudah berakhir."); }
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try { const response = await fetch(`${API_URL}/api/v1/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); if (!response.ok) throw new Error(); const body = await response.json(); sessionStorage.setItem("prorope_admin_token", body.token); setToken(body.token); load(body.token); }
    catch { setError("Email atau password tidak cocok."); }
  }

  if (!token) return <main className="admin-login"><a className="admin-back" href="/">← Kembali ke website</a><form onSubmit={login}><div className="admin-logo"><img src="/prorope-logo.jpg" alt="Pro Rope Services" /></div><p className="eyebrow">Secure workspace</p><h1>Admin sign in</h1><p>Kelola leads, pendaftaran training, proyek, dan berita Pro Rope.</p><label>Email<input type="email" name="email" defaultValue="admin@prorope.id" required /></label><label>Password<input type="password" name="password" defaultValue="prorope123" required /></label><button className="button">Masuk ke dashboard <span>→</span></button>{error && <p className="form-message error">{error}</p>}<small>Ubah kredensial default melalui environment backend.</small></form></main>;

  const Inbox = () => <section><div className="admin-section-title"><div><p className="eyebrow">Inbox</p><h2>Recent enquiries</h2></div><button onClick={() => load(token)}>Refresh ↻</button></div>{error && <p className="form-message error">{error}</p>}<div className="admin-table">{leads.length ? leads.slice(0, view === "leads" ? 100 : 7).map(lead => <div className="admin-row" key={lead.id}><span className="avatar">{lead.name.slice(0, 2).toUpperCase()}</span><div><strong>{lead.name}</strong><small>{lead.service} · {lead.phone}</small></div><time>{new Date(lead.created_at).toLocaleDateString("id-ID")}</time><i>{lead.status}</i></div>) : <div className="empty-state"><span>◎</span><h3>Belum ada enquiry</h3><p>Lead dari formulir website akan muncul di sini.</p></div>}</div></section>;

  return <main className="admin-shell">
    <aside>
      <a className="admin-brand" href="/"><img src="/prorope-logo.jpg" alt="Pro Rope Services" /></a>
      <nav>
        <button className={view === "overview" ? "active" : ""} onClick={() => setView("overview")}>⌂ <span>Overview</span></button>
        <button className={view === "leads" ? "active" : ""} onClick={() => setView("leads")}>◫ <span>Leads</span></button>
        <button disabled title="Coming next">◉ <span>Training</span></button>
        <button disabled title="Coming next">◇ <span>Projects</span></button>
        <button className={view === "news" ? "active" : ""} onClick={() => setView("news")}>▤ <span>News</span></button>
      </nav>
      <button className="admin-signout" onClick={() => { sessionStorage.removeItem("prorope_admin_token"); setToken(""); }}>↪ <span>Sign out</span></button>
    </aside>
    <section className="admin-main">
      <header><div><p className="eyebrow">{view === "news" ? "Content management" : "Operations"}</p><h1>{view === "news" ? "News CMS" : view === "leads" ? "All enquiries" : "Good to see you."}</h1></div><a className="button button--small" href={view === "news" ? "/news" : "/"} target="_blank">{view === "news" ? "View news" : "View website"} ↗</a></header>
      {view === "news" ? <NewsManager token={token} /> : <>
        <div className="admin-stats"><article><span>Open leads</span><strong>{leads.filter(item => item.status === "new").length || "—"}</strong><small>Needs follow-up</small></article><article><span>Total enquiries</span><strong>{leads.length || "—"}</strong><small>All time</small></article><article><span>Upcoming classes</span><strong>4</strong><small>Sep — Oct 2026</small></article><article className="accent"><span>Site status</span><strong>Live</strong><small>All systems operational</small></article></div>
        <div className={`admin-content ${view === "leads" ? "admin-content--full" : ""}`}><Inbox />{view === "overview" && <aside className="admin-actions"><p className="eyebrow">Quick actions</p><h2>Content tools</h2><button onClick={() => setView("news")}><span>▤</span><div><strong>Write a story</strong><small>Create or edit an article</small></div>→</button><a href="/training/schedule"><span>◉</span><div><strong>Training schedule</strong><small>Review next batches</small></div>→</a></aside>}</div>
      </>}
    </section>
  </main>;
}
