import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { CtaBand } from '../../components/ui/CtaBand';
import { Container } from '../../components/ui/Container';
import { PageHero } from '../../components/ui/PageHero';
import { companyConfig } from '../../data/companyConfig';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const lifePhotos = [
  {
    src: '/media/careers/life-1.png',
    width: 1600,
    height: 1066,
    alt: 'A group of women employees at an inspiring seminar and training session',
    title: 'Women’s seminar and training session',
    text: 'A group of talented women came together for an inspiring seminar filled with learning, collaboration and positivity. The event reflected our commitment to growth, empowerment and teamwork.',
  },
  {
    src: '/media/careers/life-2.png',
    width: 676,
    height: 503,
    alt: 'Team members gathered around a cake being cut at work',
    title: 'Celebrations at work',
    text: 'Whether it’s birthdays, milestones or special moments, we celebrate together. Small gatherings like cake-cuttings bring joy, strengthen bonds, and remind us that every achievement is worth cherishing.',
  },
  {
    src: '/media/careers/life-3.png',
    width: 1024,
    height: 583,
    alt: 'Team members with the Indian national flag at an Independence Day celebration',
    title: 'Festive and cultural spirit',
    text: 'We proudly celebrate India’s rich culture and traditions. Events like Independence Day bring the team together, fostering unity, pride and a strong sense of belonging.',
  },
  {
    src: '/media/careers/life-4.png',
    width: 637,
    height: 357,
    alt: 'Team members with potted plants during a plantation drive',
    title: 'Green initiatives',
    text: 'We encourage sustainable practices and team-driven activities such as plantation drives. These moments connect us with nature, build teamwork and reflect our commitment to a greener tomorrow.',
  },
  {
    src: '/media/careers/life-5.png',
    width: 1600,
    height: 1066,
    alt: 'Team members in sports kit on a grass ground at the annual sports event',
    title: 'Sports and team bonding',
    text: 'Our annual sports events highlight the power of teamwork, discipline and healthy competition. Beyond work, these activities build lasting friendships and a culture of collaboration.',
  },
] as const;

const culture = [
  {
    title: 'Work-life balance',
    text: 'True success comes from living a balanced life. Our culture promotes the right mix of professional challenges, recreation and relaxation.',
  },
  {
    title: 'Workplace engagement',
    text: 'We view our team as a family, coming together for regular engagement events that build camaraderie and a sense of belonging.',
  },
  {
    title: 'Career growth',
    text: 'Through training programmes, workshops and mentorship, we help our people sharpen existing skills and develop new ones. High performers and proactive individuals are recognised and given opportunities to advance.',
  },
  {
    title: 'Diversity at work',
    text: 'With people from varied cultures, backgrounds and experiences, every individual brings a perspective that enriches our workplace.',
  },
] as const;

export function CareersPage() {
  useDocumentMeta({
    title: 'Careers',
    description: 'Life at Raj Avinsys: culture, training, celebrations and the company’s equal opportunity commitment.',
    path: '/careers',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Careers' }]} />
      <PageHero
        title="Powering industries and people"
        description="Our culture promotes teamwork, diversity and continuous growth, with regular events, training programmes and a supportive work environment."
      />

      <Container className="space-y-20 py-16">
        <section aria-labelledby="life-heading">
          <h2 id="life-heading" className="text-3xl md:text-4xl">
            Life at Raj Avinsys
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {lifePhotos.map((item) => (
              <li key={item.src}>
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <h3 className="mt-6 text-2xl">{item.title}</h3>
                <p className="mt-3 text-lg text-text-body">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="culture-heading" className="bg-surface p-8 md:p-14">
          <h2 id="culture-heading" className="text-3xl md:text-4xl">
            How we work together
          </h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-2">
            {culture.map((item) => (
              <li key={item.title} className="border-l-4 border-technical pl-6">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-3 text-lg text-text-body">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="equal-heading" className="max-w-4xl">
          <h2 id="equal-heading" className="text-3xl md:text-4xl">
            Equal opportunity employer
          </h2>
          <div className="mt-8 space-y-5 text-lg text-text-body">
            <p>
              Raj Avinsys is proud to be an equal opportunity employer. We are committed to eliminating discrimination in all
              forms, whether based on age, gender, ability, nationality or religion, and to fostering a culture of fairness,
              dignity and respect.
            </p>
            <p>
              We believe in equal pay for equal work and in assessing performance purely on merit. The company does not
              distinguish between caste, creed, colour or race, and expects all employees to treat everyone with the same dignity
              and respect.
            </p>
            <p>
              All policies and practices of the company are applied equally to all employees, and our leaders are expected to
              keep performance assessments objective and transparent.
            </p>
          </div>
        </section>

        <section aria-labelledby="apply-heading" className="max-w-4xl">
          <h2 id="apply-heading" className="text-3xl md:text-4xl">
            Get in touch
          </h2>
          <p className="mt-8 text-lg text-text-body">
            To write to us about a role or to send your CV, email{' '}
            <a className="font-semibold text-technical underline" href={`mailto:${companyConfig.contact.email}`}>
              {companyConfig.contact.email}
            </a>{' '}
            or call{' '}
            <a className="font-semibold text-technical underline" href={companyConfig.contact.phoneHref}>
              {companyConfig.contact.phoneDisplay}
            </a>{' '}
            ({companyConfig.contact.hoursDisplay}).
          </p>
        </section>
      </Container>

      <CtaBand title="Looking for an electrical contractor?" description="Submit your requirements, single-line diagram or BOQ for engineering review." />
    </>
  );
}
