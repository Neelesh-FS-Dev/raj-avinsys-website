import type { NavItem } from '../types/content';
import { services } from './services';

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Industries', to: '/industries' },
  { label: 'Certifications', to: '/certifications' },
  { label: 'Contact', to: '/contact' },
];

export const serviceNav: readonly NavItem[] = services.map((service) => ({
  label: service.title,
  to: `/services/${service.slug}`,
}));

export const footerNav: readonly { heading: string; items: readonly NavItem[] }[] = [
  {
    heading: 'Company',
    items: [
      { label: 'About Raj Avinsys', to: '/about' },
      { label: 'Certifications', to: '/certifications' },
      { label: 'Projects', to: '/projects' },
      { label: 'Clients', to: '/clients' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Services',
    items: serviceNav,
  },
];
