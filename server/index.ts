import path from 'node:path';
import { serve } from '@hono/node-server';
import { createApp } from './app';

const app = createApp({
  storageDir: process.env.RFQ_STORAGE_DIR ?? path.resolve('rfq-storage'),
  allowedOrigins: (process.env.RFQ_ALLOWED_ORIGINS ?? 'http://localhost:5173,http://localhost:4173').split(',').map((o) => o.trim()),
  allowUnscanned: process.env.RFQ_ALLOW_UNSCANNED_ATTACHMENTS === 'true',
});

const port = Number(process.env.PORT ?? 8787);
serve({ fetch: app.fetch, port }, (info) => {
  console.info(`RFQ API listening on http://localhost:${info.port}`);
});
