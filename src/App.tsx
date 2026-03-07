import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceProvider } from './context/PerformanceContext';
import { SceneProvider } from './context/SceneContext';
import { Experience } from './components/canvas/Experience';
import { TelemetryHUD } from './components/dom/hud/TelemetryHUD';
import { QuickTravelDrawer } from './components/dom/hud/QuickTravelDrawer';
import { GlobalDossierOverlay } from './components/dom/overlay/GlobalDossierOverlay';
import { SemanticA11yTree } from './components/dom/a11y/SemanticA11yTree';

function AppContent() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#050811] text-[#F8FAFC]">
      {/* 1. Master 3D Spatial World Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ fov: 58, near: 0.1, far: 350, position: [0, 1.7, 20] }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. 2D Telemetry & Interaction HUD */}
      <TelemetryHUD />

      {/* 3. Direct Sector Warp Modal */}
      <QuickTravelDrawer />

      {/* 4. Interactive Object Dossier Modal */}
      <GlobalDossierOverlay />

      {/* 5. Semantic Accessibility & SEO DOM Tree */}
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
