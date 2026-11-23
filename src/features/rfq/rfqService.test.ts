import { describe, expect, it, vi } from 'vitest';
import { getRfqAvailability, RfqUnavailableError, submitRfq } from './rfqService';
import type { RfqSubmission } from './rfqSchema';

const submission = {
  fullName: 'Asha Patel',
  companyName: 'Example',
  workEmail: 'asha@example.com',
  phone: '+91 261 2551273',
  designation: 'Manager',
  projectCategory: 'switchyard-works',
  projectLocation: 'Dahej',
  industry: 'chemical',
  voltageRequirement: '66kv',
  scopeDescription: 'Scope description that is long enough.',
  expectedTimeline: 'not-decided',
  preferredContact: 'email',
  attachments: [],
  consent: true,
} as RfqSubmission;

describe('getRfqAvailability', () => {
  it('is live when an endpoint is configured', () => {
    expect(getRfqAvailability({ DEV: false, VITE_RFQ_ENDPOINT: 'https://api.example.com/rfq' } as unknown as ImportMetaEnv)).toBe('live');
  });

  it('is unavailable in production without an endpoint, even if mock is set', () => {
    expect(getRfqAvailability({ DEV: false, VITE_RFQ_MOCK: 'true' } as unknown as ImportMetaEnv)).toBe('unavailable');
  });

  it('allows the mock only in development', () => {
    expect(getRfqAvailability({ DEV: true, VITE_RFQ_MOCK: 'true' } as unknown as ImportMetaEnv)).toBe('mock');
  });
});

describe('submitRfq', () => {
  it('throws RfqUnavailableError instead of pretending success when no backend is configured', async () => {
    await expect(submitRfq(submission, { DEV: false } as unknown as ImportMetaEnv)).rejects.toBeInstanceOf(RfqUnavailableError);
  });

  it('posts multipart data to the configured endpoint and returns the reference', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ reference: 'RFQ-123' }), { status: 200 }));
    const result = await submitRfq(
      submission,
      { DEV: false, VITE_RFQ_ENDPOINT: 'https://api.example.com/rfq' } as unknown as ImportMetaEnv,
      fetchMock as unknown as typeof fetch,
    );
    expect(result).toEqual({ reference: 'RFQ-123' });
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(init.body).toBeInstanceOf(FormData);
    expect(init.credentials).toBe('omit');
  });

  it('reports a failed response as an error rather than success', async () => {
    const fetchMock = vi.fn(async () => new Response('err', { status: 500 }));
    await expect(
      submitRfq(submission, { DEV: false, VITE_RFQ_ENDPOINT: 'https://api.example.com/rfq' } as unknown as ImportMetaEnv, fetchMock as unknown as typeof fetch),
    ).rejects.toThrow(/could not send your enquiry/);
  });
});
