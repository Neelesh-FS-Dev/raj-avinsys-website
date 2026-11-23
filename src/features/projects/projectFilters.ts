import type { Project, ProjectCategory, ProjectRegion, SectorId, VoltageClass } from '../../types/content';

export interface ProjectFilters {
  category?: ProjectCategory;
  sector?: SectorId;
  region?: ProjectRegion;
  voltage?: VoltageClass;
}

const CATEGORIES: readonly ProjectCategory[] = ['switchyard', 'electrification', 'busway', 'consultancy'];
const SECTORS: readonly SectorId[] = [
  'chemical',
  'pharmaceutical',
  'textile',
  'glass',
  'manufacturing',
  'infrastructure',
  'water-treatment',
];
const REGIONS: readonly ProjectRegion[] = ['gujarat', 'other-india', 'international'];
const VOLTAGES: readonly VoltageClass[] = ['220 kV', '66 kV', 'Not stated'];

function pick<T extends string>(value: string | null, allowed: readonly T[]): T | undefined {
  return value !== null && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

/** Reads filters from the URL. Unknown values are ignored rather than trusted. */
export function parseProjectFilters(params: URLSearchParams): ProjectFilters {
  return {
    category: pick(params.get('category'), CATEGORIES),
    sector: pick(params.get('sector'), SECTORS),
    region: pick(params.get('region'), REGIONS),
    voltage: pick(params.get('voltage'), VOLTAGES),
  };
}

/** Writes only active filters to the URL so shared links reproduce the same view. */
export function toProjectSearchParams(filters: ProjectFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.sector) params.set('sector', filters.sector);
  if (filters.region) params.set('region', filters.region);
  if (filters.voltage) params.set('voltage', filters.voltage);
  return params;
}

export function filterProjects(projects: readonly Project[], filters: ProjectFilters): Project[] {
  return projects.filter(
    (project) =>
      (filters.category === undefined || project.category === filters.category) &&
      (filters.sector === undefined || project.sector === filters.sector) &&
      (filters.region === undefined || project.region === filters.region) &&
      (filters.voltage === undefined || project.voltage === filters.voltage),
  );
}

export function hasActiveFilters(filters: ProjectFilters): boolean {
  return Object.values(filters).some((value) => value !== undefined);
}
