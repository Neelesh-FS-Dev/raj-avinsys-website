import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { CtaBand } from '../../components/ui/CtaBand';
import { Container } from '../../components/ui/Container';
import { PageHero } from '../../components/ui/PageHero';
import { Section } from '../../components/ui/Section';
import { companyConfig } from '../../data/companyConfig';
import { timeline } from '../../data/history';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export function AboutPage() {
  useDocumentMeta({
    title: 'About Raj Avinsys',
    description:
      'Raj Avinsys Pvt Ltd: electrical contracting and EPC company founded in Surat in 2004, with offices in Vapi and Ankleshwar. Our history, vision and mission.',
    path: '/about',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      <PageHero
        eyebrow="Company profile"
        title={`About ${companyConfig.legalName.replace(' Pvt Ltd', '')}`}
        description={companyConfig.description}
      />

      <Section id="overview" title="Who we are">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5 text-lg text-text-secondary">
            <p>
              {companyConfig.legalName} (formerly {companyConfig.formerName}) is an electrical contracting and EPC company.
              We carry out turnkey electrification, switchyard works up to 220 kV, panel manufacturing, sandwich busway
              installation and retrofitting for industrial clients.
            </p>
            <p>
              Founded in {companyConfig.foundedYear} in a small office in Old Surat, the company is part of the{' '}
              {companyConfig.groupName}.
            </p>
            <p>
              Client retention on our maintenance services is {companyConfig.maintenanceRetentionPercent}%, as stated by
              the company.
            </p>
          </div>
          <dl className="grid gap-px bg-border sm:grid-cols-2">
            <div className="bg-white p-6">
              <dt className="text-sm text-text-secondary">Head office</dt>
              <dd className="mt-1 font-semibold">Surat, Gujarat</dd>
            </div>
            <div className="bg-white p-6">
              <dt className="text-sm text-text-secondary">Branch offices</dt>
              <dd className="mt-1 font-semibold">Vapi and Ankleshwar</dd>
            </div>
            <div className="bg-white p-6">
              <dt className="text-sm text-text-secondary">Established</dt>
              <dd className="mt-1 font-semibold">{companyConfig.foundedYear}</dd>
            </div>
            <div className="bg-white p-6">
              <dt className="text-sm text-text-secondary">Group</dt>
              <dd className="mt-1 font-semibold">{companyConfig.groupName}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section id="vision" tone="surface" title="Vision and mission">
        <div className="grid gap-px bg-border md:grid-cols-2">
          <article className="bg-white p-8">
            <h3 className="text-xl">Vision</h3>
            <p className="mt-3 text-text-secondary">To be a global leader in delivering sustainable, innovative, and reliable electrical solutions.</p>
          </article>
          <article className="bg-white p-8">
            <h3 className="text-xl">Mission</h3>
            <p className="mt-3 text-text-secondary">To empower industries with safe, efficient, and future-ready power systems.</p>
          </article>
        </div>
        <p className="mt-6 text-sm text-text-secondary">Values as stated by the company: Trust, Innovation, Excellence, Partnership.</p>
      </Section>

      <Section id="history" title="Our journey" description="Milestones as stated by the company. Dates are shown as published.">
        <ol className="relative max-w-3xl border-l-2 border-technical pl-8">
          {timeline.map((event) => (
            <li key={`${event.year}-${event.title}`} className="relative pb-10 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[2.45rem] top-1 h-4 w-4 rounded-full border-2 border-technical bg-white" />
              <p className="font-mono text-sm font-semibold text-technical">{event.year}</p>
              <h3 className="mt-1 text-xl">{event.title}</h3>
              <p className="mt-2 text-text-secondary">{event.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Container className="pb-4">
        <p className="text-sm text-text-secondary">
          For registrations and approvals, see the <Link to="/certifications" className="text-technical underline">certifications page</Link>.
        </p>
      </Container>

      <CtaBand title="Work with an electrical contractor with a switchyard track record" description="Send your requirement and we will review it with our engineering team." />
    </>
  );
}
