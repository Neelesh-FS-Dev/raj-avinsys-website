import { Link } from 'react-router-dom';
import { Container } from './Container';

interface CtaBandProps {
  title: string;
  description: string;
  rfqHref?: string;
}

export function CtaBand({ title, description, rfqHref = '/rfq' }: CtaBandProps) {
  return (
    <section aria-labelledby="cta-band-heading" className="bg-primary py-14 text-white">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="cta-band-heading" className="text-white">
            {title}
          </h2>
          <p className="mt-3 text-white/85">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={rfqHref} className="btn btn-primary">
            Submit RFQ
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Contact our team
          </Link>
        </div>
      </Container>
    </section>
  );
}
