import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { posts, services, trainings } from "../app/data.ts";
import { DEFAULT_LOCALE, languageTags, SITE_URL, SUPPORTED_LOCALES } from "../app/site-config.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDirectory = path.join(root, "app");
const generatedRouteDirectory = path.join(appDirectory, "sitemap.xml");
const outputFile = path.join(generatedRouteDirectory, "route.ts");
const legacyPublicFile = path.join(root, "public", "sitemap.xml");
const excludedRoutes = new Set(["/admin"]);
const staticLastModified = new Map([
  ["/", "2026-10-09"],
  ["/services", "2026-10-09"],
  ["/services/painting-blasting", "2026-10-09"],
  ["/services/rope-access", "2026-10-09"],
  ["/news/memilih-metode-akses-untuk-fasad", "2026-10-09"],
  ["/news/biaya-pengecatan-gedung-faktor-penawaran", "2026-10-09"],
  ["/news", "2026-10-09"],
]);

function contentLocales(post) {
  if (post.translations) {
    return SUPPORTED_LOCALES.filter(locale => {
      const translation = post.translations[locale];
      return translation?.title?.trim() && translation?.excerpt?.trim() && translation?.body?.trim();
    });
  }
  return ["id", ...(post.body && post.bodyEn ? ["en"] : [])];
}

function staticAlternateLocales(route) {
  if (route === "/" || route === "/news") return ["id", "en"];
  if (route === "/services/painting-blasting" || route === "/services/rope-access") return ["id", "en"];
  if (route.startsWith("/news/")) {
    const post = posts.find(item => `/news/${item.slug}` === route);
    return post ? contentLocales(post) : ["en"];
  }
  return ["en"];
}

async function publishedCmsPosts() {
  const apiUrl = (process.env.SITEMAP_API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
  if (!apiUrl) return [];
  try {
    const response = await fetch(`${apiUrl}/api/v1/posts`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const livePosts = await response.json();
    return livePosts
      .filter(post => post.published !== false && typeof post.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug))
      .map(post => ({ path: `/news/${post.slug}`, lastModified: toISODate(post.updated_at || post.published_at), locales: contentLocales(post) }));
  } catch (error) {
    console.warn(`Could not load published CMS posts for sitemap: ${error.message}`);
    return [];
  }
}

const cmsPostRoutes = await publishedCmsPosts();
const staticPostRoutes = posts.map(post => ({
  path: `/news/${post.slug}`,
  lastModified: toISODate(post.updatedAt || post.date),
  locales: contentLocales(post),
}));

function newestRouteByPath(routes) {
  const selected = new Map();
  for (const route of routes) {
    const previous = selected.get(route.path);
    if (!previous || (route.lastModified || "") > (previous.lastModified || "")) selected.set(route.path, route);
  }
  return [...selected.values()];
}

const dynamicRoutes = new Map([
  ["/services/[slug]", services.map(({ slug }) => {
    const route = `/services/${slug}`;
    return { path: route, lastModified: staticLastModified.get(route), locales: ["id", "en"], alternateLocales: staticAlternateLocales(route) };
  })],
  ["/training/[slug]", trainings.map(({ slug }) => ({ path: `/training/${slug}`, locales: ["id", "en"], alternateLocales: ["en"] }))],
  ["/news/[slug]", [...new Map([
    ...newestRouteByPath([...staticPostRoutes, ...cmsPostRoutes]).map(route => [route.path, route]),
  ]).values()]],
]);

function toISODate(value) {
  const valueText = String(value ?? "").trim();
  const isoDate = valueText.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoDate) return `${isoDate[1]}-${isoDate[2]}-${isoDate[3]}`;
  const editorialDate = valueText.match(/^(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})$/);
  if (editorialDate) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const month = months.indexOf(editorialDate[2].slice(0, 3).toLowerCase()) + 1;
    if (month > 0) return `${editorialDate[3]}-${String(month).padStart(2, "0")}-${editorialDate[1].padStart(2, "0")}`;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? undefined : parsed.toISOString().slice(0, 10);
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function routeFromPage(relativeFile) {
  const segments = path.dirname(relativeFile).split(path.sep).filter(segment => segment !== ".");
  const publicSegments = segments
    .filter(segment => !/^\(.+\)$/.test(segment))
    .filter(segment => !segment.startsWith("_"));
  return publicSegments.length ? `/${publicSegments.join("/")}` : "/";
}

