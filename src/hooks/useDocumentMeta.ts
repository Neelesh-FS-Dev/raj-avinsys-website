import { useEffect } from 'react';
import { companyConfig } from '../data/companyConfig';

export interface DocumentMeta {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

const SITE_NAME = 'Raj Avinsys';

/**
 * Sets title, description, canonical and Open Graph tags for the current route.
 * This runs on the client. Crawlers that do not execute JavaScript will only see
 * the static tags in index.html; see docs/CONTENT_VERIFICATION_REPORT.md for the
 * prerendering gap and its recommended fix.
 */
export function useDocumentMeta({ title, description, path, noindex = false }: DocumentMeta): void {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', `${companyConfig.website}${path}`);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${companyConfig.website}${path}`;
  }, [title, description, path, noindex]);
}

function setMeta(attr: 'name' | 'property', key: string, value: string): void {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.content = value;
}
