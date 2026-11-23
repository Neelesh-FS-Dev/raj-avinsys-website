import { Link } from 'react-router-dom';
import { Container } from './Container';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-surface">
      <Container className="py-3">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-text-secondary">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.to ? (
                <Link to={item.to} className="text-technical hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-text-primary">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
