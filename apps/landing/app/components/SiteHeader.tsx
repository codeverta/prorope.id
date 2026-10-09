"use client";

import { usePathname, useRouter } from "next/navigation";
import { AnchorHTMLAttributes, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { LanguageSwitcher, useLanguage } from "./LanguageProvider";
import { navigateWithTransition } from "./navigationTransition";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WhatsAppLink } from "./WhatsAppLink";

const serviceNav = [
  { label: "Inspeksi", labelEn: "Inspection", href: "/services/inspection", note: "Penilaian visual dan teknis", noteEn: "Visual & technical assessment" },
  { label: "Pembersihan", labelEn: "Cleaning", href: "/services/cleaning", note: "Kaca, fasad, dan akses sulit", noteEn: "Glass, facade & difficult access" },
  { label: "Perawatan gedung", labelEn: "Maintenance", href: "/services/maintenance", note: "Sealant, kebocoran, dan fasad", noteEn: "Sealant, leak & facade repair" },
  { label: "Pengecatan gedung", labelEn: "Building Painting", href: "/services/painting-blasting", note: "Pengecatan dan coating protektif", noteEn: "Painting & protective coating" },
  { label: "Rope access", labelEn: "Rope Access", href: "/services/rope-access", note: "Pekerjaan akses tali di Yogyakarta", noteEn: "Rope access services in Yogyakarta" },
  { label: "Pemasok peralatan", labelEn: "Equipment Supplier", href: "/products", note: "Peralatan akses dan rescue", noteEn: "Professional access & rescue gear" },
];

const trainingNav = [
  { label: "Jadwal", labelEn: "Schedule", href: "/training/schedule", note: "Batch mendatang 2026", noteEn: "Upcoming 2026 batches" },
  { label: "TKPK", labelEn: "TKPK", href: "/training/tkpk", note: "Tenaga Kerja Pada Ketinggian", noteEn: "Work at Height Worker" },
  { label: "TKBT", labelEn: "TKBT", href: "/training/tkbt", note: "Teknisi Akses Tali", noteEn: "Rope Access Technician" },
  { label: "Confined Space", labelEn: "Confined Space", href: "/training/confined-space", note: "Masuk, bekerja, dan rescue", noteEn: "Entry, work & rescue" },
  { label: "Pelatihan Rescue", labelEn: "Rescue Training", href: "/training/rescue-training", note: "Rescue tim sudut tinggi", noteEn: "High-angle team rescue" },
  { label: "Tree Climbing", labelEn: "Tree Climbing", href: "/training/tree-climbing", note: "Akses dan positioning arborist", noteEn: "Arborist access & positioning" },
  { label: "Pendaftaran", labelEn: "Registration", href: "/training/registration", note: "Daftarkan minat Anda", noteEn: "Register your interest" },
];

function withoutLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && /^[a-z]{2}(?:-[a-z]{2})?$/.test(parts[0])) parts.shift();
  return `/${parts.join("/")}`;
}

function withLocale(href: string, language: string) {
  return `/${language}${href === "/" ? "" : href}`;
}

