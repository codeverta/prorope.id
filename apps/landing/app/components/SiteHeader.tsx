"use client";

import { useState } from "react";
import { LanguageSwitcher } from "./LanguageProvider";

const serviceNav = [
  { label: "Inspection", href: "/services/inspection", note: "Visual & technical assessment" },
  { label: "Cleaning", href: "/services/cleaning", note: "Glass, facade & difficult access" },
  { label: "Maintenance", href: "/services/maintenance", note: "Sealant, leak & facade repair" },
  { label: "Painting & Blasting", href: "/services/painting-blasting", note: "Surface protection & coating" },
  { label: "Equipment Supplier", href: "/products", note: "Professional access & rescue gear" },
];

const trainingNav = [
  { label: "Schedule", href: "/training/schedule", note: "Upcoming 2026 batches" },
  { label: "Registration", href: "/training/registration", note: "Register your interest" },
  { label: "TKPK", href: "/training/tkpk", note: "Tenaga Kerja Pada Ketinggian" },
  { label: "TKBT", href: "/training/tkbt", note: "Teknisi Akses Tali" },
  { label: "Confined Space", href: "/training/confined-space", note: "Entry, work & rescue" },
  { label: "Rescue Training", href: "/training/rescue-training", note: "High-angle team rescue" },
  { label: "Tree Climbing", href: "/training/tree-climbing", note: "Arborist access & positioning" },
];

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand ${inverse ? "brand--inverse" : ""}`} href="/" aria-label="Pro Rope home">
      <span className="brand__logo" aria-hidden="true">
        <img src="/prorope-logo.jpg" alt="" />
      </span>
    </a>
  );
}

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "training" | null>(null);
  const closeAll = () => { setOpen(false); setOpenDropdown(null); };
  return (
    <header className={`site-header ${dark ? "site-header--dark" : ""}`}>
      <div className="shell header-inner">
        <Brand inverse={dark} />
        <button className="menu-button" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navigasi utama">
          <a href="/about" onClick={closeAll}>About</a>
          <div className={`nav-group ${openDropdown === "services" ? "is-open" : ""}`}>
            <div className="nav-group__trigger">
              <a href="/services" onClick={closeAll}>Services</a>
              <button aria-label="Buka menu Services" aria-expanded={openDropdown === "services"} aria-controls="services-dropdown" onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}><span aria-hidden="true" /></button>
            </div>
            <div className="nav-dropdown" id="services-dropdown">
              <div className="nav-dropdown__head"><span>01</span><div><strong>Our Services</strong><small>Work safely at every height.</small></div></div>
              {serviceNav.map((item, index) => <a key={item.href} href={item.href} onClick={closeAll}><span>0{index + 1}</span><div><strong>{item.label}</strong><small>{item.note}</small></div><i>↗</i></a>)}
              <a className="nav-dropdown__all" href="/services" onClick={closeAll}>Explore all services <span>→</span></a>
            </div>
          </div>
          <div className={`nav-group nav-group--training ${openDropdown === "training" ? "is-open" : ""}`}>
            <div className="nav-group__trigger">
              <a href="/training" onClick={closeAll}>Training</a>
              <button aria-label="Buka menu Training" aria-expanded={openDropdown === "training"} aria-controls="training-dropdown" onClick={() => setOpenDropdown(openDropdown === "training" ? null : "training")}><span aria-hidden="true" /></button>
            </div>
            <div className="nav-dropdown nav-dropdown--training" id="training-dropdown">
              <div className="nav-dropdown__head"><span>02</span><div><strong>Training Academy</strong><small>Competence for the real world.</small></div></div>
              {trainingNav.map((item, index) => <a key={item.href} href={item.href} onClick={closeAll}><span>0{index + 1}</span><div><strong>{item.label}</strong><small>{item.note}</small></div><i>↗</i></a>)}
              <a className="nav-dropdown__all" href="/training" onClick={closeAll}>Explore all programs <span>→</span></a>
            </div>
          </div>
          <a href="/projects" onClick={closeAll}>Projects</a>
          <a href="/news" onClick={closeAll}>News</a>
          <a className="nav-instagram" href="https://www.instagram.com/prorope.services/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <LanguageSwitcher />
          <a className="button button--small" href="/contact">Request a quote</a>
        </nav>
      </div>
    </header>
  );
}
