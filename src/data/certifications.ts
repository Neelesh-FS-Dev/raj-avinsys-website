import type { Certification } from '../types/content';

/**
 * Registrations and approvals as listed on the company website.
 * Certificate numbers, validity dates and issuing references are intentionally
 * omitted until they are checked against the original documents.
 */
export const certifications: readonly Certification[] = [
  {
    id: 'electrical-contractor',
    title: 'Electrical Contractor Approval',
    description: 'Electrical contractor approval letter listed on the company website.',
  },
  {
    id: 'getco',
    title: 'GETCO Approval',
    description: 'GETCO approval listed on the company website.',
  },
  {
    id: 'iso',
    title: 'ISO Certification',
    description: 'ISO certificate listed on the company website.',
  },
  {
    id: 'rvpl',
    title: 'RVPL Registration',
    description: 'RVPL certificate listed on the company website.',
  },
];
