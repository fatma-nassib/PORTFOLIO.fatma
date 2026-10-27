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
  /** Self-assessed confidence, from 0 to 100. */
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
  readonly category: ProjectCategory | readonly ProjectCategory[];
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
  readonly icon: 'envelope' | 'github' | 'linkedin' | 'whatsapp' | 'phone';
  /** Tooltip and accessible name for the icon-only link. */
  readonly title: string;
};

export const PROFILE = {
  name: 'Fatma Nassib Abdallah',
  initials: 'FN',
  title: 'Computer Science Graduate',
  location: 'Dar es Salaam, Tanzania',
  email: 'abdallah.nassib.fatma@gmail.com',
  phone: '+255 616 432 464',
  phoneHref: 'tel:+255616432464',
  /** WhatsApp number in international format (digits only, no `+`). */
  whatsapp: '255673732464',
  whatsappDisplay: '+255 673 732 464',
  whatsappHref: 'https://wa.me/255673732464',
  linkedin: 'https://www.linkedin.com/in/fatma-abdallah-21665b277',
  github: 'https://github.com/fatma-nassib',
  availability: 'Open to graduate roles in software development',
  /** Relative path to the CV inside `public/` (leading slash = site root). */
  cvFile: '/Fatma_Nassib_Official_CV.pdf',
} as const;

export const IMAGES = {
  /** Hero portrait (served from public/). */
  hero: '/images/fatma-hero.jpg',
  /** About-section portrait (served from public/). */
  portrait: '/images/fatma-about.jpg',
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
  eyebrow: 'BSc Computer Science, University of Dar es Salaam',
  greeting: "I'm Fatma Nassib Abdallah.",
  roles: 'Computer Science graduate. Web and mobile development.',
  bio: 'I have worked on web and mobile applications, including Angular modules for a national health information system, backend services, and admin dashboards.',
  /** Light-theme hero: stamped headline broken into fixed lines. */
  headline: ['Building', 'software', 'that carries'],
  headlineTail: 'weight.',
} as const;

export const ABOUT_TEXT =
  'I graduated with a BSc in Computer Science from the University of Dar es Salaam in 2026. I have worked with Angular and Next.js on web applications, and Node.js, Fastify, and PostgreSQL on backend services. My experience also includes IT support and network maintenance at the Tanzania Revenue Authority, as well as cybersecurity training.';

export const STATS: readonly Stat[] = [
  { value: '2026', label: 'BSc Computer Science' },
  { value: '05', label: 'Professional roles' },
  { value: '07', label: 'Certifications' },
  { value: '03', label: 'Shipped products' },
];

