import type { Metadata } from "next";
import { posts, productCategories, projects, schedules, services, trainings } from "./data";
import { trainingHeroImages, trainingLandingImage, trainingScheduleImage } from "./media";
import { languageTags, SITE_URL, SUPPORTED_LOCALES, type SupportedLocale } from "./site-config";

export { languageTags, SITE_URL, SUPPORTED_LOCALES } from "./site-config";

export const SITE_NAME = "Pro Rope";

type LocalizedText = Record<SupportedLocale, string>;
type LocalizedKeywords = Record<SupportedLocale, string[]>;
type PageKind = "home" | "about" | "collection" | "registration" | "contact" | "service" | "course" | "article" | "private";
type SeoPage = {
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  kind: PageKind;
  keywords?: Partial<LocalizedKeywords>;
};

export type RuntimeArticle = {
  slug: string;
  category: string;
  image_url: string;
  published_at: string;
  translations: Record<string, { title: string; excerpt: string; body?: string }>;
};

export const localeTags: Record<SupportedLocale, string> = {
  id: "id_ID",
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
};

const homeDescription: LocalizedText = {
  id: "Jasa rope access profesional untuk inspeksi, pembersihan gedung, perawatan fasad, pengecatan, rescue, dan pelatihan kerja di ketinggian.",
  en: "Professional rope access for inspection, high-rise cleaning, facade maintenance, painting, rescue, and work-at-height training in Indonesia.",
  zh: "印度尼西亚专业绳索作业服务，涵盖检查、高层清洁、外墙维护、涂装、救援和高空作业培训。",
  ja: "インドネシアで点検、高層清掃、外壁保守、塗装、救助、高所作業訓練を提供するプロのロープアクセス会社です。",
};

