const SESSION_CONTEXT_KEY = "prorope_analytics_session_v1";

type SessionContext = {
  source: string;
  medium: string;
  campaign: string;
  landingPath: string;
  landingReferrer: string;
};

const searchEngineDomains = new Set([
  "google.com", "www.google.com", "google.co.id", "bing.com", "www.bing.com",
  "search.yahoo.com", "duckduckgo.com", "www.ecosia.org", "yandex.com",
]);

function referrerOrigin(referrer: string) {
  try {
    const url = new URL(referrer);
    if (typeof window !== "undefined" && url.origin === window.location.origin) return "";
    return url.origin;
  } catch {
    return "";
  }
}

function newSessionContext(): SessionContext {
  const url = new URL(window.location.href);
  const referrer = referrerOrigin(document.referrer);
  const referrerHost = referrer ? new URL(referrer).hostname.toLowerCase() : "";
  const utmSource = url.searchParams.get("utm_source") || "";
  const source = utmSource
    || (url.searchParams.has("gclid") || url.searchParams.has("wbraid") || url.searchParams.has("gbraid") ? "google" : "")
    || (searchEngineDomains.has(referrerHost) ? referrerHost.replace(/^www\./, "") : "")
    || (referrer ? referrerHost : "direct");
  const medium = url.searchParams.get("utm_medium")
    || (utmSource ? "campaign" : "")
    || (url.searchParams.has("gclid") || url.searchParams.has("wbraid") || url.searchParams.has("gbraid") ? "paid" : "")
    || (searchEngineDomains.has(referrerHost) ? "organic" : "")
    || (referrer ? "referral" : "direct");
  return {
    source,
    medium,
    campaign: url.searchParams.get("utm_campaign") || "",
    landingPath: url.pathname,
    landingReferrer: referrer,
  };
}

function sessionContext(): SessionContext {
  try {
    const existing = sessionStorage.getItem(SESSION_CONTEXT_KEY);
    if (existing) return JSON.parse(existing) as SessionContext;
    const created = newSessionContext();
    sessionStorage.setItem(SESSION_CONTEXT_KEY, JSON.stringify(created));
    return created;
  } catch {
    return newSessionContext();
  }
}

export function collectAnalyticsContext() {
  if (typeof window === "undefined") return {};
  const session = sessionContext();
  return {
    page_path: window.location.pathname,
    page_title: document.title,
    page_referrer: referrerOrigin(document.referrer),
    entry_source: session.source,
    entry_medium: session.medium,
    entry_campaign: session.campaign,
    entry_path: session.landingPath,
    entry_referrer: session.landingReferrer,
  };
}

export function initializeAnalyticsSession() {
  if (typeof window !== "undefined") sessionContext();
}
