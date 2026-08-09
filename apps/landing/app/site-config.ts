export const DEFAULT_LOCALE = "id";
export const SUPPORTED_LOCALES = ["id", "en", "zh", "ja"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://prorope.id").replace(/\/+$/, "");

export const languageTags: Record<SupportedLocale, string> = {
  id: "id-ID",
  en: "en",
  zh: "zh-CN",
  ja: "ja-JP",
};
