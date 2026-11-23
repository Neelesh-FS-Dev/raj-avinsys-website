import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { companyConfig } from '../../data/companyConfig';

const POSTER = '/media/posters/hero-poster.webp';
const POSTER_SRCSET = '/media/posters/hero-poster-960.webp 960w, /media/posters/hero-poster.webp 1920w';
// Web encodes: 720p, no audio (the hero is always muted). Originals stay in public/media/videos.
const VIDEO_WEBM = '/media/videos/hero-720.webm';
const VIDEO_MP4 = '/media/videos/hero-720.mp4';

/**
 * The hero video is about 15 MB, so it only loads on large screens where motion is allowed.
 * Phones and reduced-motion users get the poster photograph, which is the same authentic site image.
 */
function useHeroVideoAllowed(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(wide.matches && !calm.matches);
    update();
    wide.addEventListener('change', update);
    calm.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      calm.removeEventListener('change', update);
    };
  }, []);

  return allowed;
}

export function HomeHero() {
  const showVideo = useHeroVideoAllowed();

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-primary text-white">
      {/* Background media. Decorative: the headline carries the message. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src={POSTER}
          srcSet={POSTER_SRCSET}
          sizes="100vw"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[68%_center]"
        />
        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={VIDEO_WEBM} type="video/webm" />
            <source src={VIDEO_MP4} type="video/mp4" />
          </video>
        )}
        <div className="hero-scrim absolute inset-0" />
      </div>

      <Container className="relative flex min-h-[min(92svh,52rem)] flex-col justify-end pb-12 pt-32 sm:pb-16">
        <h1 id="hero-heading" className="text-balance text-[clamp(2.25rem,6vw,5rem)] text-white">
          Reliable power for Gujarat&rsquo;s industry
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
          Turnkey HT/LT electrification, 66 kV and 220 kV switchyards, MCC and PCC panels, and sandwich busways for
          chemical, pharmaceutical, textile and manufacturing plants.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/rfq" className="btn btn-primary min-h-12 px-6 text-base">
            Request a project quotation
          </Link>
          <a href="#capabilities" className="btn btn-secondary min-h-12 px-6 text-base">
            Explore capabilities
          </a>
        </div>

        <p className="mt-10 text-base text-white/85">
          Call{' '}
          <a href={companyConfig.contact.phoneHref} className="font-semibold text-white underline underline-offset-4 hover:no-underline">
            {companyConfig.contact.phoneDisplay}
          </a>{' '}
          · {companyConfig.contact.hoursDisplay}
        </p>
      </Container>
    </section>
  );
}
