export type NavItem = {
  readonly id: string;
  readonly label: string;
};

export type Stat = {
  readonly value: string;
  readonly label: string;
};

export type SkillCategory = 'engineering' | 'data' | 'infrastructure' | 'product';

export type Skill = {
  readonly name: string;
  /** Self-assessed confidence, 0–100. */
  readonly level: number;
};

export type SkillGroup = {
  readonly title: string;
  readonly summary: string;
  readonly category: SkillCategory;
  readonly skills: readonly Skill[];
};

export type ProjectCategory = 'web' | 'mobile' | 'data' | 'systems';

export type ProjectFilter = { readonly value: ProjectCategory | 'all'; readonly label: string };

export type Experience = {
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly location: string;
  readonly highlights: readonly string[];
  readonly current?: boolean;
};

export type Project = {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly category: ProjectCategory;
  readonly url?: string;
  readonly linkLabel: string;
  readonly featured?: boolean;
};

export type Education = {
  readonly qualification: string;
  readonly institution: string;
  readonly period: string;
  readonly detail?: string;
};

export type Certification = {
  readonly name: string;
  readonly issuer: string;
  readonly issued: string;
  readonly focus: SkillCategory;
  /** Public credential link, omit when the certificate is offline only. */
  readonly url?: string;
};

export type ContactLink = {
  readonly label: string;
  readonly value: string;
  readonly href: string;
  readonly icon: 'envelope' | 'github' | 'linkedin' | 'phone';
  /** Tooltip and accessible name for the icon-only link. */
  readonly title: string;
};

export const PROFILE = {
  name: 'Fatma Nassib Abdallah',
  shortName: 'Fatma Nassib',
  initials: 'FN',
  title: 'Software Engineer',
  location: 'Dar es Salaam, Tanzania',
  email: 'abdallah.nassib.fatma@gmail.com',
  phone: '+255 616 432 464',
  phoneHref: 'tel:+255616432464',
  linkedin: 'https://www.linkedin.com/in/fatma-abdallah-21665b277',
  github: 'https://github.com/2023-04-00047',
  availability: 'Open to graduate and junior engineering roles',
  /** Relative path to the CV inside `public/`. Empty disables the download button. */
  cvFile: '',
} as const;

export const IMAGES = {
  /** Full-bleed hero landscape (served from public/). */
  meadow: 'images/meadow.jpg',
  /** Small editorial thumbnail dropped inline into display type. */
  portrait: 'images/portrait.jpg',
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
];

export const HERO = {
  eyebrow: 'Computer Science Graduate · University of Dar es Salaam',
  greeting: 'Hi, I’m Fatma Nassib.',
  roles: 'Software Engineer · Full-Stack Developer · Data Platforms',
  bio: 'I build dependable web applications and data-driven systems. From Angular modules on a live national health platform to service-oriented backends and admin dashboards.',
  /** Light-theme hero: stamped headline broken into fixed lines. */
  headline: ['Building', 'software', 'that carries'],
  headlineTail: 'weight.',
} as const;

export const ABOUT_TEXT =
  'I recently completed a BSc in Computer Science at the University of Dar es Salaam and now work across the full stack: Angular and Next.js on the front end, Node.js, Fastify and PostgreSQL on the back end. Alongside product work I bring practical IT infrastructure experience from the Tanzania Revenue Authority and a strong grounding in security, which helps me build systems that are not only useful but maintainable and safe.';

export const STATS: readonly Stat[] = [
  { value: '2026', label: 'BSc Computer Science' },
  { value: '05', label: 'Professional roles' },
  { value: '07', label: 'Certifications' },
  { value: '03', label: 'Shipped products' },
];

