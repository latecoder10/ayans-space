import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { PerformanceProvider } from './context/PerformanceContext';
import { useScene, SceneProvider } from './context/SceneContext';
import { Experience } from './components/canvas/Experience';
import { TelemetryHUD } from './components/dom/hud/TelemetryHUD';
import { QuickTravelDrawer } from './components/dom/hud/QuickTravelDrawer';
import { GlobalDossierOverlay } from './components/dom/overlay/GlobalDossierOverlay';
import { HogwartsAboutModal } from './components/hogwarts/HogwartsAboutModal';
import { OwlContactModal } from './components/hogwarts/OwlContactModal';
import { LumosParticles } from './components/hogwarts/LumosParticles';
import { SemanticA11yTree } from './components/dom/a11y/SemanticA11yTree';

function AppContent() {
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [wandActive, setWandActive] = useState<boolean>(true);
  const { isContactModalOpen, openContactModal, closeContactModal } = useScene();

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#14100C] text-[#F8FAFC] select-none">
      {/* 1. Wand Stardust & Ambient Golden Sparks */}
      <LumosParticles wandActive={wandActive} />

      {/* 2. Primary 3D WebGL Hogwarts Castle Experience (Hallway & Chambers) */}
      <div className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing">
        <Canvas
          dpr={[1, 1.5]}
          performance={{ min: 0.6 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.42,
          }}
          camera={{ position: [0, 1.7, 20], fov: 60, near: 0.2, far: 240 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. Top Hogwarts Header Bar & Telemetry HUD */}
      <TelemetryHUD
        onOpenAbout={() => setAboutOpen(true)}
        onOpenContact={openContactModal}
        lumosActive={wandActive}
        onToggleLumos={() => setWandActive((p) => !p)}
      />

      {/* 4. The Marauder's Map / Quick Chamber Direct Warp Drawer */}
      <QuickTravelDrawer />

      {/* 5. Deep Technical Dossier Grimoire Modal (Triggered by 3D Paintings & Chamber Lecterns) */}
      <GlobalDossierOverlay />

      {/* 6. About & Certified Architect Grimoire Modal */}
      <HogwartsAboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onOpenContact={openContactModal}
      />

      {/* 7. Direct Communication Dispatch Modal */}
      <OwlContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />

      {/* 8. Semantic Accessibility Tree for Assistive Devices & SEO */}
      <SemanticA11yTree />
    </div>
  );
}

export default function App() {
  return (
    <PerformanceProvider>
      <SceneProvider>
        <AppContent />
      </SceneProvider>
    </PerformanceProvider>
  );
}