const pages: Record<string, SeoPage> = {
  "/": {
    kind: "home",
    image: "/og.png",
    title: { id: "Jasa Rope Access Profesional Yogyakarta", en: "Professional Rope Access Services in Indonesia", zh: "印度尼西亚专业绳索作业服务", ja: "インドネシアのプロフェッショナルロープアクセス" },
    description: homeDescription,
  },
  "/about": {
    kind: "about",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&h=630&q=85",
    title: { id: "Tentang Kami", en: "About Us", zh: "关于我们", ja: "私たちについて" },
    description: {
      id: "Kenali Pro Rope, tim rope access Yogyakarta yang mengutamakan keselamatan, kompetensi, dan hasil terukur untuk pekerjaan vertikal.",
      en: "Meet Pro Rope, a Yogyakarta rope access team focused on safety, competence, and accountable results for vertical work.",
      zh: "了解 Pro Rope：一支位于日惹、专注安全、专业能力和可靠成果的绳索作业团队。",
      ja: "安全性、専門性、確かな成果を重視するジョグジャカルタのロープアクセスチーム、Pro Ropeをご紹介します。",
    },
  },
  "/services": {
    kind: "collection",
    image: socialImage(services[1].image),
    title: { id: "Layanan Rope Access", en: "Rope Access Services", zh: "绳索作业服务", ja: "ロープアクセスサービス" },
    description: {
      id: "Layanan inspeksi, high-rise cleaning, perawatan gedung, sealant, pengecatan, dan blasting untuk area sulit dijangkau.",
      en: "Inspection, high-rise cleaning, building maintenance, sealant, painting, and blasting for difficult-to-reach areas.",
      zh: "为难以到达的区域提供检查、高层清洁、建筑维护、密封、涂装和喷砂服务。",
      ja: "アクセス困難な場所の点検、高層清掃、建物保守、シーリング、塗装、ブラストに対応します。",
    },
  },
  "/training": {
    kind: "collection",
    image: trainingLandingImage,
    title: { id: "Pelatihan Kerja di Ketinggian", en: "Work-at-Height Training", zh: "高空作业培训", ja: "高所作業トレーニング" },
    description: {
      id: "Pelatihan TKPK, teknisi akses tali, confined space, high angle rescue, dan tree climbing berbasis praktik di Yogyakarta.",
      en: "Practical training for work at height, rope access technicians, confined space, high-angle rescue, and tree climbing in Yogyakarta.",
      zh: "在日惹提供高空作业、绳索技术、受限空间、高角度救援和树木攀爬实操培训。",
      ja: "ジョグジャカルタで高所作業、ロープアクセス、閉所、高角度救助、ツリークライミングの実践訓練を提供します。",
    },
  },
  "/training/schedule": {
    kind: "collection",
    image: trainingScheduleImage,
    title: { id: "Jadwal Pelatihan 2026", en: "2026 Training Schedule", zh: "2026年培训日程", ja: "2026年トレーニング日程" },
    description: {
      id: "Lihat jadwal terbaru pelatihan kerja di ketinggian Pro Rope di Yogyakarta dan pilihan kelas privat untuk perusahaan.",
      en: "See Pro Rope's latest work-at-height training schedule in Yogyakarta and private class options for companies.",
      zh: "查看 Pro Rope 在日惹的最新高空作业培训日程以及企业私人课程选项。",
      ja: "Pro Ropeのジョグジャカルタでの最新高所作業訓練日程と企業向けプライベートクラスをご覧ください。",
    },
  },
  "/training/registration": {
    kind: "registration",
    image: trainingHeroImages.tkpk,
    title: { id: "Pendaftaran Pelatihan", en: "Training Registration", zh: "培训报名", ja: "トレーニング申込み" },
    description: {
      id: "Daftarkan minat untuk pelatihan kerja di ketinggian, rope access, rescue, confined space, atau tree climbing bersama Pro Rope.",
      en: "Register your interest in work-at-height, rope access, rescue, confined-space, or tree-climbing training with Pro Rope.",
      zh: "报名参加 Pro Rope 的高空作业、绳索技术、救援、受限空间或树木攀爬培训。",
      ja: "Pro Ropeの高所作業、ロープアクセス、救助、閉所、ツリークライミング訓練にお申し込みください。",
    },
  },
  "/projects": {
    kind: "collection",
    image: socialImage(projects[0].image),
    title: { id: "Proyek Rope Access", en: "Rope Access Projects", zh: "绳索作业项目", ja: "ロープアクセス施工実績" },
    description: {
      id: "Lihat proyek rope access Pro Rope untuk cleaning, inspeksi, perawatan fasad, coating, dan pelatihan di berbagai kondisi lapangan.",
      en: "Explore Pro Rope projects in cleaning, inspection, facade maintenance, coating, and training across diverse site conditions.",
      zh: "查看 Pro Rope 在清洁、检查、外墙维护、涂层和培训方面的绳索作业项目。",
      ja: "清掃、点検、外壁保守、コーティング、訓練などPro Ropeのロープアクセス施工実績をご覧ください。",
    },
  },
  "/news": {
    kind: "collection",
    image: socialImage(posts[1].image),
    title: { id: "Berita & Wawasan Rope Access", en: "Rope Access News & Insights", zh: "绳索作业资讯与洞见", ja: "ロープアクセスニュース・知識" },
    description: {
      id: "Artikel tentang keselamatan kerja di ketinggian, praktik rope access, perawatan gedung, rescue, dan inspeksi peralatan.",
      en: "Articles on work-at-height safety, rope access practices, building maintenance, rescue, and equipment inspection.",
      zh: "关于高空作业安全、绳索技术、建筑维护、救援和设备检查的文章。",
      ja: "高所作業の安全、ロープアクセス、建物保守、救助、機器点検に関する記事です。",
    },
  },
  "/products": {
    kind: "collection",
    image: "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&h=630&q=85",
    title: { id: "Peralatan Rope Access & Rescue", en: "Rope Access & Rescue Equipment", zh: "绳索作业与救援装备", ja: "ロープアクセス・救助装備" },
    description: {
      id: "Konsultasi dan pemasok peralatan rope access, fall protection, rigging, dan rescue profesional untuk kebutuhan tim Anda.",
      en: "Professional rope access, fall-protection, rigging, and rescue equipment consultation and supply for your team.",
      zh: "为团队提供专业绳索作业、防坠落、索具和救援设备咨询与供应。",
      ja: "チーム向けにプロ仕様のロープアクセス、墜落防止、リギング、救助装備を提案・供給します。",
    },
  },
  "/contact": {
    kind: "contact",
    image: "/images/hero/facade-sealant-yogyakarta.webp",
    title: { id: "Kontak & Penawaran Proyek", en: "Contact & Project Quote", zh: "联系与项目报价", ja: "お問い合わせ・お見積り" },
    description: {
      id: "Hubungi Pro Rope untuk konsultasi dan penawaran jasa rope access, perawatan gedung, inspeksi, cleaning, atau pelatihan.",
      en: "Contact Pro Rope for consultation and quotes for rope access, building maintenance, inspection, cleaning, or training.",
      zh: "联系 Pro Rope，咨询绳索作业、建筑维护、检查、清洁或培训服务及报价。",
      ja: "ロープアクセス、建物保守、点検、清掃、訓練のご相談・お見積りはPro Ropeへお問い合わせください。",
    },
  },
  "/admin": {
    kind: "private",
    image: "/og.png",
    title: { id: "Administrasi", en: "Administration", zh: "管理后台", ja: "管理画面" },
    description: { id: "Area administrasi Pro Rope.", en: "Pro Rope administration area.", zh: "Pro Rope 管理区域。", ja: "Pro Ropeの管理エリアです。" },
  },
};

