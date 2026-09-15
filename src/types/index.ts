export type PerformanceTier = 'HIGH' | 'MEDIUM' | 'LOW';

export interface PerformanceSettings {
  tier: PerformanceTier;
  dpr: [number, number];
  shadows: boolean;
  antialias: boolean;
  particleDensity: number;
  postProcessing: boolean;
}

export interface Chapter {
  id: string;
  index: number;
  label: string;
  code: string;
  coordinate: string;
  title: string;
  subtitle: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI_SYSTEMS' | 'DISTRIBUTED_PIPELINES' | 'ENTERPRISE_SAAS' | 'FULL_STACK';
  timeline: string;
  clientOrProduct: string;
  company: string;
  summary: string;
  architectureHighlights: string[];
  metricsOrScope: string[];
  technologies: string[];
  diagramType: 'llm_orchestration' | 'multicloud_dicom' | 'saas_workflow' | 'realtime_chat';
  repoUrl?: string;
  liveUrl?: string;
  credentialUrl?: string;
}

export interface TechnologyNode {
  id: string;
  name: string;
  category: 'CORE_BACKEND' | 'FRONTEND' | 'AI_ENGINEERING' | 'DATA_CACHING' | 'CLOUD_INFRA' | 'OBSERVABILITY_TESTING';
  proficiency: 'EXPERT' | 'ADVANCED' | 'CORE';
  connectedProjects: string[];
  description: string;
}

export interface ExperienceRecord {
  id: string;
  role: string;
  company: string;
  subEntity?: string;
  location: string;
  period: string;
  isCurrent: boolean;
  architecturalScale: string;
  achievements: string[];
  technologies: string[];
}
