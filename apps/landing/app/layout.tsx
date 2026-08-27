import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { RouteTransition } from "./components/RouteTransition";
import { createMetadata, languageTags, normalizeLocale, StructuredData } from "./seo";

const display = Barlow_Condensed({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const locale = normalizeLocale(requestHeaders.get("x-prorope-locale"));
  const pathname = requestHeaders.get("x-prorope-pathname") || `/${locale}`;
  return createMetadata(pathname, locale);
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = normalizeLocale(requestHeaders.get("x-prorope-locale"));
  const pathname = requestHeaders.get("x-prorope-pathname") || `/${locale}`;
  return <html lang={languageTags[locale]}><body className={`${display.variable} ${sans.variable}`}>
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18407489612" />
    <script id="google-ads-gtag" dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18407489612');` }} />
    <StructuredData pathname={pathname} locale={locale} /><LanguageProvider key={locale} initialLanguage={locale}><RouteTransition>{children}</RouteTransition></LanguageProvider>
  </body></html>;
}
