export interface SectorBay {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  doorZ: number;
  doorSide: 'left' | 'right' | 'center';
  doorColor: string;
}

export const SECTOR_BAYS: SectorBay[] = [
  {
    id: 'room-systems',
    code: 'SYS.01',
    title: 'Systems & Core Projects Archive',
    subtitle: 'High-Throughput Architectures & Enterprise Deliveries',
    doorZ: 0,
    doorSide: 'left',
    doorColor: '#00F2FE',
  },
  {
    id: 'room-ai-lab',
    code: 'AI.02',
    title: 'Autonomous AI Engineering Lab',
    subtitle: '100MB OCR Subagents, Vector Search & Quota Routing',
    doorZ: -30,
    doorSide: 'right',
    doorColor: '#A855F7',
  },
  {
    id: 'room-distributed',
    code: 'DST.03',
    title: 'Distributed Systems & Cloud Topology',
    subtitle: 'Multi-Cloud Healthcare Imaging & Concurrent Java Workers',
    doorZ: -60,
    doorSide: 'left',
    doorColor: '#3B82F6',
  },
  {
    id: 'room-career',
    code: 'CAR.04',
    title: 'Architectural Career Evolution',
    subtitle: 'Domain Escalation: Algorithmic Rigor to Autonomous Apex',
    doorZ: -90,
    doorSide: 'right',
    doorColor: '#10B981',
  },
  {
    id: 'room-certification',
    code: 'CRT.05',
    title: 'Claude Certified Architect Monument',
    subtitle: 'Anthropic Foundations: Context, Tools, Agents & Topologies',
    doorZ: -120,
    doorSide: 'left',
    doorColor: '#F59E0B',
  },
  {
    id: 'room-contact',
    code: 'CNT.06',
    title: 'Contact Horizon Platform',
    subtitle: 'Observation Deck & Direct Communication Dispatch',
    doorZ: -150,
    doorSide: 'center',
    doorColor: '#EC4899',
  },
];

export interface DossierContent {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  category: string;
  timeline?: string;
  clientOrProduct?: string;
  overview: string;
  technicalHighlights: string[];
  metricsOrDeliverables: string[];
  technologies: string[];
  diagramType?: 'llm_orchestration' | 'multicloud_dicom' | 'saas_workflow' | 'realtime_chat' | 'document_ocr' | 'servicenow_rag' | 'career_progression' | 'claude_cert' | string;
  repoUrl?: string;
  liveUrl?: string;
  credentialUrl?: string;
}
