import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LOCALE = "id";
const SUPPORTED_LOCALES = new Set(["id", "en", "zh", "ja"]);
const PUBLIC_FILE_PATTERN = /\.[^/]+$/;
const RESERVED_PATHS = ["/_next", "/_vinext", "/api", "/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (RESERVED_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`)) || PUBLIC_FILE_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const candidate = segments[0];

  if (candidate && SUPPORTED_LOCALES.has(candidate.toLowerCase())) {
    const locale = candidate.toLowerCase();
    const headers = new Headers(request.headers);
    headers.set("x-prorope-locale", locale);
    headers.set("x-prorope-pathname", pathname);

    const rewritten = request.nextUrl.clone();
    const destination = segments.slice(1).join("/");
    rewritten.pathname = destination ? `/${destination}` : "/";
    return NextResponse.rewrite(rewritten, { request: { headers } });
  }

  const localized = request.nextUrl.clone();
  localized.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(localized, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
