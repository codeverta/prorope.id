import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./app/site-config";

const supportedLocales = new Set<string>(SUPPORTED_LOCALES);
const PUBLIC_FILE_PATTERN = /\.[^/]+$/;
const RESERVED_PATHS = ["/_next", "/_vinext", "/api", "/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const headers = new Headers(request.headers);
    headers.set("x-prorope-locale", DEFAULT_LOCALE);
    headers.set("x-prorope-pathname", pathname);
    return NextResponse.next({ request: { headers } });
  }

  if (RESERVED_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`)) || PUBLIC_FILE_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const candidate = segments[0];

  if (candidate && supportedLocales.has(candidate.toLowerCase())) {
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