const notFoundPage: SeoPage = {
  kind: "private",
  image: "/og.png",
  title: { id: "Halaman Tidak Ditemukan", en: "Page Not Found", zh: "页面未找到", ja: "ページが見つかりません" },
  description: { id: "Halaman yang Anda cari tidak tersedia.", en: "The page you are looking for is unavailable.", zh: "您查找的页面不可用。", ja: "お探しのページは見つかりません。" },
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

const baseKeywords: LocalizedKeywords = {
  id: ["jasa rope access", "rope access Yogyakarta", "kerja di ketinggian", "akses tali profesional", "Pro Rope"],
  en: ["rope access Indonesia", "rope access Yogyakarta", "work at height", "professional rope access", "Pro Rope"],
  zh: ["印度尼西亚绳索作业", "日惹绳索作业", "高空作业", "专业绳索技术", "Pro Rope"],
  ja: ["インドネシア ロープアクセス", "ジョグジャカルタ ロープアクセス", "高所作業", "プロ ロープアクセス", "Pro Rope"],
};

const sectionKeywords: Record<string, LocalizedKeywords> = {
  services: {
    id: ["pembersihan gedung tinggi", "perawatan fasad", "inspeksi rope access", "pengecatan gedung"],
    en: ["high-rise cleaning", "facade maintenance", "rope access inspection", "building painting"],
    zh: ["高层建筑清洁", "外墙维护", "绳索检查", "建筑涂装"],
    ja: ["高層ビル清掃", "外壁メンテナンス", "ロープアクセス点検", "建物塗装"],
  },
  training: {
    id: ["pelatihan kerja di ketinggian", "pelatihan TKPK", "pelatihan TKBT", "pelatihan rescue"],
    en: ["work-at-height training", "rope access training", "confined-space training", "vertical rescue training"],
    zh: ["高空作业培训", "绳索技术培训", "受限空间培训", "垂直救援培训"],
    ja: ["高所作業訓練", "ロープアクセス訓練", "閉所作業訓練", "垂直救助訓練"],
  },
  news: {
    id: ["keselamatan kerja ketinggian", "artikel rope access", "K3 ketinggian"],
    en: ["work-at-height safety", "rope access articles", "vertical work safety"],
    zh: ["高空作业安全", "绳索作业文章", "垂直作业安全"],
    ja: ["高所作業安全", "ロープアクセス記事", "垂直作業安全"],
  },
  products: {
    id: ["alat rope access", "peralatan rescue", "APD kerja di ketinggian"],
    en: ["rope access equipment", "rescue equipment", "work-at-height PPE"],
    zh: ["绳索作业装备", "救援装备", "高空作业防护装备"],
    ja: ["ロープアクセス装備", "救助装備", "高所作業保護具"],
  },
};

const sectionLabels: Record<string, LocalizedText> = {
  services: { id: "Layanan", en: "Services", zh: "服务", ja: "サービス" },
  training: { id: "Pelatihan", en: "Training", zh: "培训", ja: "トレーニング" },
  schedule: { id: "Jadwal", en: "Schedule", zh: "日程", ja: "日程" },
  registration: { id: "Pendaftaran", en: "Registration", zh: "报名", ja: "申込み" },
  projects: { id: "Proyek", en: "Projects", zh: "项目", ja: "施工実績" },
  news: { id: "Berita", en: "News", zh: "资讯", ja: "ニュース" },
  products: { id: "Peralatan", en: "Equipment", zh: "装备", ja: "装備" },
  contact: { id: "Kontak", en: "Contact", zh: "联系", ja: "お問い合わせ" },
  about: { id: "Tentang Kami", en: "About Us", zh: "关于我们", ja: "私たちについて" },
};

const productCategoryNames: Record<SupportedLocale, string[]> = {
  id: ["Harness & penopang tubuh", "Helm & pelindung kepala", "Tali & lanyard", "Konektor & carabiner", "Descender & ascender", "Peralatan rigging & rescue"],
  en: productCategories,
  zh: ["安全带与身体支撑", "头盔与头部防护", "绳索与安全绳", "连接器与登山扣", "下降器与上升器", "索具与救援装备"],
  ja: ["ハーネス・身体支持具", "ヘルメット・頭部保護具", "ロープ・ランヤード", "コネクター・カラビナ", "ディセンダー・アッセンダー", "リギング・救助装備"],
};

const projectNames: Record<SupportedLocale, string[]> = {
  id: ["Pembersihan Kaca dan Fasad", "Penggantian Sealant Fasad", "Pembersihan Sticker", "Pengecatan Gedung Fortuna", "Pelapisan Protektif Tower", "Perawatan Atap & Talang"],
  en: projects.map(project => project.title),
  zh: ["玻璃与外墙清洁", "外墙密封胶更换", "贴纸清除", "Fortuna大楼涂装", "塔架防护涂层", "屋顶与排水沟维护"],
  ja: ["ガラス・外壁清掃", "外壁シーラント交換", "ステッカー除去", "フォルトゥナビル塗装", "タワー保護コーティング", "屋根・雨樋メンテナンス"],
};

function socialImage(image: string) {
  if (!image.startsWith("https://images.unsplash.com/")) return image;
  const url = new URL(image);
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", "1200");
  url.searchParams.set("h", "630");
  url.searchParams.set("q", "85");
  return url.toString();
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

function dynamicPage(pathname: string): SeoPage | undefined {
  const [, section, slug] = pathname.split("/");
  if (section === "services" && slug) {
    const service = services.find(item => item.slug === slug);
    if (!service) return undefined;
    return {
      kind: "service",
      image: socialImage(service.image),
      title: serviceNames[slug],
      description: {
        id: service.summary,
        en: englishServiceDescription(slug),
        zh: `Pro Rope 在印度尼西亚提供专业的${serviceNames[slug].zh}，适用于建筑、工业设施和难以到达的区域。`,
        ja: `Pro Ropeはインドネシアで、建物・産業施設・アクセス困難な場所に対応する${serviceNames[slug].ja}を提供します。`,
      },
    };
  }
  if (section === "training" && slug && slug !== "schedule" && slug !== "registration") {
    const training = trainings.find(item => item.slug === slug);
    if (!training) return undefined;
    return {
      kind: "course",
      image: trainingHeroImages[slug],
      title: trainingNames[slug],
      description: {
        id: training.summary,
        en: `Practical ${training.title} training in Yogyakarta and on-site for professional teams. Learn safe procedures through guided exercises and assessment.`,
        zh: `面向专业团队的${trainingNames[slug].zh}，可在日惹或客户现场开展，包含安全程序、实操练习和评估。`,
        ja: `専門チーム向けの${trainingNames[slug].ja}。ジョグジャカルタまたは現地で、安全手順、実技、評価を行います。`,
      },
    };
  }
  if (section === "news" && slug) {
    const post = posts.find(item => item.slug === slug);
    const translation = articleTranslations[slug];
    if (!post || !translation) return undefined;
    return { kind: "article", image: socialImage(post.image), ...translation };
  }
}

function runtimeArticlePage(article: RuntimeArticle): SeoPage {
  const fallback = article.translations.en || article.translations.id || Object.values(article.translations)[0];
  const localized = (field: "title" | "excerpt") => Object.fromEntries(SUPPORTED_LOCALES.map(locale => [locale, article.translations[locale]?.[field] || fallback?.[field] || article.slug])) as LocalizedText;
  return { kind: "article", image: socialImage(article.image_url || "/og.png"), title: localized("title"), description: localized("excerpt") };
}

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

export function getPageSeo(pathname: string, locale: SupportedLocale, runtimeArticle?: RuntimeArticle) {
  const clean = stripLocale(pathname);
  const isRuntimeArticle = runtimeArticle && clean === `/news/${runtimeArticle.slug}`;
  const page = pages[clean] || (isRuntimeArticle ? runtimeArticlePage(runtimeArticle) : dynamicPage(clean)) || notFoundPage;
  return { ...page, title: page.title[locale], description: page.description[locale], clean };
}

function keywordsFor(clean: string, title: string, configured: Partial<LocalizedKeywords> | undefined, locale: SupportedLocale) {
  const section = clean.split("/").filter(Boolean)[0];
  const specific = configured?.[locale] || sectionKeywords[section]?.[locale] || [];
  const titleTerms = title.split(/[|,，、]/).map(value => value.trim()).filter(Boolean);
  return [...new Set([...titleTerms, ...specific, ...baseKeywords[locale]])];
}

function absoluteUrl(value: string) {
  return new URL(value, SITE_URL).toString();
}

function postDate(slug: string, runtimeArticle?: RuntimeArticle) {
  if (runtimeArticle?.slug === slug && runtimeArticle.published_at) {
    const date = new Date(runtimeArticle.published_at);
    return Number.isNaN(date.valueOf()) ? undefined : date.toISOString();
  }
  return ({
    "memilih-metode-akses-untuk-fasad": "2026-08-02",
    "persiapan-tim-rescue": "2026-07-18",
    "inspeksi-peralatan-harian": "2026-06-06",
  } as Record<string, string>)[slug];
}

export function createMetadata(pathname: string, locale: SupportedLocale, runtimeArticle?: RuntimeArticle): Metadata {
  const { title, description, clean, image, kind, keywords } = getPageSeo(pathname, locale, runtimeArticle);
  const canonical = localizedPath(clean, locale);
  const fullTitle = clean === "/" ? `${SITE_NAME} | ${title}` : `${title} | ${SITE_NAME}`;
  const languages = Object.fromEntries(SUPPORTED_LOCALES.map(code => [languageTags[code], localizedPath(clean, code)]));
  const otherLocales = SUPPORTED_LOCALES.filter(code => code !== locale).map(code => localeTags[code]);
  const imageUrl = absoluteUrl(image);
  const slug = clean.split("/").at(-1) || "";
  const publishedTime = kind === "article" ? postDate(slug, runtimeArticle) : undefined;
  const indexable = kind !== "private";

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: kind === "article" ? "article" : "website",
    url: canonical,
    siteName: SITE_NAME,
    locale: localeTags[locale],
    alternateLocale: otherLocales,
    title: fullTitle,
    description,
    images: [{ url: imageUrl, alt: `${title} — ${SITE_NAME}` }],
    ...(kind === "article" ? { publishedTime, modifiedTime: publishedTime, authors: [SITE_NAME], section: runtimeArticle?.category || posts.find(post => post.slug === slug)?.category } : {}),
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Rope access services and work-at-height training",
    classification: "Professional rope access services",
    keywords: keywordsFor(clean, title, keywords, locale),
    alternates: { canonical, languages: { ...languages, "x-default": localizedPath(clean, "id") } },
    robots: indexable
      ? { index: true, follow: true, nocache: false, googleBot: { index: true, follow: true, noimageindex: false, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noimageindex: true } },
    openGraph,
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [{ url: imageUrl, alt: `${title} — ${SITE_NAME}` }] },
    icons: { icon: [{ url: "/favicon.ico" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }], apple: "/apple-touch-icon.png" },
    manifest: "/site.webmanifest",
    referrer: "strict-origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    other: { "geo.region": "ID-YO", "geo.placename": "Yogyakarta", "content-language": languageTags[locale] },
  };
}

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

