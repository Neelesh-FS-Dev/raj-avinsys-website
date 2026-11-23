import type { Service } from '../types/content';

/**
 * Service content is derived from the company's existing service pages.
 * Specifications list only parameters the company states it works with.
 * No standards, ratings or type-test claims are added beyond the source.
 */
export const services: readonly Service[] = [
  {
    slug: 'turnkey-electrification',
    title: 'Turnkey HT/LT Electrification',
    summary: 'End-to-end HT and LT electrification of greenfield and brownfield industrial plants, from design to commissioning.',
    metaDescription:
      'Turnkey HT/LT electrification for industrial plants in Gujarat: design, supply, installation, testing and commissioning by Raj Avinsys.',
    overview: [
      'Turnkey electrification covers the full electrical scope of a new or expanded plant: incoming HT supply, transformers, HT and LT distribution, and final connection of process load.',
      'Our portfolio includes greenfield and brownfield electrification for chemical, pharmaceutical, textile, glass and manufacturing plants across Gujarat and neighbouring states.',
    ],
    scope: [
      'Supply, installation, testing and commissioning of HT and LT distribution',
      'HT electrification including government approvals and liaising where required',
      'LT panel supply and cable laying',
      'Brownfield expansion work while the existing plant remains operational',
    ],
    specifications: [
      { label: 'Supply levels handled', value: 'HT and LT distribution' },
      { label: 'Project types', value: 'Greenfield, brownfield and plant expansion' },
      { label: 'Deliverables', value: 'Installation, testing and commissioning records' },
    ],
    executionSteps: [
      'Requirement review and site survey',
      'Electrical design and approvals',
      'Procurement and panel fabrication',
      'Installation and cable works',
      'Testing and commissioning',
      'Handover',
    ],
    qualityAndSafety: [
      'Testing and commissioning is part of the scope on completed electrification projects.',
    ],
    projectCategory: 'electrification',
    image: { src: '/media/services/turnkey.webp', alt: 'Engineers connecting cables to switchgear in an industrial electrical room', width: 1024, height: 911 },
  },
  {
    slug: 'switchyard-works',
    title: 'Switchyard Works up to 220 kV',
    summary: 'EPC and SITC of 66 kV and 220 kV switchyards, including equipment erection, testing and commissioning.',
    metaDescription:
      'Switchyard EPC up to 220 kV in Gujarat: 66 kV and 220 kV switchyard design, supply, erection, testing and commissioning by Raj Avinsys.',
    overview: [
      'We execute switchyard projects from 11 kV up to 220 kV, covering single-bay and double-bay configurations for industrial feeders and plant substations.',
      'Our switchyard portfolio includes 66 kV EPC projects for chemical and pharmaceutical plants and a 220 kV switchyard erection package on a national transmission corridor.',
    ],
    scope: [
      'EPC and SITC of 66 kV switchyards, including design, engineering, supply, erection, testing and commissioning',
      'Single-bay and double-bay switchyard configurations',
      'Installation of primary equipment, protection and control panels',
      'Cable laying and integration of switchyard equipment',
      'Liaising with the state utility for connection approvals',
    ],
    specifications: [
      { label: 'Voltage levels (company-stated capability)', value: '11 kV, 33 kV, 66 kV, 132 kV, 220 kV' },
      { label: 'Portfolio voltage levels', value: '66 kV and 220 kV' },
      {
        label: 'Equipment handled',
        value: 'Circuit breakers, isolators, CTs, PTs, surge arresters, protection and control panels',
      },
      { label: 'Configurations', value: 'Single-bay and double-bay' },
    ],
    executionSteps: [
      'Layout and single-line diagram review',
      'Civil and structural coordination',
      'Equipment supply and erection',
      'Protection and control integration',
      'Testing and commissioning',
      'Handover and documentation',
    ],
    qualityAndSafety: [
      'Erection and commissioning are carried out on live industrial sites, where plant safety rules apply.',
    ],
    projectCategory: 'switchyard',
    image: { src: '/media/services/earthing.webp', alt: 'Cables laid in a concrete trench beside an open excavation on a site', width: 1024, height: 1024 },
  },
  {
    slug: 'electrical-panels',
    title: 'Electrical Panel Manufacturing',
    summary: 'Design and manufacture of MCC and PCC panels at our own panel manufacturing unit.',
    metaDescription:
      'MCC and PCC electrical panel manufacturing in Gujarat by Raj Avinsys, with in-house fabrication, assembly and inspection.',
    overview: [
      'We have operated our own panel manufacturing unit since 2022, which reduces dependency on external suppliers and keeps fabrication, assembly and inspection under our control.',
      'Panels are built to the client’s single-line diagram and load schedule.',
    ],
    scope: [
      'MCC (motor control centre) panel design and manufacture',
      'PCC (power control centre) panel design and manufacture',
      'LT panel supply for plant and utility distribution',
      'Dispatch and site installation support',
    ],
    specifications: [
      { label: 'Panel types', value: 'MCC and PCC' },
      { label: 'Manufacturing', value: 'In-house fabrication and assembly unit' },
      { label: 'Inputs required', value: 'Single-line diagram, load schedule, panel specification' },
    ],
    executionSteps: [
      'Review of SLD and load schedule',
      'Panel layout and wiring design',
      'Fabrication and busbar assembly',
      'Wiring and internal testing',
      'Dispatch and site installation',
    ],
    qualityAndSafety: [
      'Fabrication and assembly are carried out in our own manufacturing unit.',
    ],
    projectCategory: 'electrification',
    image: { src: '/media/infrastructure/turnkey-up-to-66kv.webp', alt: 'Rows of switchgear panels in a plant, with a technician checking the installation on a handheld device', width: 1024, height: 1024 },
    gallery: [
      { src: '/media/manufacturing/panel-1.webp', alt: 'Motor control panels labelled Pump 01 and Pump 02, with a garland across the switchboard line', width: 1080, height: 1350 },
      { src: '/media/manufacturing/relay-1.webp', alt: 'Switchboard cabinets with a cable duct running overhead', width: 2080, height: 4624 },
      { src: '/media/manufacturing/panel-2.webp', alt: 'Row of grey switchboard cabinets along a wall in a factory bay', width: 1080, height: 1350 },
      { src: '/media/manufacturing/main-test-1.webp', alt: 'Technicians in safety helmets working on circuit breakers in the workshop', width: 1040, height: 780 },
      { src: '/media/manufacturing/main-test-2.webp', alt: 'Technician in a safety helmet operating a circuit breaker beside a switchboard', width: 780, height: 1040 },
      { src: '/media/manufacturing/main-test-3.webp', alt: 'Technician working on a switchgear cubicle with a breaker drawn out', width: 864, height: 1152 },
      { src: '/media/manufacturing/main-test-4.webp', alt: 'Technicians with test equipment and a laptop beside a switchboard line', width: 780, height: 1040 },
      { src: '/media/manufacturing/relay-2.webp', alt: 'Row of switchboard cabinets under a steel cable duct, with control panels', width: 1440, height: 1080 },
      { src: '/media/manufacturing/relay-3.webp', alt: 'Capacitor banks and wired control gear inside a switchboard cubicle', width: 2296, height: 2116 },
    ],
  },
  {
    slug: 'sandwich-busways',
    title: 'Sandwich Busways',
    summary: 'Supply, installation and commissioning of aluminium and copper sandwich busway (BBT) systems up to 6300 A.',
    metaDescription:
      'Aluminium and copper sandwich busway (busbar trunking) systems up to 6300 A, supplied and installed by Raj Avinsys across Gujarat and India.',
    overview: [
      'Sandwich busways (busbar trunking, BBT) carry high current from the incoming panel to process areas with fewer joints and a smaller footprint than cabling.',
      'Our busway work covers aluminium and copper systems across chemical, pharmaceutical and manufacturing plants.',
    ],
    scope: [
      'Supply, installation, testing and commissioning (SITC) of aluminium busways',
      'Supply and installation of copper busways',
      'Plug-in busway for production lines',
      'Engineering and supply of sandwich busway systems',
    ],
    specifications: [
      { label: 'Conductor material', value: 'Aluminium and copper' },
      { label: 'Current ratings executed', value: '250 A to 6300 A' },
      { label: 'Installation types', value: 'Fixed and plug-in' },
    ],
    executionSteps: [
      'Route survey and busway layout',
      'Supply and dispatch',
      'Installation and joint assembly',
      'Insulation and continuity testing',
      'Commissioning',
    ],
    qualityAndSafety: [
      'Installation includes testing and commissioning of the busway run.',
    ],
    projectCategory: 'busway',
    image: { src: '/media/services/cabling.webp', alt: 'Overhead cable trays carrying coloured power cables above switchboards', width: 1024, height: 1024 },
  },
  {
    slug: 'retrofitting-utility',
    title: 'Electrical Retrofitting & Utility Services',
    summary: 'Upgrading and maintaining existing electrical installations while plants remain in operation.',
    metaDescription:
      'Electrical retrofitting, modification and utility services for operating industrial plants in Gujarat by Raj Avinsys.',
    overview: [
      'Retrofitting upgrades ageing electrical installations without stopping the whole plant. Work is scheduled in planned shutdowns or carried out section by section.',
      'Our maintenance services support recurring customers, with a company-stated client retention rate of 73% for maintenance work.',
    ],
    scope: [
      'Retrofitting of existing LT and HT installations',
      'Modification of internal cabling and wiring',
      'Utility electrical services and maintenance',
    ],
    specifications: [
      { label: 'Working mode', value: 'Live plant, planned shutdowns' },
      { label: 'Scope', value: 'Retrofitting, modification and maintenance' },
    ],
    executionSteps: [
      'Condition survey of the existing installation',
      'Shutdown and work-permit planning',
      'Retrofit execution',
      'Testing and re-energisation',
    ],
    qualityAndSafety: [
      'Retrofit work on operating plants is planned around the client’s shutdown windows.',
    ],
    projectCategory: 'electrification',
    image: { src: '/media/services/electrical-renovation-retrofitting.webp', alt: 'Technician testing wiring in an electrical distribution panel with a multimeter', width: 1024, height: 1024 },
  },
  {
    slug: 'liaising-compliance',
    title: 'Liaising & Compliance Services',
    summary: 'Statutory liaising with the state utility and electrical inspectorate for connections and approvals.',
    metaDescription:
      'Statutory liaising and electrical compliance support for industrial connections in Gujarat, by Raj Avinsys.',
    overview: [
      'Connection approvals, inspections and statutory paperwork often take longer than the electrical work itself. We handle the liaising so that project timelines are not held up by approvals.',
      'Our portfolio includes approvals and metering work carried out with the state utility (GETCO and DGVCL).',
    ],
    scope: [
      'Liaising with the state transmission and distribution utilities',
      'Preparation of statutory documents for electrical connections',
      'Metering and CT replacement liaising',
      'Support for electrical inspection and approval processes',
    ],
    specifications: [
      { label: 'Authorities engaged', value: 'State utilities and electrical inspectorate, as applicable' },
    ],
    executionSteps: [
      'Review of approval requirements',
      'Document preparation and submission',
      'Inspection coordination',
      'Approval tracking and handover',
    ],
    qualityAndSafety: [
      'Statutory liaising is handled by our team alongside the electrical scope.',
    ],
    projectCategory: 'consultancy',
  },
] as const;

export function getServiceBySlug(slug: string | undefined): Service | undefined {
  return services.find((service) => service.slug === slug);
}
