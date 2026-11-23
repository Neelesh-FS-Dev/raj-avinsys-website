import type { ReactNode } from 'react';
import { Container } from './Container';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <div className="border-b-4 border-accent bg-primary text-white">
      <Container className="py-14 sm:py-16">
        {eyebrow && <p className="font-mono text-sm uppercase tracking-widest text-accent">{eyebrow}</p>}
        <h1 className="mt-3 max-w-4xl text-white">{title}</h1>
        {description && <p className="mt-4 max-w-3xl text-lg text-white/85">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </div>
  );
}
