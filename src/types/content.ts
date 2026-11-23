export type ServiceSlug =
  | 'turnkey-electrification'
  | 'switchyard-works'
  | 'electrical-panels'
  | 'sandwich-busways'
  | 'retrofitting-utility'
  | 'liaising-compliance';

export type ProjectCategory = 'switchyard' | 'electrification' | 'busway' | 'consultancy';

export type ProjectRegion = 'gujarat' | 'other-india' | 'international';

export type VoltageClass = '220 kV' | '66 kV' | 'Not stated';

export type SectorId =
  | 'chemical'
  | 'pharmaceutical'
  | 'textile'
  | 'glass'
  | 'manufacturing'
  | 'infrastructure'
  | 'water-treatment';

export interface SpecRow {
  readonly label: string;
  readonly value: string;
}

export interface Service {
  readonly slug: ServiceSlug;
  readonly title: string;
  readonly summary: string;
  readonly metaDescription: string;
  readonly overview: readonly string[];
  readonly scope: readonly string[];
  readonly specifications: readonly SpecRow[];
  readonly executionSteps: readonly string[];
  readonly qualityAndSafety: readonly string[];
  readonly projectCategory: ProjectCategory;
  /** Photograph from the live site's media library, with its real dimensions. Omit when none is verified. */
  readonly image?: ServiceImage;
  /** Further photographs for the service page. Shown after the main image. */
  readonly gallery?: readonly ServiceImage[];
}

export interface ServiceImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly clientName: string;
  /** Client names are withheld from public pages until written permission is on file. */
  readonly clientNamePublishable: boolean;
  readonly sector: SectorId;
  readonly location: string;
  readonly region: ProjectRegion;
  readonly category: ProjectCategory;
  readonly voltage: VoltageClass;
  readonly rating?: string;
  readonly scope: string;
}

export interface Certification {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface TimelineEvent {
  readonly year: number;
  readonly title: string;
  readonly detail: string;
}

export interface NavItem {
  readonly label: string;
  readonly to: string;
}
