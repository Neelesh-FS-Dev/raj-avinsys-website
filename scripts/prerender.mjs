/**
 * Writes one static HTML file per public route into dist/, using the SSR bundle
 * from `vite build --ssr`. Each file contains rendered page content, route-specific
 * title, description, canonical, Open Graph, robots and JSON-LD, so crawlers that
 * do not execute JavaScript still see the real content.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildHead(meta) {
  const canonical = `${process.env.SITE_URL ?? 'https://www.rajgrouponline.com'}${meta.path === '/' ? '/' : meta.path}`;
  const tags = [
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
    meta.noindex ? '' : `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Raj Avinsys" />`,
    `<meta property="og:locale" content="en_IN" />`,
    ...meta.jsonLd.map((block) => `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`),
  ].filter(Boolean);
  return tags.join('\n    ');
}

function pageHtml(appHtml, meta) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, '');
  html = html.replace(/<link rel="canonical"[^>]*>/, '');
  html = html.replace(/<meta name="robots"[^>]*>/, '');
  html = html.replace('</head>', `    ${buildHead(meta)}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return html;
}

const written = [];
for (const url of ssr.prerenderPaths()) {
  const { html: appHtml, status } = await ssr.renderRoute(url);
  if (status !== 200) throw new Error(`${url} rendered with status ${status}`);
  const meta = ssr.metaFor(url);
  const outFile = url === '/' ? path.join(distDir, 'index.html') : path.join(distDir, url, 'index.html');
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, pageHtml(appHtml, meta), 'utf8');
  written.push(url);
}

// 404 page for hosts that serve a static error document.
const notFound = await ssr.renderRoute('/this-page-does-not-exist');
await writeFile(path.join(distDir, '404.html'), pageHtml(notFound.html, ssr.metaFor('/404')), 'utf8');

console.log(`prerendered ${written.length} routes + 404`);
