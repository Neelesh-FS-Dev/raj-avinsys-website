import { Link } from 'react-router-dom';
import { CtaBand } from '../../components/ui/CtaBand';
import { Container } from '../../components/ui/Container';
import { certifications } from '../../data/certifications';
import { clientLogos, featuredClientLogos } from '../../data/clients';
import { companyConfig } from '../../data/companyConfig';
import { projects, categoryLabels, projectDisplayName, sectorLabels, regionLabels } from '../../data/projects';
import { services } from '../../data/services';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import type { SectorId } from '../../types/content';
import { HomeHero } from './HomeHero';
import { ScopeFinder } from './ScopeFinder';
import { SingleLineDiagram } from './SingleLineDiagram';

const processSteps = [
  { title: 'Requirement assessment', text: 'Review of the single-line diagram, load schedule, site and approval requirements.' },
  { title: 'Engineering and design', text: 'Electrical layout, equipment selection and statutory approvals.' },
  { title: 'Procurement and manufacturing', text: 'Equipment sourcing and in-house panel fabrication.' },
  { title: 'Installation and execution', text: 'Erection, cabling and busway installation on site.' },
  { title: 'Testing and commissioning', text: 'Testing and commissioning before energisation.' },
  { title: 'Handover and support', text: 'Handover of the completed installation, followed by maintenance where contracted.' },
] as const;

const sectorRequirements: Record<SectorId, string> = {
  chemical: 'Process plants with 66 kV and 220 kV feeders, high-current busways and substations.',
  pharmaceutical: 'Greenfield and expansion electrification, LT distribution and busway for process areas.',
  textile: 'Electrification of greenfield and expansion textile units, with busway for production lines.',
  glass: 'Switchyard and high-current busway works for glass manufacturing plants.',
  manufacturing: 'Electrification for OEM and process plants, including expansion and retrofitting.',
  infrastructure: 'HT electrification for hospitals, hotels, ports and institutional buildings.',
  'water-treatment': 'LT distribution and busway for effluent and water treatment plants.',
};

