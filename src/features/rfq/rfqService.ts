import type { RfqSubmission } from './rfqSchema';

/**
 * RFQ submission contract.
 *
 * Production: set VITE_RFQ_ENDPOINT to an HTTPS endpoint that accepts
 * multipart/form-data (see docs/CONTENT_VERIFICATION_REPORT.md, section "Backend
 * integration contract"). The endpoint must return 2xx with JSON { reference: string }.
 *
 * Development only: VITE_RFQ_MOCK=true simulates success. It is ignored in production
 * builds, so the UI never pretends a submission succeeded on the live site.
 *
 * No credentials belong in this file or in any VITE_ variable: those values are
 * shipped to every visitor's browser.
 */

export type RfqAvailability = 'live' | 'mock' | 'unavailable';

export interface RfqSubmitResult {
  reference: string;
}

export function getRfqAvailability(env: ImportMetaEnv = import.meta.env): RfqAvailability {
  if (env.VITE_RFQ_ENDPOINT) return 'live';
  if (env.DEV && env.VITE_RFQ_MOCK === 'true') return 'mock';
  return 'unavailable';
}

export class RfqUnavailableError extends Error {
  constructor() {
    super('Online enquiry submission is not available on this site yet. Please email or call us.');
    this.name = 'RfqUnavailableError';
  }
}

export class RfqSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RfqSubmitError';
  }
}

export function buildRfqFormData(submission: RfqSubmission): FormData {
  const body = new FormData();
  const { attachments, ...fields } = submission;
  for (const [key, value] of Object.entries(fields)) {
    body.append(key, String(value));
  }
  for (const file of attachments) {
    body.append('attachments', file, file.name);
  }
  return body;
}

export async function submitRfq(
  submission: RfqSubmission,
  env: ImportMetaEnv = import.meta.env,
  fetchImpl: typeof fetch = fetch,
): Promise<RfqSubmitResult> {
  const availability = getRfqAvailability(env);

  if (availability === 'unavailable') {
    throw new RfqUnavailableError();
  }

  if (availability === 'mock') {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { reference: 'DEV-MOCK-0001' };
  }

  const response = await fetchImpl(env.VITE_RFQ_ENDPOINT as string, {
    method: 'POST',
    body: buildRfqFormData(submission),
    credentials: 'omit',
  });

  if (!response.ok) {
    throw new RfqSubmitError('We could not send your enquiry. Please try again, or email us directly.');
  }

  const payload = (await response.json()) as Partial<RfqSubmitResult>;
  if (!payload.reference) {
    throw new RfqSubmitError('The server did not confirm your enquiry. Please contact us to check its status.');
  }
  return { reference: payload.reference };
}