function ClientLink({ href, onClick, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  const router = useRouter();
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank") return;
    event.preventDefault();
    navigateWithTransition(href, router.push);
  };
  return <a {...props} href={href} onClick={navigate}>{children}</a>;
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  const { language } = useLanguage();
  return (
    <ClientLink className={`brand ${inverse ? "brand--inverse" : ""}`} href={withLocale("/", language)} aria-label="Pro Rope home">
      <span className="brand__logo" aria-hidden="true"><img src="/prorope-logo.jpg" alt="" /></span>
    </ClientLink>
  );
}

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const { language, t } = useLanguage();
  const pathname = withoutLocale(usePathname());
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "training" | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const closeAll = () => { setOpen(false); setOpenDropdown(null); };
  const href = (path: string) => withLocale(path, language);
  const active = (path: string, nested = false) => nested ? pathname === path || pathname.startsWith(`${path}/`) : pathname === path;

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const current = window.scrollY;
        const delta = current - lastScrollY.current;
        setScrolled(current > 16);
        if (current <= 120 || delta < -6) setHidden(false);
        else if (delta > 6 && !open) {
          setHidden(true);
          setOpenDropdown(null);
        }
        lastScrollY.current = current;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const showDropdown = (dropdown: "services" | "training") => {
    setHidden(false);
    setOpenDropdown(dropdown);
  };

  const hideDropdown = (dropdown: "services" | "training") => {
    setOpenDropdown(current => current === dropdown ? null : current);
  };

  const canHover = () => window.matchMedia("(min-width: 1001px) and (hover: hover)").matches;

  return (
    <header className={`site-header ${dark ? "site-header--dark" : ""} ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""}`}>
      <div className="header-topbar">
        <div className="shell header-topbar__inner">
          <div className="header-contact-links">
            <WhatsAppLink href="https://wa.me/6282210401004" target="_blank" rel="noreferrer" aria-label="WhatsApp Faris di +62 822-1040-1004">
              <WhatsAppIcon width={13} height={13} />
              <span>+62 822-1040-1004 <small>(Faris)</small></span>
            </WhatsAppLink>
            <a href="mailto:contact@prorope.id" aria-label="Email contact@prorope.id">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
              <span>contact@prorope.id</span>
            </a>
          </div>
          <a className="header-instagram" href="https://www.instagram.com/prorope.id/" target="_blank" rel="noreferrer" aria-label="Instagram prorope.id">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.25" /><circle cx="17.4" cy="6.7" r="1" className="instagram-dot" /></svg>
          </a>
        </div>
      </div>
      <div className="shell header-inner">
        <Brand inverse={dark} />
        <button className="menu-button" aria-label="Buka menu" aria-expanded={open} onClick={() => { setHidden(false); setOpen(!open); }}><span /><span /></button>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navigasi utama">
          <ClientLink className={active("/") ? "is-active" : ""} href={href("/")} onClick={closeAll}>Beranda</ClientLink>
          <ClientLink className={active("/about") ? "is-active" : ""} href={href("/about")} onClick={closeAll}>{t("Tentang", "About")}</ClientLink>
          <div className={`nav-group ${active("/services", true) ? "is-active" : ""} ${openDropdown === "services" ? "is-open" : ""}`} onMouseEnter={() => { if (canHover()) showDropdown("services"); }} onMouseLeave={() => { if (canHover()) hideDropdown("services"); }}>
            <div className="nav-group__trigger">
              <ClientLink href={href("/services")} onClick={closeAll}>{t("Layanan", "Services")}</ClientLink>
              <button aria-label={t("Buka menu layanan", "Open services menu")} aria-expanded={openDropdown === "services"} aria-controls="services-dropdown" onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}><span aria-hidden="true" /></button>
            </div>
            <div className="nav-dropdown" id="services-dropdown">
              <div className="nav-dropdown__head"><span>01</span><div><strong>{t("Layanan kami", "Our Services")}</strong><small>{t("Bekerja aman di setiap ketinggian.", "Work safely at every height.")}</small></div></div>
              {serviceNav.map((item, index) => <ClientLink className={active(item.href) ? "is-active" : ""} key={item.href} href={href(item.href)} onClick={closeAll}><span>0{index + 1}</span><div><strong>{t(item.label, item.labelEn)}</strong><small>{t(item.note, item.noteEn)}</small></div><i>↗</i></ClientLink>)}
              <ClientLink className="nav-dropdown__all" href={href("/services")} onClick={closeAll}>{t("Jelajahi semua layanan", "Explore all services")} <span>→</span></ClientLink>
            </div>
          </div>
          <div className={`nav-group nav-group--training ${active("/training", true) ? "is-active" : ""} ${openDropdown === "training" ? "is-open" : ""}`} onMouseEnter={() => { if (canHover()) showDropdown("training"); }} onMouseLeave={() => { if (canHover()) hideDropdown("training"); }}>
            <div className="nav-group__trigger">
              <ClientLink href={href("/training")} onClick={closeAll}>{t("Pelatihan", "Training")}</ClientLink>
              <button aria-label={t("Buka menu pelatihan", "Open training menu")} aria-expanded={openDropdown === "training"} aria-controls="training-dropdown" onClick={() => setOpenDropdown(openDropdown === "training" ? null : "training")}><span aria-hidden="true" /></button>
            </div>
            <div className="nav-dropdown nav-dropdown--training" id="training-dropdown">
              <div className="nav-dropdown__head"><span>02</span><div><strong>{t("Akademi Pelatihan", "Training Academy")}</strong><small>{t("Kompetensi untuk dunia nyata.", "Competence for the real world.")}</small></div></div>
              {trainingNav.map((item, index) => <ClientLink className={active(item.href) ? "is-active" : ""} key={item.href} href={href(item.href)} onClick={closeAll}><span>0{index + 1}</span><div><strong>{t(item.label, item.labelEn)}</strong><small>{t(item.note, item.noteEn)}</small></div><i>↗</i></ClientLink>)}
              <ClientLink className="nav-dropdown__all" href={href("/training")} onClick={closeAll}>{t("Jelajahi semua program", "Explore all programs")} <span>→</span></ClientLink>
            </div>
          </div>
          <ClientLink className={active("/projects") ? "is-active" : ""} href={href("/projects")} onClick={closeAll}>{t("Proyek", "Projects")}</ClientLink>
          <ClientLink className={active("/news", true) ? "is-active" : ""} href={href("/news")} onClick={closeAll}>{t("Berita", "News")}</ClientLink>
          <LanguageSwitcher onSelect={closeAll} />
          <WhatsAppLink className="button button--small" href="https://wa.me/6282210401004" target="_blank" rel="noreferrer" onClick={closeAll}>WhatsApp Sekarang <WhatsAppIcon width={15} height={15} /></WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}