async function findPages(directory = appDirectory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const pages = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) pages.push(...await findPages(absolute));
    else if (entry.isFile() && entry.name === "page.tsx") pages.push(path.relative(appDirectory, absolute));
  }
  return pages;
}

function expandRoutes(pageFiles) {
  const routes = [];
  for (const file of pageFiles) {
    const route = routeFromPage(file);
    if ([...excludedRoutes].some(excluded => route === excluded || route.startsWith(`${excluded}/`))) continue;

    if (route.includes("[")) {
      const resolved = dynamicRoutes.get(route);
      if (!resolved) throw new Error(`Dynamic route ${route} has no sitemap resolver`);
      routes.push(...resolved);
    } else {
      routes.push({ path: route, lastModified: staticLastModified.get(route), locales: ["id", "en"], alternateLocales: staticAlternateLocales(route) });
    }
  }
  return [...new Map(routes.map(route => [route.path, route])).values()]
    .sort((left, right) => left.path.localeCompare(right.path));
}

function assertCompleteSitemap(routes) {
  const generatedPaths = new Set(routes.map(route => route.path));
  const requiredPaths = [
    ...services.map(({ slug }) => `/services/${slug}`),
    ...trainings.map(({ slug }) => `/training/${slug}`),
    ...posts.map(({ slug }) => `/news/${slug}`),
  ];
  const missingPaths = requiredPaths.filter(route => !generatedPaths.has(route));
  if (missingPaths.length) throw new Error(`Sitemap is missing required routes: ${missingPaths.join(", ")}`);
}

function priorityFor(route) {
  if (route === "/") return "1.0";
  if (route === "/services" || route === "/training") return "0.9";
  if (route.split("/").filter(Boolean).length > 1) return "0.7";
  return "0.8";
}

function frequencyFor(route) {
  return route === "/news" || route.startsWith("/news/") ? "weekly" : "monthly";
}

function localizedUrl(locale, route) {
  return `${SITE_URL}/${locale}${route === "/" ? "" : route}`;
}

function renderEntry(locale, route) {
  const routeLocales = route.alternateLocales || route.locales || ["id", "en"];
  const alternates = routeLocales.map(code =>
    `    <xhtml:link rel="alternate" hreflang="${languageTags[code]}" href="${escapeXml(localizedUrl(code, route.path))}" />`,
  );
  if (routeLocales.includes(DEFAULT_LOCALE)) alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(localizedUrl(DEFAULT_LOCALE, route.path))}" />`);

  return [
    "  <url>",
    `    <loc>${escapeXml(localizedUrl(locale, route.path))}</loc>`,
    ...alternates,
    ...(route.lastModified ? [`    <lastmod>${route.lastModified}</lastmod>`] : []),
    `    <changefreq>${frequencyFor(route.path)}</changefreq>`,
    `    <priority>${priorityFor(route.path)}</priority>`,
    "  </url>",
  ].join("\n");
}

if (!/^https?:\/\/[^\s]+$/i.test(SITE_URL)) {
  throw new Error(`NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) URL, received: ${SITE_URL}`);
}

const routes = expandRoutes(await findPages());
assertCompleteSitemap(routes);
const entries = routes.flatMap(route => (route.locales || ["id", "en"]).map(locale => renderEntry(locale, route)));
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries,
  "</urlset>",
  "",
].join("\n");

const routeModule = `// Generated by scripts/generate-sitemap.mjs. Do not edit.\n\nconst sitemap = ${JSON.stringify(xml)};\n\nexport function GET() {\n  return new Response(sitemap, {\n    headers: {\n      "Content-Type": "application/xml; charset=utf-8",\n      "Cache-Control": "public, max-age=3600",\n    },\n  });\n}\n`;

await mkdir(generatedRouteDirectory, { recursive: true });
await rm(legacyPublicFile, { force: true });
await writeFile(outputFile, routeModule, "utf8");
console.log(`Generated sitemap.xml: ${routes.length} routes → ${entries.length} localized URLs`);
