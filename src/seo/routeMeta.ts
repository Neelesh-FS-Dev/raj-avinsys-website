import { certifications } from '../data/certifications';
import { companyConfig } from '../data/companyConfig';
import { getProjectBySlug, projectDisplayName, projects } from '../data/projects';
import { getServiceBySlug, services } from '../data/services';

export interface RouteMeta {
  title: string;
  description: string;
  path: string;
  noindex: boolean;
  jsonLd: Record<string, unknown>[];
}

const SITE = companyConfig.website;

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Raj Avinsys',
  legalName: companyConfig.legalName,
  url: SITE,
  foundingDate: String(companyConfig.foundedYear),
  description: companyConfig.description,
  telephone: companyConfig.contact.phoneDisplay,
  email: companyConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyConfig.headOffice.addressLines.slice(0, 3).join(', '),
    addressLocality: 'Surat',
    addressRegion: 'Gujarat',
    postalCode: companyConfig.headOffice.postalCode,
    addressCountry: 'IN',
  },
  areaServed: ['Gujarat, India', 'Maharashtra', 'Madhya Pradesh', 'Rajasthan', 'Sri Lanka'],
  hasCredential: certifications.map((item) => item.title),
};

function breadcrumbs(items: { name: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE}${item.path}` } : {}),
    })),
  };
}

const notFound: RouteMeta = {
  title: 'Page not found | Raj Avinsys',
  description: 'The page you requested could not be found on the Raj Avinsys website.',
  path: '/404',
  noindex: true,
  jsonLd: [],
};

/** Metadata for a route path. Used by the prerender step and kept in line with page components. */
export function metaFor(path: string): RouteMeta {
  const clean = path.replace(/\/+$/, '') || '/';

  if (clean === '/') {
    return {
      title: 'Raj Avinsys | Electrical Contracting, Switchyards and Panels in Gujarat',
      description:
        'Raj Avinsys Pvt Ltd: electrical EPC contractor in Gujarat since 2004. Turnkey HT/LT electrification, switchyards up to 220 kV, MCC/PCC panels and sandwich busways.',
      path: '/',
      noindex: false,
      jsonLd: [organization],
    };
  }
  if (clean === '/about') {
    return {
      title: 'About Raj Avinsys | Raj Avinsys',
      description:
        'Raj Avinsys Pvt Ltd: electrical contracting and EPC company founded in Surat in 2004, with offices in Vapi and Ankleshwar. Our history, vision and mission.',
      path: '/about',
      noindex: false,
      jsonLd: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'About' }])],
    };
  }
  if (clean === '/services') {
    return {
      title: 'Electrical Services | Raj Avinsys',
      description:
        'HT/LT electrification, switchyards up to 220 kV, MCC and PCC panel manufacturing, sandwich busways, retrofitting and statutory liaising in Gujarat.',
      path: '/services',
      noindex: false,
      jsonLd: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Services' }])],
    };
  }
  const serviceMatch = clean.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const service = getServiceBySlug(serviceMatch[1]);
    if (!service) return notFound;
    return {
      title: `${service.title} | Raj Avinsys`,
      description: service.metaDescription,
      path: clean,
      noindex: false,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.summary,
          serviceType: service.title,
          provider: { '@type': 'Organization', name: 'Raj Avinsys', url: SITE },
          areaServed: 'Gujarat, India',
        },
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title },
        ]),
      ],
    };
  }
  if (clean === '/projects') {
    return {
      title: 'Project Portfolio | Raj Avinsys',
      description:
        'Switchyard, electrification and sandwich busway projects by Raj Avinsys across Gujarat and India. Filter by service, sector, region and voltage.',
      path: '/projects',
      noindex: false,
      jsonLd: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Projects' }])],
    };
  }
  const projectMatch = clean.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const project = getProjectBySlug(projectMatch[1]);
    if (!project) return notFound;
    const name = projectDisplayName(project);
    return {
      title: `${name}, ${project.location} | Raj Avinsys`,
      description: `${project.category} project in ${project.location}: ${project.scope}.`,
      path: clean,
      noindex: false,
      jsonLd: [
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: name },
        ]),
      ],
    };
  }
  if (clean === '/industries') {
    return {
      title: 'Industries Served | Raj Avinsys',
      description:
        'Electrical EPC work for chemical, pharmaceutical, textile, glass, manufacturing and infrastructure plants in Gujarat, drawn from the Raj Avinsys project portfolio.',
      path: '/industries',
      noindex: false,
      jsonLd: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Industries' }])],
    };
  }
  if (clean === '/clients') {
    return {
      title: 'Clients | Raj Avinsys',
      description: 'Industrial and public-sector clients whose logos appear on the Raj Avinsys client list.',
      path: '/clients',
      noindex: false,
      jsonLd: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Clients' }])],
    };
  }
  if (clean === '/careers') {
    return {
      title: 'Careers | Raj Avinsys',
      description: 'Life at Raj Avinsys: culture, training, celebrations and the company’s equal opportunity commitment.',
      path: '/careers',
      noindex: false,
      jsonLd: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Careers' }])],
    };
  }
  if (clean === '/certifications') {
    return {
      title: 'Certifications and Approvals | Raj Avinsys',
      description: 'Electrical contractor approval, GETCO approval, ISO and RVPL registrations listed by Raj Avinsys Pvt Ltd.',
      path: '/certifications',
      noindex: false,
      jsonLd: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Certifications' }])],
    };
  }
  if (clean === '/contact') {
    return {
      title: 'Contact Us | Raj Avinsys',
      description: `Contact Raj Avinsys in Surat, Vapi and Ankleshwar. Phone ${companyConfig.contact.phoneDisplay}, email ${companyConfig.contact.email}.`,
      path: '/contact',
      noindex: false,
      jsonLd: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Contact' }])],
    };
  }
  if (clean === '/rfq') {
    return {
      title: 'Request a Project Quotation | Raj Avinsys',
      description:
        'Submit your electrical scope, single-line diagram or BOQ to Raj Avinsys for engineering review. Turnkey electrification, switchyards, panels and busways in Gujarat.',
      path: '/rfq',
      noindex: false,
      jsonLd: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Request a quotation' }])],
    };
  }
  return notFound;
}

/** Every path that should be prerendered as static HTML. */
export function prerenderPaths(): string[] {
  return [
    '/',
    '/about',
    '/services',
    ...services.map((service) => `/services/${service.slug}`),
    '/projects',
    ...projects.map((project) => `/projects/${project.slug}`),
    '/industries',
    '/clients',
    '/careers',
    '/certifications',
    '/contact',
    '/rfq',
  ];
}

