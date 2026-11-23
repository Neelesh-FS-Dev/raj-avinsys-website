// @vitest-environment node
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from './app';
import { signatureMatches } from './files';

const validFields: Record<string, string> = {
  fullName: 'Asha Patel',
  companyName: 'Example Chemicals Pvt Ltd',
  workEmail: 'asha@example.com',
  phone: '+91 261 2551273',
  designation: 'Project Manager',
  projectCategory: 'switchyard-works',
  projectLocation: 'Dahej, Gujarat',
  industry: 'chemical',
  voltageRequirement: '66kv',
  scopeDescription: 'EPC for a 66 kV double-bay switchyard with two incoming feeders.',
  expectedTimeline: '3-6-months',
  preferredContact: 'email',
  consent: 'true',
};

function formWith(fields: Record<string, string>, files: File[] = []): FormData {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.append(key, value);
  for (const file of files) form.append('attachments', file, file.name);
  return form;
}

const pdf = () => new File([new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a])], 'sld.pdf', { type: 'application/pdf' });

describe('RFQ API', () => {
  let storageDir: string;

  beforeEach(async () => {
    storageDir = await mkdtemp(path.join(os.tmpdir(), 'rfq-test-'));
  });

  afterEach(async () => {
    await rm(storageDir, { recursive: true, force: true });
  });

  const app = () =>
    createApp({ storageDir, allowedOrigins: ['https://www.rajgrouponline.com'], allowUnscanned: false });

  it('reports health', async () => {
    const res = await app().request('/api/health');
    expect(res.status).toBe(200);
  });

  it('accepts a valid enquiry without attachments and stores the record', async () => {
    const res = await app().request('/api/rfq', { method: 'POST', body: formWith(validFields) });
    expect(res.status).toBe(201);
    const { reference } = (await res.json()) as { reference: string };
    expect(reference).toMatch(/^RFQ-\d{8}-[0-9A-F]{6}$/);
    const record = JSON.parse(await readFile(path.join(storageDir, reference, 'enquiry.json'), 'utf8'));
    expect(record.companyName).toBe('Example Chemicals Pvt Ltd');
    expect(record.attachments).toEqual([]);
  });

  it('rejects invalid input with field-level issues', async () => {
    const res = await app().request('/api/rfq', {
      method: 'POST',
      body: formWith({ ...validFields, workEmail: 'not-an-email' }),
    });
    expect(res.status).toBe(422);
    const body = (await res.json()) as { issues: { path: string }[] };
    expect(body.issues.map((issue) => issue.path)).toContain('workEmail');
  });

  it('rejects a submission without consent', async () => {
    const res = await app().request('/api/rfq', {
      method: 'POST',
      body: formWith({ ...validFields, consent: 'false' }),
    });
    expect(res.status).toBe(422);
  });

  it('refuses attachments while scanning is not configured', async () => {
    const res = await app().request('/api/rfq', { method: 'POST', body: formWith(validFields, [pdf()]) });
    expect(res.status).toBe(422);
    expect(await readdir(storageDir)).toEqual([]);
  });

  it('stores an approved attachment under a random name when unscanned uploads are allowed', async () => {
    const enabled = createApp({ storageDir, allowedOrigins: [], allowUnscanned: true });
    const res = await enabled.request('/api/rfq', { method: 'POST', body: formWith(validFields, [pdf()]) });
    expect(res.status).toBe(201);
    const { reference } = (await res.json()) as { reference: string };
    const files = (await readdir(path.join(storageDir, reference))).filter((f) => f !== 'enquiry.json');
    expect(files).toHaveLength(1);
    expect(files[0]).not.toContain('sld');
    expect(files[0]).toMatch(/\.pdf$/);
  });

  it('rejects a file whose content does not match its extension', async () => {
    const enabled = createApp({ storageDir, allowedOrigins: [], allowUnscanned: true });
    const disguised = new File(['MZ\x90\x00 not a pdf'], 'report.pdf', { type: 'application/pdf' });
    const res = await enabled.request('/api/rfq', { method: 'POST', body: formWith(validFields, [disguised]) });
    expect(res.status).toBe(422);
  });

  it('rejects a non-multipart body', async () => {
    const res = await app().request('/api/rfq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validFields),
    });
    expect(res.status).toBe(400);
  });

  it('rate-limits repeated submissions from one client', async () => {
    const limited = createApp({ storageDir, allowedOrigins: [], allowUnscanned: false, maxRequestsPerMinute: 2 });
    const send = () =>
      limited.request('/api/rfq', { method: 'POST', headers: { 'x-forwarded-for': '203.0.113.9' }, body: formWith({ ...validFields, workEmail: 'bad' }) });
    expect((await send()).status).toBe(422);
    expect((await send()).status).toBe(422);
    expect((await send()).status).toBe(429);
  });

  it('applies the CORS allowlist', async () => {
    const res = await app().request('/api/health', { headers: { Origin: 'https://evil.example' } });
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
    const ok = await app().request('/api/health', { headers: { Origin: 'https://www.rajgrouponline.com' } });
    expect(ok.headers.get('Access-Control-Allow-Origin')).toBe('https://www.rajgrouponline.com');
  });
});

describe('signatureMatches', () => {
  it('matches each approved format by content', () => {
    expect(signatureMatches('a.pdf', new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]))).toBe(true);
    expect(signatureMatches('a.xlsx', new Uint8Array([0x50, 0x4b, 0x03, 0x04]))).toBe(true);
    expect(signatureMatches('a.xls', new Uint8Array([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))).toBe(true);
  });

  it('rejects unknown extensions and mismatched content', () => {
    expect(signatureMatches('a.exe', new Uint8Array([0x4d, 0x5a]))).toBe(false);
    expect(signatureMatches('a.pdf', new Uint8Array([0x4d, 0x5a, 0x90, 0x00]))).toBe(false);
  });
});
