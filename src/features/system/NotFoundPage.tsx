import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export function NotFoundPage() {
  useDocumentMeta({
    title: 'Page not found',
    description: 'The page you requested could not be found on the Raj Avinsys website.',
    path: '/404',
    noindex: true,
  });

  return (
    <Container className="py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3">Page not found</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
        The page may have moved, or the link may be incorrect. Use the navigation above, or contact us for help.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary">
          Go to homepage
        </Link>
        <Link to="/projects" className="btn btn-outline">
          View projects
        </Link>
      </div>
    </Container>
  );
}