function organizationNode(locale: SupportedLocale) {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId,
    name: SITE_NAME,
    alternateName: "Pro Rope Services",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: absoluteUrl("/android-chrome-512x512.png"), width: 512, height: 512 },
    image: absoluteUrl("/og.png"),
    email: "contact@prorope.id",
    telephone: "+62 822-1040-1004",
    description: homeDescription[locale],
    address: { "@type": "PostalAddress", addressLocality: "Yogyakarta", addressRegion: "Daerah Istimewa Yogyakarta", addressCountry: "ID" },
    areaServed: { "@type": "Country", name: "Indonesia" },
    contactPoint: { "@type": "ContactPoint", telephone: "+62 822-1040-1004", email: "contact@prorope.id", contactType: "customer service", availableLanguage: SUPPORTED_LOCALES.map(code => languageTags[code]) },
    sameAs: ["https://www.instagram.com/prorope.services/"],
  };
}

function breadcrumbName(segment: string, locale: SupportedLocale) {
  return sectionLabels[segment]?.[locale] || segment.replaceAll("-", " ").replace(/\b\w/g, letter => letter.toUpperCase());
}

function breadcrumbNode(clean: string, locale: SupportedLocale, title: string, pageUrl: string) {
  const segments = clean.split("/").filter(Boolean);
  if (!segments.length) return undefined;
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "id" ? "Beranda" : locale === "zh" ? "首页" : locale === "ja" ? "ホーム" : "Home", item: absoluteUrl(`/${locale}`) },
      ...segments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: index === segments.length - 1 ? title : breadcrumbName(segment, locale),
        item: absoluteUrl(`/${locale}/${segments.slice(0, index + 1).join("/")}`),
      })),
    ],
  };
}

