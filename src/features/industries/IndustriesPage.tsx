import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Container } from '../../components/ui/Container';
import { PageHero } from '../../components/ui/PageHero';
import { Section } from '../../components/ui/Section';
import { categoryLabels, projects, sectorLabels } from '../../data/projects';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import type { Project, ProjectCategory, SectorId } from '../../types/content';

const sectorOrder: readonly SectorId[] = [
  'chemical',
  'pharmaceutical',
  'textile',
  'glass',
  'manufacturing',
  'infrastructure',
  'water-treatment',
];

interface SectorSummary {
  id: SectorId;
  label: string;
  total: number;
  byCategory: { category: ProjectCategory; label: string; count: number }[];
  examples: Project[];
}

/**
 * Builds each sector summary from the published portfolio only. Counts and
 * scope lines are derived from project records, so the page cannot describe
 * work that is not in the portfolio.
 */
export function buildSectorSummaries(source: readonly Project[]): SectorSummary[] {
  return sectorOrder
    .map((id) => {
      const inSector = source.filter((project) => project.sector === id);
      const byCategory = (Object.keys(categoryLabels) as ProjectCategory[])
        .map((category) => ({
          category,
          label: categoryLabels[category],
          count: inSector.filter((project) => project.category === category).length,
        }))
        .filter((item) => item.count > 0);
      return {
        id,
        label: sectorLabels[id],
        total: inSector.length,
        byCategory,
        examples: inSector.slice(0, 3),
      };
    })
    .filter((sector) => sector.total > 0);
}

export function IndustriesPage() {
  useDocumentMeta({
    title: 'Industries Served',
    description:
      'Electrical EPC work for chemical, pharmaceutical, textile, glass, manufacturing and infrastructure plants in Gujarat, drawn from the Raj Avinsys project portfolio.',
    path: '/industries',
  });

  const sectors = buildSectorSummaries(projects);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Industries' }]} />
      <PageHero
        eyebrow="Sectors served"
        title="Industries"
        description={`Our published portfolio covers ${sectors.length} industrial sectors. Each sector below lists the project types and locations recorded for it. Client names are withheld until permission is confirmed.`}
      />

      <Container className="py-12">
        <Section title="Sector overview" headingLevel={2}>
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <li key={sector.id} className="bg-white p-6">
                <h3 className="text-lg">{sector.label}</h3>
                <p className="mt-2 font-mono text-sm tabular-nums text-text-secondary">
                  {sector.total} {sector.total === 1 ? 'project' : 'projects'}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-text-secondary">
                  {sector.byCategory.map((item) => (
                    <li key={item.category}>
                      {item.label}: <span className="font-mono tabular-nums">{item.count}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/projects?sector=${sector.id}`}
                  className="mt-4 inline-block text-sm font-semibold text-technical hover:underline"
                >
                  View {sector.label.toLowerCase()} projects
                  <span className="sr-only"> in the project portfolio</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {sectors.map((sector) => (
          <Section
            key={sector.id}
            id={`sector-${sector.id}`}
            title={sector.label}
            description={`${sector.total} ${sector.total === 1 ? 'project' : 'projects'} in the published portfolio for this sector.`}
            tone="surface"
            headingLevel={2}
          >
            <ul className="divide-y divide-border border border-border bg-white">
              {sector.examples.map((project) => (
                <li key={project.slug} className="grid gap-2 p-5 sm:grid-cols-[12rem_1fr]">
                  <p className="font-mono text-sm tabular-nums text-text-secondary">
                    {project.location}
                    {project.voltage !== 'Not stated' ? ` · ${project.voltage}` : ''}
                  </p>
                  <p className="text-sm text-text-primary">
                    <Link to={`/projects/${project.slug}`} className="font-semibold text-technical hover:underline">
                      {categoryLabels[project.category]}
                    </Link>
                    : {project.scope}
                  </p>
                </li>
              ))}
            </ul>
            {sector.total > sector.examples.length && (
              <p className="mt-4">
                <Link to={`/projects?sector=${sector.id}`} className="font-semibold text-technical hover:underline">
                  See all {sector.total} {sector.label.toLowerCase()} projects
                </Link>
              </p>
            )}
          </Section>
        ))}
      </Container>
    </>
  );
}
