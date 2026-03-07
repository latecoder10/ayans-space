import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PerformanceTier, PerformanceSettings } from '../types';

const SETTINGS_MAP: Record<PerformanceTier, PerformanceSettings> = {
  HIGH: {
    tier: 'HIGH',
    dpr: [1, 2],
    shadows: true,
    antialias: true,
    particleDensity: 1.0,
    postProcessing: true,
  },
  MEDIUM: {
    tier: 'MEDIUM',
    dpr: [1, 1.5],
    shadows: false,
    antialias: true,
    particleDensity: 0.5,
    postProcessing: false,
  },
  LOW: {
    tier: 'LOW',
    dpr: [0.8, 1],
    shadows: false,
    antialias: false,
    particleDensity: 0.2,
    postProcessing: false,
  },
};

function getInitialTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'HIGH';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || '');
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;

  if (cores <= 2 || memory <= 2) return 'LOW';
  if (isMobile || cores <= 4 || memory <= 4) return 'MEDIUM';
  return 'HIGH';
}

function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface PerformanceContextType {
  tier: PerformanceTier;
  settings: PerformanceSettings;
  fps: number;
  prefersReducedMotion: boolean;
  downgradeTier: () => void;
  setManualTier: (tier: PerformanceTier) => void;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

export const usePerformance = (): PerformanceContextType => {
  const ctx = useContext(PerformanceContext);
  if (!ctx) throw new Error('usePerformance must be used within PerformanceProvider');
  return ctx;
};

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<PerformanceTier>(getInitialTier);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(getInitialReducedMotion);
  const [fps, setFps] = useState<number>(60);

  useEffect(() => {
    // Media query listener for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // FPS sample loop
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const tick = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
        setFps(currentFps);
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const downgradeTier = () => {
    setTier((prev) => {
      if (prev === 'HIGH') return 'MEDIUM';
      if (prev === 'MEDIUM') return 'LOW';
      return 'LOW';
    });
  };

  const setManualTier = (newTier: PerformanceTier) => {
    setTier(newTier);
  };

  const value = useMemo(
    () => ({
      tier,
      settings: SETTINGS_MAP[tier],
      fps,
      prefersReducedMotion,
      downgradeTier,
      setManualTier,
    }),
    [tier, fps, prefersReducedMotion]
  );

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
};
