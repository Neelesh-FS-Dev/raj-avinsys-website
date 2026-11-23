/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** HTTPS endpoint for RFQ submissions (multipart/form-data). Public value; never a secret. */
  readonly VITE_RFQ_ENDPOINT?: string;
  /** Development-only mock submissions. Ignored in production builds. */
  readonly VITE_RFQ_MOCK?: string;
  /** Public site origin used for canonical URLs and sitemap. */
  readonly VITE_SITE_URL?: string;
}
