import type { Metadata } from "next";
import { posts, services, trainings } from "./data";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prorope.id";
export const SITE_NAME = "Pro Rope";
export const SUPPORTED_LOCALES = ["id", "en", "zh", "ja"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

type LocalizedText = Record<SupportedLocale, string>;
type SeoPage = { title: LocalizedText; description: LocalizedText };

export const localeTags: Record<SupportedLocale, string> = {
  id: "id_ID",
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
};

export const languageTags: Record<SupportedLocale, string> = {
  id: "id-ID",
  en: "en",
  zh: "zh-CN",
  ja: "ja-JP",
};

const pages: Record<string, SeoPage> = {
  "/": {
    title: {
      id: "Jasa Rope Access Profesional Yogyakarta",
      en: "Professional Rope Access Services in Indonesia",
      zh: "印度尼西亚专业绳索作业服务",
      ja: "インドネシアのプロフェッショナルロープアクセス",
    },
    description: {
      id: "Jasa rope access profesional untuk inspeksi, pembersihan gedung, perawatan fasad, pengecatan, rescue, dan pelatihan kerja di ketinggian.",
      en: "Professional rope access for inspection, high-rise cleaning, facade maintenance, painting, rescue, and work-at-height training in Indonesia.",
      zh: "印度尼西亚专业绳索作业服务，涵盖检查、高层清洁、外墙维护、涂装、救援和高空作业培训。",
      ja: "インドネシアで点検、高層清掃、外壁保守、塗装、救助、高所作業訓練を提供するプロのロープアクセス会社です。",
    },
  },
  "/about": {
    title: { id: "Tentang Kami", en: "About Us", zh: "关于我们", ja: "私たちについて" },
    description: {
      id: "Kenali Pro Rope, tim rope access Yogyakarta yang mengutamakan keselamatan, kompetensi, dan hasil terukur untuk pekerjaan vertikal.",
      en: "Meet Pro Rope, a Yogyakarta rope access team focused on safety, competence, and accountable results for vertical work.",
      zh: "了解 Pro Rope：一支位于日惹、专注安全、专业能力和可靠成果的绳索作业团队。",
      ja: "安全性、専門性、確かな成果を重視するジョグジャカルタのロープアクセスチーム、Pro Ropeをご紹介します。",
    },
  },
  "/services": {
    title: { id: "Layanan Rope Access", en: "Rope Access Services", zh: "绳索作业服务", ja: "ロープアクセスサービス" },
    description: {
      id: "Layanan inspeksi, high-rise cleaning, perawatan gedung, sealant, pengecatan, dan blasting untuk area sulit dijangkau.",
      en: "Inspection, high-rise cleaning, building maintenance, sealant, painting, and blasting for difficult-to-reach areas.",
      zh: "为难以到达的区域提供检查、高层清洁、建筑维护、密封、涂装和喷砂服务。",
      ja: "アクセス困難な場所の点検、高層清掃、建物保守、シーリング、塗装、ブラストに対応します。",
    },
  },
  "/training": {
    title: { id: "Pelatihan Kerja di Ketinggian", en: "Work-at-Height Training", zh: "高空作业培训", ja: "高所作業トレーニング" },
    description: {
      id: "Pelatihan TKPK, teknisi akses tali, confined space, high angle rescue, dan tree climbing berbasis praktik di Yogyakarta.",
      en: "Practical training for work at height, rope access technicians, confined space, high-angle rescue, and tree climbing in Yogyakarta.",
      zh: "在日惹提供高空作业、绳索技术、受限空间、高角度救援和树木攀爬实操培训。",
      ja: "ジョグジャカルタで高所作業、ロープアクセス、閉所、高角度救助、ツリークライミングの実践訓練を提供します。",
    },
  },
  "/training/schedule": {
    title: { id: "Jadwal Pelatihan 2026", en: "2026 Training Schedule", zh: "2026年培训日程", ja: "2026年トレーニング日程" },
    description: {
      id: "Lihat jadwal terbaru pelatihan kerja di ketinggian Pro Rope di Yogyakarta dan pilihan kelas privat untuk perusahaan.",
      en: "See Pro Rope's latest work-at-height training schedule in Yogyakarta and private class options for companies.",
      zh: "查看 Pro Rope 在日惹的最新高空作业培训日程以及企业私人课程选项。",
      ja: "Pro Ropeのジョグジャカルタでの最新高所作業訓練日程と企業向けプライベートクラスをご覧ください。",
    },
  },
  "/training/registration": {
    title: { id: "Pendaftaran Pelatihan", en: "Training Registration", zh: "培训报名", ja: "トレーニング申込み" },
    description: {
      id: "Daftarkan minat untuk pelatihan kerja di ketinggian, rope access, rescue, confined space, atau tree climbing bersama Pro Rope.",
      en: "Register your interest in work-at-height, rope access, rescue, confined-space, or tree-climbing training with Pro Rope.",
      zh: "报名参加 Pro Rope 的高空作业、绳索技术、救援、受限空间或树木攀爬培训。",
      ja: "Pro Ropeの高所作業、ロープアクセス、救助、閉所、ツリークライミング訓練にお申し込みください。",
    },
  },
  "/projects": {
    title: { id: "Proyek Rope Access", en: "Rope Access Projects", zh: "绳索作业项目", ja: "ロープアクセス施工実績" },
    description: {
      id: "Lihat proyek rope access Pro Rope untuk cleaning, inspeksi, perawatan fasad, coating, dan pelatihan di berbagai kondisi lapangan.",
      en: "Explore Pro Rope projects in cleaning, inspection, facade maintenance, coating, and training across diverse site conditions.",
      zh: "查看 Pro Rope 在清洁、检查、外墙维护、涂层和培训方面的绳索作业项目。",
      ja: "清掃、点検、外壁保守、コーティング、訓練などPro Ropeのロープアクセス施工実績をご覧ください。",
    },
  },
  "/news": {
    title: { id: "Berita & Wawasan Rope Access", en: "Rope Access News & Insights", zh: "绳索作业资讯与洞见", ja: "ロープアクセスニュース・知識" },
    description: {
      id: "Artikel tentang keselamatan kerja di ketinggian, praktik rope access, perawatan gedung, rescue, dan inspeksi peralatan.",
      en: "Articles on work-at-height safety, rope access practices, building maintenance, rescue, and equipment inspection.",
      zh: "关于高空作业安全、绳索技术、建筑维护、救援和设备检查的文章。",
      ja: "高所作業の安全、ロープアクセス、建物保守、救助、機器点検に関する記事です。",
    },
  },
  "/products": {
    title: { id: "Peralatan Rope Access & Rescue", en: "Rope Access & Rescue Equipment", zh: "绳索作业与救援装备", ja: "ロープアクセス・救助装備" },
    description: {
      id: "Konsultasi dan pemasok peralatan rope access, fall protection, rigging, dan rescue profesional untuk kebutuhan tim Anda.",
      en: "Professional rope access, fall-protection, rigging, and rescue equipment consultation and supply for your team.",
      zh: "为团队提供专业绳索作业、防坠落、索具和救援设备咨询与供应。",
      ja: "チーム向けにプロ仕様のロープアクセス、墜落防止、リギング、救助装備を提案・供給します。",
    },
  },
  "/contact": {
    title: { id: "Kontak & Penawaran Proyek", en: "Contact & Project Quote", zh: "联系与项目报价", ja: "お問い合わせ・お見積り" },
    description: {
      id: "Hubungi Pro Rope untuk konsultasi dan penawaran jasa rope access, perawatan gedung, inspeksi, cleaning, atau pelatihan.",
      en: "Contact Pro Rope for consultation and quotes for rope access, building maintenance, inspection, cleaning, or training.",
      zh: "联系 Pro Rope，咨询绳索作业、建筑维护、检查、清洁或培训服务及报价。",
      ja: "ロープアクセス、建物保守、点検、清掃、訓練のご相談・お見積りはPro Ropeへお問い合わせください。",
    },
  },
};

const serviceNames: Record<string, LocalizedText> = {
  inspection: { id: "Jasa Inspeksi Rope Access", en: "Rope Access Inspection", zh: "绳索作业检查服务", ja: "ロープアクセス点検" },
  cleaning: { id: "Jasa Pembersihan Gedung Tinggi", en: "High-Rise Building Cleaning", zh: "高层建筑清洁", ja: "高層ビル清掃" },
  maintenance: { id: "Jasa Perawatan Gedung", en: "Building Maintenance", zh: "建筑维护服务", ja: "ビルメンテナンス" },
  "painting-blasting": { id: "Jasa Pengecatan & Blasting", en: "Painting & Blasting", zh: "涂装与喷砂服务", ja: "塗装・ブラストサービス" },
  "equipment-supplier": { id: "Peralatan Rope Access", en: "Rope Access Equipment", zh: "绳索作业装备", ja: "ロープアクセス装備" },
};

const trainingNames: Record<string, LocalizedText> = {
  tkpk: { id: "Pelatihan Tenaga Kerja Pada Ketinggian", en: "Work-at-Height Worker Training", zh: "高空作业人员培训", ja: "高所作業者トレーニング" },
  tkbt: { id: "Pelatihan Teknisi Akses Tali", en: "Rope Access Technician Training", zh: "绳索技术员培训", ja: "ロープアクセステクニシャン訓練" },
  "confined-space": { id: "Pelatihan Confined Space", en: "Confined Space Training", zh: "受限空间培训", ja: "閉所作業トレーニング" },
  "rescue-training": { id: "Pelatihan High Angle Rescue", en: "High-Angle Rescue Training", zh: "高角度救援培训", ja: "高角度救助トレーニング" },
  "tree-climbing": { id: "Pelatihan Tree Climbing", en: "Tree Climbing Training", zh: "树木攀爬培训", ja: "ツリークライミング訓練" },
};

const articleTranslations: Record<string, Pick<SeoPage, "title" | "description">> = {
  "memilih-metode-akses-untuk-fasad": {
    title: { id: posts[0].title, en: posts[0].titleEn, zh: "如何为外墙维护选择合适的作业方式", ja: "外壁メンテナンスに適したアクセス方法の選び方" },
    description: { id: posts[0].excerpt, en: posts[0].excerptEn, zh: "绳索作业、吊篮还是脚手架？项目开始前应了解安全、工期和作业区域方面的考虑因素。", ja: "ロープアクセス、ゴンドラ、足場のどれを選ぶべきか。着工前に安全性、期間、作業範囲の要点を確認します。" },
  },
  "persiapan-tim-rescue": {
    title: { id: posts[1].title, en: posts[1].titleEn, zh: "高空作业团队必须准备的五件事", ja: "高所作業チームが準備すべき5つのこと" },
    description: { id: posts[1].excerpt, en: posts[1].excerptEn, zh: "救援计划不是附属文件，而是每项高空作业中都必须落实的关键环节。", ja: "救助計画は単なる添付書類ではなく、あらゆる高所作業で実践される重要な要素です。" },
  },
  "inspeksi-peralatan-harian": {
    title: { id: posts[2].title, en: posts[2].titleEn, zh: "绳索作业设备每日检查清单", ja: "ロープアクセス機器の日常点検チェックリスト" },
    description: { id: posts[2].excerpt, en: posts[2].excerptEn, zh: "持续进行简单检查，有助于避免使用损坏设备，并保持设备记录清晰完整。", ja: "簡単な点検を継続することで、破損機器の使用を防ぎ、機器記録を適切に管理できます。" },
  },
};

const genericDescriptions: Record<SupportedLocale, (summary: string) => string> = {
  id: summary => summary,
  en: summary => summary,
  zh: () => "Pro Rope 为建筑、工业设施和难以到达的区域提供安全、高效、专业的绳索作业解决方案。",
  ja: () => "Pro Ropeは建物、産業施設、アクセス困難な場所に安全で効率的なプロのロープアクセスサービスを提供します。",
};

export function normalizeLocale(locale?: string | null): SupportedLocale {
  const normalized = locale?.toLowerCase().split("-")[0];
  return SUPPORTED_LOCALES.includes(normalized as SupportedLocale) ? normalized as SupportedLocale : "id";
}

export function stripLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (SUPPORTED_LOCALES.includes(segments[0] as SupportedLocale)) segments.shift();
  return segments.length ? `/${segments.join("/")}` : "/";
}

