import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";

const display = Barlow_Condensed({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://prorope.id"),
  title: { default: "Pro Rope — Professional Rope Access Services", template: "%s — Pro Rope" },
  description: "Rope access services, building maintenance, high-rise cleaning, inspection, painting, rescue, dan training kerja di ketinggian dari Yogyakarta.",
  icons: { icon: "/prorope-logo.jpg", shortcut: "/prorope-logo.jpg", apple: "/prorope-logo.jpg" },
  openGraph: { title: "Pro Rope — Reach beyond limits", description: "Professional rope access services. Safe, efficient, certified.", type: "website", images: [{ url: "/prorope-logo.jpg", width: 1080, height: 1080, alt: "Pro Rope Services" }] },
  twitter: { card: "summary_large_image", title: "Pro Rope — Reach beyond limits", description: "Professional rope access services. Safe, efficient, certified.", images: ["/prorope-logo.jpg"] },
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-prorope-locale");
  const pathname = requestHeaders.get("x-prorope-pathname");
  if (!locale || !pathname) return baseMetadata;

  const rest = pathname.split("/").filter(Boolean).slice(1).join("/");
  const pathFor = (code: string) => `/${code}${rest ? `/${rest}` : ""}`;
  return {
    ...baseMetadata,
    alternates: {
      canonical: pathFor(locale),
      languages: {
        "id-ID": pathFor("id"),
        "en": pathFor("en"),
        "zh-CN": pathFor("zh"),
        "ja-JP": pathFor("ja"),
        "x-default": pathFor("id"),
      },
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-prorope-locale") || "id";
  return <html lang={locale}><body className={`${display.variable} ${sans.variable}`}><LanguageProvider key={locale} initialLanguage={locale}>{children}</LanguageProvider></body></html>;
}
