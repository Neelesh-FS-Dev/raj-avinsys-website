import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { CtaBand } from '../../components/ui/CtaBand';
import { PageHero } from '../../components/ui/PageHero';
import { Section } from '../../components/ui/Section';
import { SpecTable } from '../../components/ui/SpecTable';
import { categoryLabels, getProjectBySlug, projectDisplayName, projects, regionLabels, sectorLabels } from '../../data/projects';
import { getServiceBySlug, services } from '../../data/services';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import type { ProjectCategory } from '../../types/content';
import { NotFoundPage } from '../system/NotFoundPage';

const serviceForCategory: Record<ProjectCategory, string> = {
  switchyard: 'switchyard-works',
  electrification: 'turnkey-electrification',
  busway: 'sandwich-busways',
  consultancy: 'liaising-compliance',
};

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const name = project ? projectDisplayName(project) : 'Project not found';

  useDocumentMeta({
    title: project ? `${name}, ${project.location}` : 'Project not found',
    description: project
      ? `${categoryLabels[project.category]} project in ${project.location}: ${project.scope}.`
      : 'Raj Avinsys project portfolio.',
    path: `/projects/${slug ?? ''}`,
    noindex: !project,
  });

  if (!project) {
    return <NotFoundPage />;
  }

  const serviceSlug = serviceForCategory[project.category];
  const service = getServiceBySlug(serviceSlug);
  const related = projects
    .filter((item) => item.category === project.category && item.id !== project.id)
    .slice(0, 3);

  const parameters = [
    { label: 'Service', value: categoryLabels[project.category] },
    { label: 'Industry', value: sectorLabels[project.sector] },
    { label: 'Location', value: project.location },
    { label: 'Region', value: regionLabels[project.region] },
    { label: 'Voltage class', value: project.voltage },
    ...(project.rating ? [{ label: 'Current rating', value: project.rating }] : []),
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: name },
        ]}
      />
      <PageHero eyebrow={categoryLabels[project.category]} title={name} description={`${sectorLabels[project.sector]} · ${project.location}`} />

      <Section id="overview" title="Project overview">
        <p className="max-w-3xl text-lg text-text-secondary">{project.scope}.</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <SpecTable caption={`Technical parameters for ${name}`} rows={parameters} />
          <aside className="border-t-4 border-primary bg-surface p-6">
            <h3 className="text-xl">Related service</h3>
            {service && (
              <>
                <p className="mt-3 text-text-secondary">{service.summary}</p>
                <Link to={`/services/${service.slug}`} className="mt-5 inline-block font-semibold text-technical hover:underline">
                  {service.title}
                </Link>
              </>
            )}
            <p className="mt-6 text-sm text-text-secondary">
              Client names are not shown on this page unless the client has given permission to publish them.
            </p>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section id="related" tone="surface" title="Similar projects">
          <ul className="grid gap-px bg-border md:grid-cols-3">
            {related.map((item) => (
              <li key={item.id} className="bg-white p-6">
                <Link to={`/projects/${item.slug}`} className="no-underline">
                  <h3 className="text-lg hover:text-accent-dark">{projectDisplayName(item)}</h3>
                </Link>
                <p className="mt-2 text-sm text-text-secondary">
                  {sectorLabels[item.sector]} · {item.location}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="services-link" title="Services in this portfolio">
        <ul className="flex flex-wrap gap-3">
          {services.map((item) => (
            <li key={item.slug}>
              <Link to={`/services/${item.slug}`} className="inline-block border border-border px-4 py-2 text-sm font-semibold text-primary hover:border-primary">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Planning a similar project?"
        description="Send your scope to our engineering team for review."
        rfqHref={`/rfq?service=${serviceSlug}`}
      />
    </>
  );
}
