"use client";

import { useEffect } from "react";

const revealSelector = [
  ".intro-grid > *",
  ".metric-strip > *",
  ".section-heading > *",
  ".service-row",
  ".visual-break__card > *",
  ".training-card",
  ".project-tile",
  ".value-grid > *",
  ".news-card",
  ".contact-band__grid > *",
].join(",");

export function ScrollReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-scroll-reveal-root]");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>(revealSelector));
    root.classList.add("reveal-enabled");
    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 45}ms`);
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
