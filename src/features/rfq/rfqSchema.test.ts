import { describe, expect, it } from 'vitest';
import { rfqSchema, type RfqFormValues } from './rfqSchema';

const valid: RfqFormValues = {
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
  attachments: [],
  consent: true,
};

function issuesFor(overrides: Partial<RfqFormValues>) {
  const result = rfqSchema.safeParse({ ...valid, ...overrides });
  return result.success ? [] : result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
}

describe('rfqSchema', () => {
  it('accepts a complete, valid enquiry', () => {
    expect(rfqSchema.safeParse(valid).success).toBe(true);
  });

  it('requires a valid work email', () => {
    expect(issuesFor({ workEmail: 'not-an-email' })[0]).toMatch(/workEmail: Enter a valid work email/);
  });

  it('rejects placeholder-like or too-short phone numbers', () => {
    expect(issuesFor({ phone: '123' }).join(' ')).toMatch(/phone: Enter a valid phone number/);
    expect(issuesFor({ phone: 'call me' }).join(' ')).toMatch(/phone/);
  });

  it('requires a scope description of at least 20 characters', () => {
    expect(issuesFor({ scopeDescription: 'Short scope' }).join(' ')).toMatch(/at least 20 characters/);
  });

  it('rejects an unknown service category', () => {
    expect(issuesFor({ projectCategory: 'power-system-studies' as never }).length).toBeGreaterThan(0);
  });

  it('requires consent to be contacted', () => {
    expect(issuesFor({ consent: false }).join(' ')).toMatch(/Please confirm you agree/);
  });

  it('rejects an attachment with a disallowed extension', () => {
    const exe = new File(['x'], 'payload.exe', { type: 'application/octet-stream' });
    expect(issuesFor({ attachments: [exe] }).join(' ')).toMatch(/only PDF, XLS and XLSX/);
  });

  it('accepts an approved attachment', () => {
    const pdf = new File(['%PDF-1.4'], 'sld.pdf', { type: 'application/pdf' });
    expect(rfqSchema.safeParse({ ...valid, attachments: [pdf] }).success).toBe(true);
  });
});