export const EXPERIENCE: readonly Experience[] = [
  {
    role: 'Assistant IT & Conference Technology Lead',
    company: 'PAYCON AFRICA',
    period: 'Apr 2026 – Present',
    location: 'Addis Ababa, Ethiopia · Remote',
    current: true,
    highlights: [
      'Support conference technology operations and digital coordination for a pan-African payments platform.',
      'Assist with technical planning, participant systems and live event technology to keep sessions running to schedule.',
    ],
  },
  {
    role: 'Developer & Project Manager',
    company: 'Youth Team Up, EU Erasmus+ Diverse Grow',
    period: 'Jul 2025 – Jun 2026',
    location: 'Remote',
    highlights: [
      'Managed end-to-end delivery of the Diverse Grow initiative, coordinating a cross-functional, multi-country youth team against fixed milestones.',
      'Built and maintained the Angular platform, delivering engagement and resource-sharing features for an international cohort.',
    ],
  },
  {
    role: 'Software Developer Trainee',
    company: 'District Health Information Software (DHIS2)',
    period: 'Jul 2025 – Sep 2025',
    location: 'Dar es Salaam, Tanzania',
    highlights: [
      'Led design and development of custom DHIS2 Angular modules that streamlined district-level health reporting across facilities.',
      'Built a Tracker Data Quality Analysis application consuming the DHIS2 REST API and surfacing data-quality issues on a dashboard for staff to resolve.',
    ],
  },
  {
    role: 'IT Technician Trainee',
    company: 'Tanzania Revenue Authority (TRA)',
    period: 'Jul 2024 – Sep 2024',
    location: 'Dar es Salaam, Tanzania',
    highlights: [
      'Diagnosed and resolved hardware and software faults across workstations and peripherals, reducing equipment downtime.',
      'Configured and maintained LAN infrastructure, keeping connectivity stable across the department.',
    ],
  },
  {
    role: 'ICT Mentor',
    company: 'Help to Help, TGEE IT Bootcamp',
    period: 'Mar 2026 – Apr 2026',
    location: 'Dar es Salaam, Tanzania',
    highlights: [
      'Delivered structured ICT training on digital literacy, internet safety and introductory programming for youth participants.',
      'Mentored students individually on academic and career pathways into technology.',
    ],
  },
];

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: 'Frontend',
    summary: 'Production interfaces and component architecture',
    category: 'engineering',
    skills: [
      { name: 'Angular', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript', level: 88 },
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 78 },
      { name: 'Flutter', level: 75 },
      { name: 'React Native', level: 72 },
    ],
  },
  {
    title: 'Backend & APIs',
    summary: 'Services, integrations and business logic',
    category: 'engineering',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Fastify', level: 82 },
      { name: 'REST APIs', level: 85 },
      { name: 'Python', level: 78 },
      { name: 'Java', level: 75 },
      { name: 'PHP', level: 70 },
    ],
  },
  {
    title: 'Data & Databases',
    summary: 'Schema design, queries and data quality',
    category: 'data',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'SQL', level: 88 },
      { name: 'PostGIS', level: 75 },
      { name: 'MySQL', level: 78 },
      { name: 'Redis', level: 72 },
      { name: 'Kafka', level: 70 },
    ],
  },
  {
    title: 'Infrastructure & Security',
    summary: 'Deployment, networking and defensive practice',
    category: 'infrastructure',
    skills: [
      { name: 'Docker', level: 78 },
      { name: 'Git & GitHub', level: 90 },
      { name: 'Linux / Unix', level: 80 },
      { name: 'LAN Configuration', level: 78 },
      { name: 'IT Support', level: 85 },
      { name: 'Cybersecurity', level: 75 },
    ],
  },
  {
    title: 'Delivery & Leadership',
    summary: 'How I work with people and projects',
    category: 'product',
    skills: [
      { name: 'Agile Delivery', level: 82 },
      { name: 'Project Management', level: 85 },
      { name: 'Technical Training', level: 88 },
      { name: 'Mentorship', level: 88 },
      { name: 'Communication', level: 90 },
    ],
  },
];

export const PROJECT_FILTERS: readonly ProjectFilter[] = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'data', label: 'Data' },
  { value: 'systems', label: 'Systems' },
];

