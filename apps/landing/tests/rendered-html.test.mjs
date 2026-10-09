import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("seo-test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function request(path, { host = "prorope.id", protocol = "https:" } = {}) {
  return worker.fetch(
    new Request(`${protocol}//${host}${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function html(path) {
  const response = await request(path);
  assert.equal(response.status, 200, `${path} should render successfully`);
  assert.match(response.headers.get("content-type") || "", /^text\/html\b/i);
  return response.text();
}

test("permanently redirects HTTP and www requests to HTTPS non-www without losing query", async () => {
  const http = await request("/id/services/painting-blasting?ref=campaign", { protocol: "http:" });
  assert.equal(http.status, 308);
  assert.equal(http.headers.get("location"), "https://prorope.id/id/services/painting-blasting?ref=campaign");

  const www = await request("/id/services/rope-access?utm_source=search", { host: "www.prorope.id" });
  assert.equal(www.status, 308);
  assert.equal(www.headers.get("location"), "https://prorope.id/id/services/rope-access?utm_source=search");
});

test("renders Indonesian homepage headings, service links, and copy in the initial HTML", async () => {
  const response = await request("/id");
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /<html[^>]*lang="id-ID"/);
  assert.match(body, /<h1[^>]*>JASA ROPE ACCESS/);
  assert.match(body, /<em>&amp; PENGECATAN<\/em><br\/>GEDUNG DI JOGJA/);
  assert.match(body, /href="\/id\/services\/painting-blasting"/);
  assert.match(body, /href="\/id\/services\/rope-access"/);
  assert.match(body, /href="\/id\/projects"/);
});

test("renders the painting service title, truthful scope, portfolio location, and Service/FAQ schema", async () => {
  const body = await html("/id/services/painting-blasting");
  assert.match(body, /<title>Jasa Pengecatan Gedung di Jogja \| Pro Rope<\/title>/);
  assert.match(body, /<h1[^>]*>Jasa Pengecatan Gedung di Jogja<\/h1>/);
  assert.match(body, /Bagaimana cara meminta perkiraan biaya pengecatan gedung/);
  assert.match(body, /Lokasi: <!-- -->Jember/);
  assert.match(body, /bukan klaim pekerjaan di Yogyakarta/);
  assert.match(body, /"@type":"Service"/);
  assert.match(body, /"@type":"FAQPage"/);
  assert.match(body, /href="\/id\/news\/biaya-pengecatan-gedung-faktor-penawaran"/);
});

test("renders the Yogyakarta rope-access service and local-intent FAQ in the initial HTML", async () => {
  const body = await html("/id/services/rope-access");
  assert.match(body, /<title>Jasa Rope Access Jogja &amp; Yogyakarta \| Pro Rope<\/title>/);
  assert.match(body, /<h1[^>]*>Jasa Rope Access Jogja &amp; Yogyakarta<\/h1>/);
  assert.match(body, /jasa rope access terdekat/i);
  assert.match(body, /anchor/i);
  assert.match(body, /href="\/id\/projects"/);
  assert.match(body, /"@type":"Service"/);
  assert.match(body, /"@type":"FAQPage"/);
});

test("renders supporting article Markdown headings, ordered lists, and safe internal links", async () => {
  const body = await html("/id/news/biaya-pengecatan-gedung-faktor-penawaran");
  assert.match(body, /<title>Biaya Pengecatan Gedung: Faktor yang Menentukan Penawaran \| Pro Rope<\/title>/);
  assert.match(body, /<h1[^>]*>BIAYA PENGECATAN GEDUNG/);
  assert.match(body, /<h2>Faktor yang memengaruhi biaya pengecatan gedung<\/h2>/);
  assert.match(body, /<ol>/);
  assert.match(body, /href="\/id\/services\/painting-blasting"/);
  assert.doesNotMatch(body, /&lt;script&gt;|<script>alert/);
});

test("serves an accurate sitemap for published fallback content and omits unsupported language alternates", async () => {
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /application\/xml/i);
  const sitemap = await response.text();
  assert.match(sitemap, /<loc>https:\/\/prorope\.id\/id\/services\/rope-access<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/prorope\.id\/id\/news\/biaya-pengecatan-gedung-faktor-penawaran<\/loc>/);
  assert.match(sitemap, /<lastmod>2026-10-09<\/lastmod>/);
  assert.doesNotMatch(sitemap, /hreflang="zh-CN"/);
  assert.doesNotMatch(sitemap, /hreflang="ja-JP"/);
});
