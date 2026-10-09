"use client";

import { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { collectAnalyticsContext } from "./analytics-context";

const CONVERSION_SEND_TO = "AW-18407489612/wfqhCNzjv-kcEMyAsMIE";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackWhatsAppConversion(destination?: string) {
  if (typeof window === "undefined") return;
  let destinationHost = "wa.me";
  try { destinationHost = destination ? new URL(destination).host : destinationHost; } catch { /* Keep the safe default host label. */ }

  const conversion = {
    send_to: CONVERSION_SEND_TO,
    event_category: "engagement",
    event_label: "whatsapp_click",
    destination_host: destinationHost,
    ...collectAnalyticsContext(),
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", conversion);
    return;
  }

  // Keep a real GTM custom event as a fallback while gtag.js is loading.
  // Pushing an array here is not reliably recognized by GTM as a custom event.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "conversion", ...conversion });
}

export function WhatsAppLink({ children, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) trackWhatsAppConversion(event.currentTarget.href);
  };

  return <a {...props} onClick={handleClick}>{children}</a>;
}
