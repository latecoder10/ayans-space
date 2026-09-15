import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { SECTOR_BAYS, SectorBay, DossierContent } from '../types/spatial';
import { soundEngine } from '../utils/synthesizer';

export type SceneMode = 'corridor' | 'transitioning' | 'room';

interface SceneContextType {
  mode: SceneMode;
  cameraZ: number;
  targetZ: number;
  activeSector: SectorBay;
  currentRoomId: string | null;
  closestBay: SectorBay | null;
  distanceToClosestBay: number;
  overlayContent: DossierContent | null;
  dossierScreenPos: { x: number; y: number } | null;
  isQuickTravelOpen: boolean;
  isContactModalOpen: boolean;
  isAudioMuted: boolean;
  
  // Actions
  setTargetZ: (z: number | ((prev: number) => number)) => void;
  updateCameraZ: (z: number) => void;
  enterRoom: (roomId: string) => void;
  exitRoom: () => void;
  warpToSector: (sectorId: string) => void;
  openOverlay: (content: DossierContent, screenPos?: { x: number; y: number }) => void;
  closeOverlay: () => void;
  setDossierScreenPos: (pos: { x: number; y: number } | null) => void;
  toggleQuickTravel: () => void;
  openContactModal: () => void;
  closeContactModal: () => void;
  toggleAudio: () => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export const useScene = (): SceneContextType => {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error('useScene must be used within SceneProvider');
  return ctx;
};

function getInitialSceneState() {
  if (typeof window === 'undefined') {
    return { mode: 'corridor' as SceneMode, z: 20, roomId: null as string | null };
  }
  const params = new URLSearchParams(window.location.search);
  const zParam = params.get('z');
  const sectorParam = params.get('sector');
  const roomParam = params.get('room');

  if (roomParam) {
    const bay = SECTOR_BAYS.find(
      (b) =>
        b.id === roomParam ||
        b.id.replace('room-', '') === roomParam ||
        b.id.includes(roomParam) ||
        b.code.toLowerCase() === roomParam.toLowerCase()
    );
    if (bay) {
      return { mode: 'room' as SceneMode, z: bay.doorZ, roomId: bay.id };
    }
  }

  if (sectorParam) {
    const bay = SECTOR_BAYS.find((b) => b.id === sectorParam || b.code.toLowerCase() === sectorParam.toLowerCase());
    if (bay) {
      return { mode: 'corridor' as SceneMode, z: bay.doorZ, roomId: null };
    }
  }

  if (zParam) {
    const parsedZ = parseFloat(zParam);
    if (!isNaN(parsedZ)) {
      return { mode: 'corridor' as SceneMode, z: parsedZ, roomId: null };
    }
  }

  return { mode: 'corridor' as SceneMode, z: 20, roomId: null };
}

export const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initial] = useState(getInitialSceneState);
  const [mode, setMode] = useState<SceneMode>(initial.mode);
  const [cameraZ, setCameraZ] = useState<number>(initial.z);
  const [targetZ, setTargetZState] = useState<number>(initial.z);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(initial.roomId);
  const [overlayContent, setOverlayContent] = useState<DossierContent | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const overlayParam = params.get('overlay');
    if (overlayParam) {
      return {
        id: overlayParam,
        title: 'QodeAI — Enterprise SDLC Automation Engine',
        subtitle: 'Autonomous transformation of unstructured requirements into verified production artifacts',
        category: 'AI SYSTEMS ARCHITECTURE',
        badge: 'Verified Enterprise Delivery',
        overview: 'Architected and engineered an enterprise-grade AI system that ingests business requirements and orchestrates multi-provider LLM pipelines to generate BRDs, Jira epics, sprint plans, interactive wireframes, and HLD/LLD technical specifications.',
        technicalHighlights: [
          'Multi-Provider LLM Orchestration with automated quota-aware API key rotation and zero-downtime failover.',
          'ChromaDB vector embedding pipeline enabling hybrid semantic + flash search across enterprise specifications.',
          'Strict multi-tenant workspace isolation enforcing JWT access/refresh token rotation.'
        ],
        metricsOrDeliverables: [
          'Single-handed architecture & backend delivery',
          'Presented in live technical demos to 2 prospective enterprise clients',
          'Zero-interruption LLM failover mechanism'
        ],
        technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'LangChain', 'ChromaDB', 'Docker'],
        repoUrl: 'https://github.com/latecoder10',
      };
    }
    return null;
  });
  const [dossierScreenPos, setDossierScreenPos] = useState<{ x: number; y: number } | null>(null);
  const [isQuickTravelOpen, setIsQuickTravelOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Helper to clamp target Z along corridor [ -155, 22 ]
  const setTargetZ = useCallback((action: number | ((prev: number) => number)) => {
    setTargetZState((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      return Math.min(22, Math.max(-155, next));
    });
  }, []);

  const updateCameraZ = useCallback((z: number) => {
    setCameraZ(z);
  }, []);

  // Compute closest bay and distance
  const { closestBay, distanceToClosestBay } = useMemo(() => {
    let minDiff = Infinity;
    let closest: SectorBay = SECTOR_BAYS[0];

    for (const bay of SECTOR_BAYS) {
      const diff = Math.abs(cameraZ - bay.doorZ);
      if (diff < minDiff) {
        minDiff = diff;
        closest = bay;
      }
    }

    return { closestBay: closest, distanceToClosestBay: minDiff };
  }, [cameraZ]);

  // Active sector reflects closest bay
  const activeSector = closestBay || SECTOR_BAYS[0];

  // Enter room with spatial transition
  const enterRoom = useCallback((roomId: string) => {
    const targetBay = SECTOR_BAYS.find((b) => b.id === roomId);
    if (!targetBay) return;

    soundEngine.playEnterRoom();
    setMode('transitioning');
    setCurrentRoomId(roomId);
    
    // Snap target Z to the door so when exiting, user is right at the threshold
    setTargetZState(targetBay.doorZ);

    // After push-through duration, room mode engages
    setTimeout(() => {
      setMode('room');
    }, 1200);
  }, []);

  // Exit room and return to corridor traversal
  const exitRoom = useCallback(() => {
    soundEngine.playExitRoom();
    setCurrentRoomId(null);
    setMode('transitioning');
    setOverlayContent(null);

    // Return to corridor after reverse tween
    setTimeout(() => {
      setMode('corridor');
    }, 1000);
  }, []);

  // Warp directly to a sector bay
  const warpToSector = useCallback((sectorId: string) => {
    const bay = SECTOR_BAYS.find((b) => b.id === sectorId);
    if (!bay) return;

    soundEngine.playClick(1100);
    setIsQuickTravelOpen(false);

    if (mode === 'room') {
      setMode('transitioning');
      setTimeout(() => {
        setTargetZState(bay.doorZ);
        setCameraZ(bay.doorZ);
        setMode('corridor');
        setCurrentRoomId(null);
      }, 500);
    } else {
      setTargetZState(bay.doorZ);
    }
  }, [mode]);

  // Global Dossier Overlay
  const openOverlay = useCallback((content: DossierContent, screenPos?: { x: number; y: number }) => {
    soundEngine.playNodePulse(1200);
    setOverlayContent(content);
    if (screenPos) {
      setDossierScreenPos(screenPos);
    }
  }, []);

  const closeOverlay = useCallback(() => {
    soundEngine.playClick(800);
    setOverlayContent(null);
    setDossierScreenPos(null);
  }, []);

  // Quick Travel Menu
  const toggleQuickTravel = useCallback(() => {
    soundEngine.playClick(900);
    setIsQuickTravelOpen((prev) => !prev);
  }, []);

  // Contact Modal
  const openContactModal = useCallback(() => {
    soundEngine.playAlohomora();
    setIsContactModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    soundEngine.playClick(800);
    setIsContactModalOpen(false);
  }, []);

  // Audio Toggle
  const toggleAudio = useCallback(() => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      soundEngine.setEnabled(!next);
      if (!next) soundEngine.playClick(1000);
      return next;
    });
  }, []);

  // Keyboard Shortcuts (Escape to exit room or close overlay, 1-6 to warp)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isContactModalOpen) {
          closeContactModal();
        } else if (overlayContent) {
          closeOverlay();
        } else if (mode === 'room') {
          exitRoom();
        } else if (isQuickTravelOpen) {
          setIsQuickTravelOpen(false);
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleQuickTravel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [overlayContent, mode, isQuickTravelOpen, isContactModalOpen, closeOverlay, exitRoom, toggleQuickTravel, closeContactModal]);

  const value = useMemo(
    () => ({
      mode,
      cameraZ,
      targetZ,
      activeSector,
      currentRoomId,
      closestBay,
      distanceToClosestBay,
      overlayContent,
      dossierScreenPos,
      isQuickTravelOpen,
      isContactModalOpen,
      isAudioMuted,
      setTargetZ,
      updateCameraZ,
      enterRoom,
      exitRoom,
      warpToSector,
      openOverlay,
      closeOverlay,
      setDossierScreenPos,
      toggleQuickTravel,
      openContactModal,
      closeContactModal,
      toggleAudio,
    }),
    [
      mode,
      cameraZ,
      targetZ,
      activeSector,
      currentRoomId,
      closestBay,
      distanceToClosestBay,
      overlayContent,
      dossierScreenPos,
      isQuickTravelOpen,
      isContactModalOpen,
      isAudioMuted,
      setTargetZ,
      updateCameraZ,
      enterRoom,
      exitRoom,
      warpToSector,
      openOverlay,
      closeOverlay,
      setDossierScreenPos,
      toggleQuickTravel,
      openContactModal,
      closeContactModal,
      toggleAudio,
    ]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { __scene: typeof value }).__scene = value;
    }
  }, [value]);

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
};
