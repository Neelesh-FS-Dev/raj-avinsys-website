import type { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: 'default' | 'surface';
  children: ReactNode;
  headingLevel?: 2 | 3;
}

export function Section({ id, eyebrow, title, description, tone = 'default', children, headingLevel = 2 }: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`py-14 sm:py-20 ${tone === 'surface' ? 'bg-surface' : 'bg-white'}`}
    >
      <Container>
        <header className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <Heading id={headingId} className="mt-2 text-balance">
            {title}
          </Heading>
          {description && <p className="mt-4 text-lg text-text-secondary">{description}</p>}
        </header>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
