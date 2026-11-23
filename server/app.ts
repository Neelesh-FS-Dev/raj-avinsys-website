import { randomBytes, randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { cors } from 'hono/cors';
import { rfqSchema } from '../src/features/rfq/rfqSchema';
import { RFQ_MAX_TOTAL_BYTES } from '../src/features/rfq/fileValidation';
import { signatureMatches, storedExtension } from './files';
import { createRateLimiter } from './rateLimit';

export interface AppOptions {
  /** Directory for enquiries and attachments. Must sit outside any public web root. */
  storageDir: string;
  /** Origins allowed to call the API from a browser. */
  allowedOrigins: string[];
  /** Attachments are refused unless malware scanning is in place. Set only after scanning is configured. */
  allowUnscanned: boolean;
  /** Requests per client per minute on the RFQ endpoint. */
  maxRequestsPerMinute?: number;
}

function clientKey(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'local';
}

function newReference(): string {
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `RFQ-${day}-${randomBytes(3).toString('hex').toUpperCase()}`;
}

export function createApp(options: AppOptions) {
  const app = new Hono();
  const limiter = createRateLimiter(options.maxRequestsPerMinute ?? 5, 60_000);

  app.use(
    '/api/*',
    cors({
      origin: options.allowedOrigins,
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      allowHeaders: ['Content-Type'],
      maxAge: 600,
    }),
  );

  app.get('/api/health', (c) => c.json({ ok: true }));

  app.post(
    '/api/rfq',
    bodyLimit({
      maxSize: RFQ_MAX_TOTAL_BYTES + 512 * 1024,
      onError: (c) => c.json({ error: 'The upload is too large.' }, 413),
    }),
    async (c) => {
      if (!limiter.allow(clientKey(c.req.raw.headers))) {
        return c.json({ error: 'Too many enquiries. Please try again in a minute.' }, 429);
      }

      let form: FormData;
      try {
        form = await c.req.formData();
      } catch {
        return c.json({ error: 'Expected multipart/form-data.' }, 400);
      }

      const files = form.getAll('attachments').filter((value): value is File => value instanceof File);
      const fields: Record<string, string> = {};
      for (const [key, value] of form.entries()) {
        if (key !== 'attachments' && typeof value === 'string') fields[key] = value;
      }

      const parsed = rfqSchema.safeParse({
        ...fields,
        consent: fields.consent === 'true',
        attachments: files,
      });
      if (!parsed.success) {
        return c.json(
          {
            error: 'Validation failed.',
            issues: parsed.error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
          },
          422,
        );
      }

      if (files.length > 0 && !options.allowUnscanned) {
        return c.json(
          { error: 'Attachments are unavailable until malware scanning is configured. Please email your files.' },
          422,
        );
      }

      for (const file of files) {
        const head = new Uint8Array(await file.slice(0, 8).arrayBuffer());
        if (!signatureMatches(file.name, head)) {
          return c.json({ error: `${file.name}: the file content does not match its type.` }, 422);
        }
      }

      const reference = newReference();
      const dir = path.join(options.storageDir, reference);
      await mkdir(dir, { recursive: true });

      const { attachments, consent: _consent, ...record } = parsed.data;
      const stored: { storedAs: string; originalName: string; size: number; type: string }[] = [];
      for (const file of attachments) {
        const storedAs = `${randomUUID()}${storedExtension(file.name)}`;
        await writeFile(path.join(dir, storedAs), Buffer.from(await file.arrayBuffer()));
        stored.push({ storedAs, originalName: file.name, size: file.size, type: file.type });
      }

      await writeFile(
        path.join(dir, 'enquiry.json'),
        JSON.stringify({ reference, receivedAt: new Date().toISOString(), ...record, attachments: stored }, null, 2),
        'utf8',
      );

      // Log the reference and counts only, never the enquiry content or file names.
      console.info(`rfq received ${reference} attachments=${stored.length}`);
      return c.json({ reference }, 201);
    },
  );

  return app;
}
