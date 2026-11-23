import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { CtaBand } from '../../components/ui/CtaBand';
import { Container } from '../../components/ui/Container';
import { PageHero } from '../../components/ui/PageHero';
import { certifications } from '../../data/certifications';
import { companyConfig } from '../../data/companyConfig';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export function CertificationsPage() {
  useDocumentMeta({
    title: 'Certifications and Approvals',
    description: 'Electrical contractor approval, GETCO approval, ISO and RVPL registrations listed by Raj Avinsys Pvt Ltd.',
    path: '/certifications',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Certifications' }]} />
      <PageHero
        eyebrow="Quality, licences and compliance"
        title="Certifications and approvals"
        description="Registrations and approvals listed by the company. For verification of any item, contact our office."
      />
      <Container className="py-14">
        <ul className="grid gap-px bg-border md:grid-cols-2">
          {certifications.map((item) => (
            <li key={item.id} className="bg-white p-8">
              <h2 className="text-2xl">{item.title}</h2>
              <p className="mt-3 text-text-secondary">{item.description}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm text-text-secondary">
          To confirm any registration or approval for a tender, contact {companyConfig.legalName} at{' '}
          <a className="text-technical underline" href={`mailto:${companyConfig.contact.email}`}>
            {companyConfig.contact.email}
          </a>{' '}
          or{' '}
          <a className="text-technical underline" href={companyConfig.contact.phoneHref}>
            {companyConfig.contact.phoneDisplay}
          </a>
          .
        </p>
      </Container>
      <CtaBand title="Tender or prequalification documents required?" description="Let us know which documents your tender needs and we will respond through our office." />
    </>
  );
}