function entityForPage(clean: string, locale: SupportedLocale, title: string, description: string, pageUrl: string, runtimeArticle?: RuntimeArticle) {
  const [, section, slug] = clean.match(/^\/([^/]+)(?:\/([^/]+))?/) || [];
  if (section === "services" && slug) {
    const service = services.find(item => item.slug === slug);
    if (!service) return undefined;
    return {
      "@type": "Service", "@id": `${pageUrl}#service`, name: title, description, url: pageUrl,
      image: absoluteUrl(socialImage(service.image)), serviceType: serviceNames[slug][locale], provider: { "@id": organizationId },
      areaServed: { "@type": "Country", name: "Indonesia" }, audience: { "@type": "Audience", audienceType: "Building owners, facility managers, and industrial operators" },
    };
  }
  if (section === "training" && slug && !["schedule", "registration"].includes(slug)) {
    const training = trainings.find(item => item.slug === slug);
    if (!training) return undefined;
    return {
      "@type": "Course", "@id": `${pageUrl}#course`, name: title, description, url: pageUrl, provider: { "@id": organizationId },
      image: absoluteUrl(trainingHeroImages[slug]), educationalLevel: "Professional", teaches: training.outcomes,
      timeRequired: training.duration, hasCourseInstance: { "@type": "CourseInstance", courseMode: ["onsite", "in-person"], location: { "@type": "Place", name: "Pro Rope Training, Yogyakarta", address: { "@type": "PostalAddress", addressLocality: "Yogyakarta", addressCountry: "ID" } } },
    };
  }
  if (section === "news" && slug) {
    const post = posts.find(item => item.slug === slug);
    const livePost = runtimeArticle?.slug === slug ? runtimeArticle : undefined;
    if (!post && !livePost) return undefined;
    return {
      "@type": "Article", "@id": `${pageUrl}#article`, headline: title, description, url: pageUrl, mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      image: [absoluteUrl(socialImage(livePost?.image_url || post?.image || "/og.png"))], datePublished: postDate(slug, livePost), dateModified: postDate(slug, livePost), articleSection: livePost?.category || post?.category,
      inLanguage: languageTags[locale], author: { "@id": organizationId }, publisher: { "@id": organizationId },
    };
  }
}

