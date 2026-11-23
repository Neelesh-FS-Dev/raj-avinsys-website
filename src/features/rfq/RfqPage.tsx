import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useRef, useState, type DragEvent, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { companyConfig } from '../../data/companyConfig';
import { getServiceBySlug } from '../../data/services';
import { PageHero } from '../../components/ui/PageHero';
import { Container } from '../../components/ui/Container';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { RFQ_ACCEPT_ATTRIBUTE, RFQ_MAX_FILES, formatBytes, validateAttachments } from './fileValidation';
import {
  industryOptions,
  projectCategoryOptions,
  rfqSchema,
  timelineOptions,
  voltageOptions,
  type RfqFormValues,
  type RfqSubmission,
} from './rfqSchema';
import { getRfqAvailability, RfqUnavailableError, submitRfq } from './rfqService';

const defaultValues: RfqFormValues = {
  fullName: '',
  companyName: '',
  workEmail: '',
  phone: '',
  designation: '',
  projectCategory: 'turnkey-electrification',
  projectLocation: '',
  industry: 'chemical',
  voltageRequirement: 'not-sure',
  scopeDescription: '',
  expectedTimeline: 'not-decided',
  preferredContact: 'email',
  attachments: [],
  consent: false,
};

type Status = { kind: 'idle' } | { kind: 'error'; message: string } | { kind: 'success'; reference: string };

