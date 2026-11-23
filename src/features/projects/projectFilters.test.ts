import { describe, expect, it } from 'vitest';
import { projects } from '../../data/projects';
import {
  filterProjects,
  hasActiveFilters,
  parseProjectFilters,
  toProjectSearchParams,
} from './projectFilters';

describe('parseProjectFilters', () => {
  it('reads valid values from the URL', () => {
    const params = new URLSearchParams('category=switchyard&sector=chemical&region=gujarat&voltage=66%20kV');
    expect(parseProjectFilters(params)).toEqual({
      category: 'switchyard',
      sector: 'chemical',
      region: 'gujarat',
      voltage: '66 kV',
    });
  });

  it('ignores unknown values instead of trusting them', () => {
    const params = new URLSearchParams('category=<script>&sector=aerospace&voltage=500kV');
    expect(parseProjectFilters(params)).toEqual({});
  });
});

describe('toProjectSearchParams', () => {
  it('writes only active filters', () => {
    const params = toProjectSearchParams({ category: 'busway', region: 'other-india' });
    expect(params.toString()).toBe('category=busway&region=other-india');
  });

  it('round-trips through parseProjectFilters', () => {
    const filters = { category: 'switchyard' as const, voltage: '220 kV' as const };
    expect(parseProjectFilters(toProjectSearchParams(filters))).toEqual(filters);
  });
});

describe('filterProjects', () => {
  it('returns every project when no filters are active', () => {
    expect(filterProjects(projects, {})).toHaveLength(projects.length);
  });

  it('only returns 220 kV projects for the 220 kV filter', () => {
    const result = filterProjects(projects, { voltage: '220 kV' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((project) => project.voltage === '220 kV')).toBe(true);
  });

  it('combines filters with AND semantics', () => {
    const result = filterProjects(projects, { category: 'busway', region: 'gujarat', sector: 'chemical' });
    expect(result.length).toBeGreaterThan(0);
    for (const project of result) {
      expect(project).toMatchObject({ category: 'busway', region: 'gujarat', sector: 'chemical' });
    }
  });
});

describe('hasActiveFilters', () => {
  it('is false for an empty filter set and true otherwise', () => {
    expect(hasActiveFilters({})).toBe(false);
    expect(hasActiveFilters({ region: 'international' })).toBe(true);
  });
});

describe('project dataset integrity', () => {
  it('has unique slugs and ids', () => {
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((project) => project.id)).size).toBe(projects.length);
  });

  it('does not expose full client names in slugs', () => {
    const slugify = (value: string) => value.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    for (const project of projects) {
      expect(project.slug).not.toContain(slugify(project.clientName));
    }
  });

  it('withholds client names by default', () => {
    expect(projects.every((project) => project.clientNamePublishable === false)).toBe(true);
  });
});