function itemListForPage(clean: string, locale: SupportedLocale, pageUrl: string) {
  const list = (items: Array<Record<string, unknown>>) => ({ "@type": "ItemList", "@id": `${pageUrl}#item-list`, numberOfItems: items.length, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })) });
  if (clean === "/services") return list(services.map(service => ({ name: serviceNames[service.slug][locale], url: absoluteUrl(localizedPath(`/services/${service.slug}`, locale)) })));
  if (clean === "/training") return list(trainings.map(training => ({ name: trainingNames[training.slug][locale], url: absoluteUrl(localizedPath(`/training/${training.slug}`, locale)) })));
  if (clean === "/news") return list(posts.map(post => ({ name: articleTranslations[post.slug].title[locale], url: absoluteUrl(localizedPath(`/news/${post.slug}`, locale)) })));
  if (clean === "/projects") return list(projects.map((project, index) => ({ item: { "@type": "CreativeWork", name: projectNames[locale][index], image: absoluteUrl(socialImage(project.image)), locationCreated: project.location, dateCreated: project.year } })));
  if (clean === "/products") return list(productCategoryNames[locale].map(name => ({ item: { "@type": "ProductGroup", name, brand: { "@type": "Brand", name: SITE_NAME }, url: absoluteUrl(localizedPath("/contact", locale)) } })));
}

