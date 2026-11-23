import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { services } from '../../data/services';

const options = [
  { label: 'A new plant or factory', slug: 'turnkey-electrification' },
  { label: 'A 66 kV or 220 kV switchyard or feeder', slug: 'switchyard-works' },
  { label: 'Motor control or power panels', slug: 'electrical-panels' },
  { label: 'Busbar distribution for production lines', slug: 'sandwich-busways' },
  { label: 'Upgrading or repairing an existing installation', slug: 'retrofitting-utility' },
  { label: 'Statutory approvals and utility connections', slug: 'liaising-compliance' },
] as const;

/** Lets a visitor pick the kind of work they have and see the matching service. Uses only the service data. */
export function ScopeFinder() {
  const [selected, setSelected] = useState<(typeof options)[number]['slug'] | null>(null);
  const service = services.find((item) => item.slug === selected);

  return (
    <section id="find-scope" aria-labelledby="find-scope-heading" className="reveal bg-primary-dark py-20 text-white sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="find-scope-heading" className="text-balance text-white">
            Which service do you need?
          </h2>
          <p className="mt-6 text-lg text-white/85">Choose the work closest to your project to see the matching service.</p>
          <div role="group" aria-label="Kind of work" className="mt-10 flex flex-col items-stretch gap-3">
            {options.map((option) => (
              <button
                key={option.slug}
                type="button"
                aria-pressed={selected === option.slug}
                onClick={() => setSelected(option.slug)}
                className={`min-h-12 px-5 py-3 text-left text-base font-semibold transition-colors ${
                  selected === option.slug ? 'bg-accent text-primary-dark' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div aria-live="polite" className="flex min-h-80 flex-col justify-center bg-primary p-8 md:p-12">
          {service ? (
            <>
              <h3 className="text-3xl text-white md:text-4xl">{service.title}</h3>
              <p className="mt-4 text-lg text-white/85">{service.summary}</p>
              <ul className="mt-6 space-y-2 text-white">
                {service.scope.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/rfq" className="btn btn-primary">
                  Request a quotation
                </Link>
                <Link to={`/services/${service.slug}`} className="btn btn-outline">
                  Service details
                </Link>
              </div>
            </>
          ) : (
            <p className="text-lg text-white/85">Select an option to see the service that matches it.</p>
          )}
        </div>
      </Container>
    </section>
  );
}
