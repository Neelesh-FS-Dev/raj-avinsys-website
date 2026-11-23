import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { companyConfig } from '../../data/companyConfig';
import { primaryNav, serviceNav } from '../../data/navigation';

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesPanelId = useId();
  const location = useLocation();

  // Close every menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Escape closes the open menu and returns focus to its trigger.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      if (servicesOpen) {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
      if (mobileOpen) setMobileOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [servicesOpen, mobileOpen]);

  // Click outside the services menu closes it.
  useEffect(() => {
    if (!servicesOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [servicesOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 text-[0.9375rem] font-semibold transition-colors ${
      isActive ? 'text-accent-dark' : 'text-primary hover:text-accent-dark'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-sm sm:px-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href={companyConfig.contact.phoneHref} className="font-mono tabular-nums hover:underline">
              {companyConfig.contact.phoneDisplay}
            </a>
            <a href={`mailto:${companyConfig.contact.email}`} className="hover:underline">
              {companyConfig.contact.email}
            </a>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <span className="text-white/80">
              {companyConfig.headOffice.city} head office · {companyConfig.branchOffices.map((b) => b.city).join(', ')}
            </span>
            <Link to="/contact" className="font-semibold hover:underline">
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img
            src="/media/branding/logo.png"
            alt=""
            width={590}
            height={496}
            decoding="async"
            className="h-12 w-auto shrink-0 sm:h-14"
          />
          <span className="leading-tight">
            <span className="block font-heading text-xl font-bold uppercase tracking-wide text-primary">
              Raj Avinsys
            </span>
            <span className="block text-xs text-text-secondary">Electrical EPC · Gujarat</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li className="relative" ref={servicesRef}>
              <button
                ref={servicesButtonRef}
                type="button"
                aria-expanded={servicesOpen}
                aria-controls={servicesPanelId}
                onClick={() => setServicesOpen((open) => !open)}
                className={`${navLinkClass({ isActive: location.pathname.startsWith('/services') })} flex items-center gap-1`}
              >
                Services
                <span aria-hidden="true" className="text-xs">
                  {servicesOpen ? '▴' : '▾'}
                </span>
              </button>
              {servicesOpen && (
                <div
                  id={servicesPanelId}
                  className="absolute left-0 top-full mt-1 w-80 border border-border border-t-4 border-t-accent bg-white p-3 shadow-lg"
                >
                  <ul className="flex flex-col">
                    {serviceNav.map((item) => (
                      <li key={item.to}>
                        <Link to={item.to} className="block rounded-sm px-3 py-2 text-sm text-primary hover:bg-surface hover:text-accent-dark">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 border-t border-border pt-2">
                    <Link to="/services" className="block px-3 py-2 text-sm font-semibold text-technical">
                      All services
                    </Link>
                  </div>
                </div>
              )}
            </li>
            <li>
              <NavLink to="/projects" className={navLinkClass}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/industries" className={navLinkClass}>
                Industries
              </NavLink>
            </li>
            <li>
              <NavLink to="/certifications" className={navLinkClass}>
                Certifications
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/rfq" className="btn btn-primary hidden sm:inline-flex">
            Request Project Quotation
          </Link>
          <button
            type="button"
            className="btn btn-outline lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-white lg:hidden">
          <ul className="flex flex-col px-4 py-2">
            {primaryNav.map((item) => (
              <li key={item.to} className="border-b border-border">
                <NavLink to={item.to} end={item.to === '/'} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="border-b border-border">
              <span className="block px-3 pt-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">Services</span>
              <ul>
                {serviceNav.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className={navLinkClass}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="px-4 pb-5 pt-3">
            <Link to="/rfq" className="btn btn-primary w-full">
              Request Project Quotation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
