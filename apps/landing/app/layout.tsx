import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";

const display = Barlow_Condensed({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://prorope.id"),
  title: { default: "Pro Rope — Professional Rope Access Services", template: "%s — Pro Rope" },
  description: "Rope access services, building maintenance, high-rise cleaning, inspection, painting, rescue, dan training kerja di ketinggian dari Yogyakarta.",
  icons: { icon: "/prorope-logo.jpg", shortcut: "/prorope-logo.jpg", apple: "/prorope-logo.jpg" },
  openGraph: { title: "Pro Rope — Reach beyond limits", description: "Professional rope access services. Safe, efficient, certified.", type: "website", images: [{ url: "/prorope-logo.jpg", width: 1080, height: 1080, alt: "Pro Rope Services" }] },
  twitter: { card: "summary_large_image", title: "Pro Rope — Reach beyond limits", description: "Professional rope access services. Safe, efficient, certified.", images: ["/prorope-logo.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={`${display.variable} ${sans.variable}`}><LanguageProvider>{children}</LanguageProvider></body></html>;
}
