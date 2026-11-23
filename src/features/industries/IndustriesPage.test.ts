import { describe, expect, it } from 'vitest';
import { projects } from '../../data/projects';
import { buildSectorSummaries } from './IndustriesPage';

describe('buildSectorSummaries', () => {
  const summaries = buildSectorSummaries(projects);

  it('totals match the published portfolio', () => {
    const total = summaries.reduce((sum, sector) => sum + sector.total, 0);
    expect(total).toBe(projects.length);
  });

  it('category counts add up to each sector total', () => {
    for (const sector of summaries) {
      const categoryTotal = sector.byCategory.reduce((sum, item) => sum + item.count, 0);
      expect(categoryTotal).toBe(sector.total);
    }
  });

  it('only includes sectors with at least one project and never more examples than projects', () => {
    for (const sector of summaries) {
      expect(sector.total).toBeGreaterThan(0);
      expect(sector.examples.length).toBeLessThanOrEqual(sector.total);
      expect(sector.examples.every((project) => project.sector === sector.id)).toBe(true);
    }
  });

  it('returns an empty list when the source has no projects', () => {
    expect(buildSectorSummaries([])).toEqual([]);
  });
});