export function localizedPath(pathname: string, locale: SupportedLocale) {
  const clean = stripLocale(pathname);
  return `/${locale}${clean === "/" ? "" : clean}`;
}

function dynamicPage(pathname: string): SeoPage | undefined {
  const [, section, slug] = pathname.split("/");
  if (section === "services" && slug) {
    const service = services.find(item => item.slug === slug);
    if (!service) return undefined;
    const names = serviceNames[slug];
    return {
      title: names,
      description: {
        id: service.summary,
        en: englishServiceDescription(slug),
        zh: genericDescriptions.zh(service.summary),
        ja: genericDescriptions.ja(service.summary),
      },
    };
  }
  if (section === "training" && slug && slug !== "schedule" && slug !== "registration") {
    const training = trainings.find(item => item.slug === slug);
    if (!training) return undefined;
    return {
      title: trainingNames[slug],
      description: {
        id: training.summary,
        en: `Practical ${training.title} training in Yogyakarta and on-site for professional teams. Learn safe procedures through guided exercises and assessment.`,
        zh: `面向专业团队的${training.title}实操培训，可在日惹或客户现场开展，包含安全程序、练习和评估。`,
        ja: `専門チーム向けの${training.title}実践訓練。ジョグジャカルタまたは現地で、安全手順、演習、評価を行います。`,
      },
    };
  }
  if (section === "news" && slug) {
    const post = posts.find(item => item.slug === slug);
    if (!post) return undefined;
    return articleTranslations[slug];
  }
}