function scheduleEvents(locale: SupportedLocale) {
  const dates = [
    { startDate: "2026-09-14", endDate: "2026-09-18" },
    { startDate: "2026-10-05", endDate: "2026-10-10" },
    { startDate: "2026-10-26", endDate: "2026-10-28" },
  ];
  return schedules.slice(0, dates.length).map((schedule, index) => ({
    "@type": "EducationEvent", "@id": `${absoluteUrl(localizedPath("/training/schedule", locale))}#event-${index + 1}`,
    name: `${schedule.program} — ${schedule.batch}`, description: pages["/training/schedule"].description[locale], ...dates[index],
    eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: schedule.location, address: { "@type": "PostalAddress", addressLocality: "Yogyakarta", addressCountry: "ID" } },
    organizer: { "@id": organizationId }, url: absoluteUrl(localizedPath("/training/registration", locale)), inLanguage: languageTags[locale],
  }));
}

export function createStructuredData(pathname: string, locale: SupportedLocale, runtimeArticle?: RuntimeArticle) {
  const { title, description, clean, image, kind } = getPageSeo(pathname, locale, runtimeArticle);
  if (kind === "private") return undefined;
  const pageUrl = absoluteUrl(localizedPath(clean, locale));
  const breadcrumb = breadcrumbNode(clean, locale, title, pageUrl);
  const entity = entityForPage(clean, locale, title, description, pageUrl, runtimeArticle);
  const itemList = itemListForPage(clean, locale, pageUrl);
  const events = clean === "/training/schedule" ? scheduleEvents(locale) : [];
  const graph: Array<Record<string, unknown>> = [
    organizationNode(locale),
    { "@type": "WebSite", "@id": websiteId, url: SITE_URL, name: SITE_NAME, inLanguage: languageTags[locale], publisher: { "@id": organizationId } },
  ];
  if (breadcrumb) graph.push(breadcrumb);

  const webPageType = kind === "about" ? "AboutPage" : kind === "contact" ? "ContactPage" : kind === "collection" ? "CollectionPage" : "WebPage";
  const pageNode: Record<string, unknown> = {
    "@type": webPageType, "@id": `${pageUrl}#webpage`, url: pageUrl, name: title, description, inLanguage: languageTags[locale],
    isPartOf: { "@id": websiteId }, primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) },
  };
  if (breadcrumb) pageNode.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
  if (entity) pageNode.mainEntity = { "@id": entity["@id"] };
  if (itemList) pageNode.mainEntity = { "@id": itemList["@id"] };
  if (kind === "home" || kind === "about" || kind === "contact") pageNode.mainEntity = { "@id": organizationId };
  if (events.length) pageNode.mainEntity = events.map(event => ({ "@id": event["@id"] }));
  if (kind === "registration") pageNode.potentialAction = { "@type": "RegisterAction", target: pageUrl };
  graph.push(pageNode);
  if (entity) graph.push(entity);
  if (itemList) graph.push(itemList);
  graph.push(...events);

  return { "@context": "https://schema.org", "@graph": graph };
}

export function StructuredData({ pathname, locale, runtimeArticle }: { pathname: string; locale: SupportedLocale; runtimeArticle?: RuntimeArticle }) {
  const data = createStructuredData(pathname, locale, runtimeArticle);
  if (!data) return null;
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
