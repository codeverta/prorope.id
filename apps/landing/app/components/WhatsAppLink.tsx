"use client";

import { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

const CONVERSION_SEND_TO = "AW-18407489612/wfqhCNzjv-kcEMyAsMIE";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackWhatsAppConversion() {
  if (typeof window === "undefined") return;
  const conversion = { send_to: CONVERSION_SEND_TO };
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", conversion);
  } else {
    window.dataLayer?.push(["event", "conversion", conversion]);
  }
}

export function WhatsAppLink({ children, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) trackWhatsAppConversion();
  };

  return <a {...props} onClick={handleClick}>{children}</a>;
}
