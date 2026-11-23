import type { RouteObject } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';

/**
 * Route table. Each page is a separate chunk, so visitors download only the
 * code for the page they open. Keep in sync with publicRoutes() in vite.config.ts.
 */
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, lazy: () => import('../features/home/HomePage').then((m) => ({ Component: m.HomePage })) },
      { path: 'about', lazy: () => import('../features/about/AboutPage').then((m) => ({ Component: m.AboutPage })) },
      { path: 'services', lazy: () => import('../features/services/ServicesPage').then((m) => ({ Component: m.ServicesPage })) },
      { path: 'services/:slug', lazy: () => import('../features/services/ServiceDetailPage').then((m) => ({ Component: m.ServiceDetailPage })) },
      { path: 'projects', lazy: () => import('../features/projects/ProjectsPage').then((m) => ({ Component: m.ProjectsPage })) },
      { path: 'projects/:slug', lazy: () => import('../features/projects/ProjectDetailPage').then((m) => ({ Component: m.ProjectDetailPage })) },
      { path: 'industries', lazy: () => import('../features/industries/IndustriesPage').then((m) => ({ Component: m.IndustriesPage })) },
      { path: 'clients', lazy: () => import('../features/clients/ClientsPage').then((m) => ({ Component: m.ClientsPage })) },
      { path: 'careers', lazy: () => import('../features/careers/CareersPage').then((m) => ({ Component: m.CareersPage })) },
      { path: 'certifications', lazy: () => import('../features/certifications/CertificationsPage').then((m) => ({ Component: m.CertificationsPage })) },
      { path: 'contact', lazy: () => import('../features/contact/ContactPage').then((m) => ({ Component: m.ContactPage })) },
      { path: 'rfq', lazy: () => import('../features/rfq/RfqPage').then((m) => ({ Component: m.RfqPage })) },
      { path: '*', lazy: () => import('../features/system/NotFoundPage').then((m) => ({ Component: m.NotFoundPage })) },
    ],
  },
];
