type Navigate = (href: string) => void;

let navigationTimer: number | undefined;
let fallbackTimer: number | undefined;

export function navigateWithTransition(href: string, navigate: Navigate) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    navigate(href);
    return;
  }

  window.clearTimeout(navigationTimer);
  window.clearTimeout(fallbackTimer);
  document.documentElement.classList.add("is-page-leaving");
  navigationTimer = window.setTimeout(() => navigate(href), 120);
  fallbackTimer = window.setTimeout(() => document.documentElement.classList.remove("is-page-leaving"), 1800);
}

export function finishNavigationTransition() {
  window.clearTimeout(navigationTimer);
  window.clearTimeout(fallbackTimer);
  document.documentElement.classList.remove("is-page-leaving");
}
