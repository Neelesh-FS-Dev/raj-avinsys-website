import type { Project, ProjectCategory, SectorId } from '../types/content';
import { rawProjects } from './projectRecords';

/**
 * Set to true only after the client has given written permission to name them.
 * Until then project pages describe the sector and location, never the client.
 */
export const PUBLISH_CLIENT_NAMES = false;

export const sectorLabels: Record<SectorId, string> = {
  chemical: 'Chemical & petrochemical',
  pharmaceutical: 'Pharmaceutical',
  textile: 'Textile',
  glass: 'Glass',
  manufacturing: 'Manufacturing & OEM',
  infrastructure: 'Infrastructure & institutional',
  'water-treatment': 'Water treatment',
};

export const categoryLabels: Record<ProjectCategory, string> = {
  switchyard: 'Switchyard works',
  electrification: 'HT/LT electrification',
  busway: 'Sandwich busway',
  consultancy: 'Engineering consultancy',
};

export const regionLabels: Record<Project['region'], string> = {
  gujarat: 'Gujarat',
  'other-india': 'Other states, India',
  international: 'International',
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Slugs are built from category, sector and location, never from the client
 * name, so URLs do not expose client names while permission is pending.
 * The two-digit suffix keeps slugs unique and stable for this dataset.
 */
export const projects: readonly Project[] = rawProjects.map(
  ([client, location, region, sector, category, voltage, rating, scope], index) => {
    const base = slugify(`${categoryLabels[category]} ${sectorLabels[sector]} ${location.split(',')[0]}`);
    return {
      id: `RA-${String(index + 1).padStart(3, '0')}`,
      slug: `${base}-${String(index + 1).padStart(2, '0')}`,
      clientName: client,
      clientNamePublishable: PUBLISH_CLIENT_NAMES,
      sector,
      location,
      region,
      category,
      voltage,
      rating,
      scope,
    };
  },
);

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Display name for a project: client name only when publishable, otherwise a neutral description. */
export function projectDisplayName(project: Project): string {
  if (project.clientNamePublishable) {
    return project.clientName;
  }
  return `${categoryLabels[project.category]} for a ${sectorLabels[project.sector].toLowerCase()} client`;
}
