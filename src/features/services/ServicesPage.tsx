import { Link } from 'react-router-dom';
import { CtaBand } from '../../components/ui/CtaBand';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Container } from '../../components/ui/Container';
import { PageHero } from '../../components/ui/PageHero';
import { services } from '../../data/services';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export function ServicesPage() {
  useDocumentMeta({
    title: 'Electrical Services',
    description:
      'HT/LT electrification, switchyards up to 220 kV, MCC and PCC panel manufacturing, sandwich busways, retrofitting and statutory liaising in Gujarat.',
    path: '/services',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
      <PageHero
        eyebrow="Services"
        title="Electrical EPC services"
        description="Six service lines covering turnkey electrification, switchyards, panels, busways, retrofitting and statutory liaising."
      />
      <Container className="py-14">
        <ul className="grid gap-px bg-border md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug} className="flex flex-col bg-white">
              {service.image && (
                <img
                  src={service.image.src}
                  alt={service.image.alt}
                  width={service.image.width}
                  height={service.image.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-8">
                <h2 className="text-2xl">
                  <Link to={`/services/${service.slug}`} className="no-underline hover:text-accent-dark">
                    {service.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-text-secondary">{service.summary}</p>
                <Link to={`/services/${service.slug}`} className="mt-5 inline-block font-semibold text-technical hover:underline">
                  View service details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand title="Need a quotation for a specific service?" description="Choose the service in the enquiry form and attach your scope or single-line diagram." />
    </>
  );
}