export function RfqPage() {
  useDocumentMeta({
    title: 'Request a Project Quotation',
    description:
      'Submit your electrical scope, single-line diagram or BOQ to Raj Avinsys for engineering review. Turnkey electrification, switchyards, panels and busways in Gujarat.',
    path: '/rfq',
  });

  const [searchParams] = useSearchParams();
  const preselected = getServiceBySlug(searchParams.get('service') ?? undefined);
  const availability = getRfqAvailability();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const submittingRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const form = useForm<RfqFormValues, unknown, RfqSubmission>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      ...defaultValues,
      projectCategory: preselected?.slug ?? defaultValues.projectCategory,
    },
    mode: 'onTouched',
  });

  const { register, handleSubmit, formState, watch, setValue, getValues, trigger, reset } = form;
  const { errors, isSubmitting } = formState;
  const attachments = watch('attachments') ?? [];
  const attachmentErrors = useMemo(() => validateAttachments(attachments), [attachments]);

  function addFiles(incoming: FileList | File[]) {
    const current = getValues('attachments') ?? [];
    const merged = [...current];
    for (const file of Array.from(incoming)) {
      const duplicate = merged.some((existing) => existing.name === file.name && existing.size === file.size);
      if (!duplicate) merged.push(file);
    }
    setValue('attachments', merged, { shouldDirty: true });
    void trigger('attachments');
  }

  function removeFile(index: number) {
    const current = [...(getValues('attachments') ?? [])];
    current.splice(index, 1);
    setValue('attachments', current, { shouldDirty: true });
    void trigger('attachments');
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  }

  async function onValid(values: RfqSubmission) {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus({ kind: 'idle' });
    try {
      const result = await submitRfq(values);
      setStatus({ kind: 'success', reference: result.reference });
      reset(defaultValues);
    } catch (error) {
      const message =
        error instanceof RfqUnavailableError
          ? error.message
          : error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.';
      setStatus({ kind: 'error', message });
    } finally {
      submittingRef.current = false;
    }
  }

  if (status.kind === 'success') {
    return (
      <>
        <PageHero eyebrow="Enquiry received" title="Thank you. Your enquiry has been received." />
        <Container className="py-12">
          <div role="status" className="max-w-2xl border-l-4 border-success bg-surface p-6">
            <p className="text-lg font-semibold text-primary">Reference: {status.reference}</p>
            <p className="mt-3 text-text-secondary">
              Please quote this reference in any follow-up email or call. Our engineering team will review the scope
              you submitted.
            </p>
            <div className="mt-6">
              <Link to="/projects" className="btn btn-outline">
                Review our project portfolio
              </Link>
            </div>
          </div>
        </Container>
      </>
    );
  }

  const fieldError = (name: keyof RfqFormValues) => errors[name]?.message as string | undefined;
  const isUnavailable = availability === 'unavailable';
  const disabled = isUnavailable || isSubmitting;

  return (
    <>
      <PageHero
        eyebrow="Request for quotation"
        title="Request a project quotation"
        description="Send your scope, single-line diagram or BOQ to our engineering team. Fields marked * are required."
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[1fr_20rem]">
        <div>
          {isUnavailable && (
            <div role="status" className="mb-8 border-l-4 border-accent bg-surface p-4 text-sm text-text-primary">
              <p className="font-semibold">Online submission is not available on this site yet.</p>
              <p className="mt-1">
                Please email your enquiry to{' '}
                <a className="font-semibold text-technical underline" href={`mailto:${companyConfig.contact.email}`}>
                  {companyConfig.contact.email}
                </a>{' '}
                or call <a className="font-semibold text-technical underline" href={companyConfig.contact.phoneHref}>{companyConfig.contact.phoneDisplay}</a>.
              </p>
            </div>
          )}
          {availability === 'mock' && (
            <div role="status" className="mb-8 border-l-4 border-technical bg-surface p-4 text-sm">
              Development mock mode: submissions are simulated and nothing is sent.
            </div>
          )}
          {status.kind === 'error' && (
            <div role="alert" className="mb-8 border-l-4 border-error bg-white p-4 text-sm text-error">
              {status.message}
            </div>
          )}

          <form noValidate onSubmit={handleSubmit(onValid)} aria-describedby="rfq-note">
            <p id="rfq-note" className="sr-only">
              Required fields are marked with an asterisk.
            </p>
            <fieldset disabled={disabled} className="space-y-10">
              <FormSection legend="Contact details">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="fullName" label="Full name" required error={fieldError('fullName')}>
                    <input id="fullName" autoComplete="name" className="field-input" {...register('fullName')} aria-invalid={!!errors.fullName} />
                  </Field>
                  <Field id="designation" label="Designation" required error={fieldError('designation')}>
                    <input id="designation" autoComplete="organization-title" className="field-input" {...register('designation')} aria-invalid={!!errors.designation} />
                  </Field>
                  <Field id="companyName" label="Company name" required error={fieldError('companyName')}>
                    <input id="companyName" autoComplete="organization" className="field-input" {...register('companyName')} aria-invalid={!!errors.companyName} />
                  </Field>
                  <Field id="workEmail" label="Work email" required error={fieldError('workEmail')}>
                    <input id="workEmail" type="email" autoComplete="email" inputMode="email" className="field-input" {...register('workEmail')} aria-invalid={!!errors.workEmail} />
                  </Field>
                  <Field id="phone" label="Phone number" required error={fieldError('phone')} hint="Include the country or area code.">
                    <input id="phone" type="tel" autoComplete="tel" inputMode="tel" className="field-input" {...register('phone')} aria-invalid={!!errors.phone} />
                  </Field>
                  <Field id="preferredContact" label="Preferred contact method" required error={fieldError('preferredContact')}>
                    <select id="preferredContact" className="field-input" {...register('preferredContact')} aria-invalid={!!errors.preferredContact}>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                    </select>
                  </Field>
                </div>
              </FormSection>

              <FormSection legend="Project details">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="projectCategory" label="Service required" required error={fieldError('projectCategory')}>
                    <select id="projectCategory" className="field-input" {...register('projectCategory')} aria-invalid={!!errors.projectCategory}>
                      {projectCategoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="industry" label="Industry" required error={fieldError('industry')}>
                    <select id="industry" className="field-input" {...register('industry')} aria-invalid={!!errors.industry}>
                      {industryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="projectLocation" label="Project location" required error={fieldError('projectLocation')} hint="Town, district and state.">
                    <input id="projectLocation" className="field-input" {...register('projectLocation')} aria-invalid={!!errors.projectLocation} />
                  </Field>
                  <Field id="voltageRequirement" label="Voltage requirement" required error={fieldError('voltageRequirement')}>
                    <select id="voltageRequirement" className="field-input" {...register('voltageRequirement')} aria-invalid={!!errors.voltageRequirement}>
                      {voltageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="expectedTimeline" label="Expected timeline" required error={fieldError('expectedTimeline')}>
                    <select id="expectedTimeline" className="field-input" {...register('expectedTimeline')} aria-invalid={!!errors.expectedTimeline}>
                      {timelineOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="mt-5">
                  <Field id="scopeDescription" label="Scope of work" required error={fieldError('scopeDescription')} hint="Describe the equipment, voltage levels, quantities and site conditions you need quoted.">
                    <textarea id="scopeDescription" rows={6} className="field-input" {...register('scopeDescription')} aria-invalid={!!errors.scopeDescription} />
                  </Field>
                </div>
              </FormSection>

              <FormSection legend="Attachments (optional)">
                <p className="text-sm text-text-secondary">
                  Accepted: PDF, XLS, XLSX. Up to {RFQ_MAX_FILES} files, 10 MB each, 25 MB in total. Do not upload
                  confidential drawings unless you have authority to share them.
                </p>
                <div
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`mt-4 flex flex-col items-center justify-center gap-3 border-2 border-dashed p-6 text-center ${
                    dragging ? 'border-technical bg-surface' : 'border-border'
                  }`}
                >
                  <p className="text-sm text-text-secondary">Drag files here, or</p>
                  <button type="button" className="btn btn-outline" onClick={() => fileInputRef.current?.click()}>
                    Choose files
                  </button>
                  <input
                    ref={fileInputRef}
                    id="attachments"
                    type="file"
                    multiple
                    accept={RFQ_ACCEPT_ATTRIBUTE}
                    className="sr-only"
                    aria-label="Choose attachments"
                    aria-describedby="attachments-help"
                    onChange={(event) => {
                      if (event.target.files) addFiles(event.target.files);
                      event.target.value = '';
                    }}
                  />
                  <p id="attachments-help" className="sr-only">
                    Accepted types PDF, XLS and XLSX. Maximum five files.
                  </p>
                </div>

                {attachments.length > 0 && (
                  <ul className="mt-4 divide-y divide-border border border-border" aria-label="Selected files">
                    {attachments.map((file, index) => (
                      <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                        <span className="min-w-0 truncate">
                          {file.name} <span className="text-text-secondary">({formatBytes(file.size)})</span>
                        </span>
                        <button type="button" className="text-technical underline" onClick={() => removeFile(index)}>
                          Remove<span className="sr-only"> {file.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {(errors.attachments?.message || attachmentErrors.length > 0) && (
                  <div role="alert" className="mt-3 text-sm text-error">
                    {(errors.attachments?.message as string | undefined) ?? attachmentErrors[0]}
                  </div>
                )}
              </FormSection>

              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1 h-5 w-5 accent-primary" {...register('consent')} aria-invalid={!!errors.consent} />
                  <span>
                    I agree that Raj Avinsys may contact me about this enquiry. Read our{' '}
                    <Link to="/contact" className="text-technical underline">contact details</Link>{' '}
                    for how to reach us.
                  </span>
                </label>
                {fieldError('consent') && (
                  <p role="alert" className="text-sm text-error">{fieldError('consent')}</p>
                )}
                <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={disabled}>
                  {isSubmitting ? 'Sending…' : 'Submit RFQ'}
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <aside aria-labelledby="rfq-aside" className="h-fit border-t-4 border-primary bg-surface p-6 text-sm">
          <h2 id="rfq-aside" className="text-xl">What to include</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-text-secondary">
            <li>Single-line diagram (SLD) or load schedule</li>
            <li>Bill of quantities (BOQ) or tender scope</li>
            <li>Connection voltage and site location</li>
            <li>Required completion date or shutdown window</li>
          </ul>
          <p className="mt-6 text-text-secondary">
            Or call{' '}
            <a href={companyConfig.contact.phoneHref} className="font-semibold text-technical underline">
              {companyConfig.contact.phoneDisplay}
            </a>{' '}
            during office hours.
          </p>
        </aside>
      </Container>
    </>
  );
}

function FormSection({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="mb-5 text-2xl">{legend}</h2>
      {children}
    </section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-text-primary">
        {label}
        {required && <span aria-hidden="true" className="text-error"> *</span>}
      </label>
      {hint && (
        <span id={hintId} className="text-xs text-text-secondary">
          {hint}
        </span>
      )}
      {children}
      {error && (
        <span id={errorId} role="alert" className="text-sm text-error">
          {error}
        </span>
      )}
    </div>
  );
}