export const EXPERIENCE: readonly Experience[] = [
  {
    role: 'Assistant IT and Conference Technology Lead',
    company: 'PAYCON AFRICA',
    period: 'Apr 2026 - Sep 2026',
    location: 'Addis Ababa, Ethiopia, remote',
    highlights: [
      'Supported conference technology and online systems for a payments organization operating across Africa.',
      'Helped plan technical requirements, participant systems, and live event support.',
    ],
  },
  {
    role: 'Developer & Project Manager',
    company: 'Youth Team Up, EU Erasmus+ Diverse Grow',
    period: 'Jul 2025 - Jun 2026',
    location: 'Remote',
    highlights: [
      'Coordinated tasks and deadlines with a youth team working across several countries.',
      'Worked on the Angular platform and its resource-sharing features.',
    ],
  },
  {
    role: 'Software Developer Trainee',
    company: 'District Health Information Software (DHIS2)',
    period: 'Jul 2025 - Sep 2025',
    location: 'Dar es Salaam, Tanzania',
    highlights: [
      'Developed Angular modules for DHIS2 district health reporting.',
      'Built a Tracker Data Quality Analysis app using the DHIS2 REST API to show data issues on a dashboard.',
    ],
  },
  {
    role: 'IT Technician Trainee',
    company: 'Tanzania Revenue Authority (TRA)',
    period: 'Jul 2024 - Sep 2024',
    location: 'Dar es Salaam, Tanzania',
    highlights: [
      'Diagnosed hardware and software faults on office workstations and peripherals.',
      'Configured and maintained the department LAN.',
    ],
  },
  {
    role: 'ICT Mentor',
    company: 'Help to Help, TGEE IT Bootcamp',
    period: 'Mar 2026 - Apr 2026',
    location: 'Dar es Salaam, Tanzania',
    highlights: [
      'Helped deliver ICT sessions on digital literacy, internet safety, and introductory programming.',
      'Mentored students on study and career options in technology.',
    ],
  },
];

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: 'Frontend',
    summary: 'Web interfaces and reusable components',
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
    title: 'Backend and APIs',
    summary: 'Server apps, APIs, and integrations',
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
    title: 'Data and Databases',
    summary: 'Database design, queries, and data checks',
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
    title: 'Infrastructure and Security',
    summary: 'Servers, networks, and cybersecurity',
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
    title: 'Delivery and Leadership',
    summary: 'Planning, communication, and mentoring',
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
    subtitle: 'Ride-sharing platform, final year project',
    description:
      "A final year ride-sharing project for Tanzanian commuters, based on the D5 regulatory framework. The team developed a Flutter app, a Next.js admin dashboard, and a backend with seven services.",
    stack: ['TypeScript', 'Node.js', 'Fastify', 'PostgreSQL', 'PostGIS', 'Redis', 'Kafka', 'Docker'],
    category: ['systems', 'mobile'],
    url: 'https://github.com/godblesskaaya/rishfy',
    linkLabel: 'View on GitHub',
    featured: true,
  },
  {
    title: 'Diverse Grow Platform',
    subtitle: 'Youth Team Up, EU Erasmus+',
    description:
      'An Angular platform for people working across the agricultural supply chain. I worked on the platform and coordinated project tasks.',
    stack: ['Angular', 'TypeScript', 'Agile Delivery'],
    category: 'web',
    url: 'https://diverse-grow-vfinal.vercel.app',
    linkLabel: 'View live site',
  },
  {
    title: 'Tracker Data Quality Analysis',
    subtitle: 'DHIS2, field training project',
    description:
      'An Angular app that checks health facility records through the DHIS2 REST API and displays data quality issues.',
    stack: ['Angular', 'DHIS2 REST API', 'TypeScript'],
    category: 'data',
    linkLabel: 'Enterprise internal tool',
  },
  {
    title: 'UniSupport',
    subtitle: 'University support assistant',
    description:
      'A university project that answers student questions about courses, registration, and campus services using university documents.',
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
    qualification: 'Bachelor of Science in Computer Science',
    institution: 'University of Dar es Salaam, College of ICT',
    period: 'Graduated 2026',
    detail: 'Final year project: Rishfy, a ride-sharing platform.',
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
  'Imbeju Smart-Elite Ambassador, CRDB Foundation, Feb 2026 - Sep 2026',
  'Cybersecurity Ambassador, CyberCode Africa, 2026',
];

export const CONTACT_LINKS: readonly ContactLink[] = [
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: 'envelope', title: `Email ${PROFILE.name}` },
  { label: 'WhatsApp', value: PROFILE.whatsappDisplay, href: PROFILE.whatsappHref, icon: 'whatsapp', title: `Message ${PROFILE.name} on WhatsApp` },
  { label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref, icon: 'phone', title: `Call ${PROFILE.phone}` },
  { label: 'LinkedIn', value: 'fatma-abdallah', href: PROFILE.linkedin, icon: 'linkedin', title: 'LinkedIn profile' },
  { label: 'GitHub', value: 'fatma-nassib', href: PROFILE.github, icon: 'github', title: 'GitHub profile' },
];

/** FormSubmit AJAX endpoint; first use requires confirming the activation email. */
export const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${PROFILE.email}`;