export function HomePage() {
  useDocumentMeta({
    title: 'Raj Avinsys | Electrical Contracting, Switchyards and Panels in Gujarat',
    description:
      'Raj Avinsys Pvt Ltd: electrical EPC contractor in Gujarat since 2004. Turnkey HT/LT electrification, switchyards up to 220 kV, MCC/PCC panels and sandwich busways.',
    path: '/',
  });

  const featured = [
    projects.find((p) => p.category === 'switchyard' && p.voltage === '220 kV'),
    projects.find((p) => p.category === 'switchyard' && p.voltage === '66 kV' && p.sector === 'chemical'),
    projects.find((p) => p.category === 'switchyard' && p.sector === 'glass'),
    projects.find((p) => p.category === 'electrification' && p.sector === 'pharmaceutical'),
    projects.find((p) => p.category === 'busway' && p.region === 'gujarat' && p.rating?.includes('6300')),
    projects.find((p) => p.category === 'busway' && p.sector === 'manufacturing' && p.region === 'gujarat'),
  ].filter((p): p is (typeof projects)[number] => p !== undefined);

  const sectorCounts = (Object.keys(sectorLabels) as SectorId[])
    .map((sector) => ({ sector, count: projects.filter((p) => p.sector === sector).length }))
    .filter((entry) => entry.count > 0);

  const panelService = services.find((service) => service.slug === 'electrical-panels');
  const panelPhoto = panelService?.gallery?.find((picture) => picture.src.endsWith('main-test-1.webp'));
  const aboutPhoto = services[0]?.image;

  return (
    <div className="home-page">
      <HomeHero />

      {/* Key facts: only figures verified against the company's own materials. */}
      <section aria-label="Key facts" className="bg-surface">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4">
            <Stat value={String(companyConfig.foundedYear)} label="Year established, Surat" />
            <Stat value="3" label="Offices in Gujarat: Surat, Vapi, Ankleshwar" />
            <Stat value={`${companyConfig.maintenanceRetentionPercent}%`} label="Client retention on maintenance work (company-stated)" />
            <Stat value={`${projects.length}`} label="Projects in our published portfolio" />
          </dl>
        </Container>
      </section>

      {/* Company introduction */}
      <section id="about" aria-labelledby="about-heading" className="reveal bg-white py-20 sm:py-28">
        <Container>
          <h2 id="about-heading" className="max-w-5xl text-balance">
            Two decades of electrical contracting in Gujarat
          </h2>
          <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-2xl leading-snug text-text-primary md:text-3xl">
                Founded in Surat in {companyConfig.foundedYear}, we deliver switchyard EPC, panels and turnkey electrification
                across Gujarat.
              </p>
              <div className="mt-8 space-y-5 text-lg text-text-body">
                <p>
                  {companyConfig.legalName} (formerly {companyConfig.formerName}) started in a small office in Old Surat and has
                  grown into switchyard EPC, panel manufacturing and turnkey electrification work across Gujarat and beyond.
                </p>
                <p>
                  The company is part of the {companyConfig.groupName}. Our head office is in Surat, with branch offices in Vapi
                  and Ankleshwar, serving the chemical industry cluster.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/about" className="btn btn-outline">
                  Read the company profile
                </Link>
              </div>
            </div>
            {aboutPhoto && (
              <img
                src={aboutPhoto.src}
                alt={aboutPhoto.alt}
                width={aboutPhoto.width}
                height={aboutPhoto.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            )}
          </div>
        </Container>
      </section>

      {/* Capabilities: one row per service line, picture and scope side by side */}
      <section id="capabilities" aria-labelledby="capabilities-heading" className="bg-surface py-20 sm:py-28">
        <Container>
          <h2 id="capabilities-heading" className="max-w-5xl text-balance">
            Electrical scope from design to commissioning
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-text-body">
            Services are delivered as turnkey packages or as individual scopes, depending on the project.
          </p>

          <ul className="mt-16 space-y-20">
            {services.map((service, index) => (
              <li
                key={service.slug}
                className={`reveal grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                {service.image ? (
                  <img
                    src={service.image.src}
                    alt={service.image.alt}
                    width={service.image.width}
                    height={service.image.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div aria-hidden="true" className="flex aspect-[4/3] w-full items-end bg-primary-dark p-8">
                    <span className="font-heading text-3xl font-bold leading-tight text-white/90 md:text-5xl">{service.title}</span>
                  </div>
                )}
                <div>
                  <h3 className="text-3xl md:text-3xl">{service.title}</h3>
                  <p className="mt-4 text-lg text-text-body">{service.summary}</p>
                  <ul className="mt-6 space-y-2 text-text-primary">
                    {service.scope.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 bg-technical" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/services/${service.slug}`} className="mt-8 inline-block font-semibold text-technical hover:underline">
                    Explore {service.title}
                    <span className="sr-only"> service details</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ScopeFinder />

      {/* Process: the stages run down one line, like a single-line diagram */}
      <section id="process" aria-labelledby="process-heading" className="reveal bg-white py-20 sm:py-28">
        <Container>
          <h2 id="process-heading" className="max-w-5xl text-balance">
            How a project moves from enquiry to handover
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-text-body">
            The sequence below is the usual pattern. Each service page describes the steps for that scope.
          </p>
          <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SingleLineDiagram className="text-primary" />
            </div>
            <ol className="border-l-4 border-technical pl-8 md:pl-12">
              {processSteps.map((step) => (
                <li key={step.title} className="relative pb-12 last:pb-0">
                  <span aria-hidden="true" className="absolute -left-[2.85rem] top-2 h-4 w-4 bg-technical md:-left-[3.85rem]" />
                  <h3 className="text-2xl">{step.title}</h3>
                  <p className="mt-2 text-lg text-text-body">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Projects */}
      <section id="projects" aria-labelledby="projects-heading" className="reveal bg-surface py-20 sm:py-28">
        <Container>
          <h2 id="projects-heading" className="max-w-5xl text-balance">
            Recent portfolio highlights
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-text-body">
            Client names are withheld until permission is confirmed. Each record shows the scope, sector and location.
          </p>
          <ul className="mt-14 grid gap-6">
            {featured.map((project) => (
              <li key={project.id} className="bg-white">
                <Link
                  to={`/projects/${project.slug}`}
                  className="group grid gap-4 p-6 no-underline md:grid-cols-[1.6fr_1fr_auto] md:items-center md:gap-10 md:p-10"
                >
                  <div>
                    <p className="text-sm font-semibold text-technical">{categoryLabels[project.category]}</p>
                    <h3 className="mt-2 text-xl group-hover:text-accent-dark md:text-2xl">{projectDisplayName(project)}</h3>
                    <p className="mt-3 text-text-primary">{project.scope}</p>
                  </div>
                  <p className="text-text-body">
                    {sectorLabels[project.sector]}
                    <br />
                    {project.location}
                  </p>
                  {project.voltage !== 'Not stated' || project.rating ? (
                    <p className="font-heading text-3xl font-bold tabular-nums text-primary md:text-right">
                      {project.voltage !== 'Not stated' ? project.voltage : null}
                      {project.rating ? <span className="block text-base font-semibold text-text-body">{project.rating}</span> : null}
                    </p>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link to="/projects" className="btn btn-outline">
              View all {projects.length} projects
            </Link>
          </div>
        </Container>
      </section>

      {/* Manufacturing: the company's own panel unit */}
      <section id="manufacturing" aria-labelledby="manufacturing-heading" className="reveal bg-white py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {panelPhoto && (
            <img
              src={panelPhoto.src}
              alt={panelPhoto.alt}
              width={panelPhoto.width}
              height={panelPhoto.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          )}
          <div>
            <h2 id="manufacturing-heading" className="text-balance">
              Panels built in our own unit since 2022
            </h2>
            <p className="mt-6 text-lg text-text-body">
              Fabrication, assembly and inspection stay under our control. That reduces dependency on external suppliers and
              keeps MCC and PCC panels built to the client&rsquo;s single-line diagram and load schedule.
            </p>
            <div className="mt-10">
              <Link to="/services/electrical-panels" className="btn btn-outline">
                Electrical panel manufacturing
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section id="industries" aria-labelledby="industries-heading" className="reveal bg-surface py-20 sm:py-28">
        <Container>
          <h2 id="industries-heading" className="max-w-5xl text-balance">
            Sectors in our portfolio
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-text-body">
            Electrical requirements differ by sector. The notes below summarise the typical scope in each.
          </p>
          <ul className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {sectorCounts.map(({ sector, count }) => (
              <li key={sector} className="border-l-4 border-technical pl-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-2xl">{sectorLabels[sector]}</h3>
                  <Link to={`/projects?sector=${sector}`} className="font-semibold text-technical hover:underline">
                    {count} {count === 1 ? 'project' : 'projects'}
                  </Link>
                </div>
                <p className="mt-3 text-text-body">{sectorRequirements[sector]}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-text-body">
            Projects are located across Gujarat and in {regionLabels['other-india']} and {regionLabels.international} as listed
            in the portfolio.
          </p>
        </Container>
      </section>

      {/* Clients: logos as published on the clientele list. Use needs written permission (see docs). */}
      <section id="clients" aria-labelledby="clients-heading" className="reveal bg-white py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 id="clients-heading" className="text-balance">
                Clients we have worked with
              </h2>
              <p className="mt-6 text-lg text-text-body">
                {clientLogos.length} organisations from chemicals, pharmaceuticals, textiles, manufacturing and public utilities.
              </p>
            </div>
            <Link to="/clients" className="btn btn-outline shrink-0">
              View all clients
            </Link>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
            {featuredClientLogos.map((client) => (
              <li key={client.src} className="flex aspect-[3/2] items-center justify-center bg-surface p-5">
                <img src={client.src} alt={client.name} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Quality and compliance */}
      <section id="compliance" aria-labelledby="compliance-heading" className="reveal bg-surface py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 id="compliance-heading" className="text-balance">
              Registrations and approvals
            </h2>
            <p className="mt-6 text-lg text-text-body">
              Registrations and approvals listed on the company website. Details are on the certifications page.
            </p>
            <div className="mt-10">
              <Link to="/certifications" className="font-semibold text-technical hover:underline">
                Certifications and approvals
              </Link>
            </div>
          </div>
          <ul className="space-y-10">
            {certifications.map((item) => (
              <li key={item.id} className="border-l-4 border-technical pl-6">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-2 text-text-body">{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Planning an electrical infrastructure project?"
        description="Submit your requirements, single-line diagram or BOQ for engineering review."
      />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-3 text-base leading-snug text-text-body">{label}</dt>
      <dd className="font-heading text-5xl font-bold tabular-nums text-primary">{value}</dd>
    </div>
  );
}
