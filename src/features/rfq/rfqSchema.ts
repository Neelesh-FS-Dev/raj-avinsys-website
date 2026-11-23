import { z } from 'zod';
import { sectorLabels } from '../../data/projects';
import { services } from '../../data/services';
import { validateAttachments } from './fileValidation';

const phonePattern = /^\+?[0-9][0-9 ()-]{6,18}[0-9]$/;

export const projectCategoryOptions = [
  ...services.map((service) => ({ value: service.slug, label: service.title })),
  { value: 'not-sure', label: 'Not sure, please advise' },
] as const;

export const industryOptions = [
  ...Object.entries(sectorLabels).map(([value, label]) => ({ value, label })),
  { value: 'other', label: 'Other' },
] as const;

export const voltageOptions = [
  { value: 'lt', label: 'LT (up to 1 kV)' },
  { value: 'ht', label: 'HT (above 1 kV, up to 66 kV)' },
  { value: '66kv', label: '66 kV' },
  { value: '220kv', label: '220 kV' },
  { value: 'not-sure', label: 'Not sure' },
] as const;

export const timelineOptions = [
  { value: 'within-1-month', label: 'Within 1 month' },
  { value: '1-3-months', label: '1 to 3 months' },
  { value: '3-6-months', label: '3 to 6 months' },
  { value: 'over-6-months', label: 'More than 6 months' },
  { value: 'not-decided', label: 'Not decided yet' },
] as const;

const requiredText = (label: string, max = 160) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(2, `${label} must be at least 2 characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

export const rfqSchema = z
  .object({
    fullName: requiredText('Full name', 120),
    companyName: requiredText('Company name'),
    workEmail: z
      .email({ error: 'Enter a valid work email address.' })
      .trim()
      .max(254),
    phone: z
      .string({ error: 'Phone number is required.' })
      .trim()
      .regex(phonePattern, 'Enter a valid phone number, including the area code.'),
    designation: requiredText('Designation', 120),
    projectCategory: z.enum(projectCategoryOptions.map((option) => option.value), {
      error: 'Select a project category.',
    }),
    projectLocation: requiredText('Project location', 160),
    industry: z.enum(industryOptions.map((option) => option.value), {
      error: 'Select an industry.',
    }),
    voltageRequirement: z.enum(voltageOptions.map((option) => option.value), {
      error: 'Select a voltage requirement, or choose "Not sure".',
    }),
    scopeDescription: z
      .string({ error: 'Describe the scope of work.' })
      .trim()
      .min(20, 'Describe the scope in at least 20 characters.')
      .max(4000, 'Scope description must be 4000 characters or fewer.'),
    expectedTimeline: z.enum(timelineOptions.map((option) => option.value), {
      error: 'Select an expected timeline.',
    }),
    preferredContact: z.enum(['email', 'phone'], { error: 'Select a preferred contact method.' }),
    attachments: z.array(z.custom<File>((value) => value instanceof File, 'Invalid file.')).default([]),
    consent: z.boolean().refine((value) => value === true, {
      message: 'Please confirm you agree to be contacted about this enquiry.',
    }),
  })
  .superRefine((data, context) => {
    for (const message of validateAttachments(data.attachments)) {
      context.addIssue({ code: 'custom', path: ['attachments'], message });
    }
  });

export type RfqFormValues = z.input<typeof rfqSchema>;
export type RfqSubmission = z.output<typeof rfqSchema>;
