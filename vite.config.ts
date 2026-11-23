import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import { projects } from './src/data/projects';
import { services } from './src/data/services';

const siteUrl = (process.env.SITE_URL ?? 'https://www.rajgrouponline.com').replace(/\/$/, '');

/** Static public routes. Keep in sync with src/app/router.tsx. */
export function publicRoutes(): string[] {
  return [
    '/',
    '/about',
    '/services',
    ...services.map((service) => `/services/${service.slug}`),
    '/projects',
    ...projects.map((project) => `/projects/${project.slug}`),
    '/industries',
    '/clients',
    '/careers',
    '/certifications',
    '/contact',
    '/rfq',
  ];
}

/** Writes sitemap.xml and robots.txt into the build output after bundling. */
function seoFiles(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    async closeBundle() {
      const outDir = path.resolve(process.cwd(), 'dist');
      const today = new Date().toISOString().slice(0, 10);
      const urls = publicRoutes()
        .map((route) => `  <url>\n    <loc>${siteUrl}${route === '/' ? '/' : route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
        .join('\n');
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
      await writeFile(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8');
      await writeFile(path.join(outDir, 'robots.txt'), robots, 'utf8');
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
  build: {
    sourcemap: false,
    target: 'es2022',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'server/**/*.test.ts'],
    css: false,
  },
});
