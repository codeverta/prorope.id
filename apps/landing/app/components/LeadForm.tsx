"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { collectAnalyticsContext } from "./analytics-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function LeadForm({ compact = false, kind = "quote" }: { compact?: boolean; kind?: "quote" | "training" }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const endpoint = kind === "training" ? "/api/v1/registrations" : "/api/v1/leads";
      const response = await fetch(`${API_URL}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form_submit",
          lead_type: kind,
          lead_status: "server_accepted",
          ...collectAnalyticsContext(),
        });
      }
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form className={`lead-form ${compact ? "lead-form--compact" : ""}`} onSubmit={submit}>
      <label><span>{t("Nama lengkap", "Full name")}</span><input name="name" required placeholder={t("Nama Anda", "Your name")} /></label>
      <label><span>{t("Nomor WhatsApp", "WhatsApp number")}</span><input name="phone" required placeholder="08xx xxxx xxxx" /></label>
      <label><span>Email</span><input name="email" type="email" placeholder="nama@perusahaan.com" /></label>
      <label><span>{kind === "training" ? t("Program pelatihan", "Training program") : t("Kebutuhan layanan", "Required service")}</span>
        <select name={kind === "training" ? "program" : "service"} required defaultValue="">
          <option value="" disabled>{t("Pilih salah satu", "Choose one")}</option>
          {(kind === "training" ? ["TKPK", "TKBT", "Confined Space", "High Angle Rescue", "Tree Climbing"] : ["Inspection", "High-Rise Cleaning", "Building Maintenance", "Painting & Blasting", "Equipment Supplier"]).map(x => <option key={x}>{x}</option>)}
        </select>
      </label>
      {!compact && <label className="span-2"><span>{t("Pesan", "Message")}</span><textarea name="message" rows={4} placeholder={t("Ceritakan lokasi, lingkup, atau jadwal yang Anda butuhkan.", "Tell us the location, scope, or schedule you need.")} /></label>}
      <button className="button span-2" disabled={status === "sending"}>{status === "sending" ? t("Mengirim...", "Sending...") : kind === "training" ? t("Kirim pendaftaran", "Submit registration") : t("Kirim permintaan", "Send enquiry")}<span>↗</span></button>
      {status === "success" && <p className="form-message success span-2">{t("Terima kasih. Tim kami akan menghubungi Anda.", "Thank you. Our team will contact you.")}</p>}
      {status === "error" && <p className="form-message error span-2">{t("Belum dapat terhubung ke server. Silakan hubungi kami melalui Instagram.", "We could not connect to the server. Please contact us through Instagram.")}</p>}
    </form>
  );
}
