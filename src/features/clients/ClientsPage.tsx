import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { CtaBand } from '../../components/ui/CtaBand';
import { Container } from '../../components/ui/Container';
import { PageHero } from '../../components/ui/PageHero';
import { clientGroups, clientLogos } from '../../data/clients';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export function ClientsPage() {
  useDocumentMeta({
    title: 'Clients',
    description: 'Industrial and public-sector clients of Raj Avinsys, grouped by industry.',
    path: '/clients',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Clients' }]} />
      <PageHero
        title="Clients we have worked with"
        description={`${clientLogos.length} organisations across ${clientGroups.length} industries, from chemicals and pharmaceuticals to public utilities.`}
      />
      <Container className="space-y-20 py-16">
        {clientGroups.map((group) => (
          <section key={group} aria-labelledby={`group-${group.replace(/\W+/g, '-')}`}>
            <h2 id={`group-${group.replace(/\W+/g, '-')}`} className="text-3xl md:text-4xl">
              {group}
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {clientLogos
                .filter((client) => client.group === group)
                .map((client) => (
                  <li key={client.src} className="flex aspect-[3/2] items-center justify-center bg-surface p-6">
                    <img src={client.src} alt={client.name} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </Container>
      <CtaBand title="Planning an electrical infrastructure project?" description="Submit your requirements, single-line diagram or BOQ for engineering review." />
    </>
  );
}
