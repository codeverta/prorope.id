"use client";

import { FormEvent, useEffect, useState } from "react";
import { NewsManager } from "./NewsManager";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const statuses = ["new", "contacted", "qualified", "closed"];

type Lead = { id: number; name: string; phone: string; email: string; service: string; message: string; status: string; created_at: string };
type Registration = { id: number; name: string; phone: string; email: string; program: string; message: string; status: string; created_at: string };
type View = "overview" | "leads" | "registrations" | "news";
type InboxItem = Lead | Registration;

function AdminTable({ items, kind, limit, onStatus }: { items: InboxItem[]; kind: "leads" | "registrations"; limit?: number; onStatus: (kind: "leads" | "registrations", id: number, status: string) => void }) {
  const shown = typeof limit === "number" ? items.slice(0, limit) : items;
  if (!shown.length) return <div className="empty-state"><span>◎</span><h3>{kind === "registrations" ? "Belum ada pendaftaran" : "Belum ada enquiry"}</h3><p>{kind === "registrations" ? "Pendaftaran dari halaman training akan muncul di sini." : "Lead dari formulir website akan muncul di sini."}</p></div>;
  return <div className="admin-table">{shown.map(item => {
    const subject = kind === "registrations" ? (item as Registration).program : (item as Lead).service;
    return <div className="admin-row" key={item.id}>
      <span className="avatar">{item.name.slice(0, 2).toUpperCase()}</span>
      <div><strong>{item.name}</strong><small>{subject} · {item.phone}</small>{item.email && <small>{item.email}</small>}{item.message && <p>{item.message}</p>}</div>
      <time>{new Date(item.created_at).toLocaleDateString("id-ID")}</time>
      <select aria-label={`Status ${item.name}`} value={item.status} onChange={event => onStatus(kind, item.id, event.target.value)}>{statuses.map(status => <option value={status} key={status}>{status}</option>)}</select>
    </div>;
  })}</div>;
}

export function AdminDashboard() {
  const [token, setToken] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [error, setError] = useState("");
  const [view, setView] = useState<View>("overview");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("prorope_admin_token");
    if (saved) queueMicrotask(() => { setToken(saved); load(saved); });
  }, []);

  async function load(auth: string) {
    try {
      const headers = { Authorization: `Bearer ${auth}` };
      const [leadResponse, registrationResponse] = await Promise.all([
        fetch(`${API_URL}/api/v1/admin/leads`, { headers }),
        fetch(`${API_URL}/api/v1/admin/registrations`, { headers }),
      ]);
      if (!leadResponse.ok || !registrationResponse.ok) throw new Error();
      const [leadData, registrationData] = await Promise.all([leadResponse.json(), registrationResponse.json()]);
      setLeads(leadData);
      setRegistrations(registrationData);
      setError("");
    } catch {
      setError("Backend belum aktif atau sesi sudah berakhir.");
    }
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error();
      const body = await response.json();
      sessionStorage.setItem("prorope_admin_token", body.token);
      setToken(body.token);
      load(body.token);
    } catch {
      setError("Email atau password tidak cocok.");
    }
  }

  async function updateStatus(kind: "leads" | "registrations", id: number, status: string) {
    try {
      const response = await fetch(`${API_URL}/api/v1/admin/${kind}/${id}`, { method: "PATCH", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      if (!response.ok) throw new Error();
      await load(token);
    } catch {
      setError("Status belum dapat diperbarui.");
    }
  }

  if (!token) return <main className="admin-login">
    <a className="admin-back" href="/">← Kembali ke website</a>
    <form onSubmit={login} autoComplete="off">
      <div className="admin-logo"><img src="/prorope-logo.jpg" alt="Pro Rope Services" /></div>
      <p className="eyebrow">Secure workspace</p><h1>Admin sign in</h1>
      <p>Kelola leads, pendaftaran training, proyek, dan berita Pro Rope.</p>
      <label>Email<input type="email" name="email" placeholder="admin@prorope.id" autoComplete="off" required /></label>
      <label>Password<div className="password-field"><input type={showPassword ? "text" : "password"} name="password" placeholder="Masukkan password" autoComplete="current-password" required /><button type="button" aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"} aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}><span className={`password-eye ${showPassword ? "is-visible" : ""}`} /></button></div></label>
      <button className="button">Masuk ke dashboard <span>→</span></button>
      {error && <p className="form-message error">{error}</p>}
    </form>
  </main>;

  const currentItems = view === "registrations" ? registrations : leads;
  const currentKind = view === "registrations" ? "registrations" : "leads";
  const heading = view === "news" ? "News CMS" : view === "leads" ? "All enquiries" : view === "registrations" ? "Training registrations" : "Good to see you.";

  return <main className="admin-shell">
    <aside>
      <a className="admin-brand" href="/"><img src="/prorope-logo.jpg" alt="Pro Rope Services" /></a>
      <nav>
        <button className={view === "overview" ? "active" : ""} onClick={() => setView("overview")}>⌂ <span>Overview</span></button>
        <button className={view === "leads" ? "active" : ""} onClick={() => setView("leads")}>◫ <span>Leads</span></button>
        <button className={view === "registrations" ? "active" : ""} onClick={() => setView("registrations")}>◉ <span>Training</span></button>
        <button disabled title="Coming next">◇ <span>Projects</span></button>
        <button className={view === "news" ? "active" : ""} onClick={() => setView("news")}>▤ <span>News</span></button>
      </nav>
      <button className="admin-signout" onClick={() => { sessionStorage.removeItem("prorope_admin_token"); setToken(""); }}>↪ <span>Sign out</span></button>
    </aside>
    <section className="admin-main">
      <header><div><p className="eyebrow">{view === "news" ? "Content management" : "Operations"}</p><h1>{heading}</h1></div><a className="button button--small" href={view === "news" ? "/news" : "/"} target="_blank" rel="noreferrer">{view === "news" ? "View news" : "View website"} ↗</a></header>
      {view === "news" ? <NewsManager token={token} /> : <>
        <div className="admin-stats">
          <article><span>Open leads</span><strong>{leads.filter(item => item.status === "new").length || "—"}</strong><small>Needs follow-up</small></article>
          <article><span>Training registrations</span><strong>{registrations.length || "—"}</strong><small>{registrations.filter(item => item.status === "new").length} new</small></article>
          <article><span>Total enquiries</span><strong>{leads.length || "—"}</strong><small>All time</small></article>
          <article className="accent"><span>Site status</span><strong>Live</strong><small>All systems operational</small></article>
        </div>
        <div className={`admin-content ${view !== "overview" ? "admin-content--full" : ""}`}>
          <section><div className="admin-section-title"><div><p className="eyebrow">Inbox</p><h2>{view === "registrations" ? "Training registrations" : "Recent enquiries"}</h2></div><button onClick={() => load(token)}>Refresh ↻</button></div>{error && <p className="form-message error">{error}</p>}<AdminTable items={currentItems} kind={currentKind} limit={view === "overview" ? 7 : undefined} onStatus={updateStatus} /></section>
          {view === "overview" && <aside className="admin-actions"><p className="eyebrow">Quick actions</p><h2>Content tools</h2><button onClick={() => setView("registrations")}><span>◉</span><div><strong>Training registrations</strong><small>Review participant interest</small></div>→</button><button onClick={() => setView("news")}><span>▤</span><div><strong>Write a story</strong><small>Create or edit an article</small></div>→</button><a href="/training/schedule"><span>◉</span><div><strong>Training schedule</strong><small>Review next batches</small></div>→</a></aside>}
        </div>
      </>}
    </section>
  </main>;
}
