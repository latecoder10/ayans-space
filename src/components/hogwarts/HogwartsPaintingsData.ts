export interface HogwartsPainting {
  id: string;
  caseStudyId?: string;
  title: string;
  locationName: string;
  engineeringTitle: string;
  category: 'AI_SYSTEMS' | 'DISTRIBUTED_PIPELINES' | 'ENTERPRISE_SAAS' | 'FULL_STACK' | 'SECURITY_CORE' | 'FOUNDATIONS';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  keyMetrics: string[];
  magicalLore: string;
  artworkType: 'courtyard' | 'astronomy' | 'clocktower' | 'viaduct' | 'greathall' | 'potions' | 'herbology' | 'library';
  bgGradient: string;
  glowColor: string;
  iconSymbol: string;
  featuredInPanorama?: boolean;
}

export const HOGWARTS_PAINTINGS: HogwartsPainting[] = [
  {
    id: 'courtyard-qodeai',
    caseStudyId: 'qodeai',
    title: 'The Grand Courtyard',
    locationName: 'Paved Cloister & Gate',
    engineeringTitle: 'QodeAI — Autonomous SDLC Automation Engine',
    category: 'AI_SYSTEMS',
    categoryLabel: 'AI Systems Architecture',
    shortDescription: 'Multi-provider LLM orchestration with quota-aware key rotation & dynamic failover.',
    fullDescription: 'Architected and engineered an enterprise-grade AI engine that ingests raw business requirements and orchestrates multi-provider LLM pipelines to generate BRDs, Jira tickets, sprint breakdown plans, interactive wireframes, and HLD/LLD technical specifications.',
    technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'LangChain', 'ChromaDB', 'LLM Orchestration', 'JWT Auth', 'Docker'],
    keyMetrics: [
      'Single-handed architecture & backend delivery',
      'Presented in live technical demos to 2 prospective enterprise clients',
      'Zero-interruption dynamic LLM failover mechanism',
      'End-to-end SDLC artifact coverage: BRD -> Jira -> Sprints -> Wireframes -> HLD/LLD'
    ],
    magicalLore: 'Where ancient blueprints and magical incantations transmute raw intent into fortified crystal structures with zero miscasts.',
    artworkType: 'courtyard',
    bgGradient: 'from-amber-950/80 via-slate-900/90 to-black',
    glowColor: '#F59E0B',
    iconSymbol: '⚡',
    featuredInPanorama: true
  },
  {
    id: 'viaduct-roche',
    caseStudyId: 'roche-dicom',
    title: 'The Great Viaduct',
    locationName: 'High Mountain Gorge Chasm',
    engineeringTitle: 'Distributed Multi-Cloud Medical Imaging (DICOM) Pipeline',
    category: 'DISTRIBUTED_PIPELINES',
    categoryLabel: 'Multi-Cloud Distributed Systems',
    shortDescription: 'Concurrent multi-threaded Java microservices streaming imaging across AWS, Azure, & GCP.',
    fullDescription: 'Engineered a distributed Java microservices data backbone for transferring, streaming, and archiving petabyte-scale medical imaging (DICOM) data across heterogeneous cloud providers for a Fortune 500 Healthcare Enterprise with strict data integrity and high-throughput concurrency.',
    technologies: ['Java', 'Spring Boot', 'Microservices', 'Multithreading', 'AWS Health Imaging', 'Azure DICOM', 'GCP Healthcare API', 'Redis', 'Kubernetes'],
    keyMetrics: [
      'Seamless interoperability across 3 major cloud providers (AWS, Azure, GCP)',
      'Concurrent multi-threaded Java worker pipelines with Redis caching',
      'Kubernetes orchestration with automated CI/CD and zero regressions',
      'Full DICOM standard compliance with sub-second transfer latency'
    ],
    magicalLore: 'The colossal viaduct bridging three distinct realms, carrying torrents of diagnostic visions across the abyssal void.',
    artworkType: 'viaduct',
    bgGradient: 'from-cyan-950/80 via-slate-900/90 to-black',
    glowColor: '#00F2FE',
    iconSymbol: '🌉',
    featuredInPanorama: true
  },
  {
    id: 'greathall-lumberfi',
    caseStudyId: 'lumberfi',
    title: 'The Great Hall',
    locationName: 'Enchanted Floating Vault',
    engineeringTitle: 'Enterprise Workforce SaaS & Onboarding Engine',
    category: 'ENTERPRISE_SAAS',
    categoryLabel: 'Enterprise SaaS & Workflows',
    shortDescription: 'Full-stack employee onboarding, biometric verification, and mobile companion app.',
    fullDescription: 'Developed high-reliability SaaS web application features facilitating corporate onboarding, biometric PDF embedding, document verification workflows, task assignment pipelines, and a companion Timesheet mobile app in React & React Native for a construction domain workforce platform.',
    technologies: ['React', 'Material UI', 'React Native', 'REST APIs', 'Biometric PDF', 'Jest', 'Docker', 'Kubernetes', 'GitHub Actions'],
    keyMetrics: [
      'Dual Web SaaS + Mobile Companion ecosystem for enterprise teams',
      'End-to-end document onboarding and verification pipelines',
      'Prometheus and Grafana production observability & alerts'
    ],
    magicalLore: 'The vast ceremonial hall where hundreds of active guild members congregate, sign enchanted compacts, and log their daily deeds.',
    artworkType: 'greathall',
    bgGradient: 'from-blue-950/80 via-slate-900/90 to-black',
    glowColor: '#3B82F6',
    iconSymbol: '🏰',
    featuredInPanorama: true
  },
  {
    id: 'astronomy-events',
    caseStudyId: 'social-platform',
    title: 'The Astronomy Tower',
    locationName: 'Celestia Pinnacle Spire',
    engineeringTitle: 'Distributed Real-Time WebSocket Messaging Bus',
    category: 'FULL_STACK',
    categoryLabel: 'Real-Time Stateful Mesh',
    shortDescription: 'Low-latency stateful communication, relational data modeling, and duplex WebSockets.',
    fullDescription: 'Engineered high-concurrency stateful chat engine utilizing Java Spring Boot WebSockets, MySQL relational schema with index optimizations, and Redux deterministic client state management.',
    technologies: ['Java', 'Spring Boot', 'WebSockets', 'MySQL', 'React', 'Redux', 'Tailwind CSS', 'JWT'],
    keyMetrics: [
      'Full-stack architecture from relational schema to responsive UI',
      'Sub-50ms duplex WebSocket packet dispatch',
      'Stateless JWT session authentication with automated renewal'
    ],
    magicalLore: 'Piercing the clouds to chart celestial signals, beaming instantaneous whispers across starry horizons without delay.',
    artworkType: 'astronomy',
    bgGradient: 'from-indigo-950/80 via-slate-900/90 to-black',
    glowColor: '#6366F1',
    iconSymbol: '🔭',
    featuredInPanorama: false
  },
  {
    id: 'clocktower-security',
    title: 'The Clocktower Gate',
    locationName: 'Grand Pendulum Courtyard',
    engineeringTitle: 'Zero-Trust Auth & Key Rotation Architecture',
    category: 'SECURITY_CORE',
    categoryLabel: 'Security & Tenancy Isolation',
    shortDescription: 'Automated token rotation, per-workspace tenancy isolation, and cryptographic session protection.',
    fullDescription: 'Designed multi-tier authentication with short-lived JWT access tokens and secure refresh token rotation stored in HttpOnly cookies, combined with strict workspace tenant authorization filters.',
    technologies: ['Java Security', 'Spring Security', 'JWT Rotation', 'OAuth2', 'RBAC', 'Redis Session Vault', 'HTTPS/TLS'],
    keyMetrics: [
      '100% tenant data isolation across multi-workspace clusters',
      'Zero-trust token rotation preventing replay attacks',
      'Deterministic permission evaluation across distributed microservices'
    ],
    magicalLore: 'The colossal swinging pendulum governing temporal gate locks, admitting only those bearing verified, untampered seals.',
    artworkType: 'clocktower',
    bgGradient: 'from-yellow-950/80 via-slate-900/90 to-black',
    glowColor: '#EAB308',
    iconSymbol: '⏳',
    featuredInPanorama: false
  },
  {
    id: 'potions-rag',
    title: 'The Potions Dungeon',
    locationName: 'Vaulted Subterranean Lab',
    engineeringTitle: 'ChromaDB Vector Retrieval & Hybrid Semantic RAG',
    category: 'AI_SYSTEMS',
    categoryLabel: 'Vector Embeddings & RAG',
    shortDescription: 'High-density vector embeddings, cosine distance semantic search, and document chunking pipelines.',
    fullDescription: 'Engineered multi-provider embedding pipelines feeding ChromaDB vector stores with semantic chunking, dynamic metadata filtering, and hybrid keyword + vector retrieval for technical enterprise documentation.',
    technologies: ['ChromaDB', 'Vector Embeddings', 'RAG Pipelines', 'LangChain', 'Python / Java Bridge', 'OpenAI / Gemini Embeddings'],
    keyMetrics: [
      'Sub-200ms semantic similarity queries across thousands of enterprise documents',
      'Chunk-level lineage tracking with source grounding references',
      'Seamless multi-provider embedding model swapping'
    ],
    magicalLore: 'Deep stone vaults where raw parchment lore is dissolved into glowing vector essences, bubbling with instant recall.',
    artworkType: 'potions',
    bgGradient: 'from-emerald-950/80 via-slate-900/90 to-black',
    glowColor: '#10B981',
    iconSymbol: '🧪',
    featuredInPanorama: false
  },
  {
    id: 'herbology-claude',
    title: 'Herbology Conservatory',
    locationName: 'Victorian Glass Greenhouses',
    engineeringTitle: 'Claude Certified Architect — Foundations Verified',
    category: 'FOUNDATIONS',
    categoryLabel: 'AI Architecture & Agentic Design',
    shortDescription: 'Official Anthropic credential: Agentic workflows, tool use, context architecture, & prompt chaining.',
    fullDescription: 'Verified certification in advanced LLM architecture covering multi-turn reliability, structured output validation, chain-of-thought prompt engineering, and autonomous subagent execution frameworks.',
    technologies: ['Anthropic Claude', 'Agentic Workflows', 'Tool Use', 'Prompt Engineering', 'Context Caching', 'Evaluation Harnesses'],
    keyMetrics: [
      'Officially verified Anthropic credential (Foundations)',
      'Production prompt architectures with structured JSON schema outputs',
      'Multi-turn conversational stability with dynamic system prompt contexts'
    ],
    magicalLore: 'Enchanted glass domes cultivating living intelligence, guiding autonomous sprouts to blossom with precision and care.',
    artworkType: 'herbology',
    bgGradient: 'from-green-950/80 via-slate-900/90 to-black',
    glowColor: '#22C55E',
    iconSymbol: '🌿',
    featuredInPanorama: false
  },
  {
    id: 'library-spatial',
    title: 'Library Restricted Section',
    locationName: 'Towering Tome Scriptorium',
    engineeringTitle: 'Interactive 3D Spatial Canvas & Corridor Engine',
    category: 'FULL_STACK',
    categoryLabel: 'Spatial WebGL Graphics',
    shortDescription: 'Three.js & WebGL rendering with 60fps camera interpolation, shader warmup, and audio synthesis.',
    fullDescription: 'Engineered an interactive 3D spatial experience in Three.js and React Three Fiber featuring procedural corridor bays, Web Audio API sound synthesis, responsive viewport adaptations, and smooth GSAP camera interpolation.',
    technologies: ['Three.js', 'React Three Fiber', 'WebGL', 'GSAP', 'Web Audio API', 'TypeScript', 'Tailwind CSS'],
    keyMetrics: [
      'Rock-solid 60 FPS spatial exploration across desktop and mobile',
      'Zero external sound assets — procedural Web Audio synthesis',
      'Dual-mode exploration: 3D spatial corridor and cinematic Hogwarts gallery'
    ],
    magicalLore: 'Endless towering shelves of floating grimoires, revealing hidden architectural secrets to those who invoke the Lumos incantation.',
    artworkType: 'library',
    bgGradient: 'from-purple-950/80 via-slate-900/90 to-black',
    glowColor: '#A855F7',
    iconSymbol: '📜',
    featuredInPanorama: false
  }
];
