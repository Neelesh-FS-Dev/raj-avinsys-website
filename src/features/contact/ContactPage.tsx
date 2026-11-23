import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { CtaBand } from '../../components/ui/CtaBand';
import { Container } from '../../components/ui/Container';
import { PageHero } from '../../components/ui/PageHero';
import { companyConfig } from '../../data/companyConfig';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export function ContactPage() {
  useDocumentMeta({
    title: 'Contact Us',
    description: `Contact Raj Avinsys in Surat, Vapi and Ankleshwar. Phone ${companyConfig.contact.phoneDisplay}, email ${companyConfig.contact.email}.`,
    path: '/contact',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      <PageHero eyebrow="Contact" title="Contact our team" description="For project enquiries, submit an RFQ with your scope. For general questions, call or email the head office." />
      <Container className="grid gap-12 py-14 lg:grid-cols-2">
        <section aria-labelledby="head-office">
          <h2 id="head-office" className="text-2xl">Head office, {companyConfig.headOffice.city}</h2>
          <address className="mt-4 not-italic text-lg leading-relaxed text-text-secondary">
            {companyConfig.legalName}
            {companyConfig.headOffice.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Telephone</dt>
              <dd className="mt-1 text-lg">
                <a className="font-mono text-technical underline" href={companyConfig.contact.phoneHref}>
                  {companyConfig.contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Email</dt>
              <dd className="mt-1 text-lg">
                <a className="text-technical underline" href={`mailto:${companyConfig.contact.email}`}>
                  {companyConfig.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Working hours</dt>
              <dd className="mt-1 text-lg">{companyConfig.contact.hoursDisplay}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="branches">
          <h2 id="branches" className="text-2xl">Branch offices</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {companyConfig.branchOffices.map((branch) => (
              <li key={branch.city} className="py-4 text-lg">
                <span className="font-semibold">{branch.city}</span>, {branch.state}
              </li>
            ))}
          </ul>
        </section>
      </Container>
      <CtaBand title="Prefer to send your requirement in writing?" description="The RFQ form accepts scope descriptions and PDF or Excel attachments." />
    </>
  );
}
