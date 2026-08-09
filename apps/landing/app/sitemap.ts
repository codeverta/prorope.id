import type { MetadataRoute } from "next";
import { posts, services, trainings } from "./data";
import { SITE_URL, SUPPORTED_LOCALES } from "./seo";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/training",
  "/training/schedule",
  "/training/registration",
  "/projects",
  "/news",
  "/products",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...services.map(service => `/services/${service.slug}`),
    ...trainings.map(training => `/training/${training.slug}`),
    ...posts.map(post => `/news/${post.slug}`),
  ];

  return SUPPORTED_LOCALES.flatMap(locale => paths.map(path => {
    const languageAlternates = Object.fromEntries(SUPPORTED_LOCALES.map(code => [code, `${SITE_URL}/${code}${path}`]));
    return {
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date("2026-08-09"),
      changeFrequency: path.startsWith("/news") ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/services" || path === "/training" ? 0.9 : 0.7,
      alternates: { languages: { ...languageAlternates, "x-default": `${SITE_URL}/id${path}` } },
    };
  }));
}
