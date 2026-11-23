import { Link } from 'react-router-dom';
import { companyConfig } from '../../data/companyConfig';
import { footerNav } from '../../data/navigation';

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-accent bg-primary-dark text-white">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <section aria-labelledby="footer-company">
          <h2 id="footer-company" className="font-heading text-xl font-bold uppercase tracking-wide text-white">
            {companyConfig.legalName}
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Formerly {companyConfig.formerName}. Part of the {companyConfig.groupName}.
          </p>
          <p className="mt-3 text-sm text-white/80">Established {companyConfig.foundedYear}, {companyConfig.foundedIn}.</p>
        </section>

        <section aria-labelledby="footer-offices">
          <h2 id="footer-offices" className="text-base font-semibold text-accent">
            Offices
          </h2>
          <address className="mt-3 not-italic text-sm leading-relaxed text-white/85">
            <strong className="text-white">Head office, {companyConfig.headOffice.city}</strong>
            <br />
            {companyConfig.headOffice.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-3 text-sm text-white/85">
            Branch offices: {companyConfig.branchOffices.map((branch) => branch.city).join(', ')}
          </p>
        </section>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" className="text-base font-semibold text-accent">
            Contact
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li>
              <a href={companyConfig.contact.phoneHref} className="hover:underline">
                {companyConfig.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${companyConfig.contact.email}`} className="hover:underline">
                {companyConfig.contact.email}
              </a>
            </li>
            <li>{companyConfig.contact.hoursDisplay}</li>
          </ul>
        </section>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-6">
          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className="text-base font-semibold text-accent">{group.heading}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-white/85 hover:text-white hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div>
        <div className="mx-auto flex max-w-page flex-col gap-2 px-4 py-5 text-xs text-white/70 sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {companyConfig.copyrightYear} {companyConfig.legalName} (formerly {companyConfig.formerName}). All rights reserved.
          </p>
          <p>Electrical EPC · Switchyards · Panels · Busways · Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
}