export const PROJECTS: readonly Project[] = [
  {
    title: 'Rishfy',
    subtitle: 'Ride-sharing platform · Final Year Project',
    description:
      'A ride-sharing platform for Tanzanian commuters built around the D5 regulatory framework: a service-oriented backend of seven microservices, a Flutter mobile app and a Next.js admin dashboard.',
    stack: ['TypeScript', 'Node.js', 'Fastify', 'PostgreSQL', 'PostGIS', 'Redis', 'Kafka', 'Docker'],
    category: 'systems',
    url: 'https://github.com/godblesskaaya/rishfy',
    linkLabel: 'View on GitHub',
    featured: true,
  },
  {
    title: 'Diverse Grow Platform',
    subtitle: 'Youth Team Up · EU Erasmus+',
    description:
      'Angular platform connecting farm suppliers, farmers, middlemen, buyers, sellers and transporters across an international youth cohort. Delivered as developer and project manager.',
    stack: ['Angular', 'TypeScript', 'Agile Delivery'],
    category: 'web',
    url: 'https://diverse-grow-vfinal.vercel.app',
    linkLabel: 'View live site',
  },
  {
    title: 'Tracker Data Quality Analysis',
    subtitle: 'DHIS2 · Field training project',
    description:
      'Angular application connected to the DHIS2 REST API that pulls tracker records from health facilities, checks them for quality issues and surfaces problems on an actionable dashboard.',
    stack: ['Angular', 'DHIS2 REST API', 'TypeScript'],
    category: 'data',
    linkLabel: 'Enterprise internal tool',
  },
  {
    title: 'UniSupport',
    subtitle: 'University support assistant',
    description:
      'A university support assistant built as a university project. It answers student questions about courses, registration and campus services, trained on university documentation to give fast, accurate responses.',
    stack: ['Python', 'Machine Learning', 'Flask', 'JavaScript'],
    category: 'web',
    url: 'https://unisupport.rejoda.co.tz/',
    linkLabel: 'View live site',
  },
];

export const INTERESTS: readonly string[] = [
  'Travel Photography',
  'Open Source',
  'Cybersecurity',
  'Data Engineering',
  'Mentoring',
  'UI/UX Design',
  'Community Tech Events',
];

export const EDUCATION: readonly Education[] = [
  {
    qualification: 'BSc Computer Science',
    institution: 'University of Dar es Salaam, College of ICT',
    period: 'Graduated 2026',
    detail: 'Final year project: Rishfy, a service-oriented ride-sharing platform.',
  },
  {
    qualification: 'Advanced Certificate of Secondary Education (A-Level)',
    institution: 'RoNeCa Girls High School',
    period: '2023',
  },
  {
    qualification: 'Certificate of Secondary Education (O-Level)',
    institution: 'RoNeCa Girls Secondary School',
    period: '2020',
  },
];

export const CERTIFICATIONS: readonly Certification[] = [
  { name: 'CCNA', issuer: 'University of Dar es Salaam / African Child Projects', issued: 'May 2025', focus: 'infrastructure' },
  { name: 'Red and Blue Teaming Strategies for Fortified Defense', issuer: 'CyberCode Africa', issued: 'May 2025', focus: 'infrastructure' },
  { name: 'Digital Privacy and Security Culture', issuer: 'CyberCode Security', issued: 'Dec 2025', focus: 'infrastructure' },
  { name: 'Social Engineering Defense', issuer: 'CyberCode Security', issued: 'Dec 2025', focus: 'infrastructure' },
  { name: 'Data Analytics Essentials / Introduction to Data Science', issuer: 'African Child Projects', issued: '2025', focus: 'data' },
  { name: 'ICT Skills Mentor', issuer: 'Help to Help Foundation', issued: 'Apr 2026', focus: 'product' },
  { name: 'Web Development Certificate', issuer: 'Power Learn Project (PLP)', issued: '2024', focus: 'engineering' },
];

export const LEADERSHIP: readonly string[] = [
  'Imbeju Smart-Elite Ambassador, CRDB Foundation · Feb 2026 – Present',
  'Cybersecurity Ambassador, CyberCode Africa · 2026',
];

export const CONTACT_LINKS: readonly ContactLink[] = [
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: 'envelope', title: `Email ${PROFILE.shortName}` },
  { label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref, icon: 'phone', title: `Call ${PROFILE.phone}` },
  { label: 'LinkedIn', value: 'fatma-abdallah', href: PROFILE.linkedin, icon: 'linkedin', title: 'LinkedIn profile' },
  { label: 'GitHub', value: '2023-04-00047', href: PROFILE.github, icon: 'github', title: 'GitHub profile' },
];

/** Optional form endpoint (e.g. Formspree). When empty, the form falls back to email. */
export const CONTACT_FORM_ENDPOINT = '';