function englishServiceDescription(slug: string) {
  return ({
    inspection: "Visual and technical rope access inspection for facades, structures, towers, and other difficult-to-reach areas.",
    cleaning: "Fast, low-disruption glass and facade cleaning for high-rise buildings using professional rope access methods.",
    maintenance: "Rope access maintenance for facade sealant, leaks, cladding, lighting, and exterior building components.",
    "painting-blasting": "Surface preparation, protective painting, and coating for industrial assets and buildings in difficult-to-reach areas.",
    "equipment-supplier": "Professional rope access, rescue, and work-at-height equipment selected for your team's operational needs.",
  } as Record<string, string>)[slug];
}

export function getPageSeo(pathname: string, locale: SupportedLocale) {
  const clean = stripLocale(pathname);
  const page = pages[clean] || dynamicPage(clean) || pages["/"];
  return { title: page.title[locale], description: page.description[locale], clean };
}

export function createMetadata(pathname: string, locale: SupportedLocale): Metadata {
  const { title, description, clean } = getPageSeo(pathname, locale);
  const canonical = localizedPath(clean, locale);
  const fullTitle = clean === "/" ? `${SITE_NAME} | ${title}` : `${title} | ${SITE_NAME}`;
  const languages = Object.fromEntries(SUPPORTED_LOCALES.map(code => [languageTags[code], localizedPath(clean, code)]));
  const otherLocales = SUPPORTED_LOCALES.filter(code => code !== locale).map(code => localeTags[code]);

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Rope access services and work-at-height training",
    keywords: locale === "id"
      ? ["jasa rope access", "rope access Yogyakarta", "pembersihan gedung tinggi", "kerja di ketinggian", "pelatihan rope access", "perawatan gedung"]
      : ["rope access Indonesia", "high-rise cleaning", "work at height", "building maintenance", "rope access training", "vertical rescue"],
    alternates: { canonical, languages: { ...languages, "x-default": localizedPath(clean, "id") } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type: clean.startsWith("/news/") ? "article" : "website",
      url: canonical,
      siteName: SITE_NAME,
      locale: localeTags[locale],
      alternateLocale: otherLocales,
      title: fullTitle,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${title} — ${SITE_NAME}` }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og.png"] },
    icons: { icon: [{ url: "/favicon.ico" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }], apple: "/apple-touch-icon.png" },
    manifest: "/site.webmanifest",
  };
}

function breadcrumbName(segment: string) {
  return segment.replaceAll("-", " ").replace(/\b\w/g, letter => letter.toUpperCase());
}

export function createStructuredData(pathname: string, locale: SupportedLocale) {
  const { title, description, clean } = getPageSeo(pathname, locale);
  const pageUrl = new URL(localizedPath(clean, locale), SITE_URL).toString();
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: new URL("/android-chrome-512x512.png", SITE_URL).toString(), width: 512, height: 512 },
      image: new URL("/og.png", SITE_URL).toString(),
      email: "contact@prorope.id",
      telephone: "+62 822-1040-1004",
      description: pages["/"].description[locale],
      address: { "@type": "PostalAddress", addressLocality: "Yogyakarta", addressCountry: "ID" },
      areaServed: { "@type": "Country", name: "Indonesia" },
      sameAs: ["https://www.instagram.com/prorope.services/"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: languageTags[locale],
      publisher: { "@id": organizationId },
    },
  ];

  const segments = clean.split("/").filter(Boolean);
  if (segments.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: locale === "id" ? "Beranda" : "Home", item: new URL(`/${locale}`, SITE_URL).toString() },
        ...segments.map((segment, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: index === segments.length - 1 ? title : breadcrumbName(segment),
          item: new URL(`/${locale}/${segments.slice(0, index + 1).join("/")}`, SITE_URL).toString(),
        })),
      ],
    });
  }

  const service = segments[0] === "services" ? services.find(item => item.slug === segments[1]) : undefined;
  const training = segments[0] === "training" ? trainings.find(item => item.slug === segments[1]) : undefined;
  const post = segments[0] === "news" ? posts.find(item => item.slug === segments[1]) : undefined;
  let pageType = "WebPage";
  if (post) pageType = "Article";
  else if (service) pageType = "Service";
  else if (training) pageType = "Course";

  const pageNode: Record<string, unknown> = {
    "@type": pageType,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: languageTags[locale],
    isPartOf: { "@id": websiteId },
    provider: { "@id": organizationId },
  };
  if (segments.length) pageNode.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
  if (service) {
    pageNode.serviceType = service.title;
    pageNode.areaServed = { "@type": "Country", name: "Indonesia" };
  }
  if (training) {
    pageNode.provider = { "@id": organizationId };
    pageNode.hasCourseInstance = { "@type": "CourseInstance", courseMode: ["onsite", "in-person"], location: "Yogyakarta, Indonesia" };
  }
  if (post) {
    pageNode.headline = title;
    pageNode.image = post.image;
    pageNode.datePublished = ({ "memilih-metode-akses-untuk-fasad": "2026-08-02", "persiapan-tim-rescue": "2026-07-18", "inspeksi-peralatan-harian": "2026-06-06" } as Record<string, string>)[post.slug];
    pageNode.author = { "@id": organizationId };
    pageNode.publisher = { "@id": organizationId };
  }
  graph.push(pageNode);

  return { "@context": "https://schema.org", "@graph": graph };
}

export function StructuredData({ pathname, locale }: { pathname: string; locale: SupportedLocale }) {
  const json = JSON.stringify(createStructuredData(pathname, locale)).replaceAll("<", "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
