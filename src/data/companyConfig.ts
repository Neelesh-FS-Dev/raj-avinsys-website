/**
 * Centralised company data. Only facts that are consistent across the existing
 * website and not placeholders are published here. The reasoning for every
 * excluded or unconfirmed item lives in docs/CONTENT_VERIFICATION_REPORT.md.
 */
export const companyConfig = {
  legalName: 'Raj Avinsys Pvt Ltd',
  formerName: 'Raj Electricals',
  groupName: 'Raj Group of Companies',
  foundedYear: 2004,
  foundedIn: 'Surat, Gujarat',
  description:
    'Raj Avinsys Pvt Ltd is an electrical contracting and EPC company operating in Gujarat, India. We deliver turnkey HT/LT electrification, switchyard works up to 220 kV, electrical panel manufacturing, sandwich busway systems, retrofitting and utility services, and statutory liaising.',
  copyrightYear: 2026,
  headOffice: {
    city: 'Surat',
    addressLines: [
      'Raj Cluster, Plot No. 2, 2nd Floor',
      'Mali ni Wadi, Near Sarin Technologies Press',
      'A K Road, Surat 395008',
      'Gujarat, India',
    ],
    postalCode: '395008',
  },
  branchOffices: [
    { city: 'Vapi', state: 'Gujarat' },
    { city: 'Ankleshwar', state: 'Gujarat' },
  ],
  contact: {
    phoneDisplay: '0261-2551273',
    phoneHref: 'tel:+912612551273',
    email: 'info@rajgrouponline.com',
    hoursDisplay: 'Monday to Saturday, 9:00 AM – 6:00 PM',
  },
  /** Company-stated figure, attributed to maintenance services only. */
  maintenanceRetentionPercent: 73,
  website: 'https://www.rajgrouponline.com',
} as const;

export type CompanyConfig = typeof companyConfig;
