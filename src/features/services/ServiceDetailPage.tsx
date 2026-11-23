import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Container } from '../../components/ui/Container';
import { CtaBand } from '../../components/ui/CtaBand';
import { PageHero } from '../../components/ui/PageHero';
import { Section } from '../../components/ui/Section';
import { SpecTable } from '../../components/ui/SpecTable';
import { categoryLabels, projects, projectDisplayName, sectorLabels } from '../../data/projects';
import { getServiceBySlug, services } from '../../data/services';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { NotFoundPage } from '../system/NotFoundPage';

/** Reusable template: every service page is rendered from the same structure and data. */
export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useDocumentMeta({
    title: service?.title ?? 'Service not found',
    description: service?.metaDescription ?? 'Raj Avinsys electrical services in Gujarat.',
    path: `/services/${slug ?? ''}`,
    noindex: !service,
  });

  if (!service) {
    return <NotFoundPage />;
  }

  const pictures = service.image ? [service.image, ...(service.gallery ?? [])] : (service.gallery ?? []);
  const related = projects.filter((project) => project.category === service.projectCategory).slice(0, 4);
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      />
      <PageHero eyebrow="Service" title={service.title} description={service.summary} />

      <Section id="overview" title="Overview">
        <div className="max-w-3xl space-y-5 text-lg text-text-secondary">
          {service.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {pictures.length > 0 && (
        <Container className="pb-14 sm:pb-20">
          <ul className="grid gap-px bg-border md:grid-cols-2">
            {pictures.map((picture) => (
              <li key={picture.src} className="bg-white">
                <img
                  src={picture.src}
                  alt={picture.alt}
                  width={picture.width}
                  height={picture.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </Container>
      )}

      <Section id="scope" tone="surface" title="Technical scope">
        <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
          {service.scope.map((item) => (
            <li key={item} className="flex gap-3 border-l-4 border-technical bg-white px-5 py-4">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="specifications" title="Technical specifications" description="Parameters the company states it works with for this service.">
        <SpecTable caption={`${service.title} technical parameters`} rows={service.specifications} />
      </Section>

      <Section id="methodology" tone="surface" title="Execution sequence" description="The usual sequence for this scope. Project-specific steps are agreed at the kick-off.">
        <ol className="grid gap-4 md:grid-cols-3">
          {service.executionSteps.map((step, index) => (
            <li key={step} className="flex gap-4 bg-white p-5">
              <span className="font-heading text-base font-bold text-technical">{String(index + 1).padStart(2, '0')}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="quality" title="Quality and safety">
        <ul className="list-disc space-y-3 pl-6 text-lg text-text-secondary">
          {service.qualityAndSafety.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section id="related-projects" tone="surface" title="Related projects" description="Recent portfolio entries in this service line. Client names are withheld until permission is confirmed.">
        {related.length > 0 ? (
          <ul className="grid gap-px bg-border md:grid-cols-2">
            {related.map((project) => (
              <li key={project.id} className="bg-white p-6">
                <Link to={`/projects/${project.slug}`} className="no-underline">
                  <h3 className="text-lg hover:text-accent-dark">{projectDisplayName(project)}</h3>
                </Link>
                <p className="mt-2 text-sm text-text-secondary">
                  {sectorLabels[project.sector]} · {project.location}
                </p>
                <p className="mt-3 text-sm">{project.scope}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-text-secondary">No projects are listed in this service line yet.</p>
        )}
        <div className="mt-8">
          <Link to={`/projects?category=${service.projectCategory}`} className="font-semibold text-technical hover:underline">
            All {categoryLabels[service.projectCategory].toLowerCase()} projects
          </Link>
        </div>
      </Section>

      <Section id="other-services" title="Other services">
        <ul className="flex flex-wrap gap-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link to={`/services/${item.slug}`} className="inline-block border border-border px-4 py-2 text-sm font-semibold text-primary hover:border-primary">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={`Request a quotation for ${service.title}`}
        description="Your enquiry is routed to the engineering team with this service preselected."
        rfqHref={`/rfq?service=${service.slug}`}
      />
    </>
  );
}
