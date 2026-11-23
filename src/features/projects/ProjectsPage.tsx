import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Container } from '../../components/ui/Container';
import { PageHero } from '../../components/ui/PageHero';
import { categoryLabels, projectDisplayName, projects, regionLabels, sectorLabels } from '../../data/projects';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import type { ProjectCategory, ProjectRegion, SectorId, VoltageClass } from '../../types/content';
import { filterProjects, hasActiveFilters, parseProjectFilters, toProjectSearchParams, type ProjectFilters } from './projectFilters';

const voltageOptions: readonly VoltageClass[] = ['220 kV', '66 kV', 'Not stated'];

export function ProjectsPage() {
  useDocumentMeta({
    title: 'Project Portfolio',
    description:
      'Switchyard, electrification and sandwich busway projects by Raj Avinsys across Gujarat and India. Filter by service, sector, region and voltage.',
    path: '/projects',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => parseProjectFilters(searchParams), [searchParams]);
  const results = useMemo(() => filterProjects(projects, filters), [filters]);

  function update(next: ProjectFilters) {
    setSearchParams(toProjectSearchParams(next), { replace: true });
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Projects' }]} />
      <PageHero
        eyebrow="Project portfolio"
        title="Projects"
        description={`${projects.length} projects in our published portfolio. Client names are withheld until permission is confirmed.`}
      />

      <Container className="py-12">
        <form
          role="search"
          aria-label="Filter projects"
          className="grid gap-4 border border-border bg-surface p-5 sm:grid-cols-2 lg:grid-cols-5"
          onSubmit={(event) => event.preventDefault()}
        >
          <FilterSelect
            id="filter-category"
            label="Service"
            value={filters.category}
            onChange={(category) => update({ ...filters, category })}
            options={Object.entries(categoryLabels).map(([value, label]) => ({ value: value as ProjectCategory, label }))}
          />
          <FilterSelect
            id="filter-sector"
            label="Industry"
            value={filters.sector}
            onChange={(sector) => update({ ...filters, sector })}
            options={Object.entries(sectorLabels).map(([value, label]) => ({ value: value as SectorId, label }))}
          />
          <FilterSelect
            id="filter-region"
            label="Location"
            value={filters.region}
            onChange={(region) => update({ ...filters, region })}
            options={Object.entries(regionLabels).map(([value, label]) => ({ value: value as ProjectRegion, label }))}
          />
          <FilterSelect
            id="filter-voltage"
            label="Voltage class"
            value={filters.voltage}
            onChange={(voltage) => update({ ...filters, voltage })}
            options={voltageOptions.map((value) => ({ value, label: value }))}
          />
          <div className="flex items-end">
            <button
              type="button"
              className="btn btn-outline w-full"
              disabled={!hasActiveFilters(filters)}
              onClick={() => update({})}
            >
              Clear filters
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-text-secondary" aria-live="polite">
          Showing {results.length} of {projects.length} projects.
        </p>

        {results.length === 0 ? (
          <div className="mt-8 border border-border p-8 text-center">
            <p className="text-lg">No projects match these filters.</p>
            <button type="button" className="mt-4 font-semibold text-technical underline" onClick={() => update({})}>
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {results.map((project) => (
              <li key={project.id} className="bg-white">
                <Link to={`/projects/${project.slug}`} className="group flex h-full flex-col p-6 no-underline">
                  <p className="eyebrow">{categoryLabels[project.category]}</p>
                  <h2 className="mt-2 text-lg group-hover:text-accent-dark">{projectDisplayName(project)}</h2>
                  <p className="mt-2 text-sm text-text-secondary">
                    {sectorLabels[project.sector]} · {project.location}
                  </p>
                  <p className="mt-3 flex-1 text-sm">{project.scope}</p>
                  <p className="mt-4 font-mono text-xs text-text-secondary">
                    {project.voltage}
                    {project.rating ? ` · ${project.rating}` : ''}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}

function FilterSelect<T extends string>({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  options: readonly { value: T; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <select
        id={id}
        className="field-input"
        value={value ?? ''}
        onChange={(event) => {
          const next = event.target.value;
          onChange(options.find((option) => option.value === next)?.value);
        }}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
