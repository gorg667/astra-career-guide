export interface Career {
  id: string;
  title: string;
  category:
    'Software & data' | 'Hardware & physical' | 'Specialized & adjacent';
  tag: string;
  description: string;
  entry: string;
  degree: string;
  skills: string;
  tradeoff: string;
  bridge: string;
  anchor: string;
  chapter: number;
  icon: string;
}
export const careers: Career[] = [
  {
    id: 'software',
    title: 'Software engineering',
    category: 'Software & data',
    tag: 'A strong starting point',
    description:
      'Build the products and backend services people and businesses depend on.',
    entry: 'Established bachelor’s route',
    degree: 'CS; CE with software preparation',
    skills: 'Programming, algorithms, databases, testing, working software',
    tradeoff: 'Substantial entry-level competition; product and business risk.',
    bridge: 'Test automation, enterprise development, implementation',
    anchor: '61-product-and-backend-software-engineering',
    chapter: 6,
    icon: 'code',
  },
  {
    id: 'systems',
    title: 'Systems & infrastructure',
    category: 'Software & data',
    tag: 'Go deeper',
    description:
      'Make computing systems reliable, fast, efficient, and easier to operate.',
    entry: 'Exists; some teams prefer experience',
    degree: 'CS or CE',
    skills: 'Linux, networking, concurrency, operating systems, debugging',
    tradeoff: 'On-call work and production responsibility can be demanding.',
    bridge: 'Backend, systems test, infrastructure rotation',
    anchor:
      '62-systems-platform-reliability-networking-and-developer-infrastructure',
    chapter: 6,
    icon: 'server',
  },
  {
    id: 'security',
    title: 'Security engineering',
    category: 'Software & data',
    tag: 'Engineering first',
    description:
      'Understand how systems fail—and build stronger defenses into them.',
    entry: 'Less uniformly entry-level',
    degree: 'CS; CE for low-level or device security',
    skills:
      'Software or infrastructure depth, threat modeling, security practice',
    tradeoff:
      'Experience bottleneck; incidents and ambiguity. A skills gap is not a funded vacancy.',
    bridge: 'Software, IT/networking, security internship',
    anchor: '63-cybersecurity-engineering-first-slogans-second',
    chapter: 6,
    icon: 'shield',
  },
  {
    id: 'data',
    title: 'Data engineering',
    category: 'Software & data',
    tag: 'Build the foundations',
    description:
      'Turn fragmented information into trustworthy, useful data systems.',
    entry: 'Exists; titles vary',
    degree: 'CS or CE plus data coursework',
    skills: 'SQL, data modeling, pipelines, reliability, software quality',
    tradeoff: 'Less visible work; organizational data and ownership problems.',
    bridge: 'Backend, analytics engineering, technical analyst',
    anchor: '64-data-engineering-analytics-engineering-and-data-platforms',
    chapter: 6,
    icon: 'database',
  },
  {
    id: 'ml',
    title: 'Applied ML & AI',
    category: 'Software & data',
    tag: 'A selective specialty',
    description:
      'Evaluate, deploy, and maintain models that solve actual product problems.',
    entry: 'Selective direct route',
    degree: 'CS; CE with math and software depth',
    skills: 'Statistics, evaluation, deployment, strong engineering',
    tradeoff:
      'High competition and shifting tooling; a model demo is not production competence.',
    bridge: 'Software or data engineering',
    anchor: '65-applied-ml-engineering-and-ai-product-engineering',
    chapter: 6,
    icon: 'network',
  },
  {
    id: 'science',
    title: 'Data science & experimentation',
    category: 'Software & data',
    tag: 'Reason with evidence',
    description:
      'Use statistics and experiments to make better decisions under uncertainty.',
    entry: 'Varies; graduate study sometimes preferred',
    degree: 'CS plus statistics; other quantitative majors',
    skills: 'Experimental design, inference, SQL, communication',
    tradeoff:
      'Business ambiguity and inflated titles; role requirements differ greatly.',
    bridge: 'Analyst, decision science, data engineering',
    anchor:
      '67-data-science-experimentation-statistics-and-operations-research',
    chapter: 6,
    icon: 'chart',
  },
  {
    id: 'embedded',
    title: 'Embedded & firmware',
    category: 'Hardware & physical',
    tag: 'A natural CE route',
    description:
      'Write software that connects computing to devices and the physical world.',
    entry: 'Established bachelor’s route',
    degree: 'CE; CS with hardware and systems preparation',
    skills: 'C/C++, debugging, interfaces, timing, laboratory work',
    tradeoff: 'Often on-site; physical constraints and local employers matter.',
    bridge: 'Validation, test automation, systems software',
    anchor: '71-embedded-software-and-firmware',
    chapter: 7,
    icon: 'cpu',
  },
  {
    id: 'chips',
    title: 'Semiconductors & FPGA',
    category: 'Hardware & physical',
    tag: 'Specialize in the details',
    description:
      'Design, verify, and validate the digital building blocks of computing.',
    entry: 'Exists; specialty-dependent',
    degree: 'CE/EE; selected CS routes',
    skills: 'Digital logic, HDL, architecture, verification',
    tradeoff: 'Geographic concentration; some specialties prefer an MS.',
    bridge: 'Silicon validation, FPGA, EDA software',
    anchor: '73-digital-design-verification-and-fpga-engineering',
    chapter: 7,
    icon: 'circuit',
  },
  {
    id: 'robotics',
    title: 'Robotics & controls',
    category: 'Hardware & physical',
    tag: 'Bridge code and motion',
    description:
      'Integrate sensing, computation, and control into machines that act.',
    entry: 'Exists; advanced autonomy can favor MS/PhD',
    degree: 'CE/EE/CS with appropriate electives',
    skills: 'C++, mathematics, controls or perception, integration',
    tradeoff:
      'Hardware access and deployment economics; robotics is not one profession.',
    bridge: 'Embedded, industrial automation, systems software',
    anchor: '76-robotics-autonomy-controls-and-industrial-automation',
    chapter: 7,
    icon: 'bot',
  },
  {
    id: 'research',
    title: 'Research & discovery',
    category: 'Specialized & adjacent',
    tag: 'A conditional stretch',
    description:
      'Investigate open questions and develop new computing knowledge.',
    entry: 'Research science often needs graduate training',
    degree: 'CS/CE plus research training',
    skills: 'Original research, rigorous experiments, strong references',
    tradeoff: 'Long training, opportunity cost, and a narrow market.',
    bridge: 'Research engineering, technical industry roles',
    anchor: '81-research-engineering-versus-research-science',
    chapter: 8,
    icon: 'flask',
  },
  {
    id: 'quant',
    title: 'Quantitative finance',
    category: 'Specialized & adjacent',
    tag: 'High upside, narrow entry',
    description:
      'Apply excellent coding and mathematical reasoning to financial markets.',
    entry: 'Very selective',
    degree: 'CS/CE for development; strong math for research',
    skills: 'Excellent coding and mathematics, rigorous problem solving',
    tradeoff:
      'Small employer set and performance pressure; not a sole entry plan.',
    bridge: 'Mainstream software, data, optimization',
    anchor:
      '82-quantitative-finance-development-trading-and-research-are-different',
    chapter: 8,
    icon: 'chart',
  },
  {
    id: 'solutions',
    title: 'Solutions & implementation',
    category: 'Specialized & adjacent',
    tag: 'Technology meets people',
    description:
      'Translate a customer’s needs into workable technical solutions.',
    entry: 'Established in some programs',
    degree: 'CS or CE',
    skills: 'Technical competence, integrations, customer communication',
    tradeoff: 'Travel, sales or delivery pressure; engineering time varies.',
    bridge: 'Enterprise software, consulting, support engineering',
    anchor: '83-solutions-engineering-technical-consulting-and-implementation',
    chapter: 8,
    icon: 'users',
  },
];
export const phases = [
  {
    year: 'Before college',
    date: '2026–2027',
    title: 'Choose a viable starting point',
    detail:
      'Protect affordability and try the work before committing to a label.',
    anchor: '121-september-2026spring-2027-choose-a-viable-starting-position',
    tasks: [
      'Compare written net costs and funding for every year',
      'Check admission to the actual major and course access',
      'Try a small programming or hardware project',
      'Talk to a student, adviser, or working engineer',
    ],
  },
  {
    year: 'Year 1',
    date: '2027–2028',
    title: 'Build your foundations',
    detail:
      'Learn how to learn, debug, and ask useful questions. Keep the scope manageable.',
    anchor: '123-year-1-fall-2027spring-2028-establish-the-foundation',
    tasks: [
      'Prioritize programming, mathematics, and study habits',
      'Learn Git, the command line, and debugging',
      'Join a project team, lab, or study group',
      'Find a credible summer learning opportunity',
    ],
  },
  {
    year: 'Year 2',
    date: '2028–2029',
    title: 'Become internship-ready',
    detail:
      'Turn coursework into inspectable evidence, not a long list of tools.',
    anchor: '125-year-2-fall-2028spring-2029-become-internship-ready',
    tasks: [
      'Study data structures and core systems subjects',
      'Finish a tested project you can explain',
      'Build an honest résumé and apply early for internships',
      'Investigate two career families through real postings',
    ],
  },
  {
    year: 'Year 3',
    date: '2029–2030',
    title: 'Choose a primary direction',
    detail:
      'Develop one specialty while keeping an adjacent first-job route open.',
    anchor: '127-year-3-fall-2029spring-2030-choose-a-primary-direction',
    tasks: [
      'Choose a coherent specialty elective sequence',
      'Seek work with review and external feedback',
      'Practice interviews that match your target roles',
      'Audit accessible employers and your fallback skill gaps',
    ],
  },
  {
    year: 'Year 4',
    date: '2030–2031',
    title: 'Make the transition',
    detail:
      'Run a deliberate job search and judge offers by learning quality as well as pay.',
    anchor: '129-year-4-fall-2030spring-2031-execute-the-transition',
    tasks: [
      'Start full-time recruiting before graduation',
      'Complete a capstone with evidence of real contribution',
      'Check offer terms, manager support, and authorization',
      'Budget for relocation and a possible job-search gap',
    ],
  },
];
export const worksheetFields = [
  [
    'direction',
    'My provisional direction',
    'A broad first-job family and one specialty I want to test.',
  ],
  [
    'work',
    'The work I actually want to do',
    'Recurring tasks I enjoy—and the less appealing parts I can tolerate.',
  ],
  [
    'evidence',
    'Evidence beyond marketing',
    'Projects, conversations, dated employer postings, and what I learned.',
  ],
  [
    'education',
    'My education and funding plan',
    'Program, prerequisites, net cost, secured funding, and any remaining gap.',
  ],
  [
    'constraints',
    'My non-negotiable constraints',
    'Location, health, family, schedule, work authorization, or other access limits.',
  ],
  [
    'firstJob',
    'A realistic first job or bridge',
    'Actual junior titles and employers that use the skills I am developing.',
  ],
  [
    'fallback',
    'My adjacent route if hiring is weak',
    'What transfers, what is missing, and how I will practice those skills.',
  ],
  [
    'experiment',
    'My next small experiment',
    'A bounded task, feedback source, and evidence that could change my mind.',
  ],
  [
    'review',
    'When I will revisit this plan',
    'A date or milestone, and which assumptions I will recheck.',
  ],
];
