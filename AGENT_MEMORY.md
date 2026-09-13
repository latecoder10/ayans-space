# 🤖 AGENT_MEMORY.md // AYAN PAL 3D SPATIAL ENGINEERING UNIVERSE
> **TARGET AUDIENCE: AI AGENT CO-DEVELOPER (MACHINE CONSUMABLE CONTEXT)**
> **LAST UPDATED: 2026-09-14T03:41:00+05:30**
> **PROJECT PATH: `D:\Playground\Projects\ayan-pal-portfolio`**
> **SERVER: `http://localhost:5173/` | BACKGROUND TASK: `task-718` (Vite 8.3.0 / React 19 / Three.js 0.186)**

---

## 1. IDENTITY & CREDENTIAL MATRIX (STRICT RESUME CANON)
- **Candidate:** Ayan Pal (Location: Kolkata, West Bengal, India | Phone: +91 8250269389 | Email: `ayanpal173@gmail.com`)
- **Profiles:**
  - LinkedIn: `https://www.linkedin.com/in/ayan-pal`
  - GitHub: `https://github.com/ayanpal`
- **Core Title:** Java Full Stack Developer | Distributed Systems Engineer | AI Systems Architect | Anthropic Claude Certified Architect
- **Primary Employment History:**
  - **Estuate Inc. (Apr 2026 – Present):** AI Systems Architect & Full Stack Lead. Built **QodeAI** (autonomous BRD/Epic/Wireframe/HLD pipeline), 100MB OCR parallel subagent pipeline, ServiceNow vector RAG embedding integration.
  - **Estuate Inc. (Jan 2024 – Dec 2025):** Software Engineer. Built multi-cloud medical imaging (DICOM) data pipeline across AWS, Azure, GCP for **Roche**. Lock-free Java concurrency, Redis caching, Kubernetes deployments.
  - **Estuate Inc. (Jan 2023 – Dec 2023):** Associate Software Engineer. Built **Lumberfi** SaaS workforce onboarding with React, Material UI, Spring Boot, and companion React Native mobile timesheet app.
  - **Heritage Institute of Technology (2019 – 2023):** B.Tech in Computer Science & Engineering (8.54 CGPA / First Class Distinction).
- **Core Certification:**
  - **Anthropic Claude Certified Architect: Foundations** (Credential ID: `94695e26-f7bc-49b4-93e1-cfeb3d83b482`, Issued: May 12, 2026).
  - Competencies: Advanced prompt caching breakpoints, deterministic tool-calling loops, multi-agent coordinator-worker topologies, quota-aware multi-provider LLM failovers.

---

## 2. SPATIAL GEOMETRY & COORDINATE SYSTEM
Linear corridor traveling down negative Z-axis:
```
CORRIDOR AXIS:
Z = +22m (Entrance / Terminal Horizon Behind)
Z =   0m (Sector 01: Archive - Core Systems) [DOOR: LEFT at X = -3.6, Z = 0]
Z = -30m (Sector 02: Laboratory - AI Systems) [DOOR: RIGHT at X = +3.6, Z = -30]
Z = -60m (Sector 03: Core - Distributed Mesh) [DOOR: LEFT at X = -3.6, Z = -60]
Z = -90m (Sector 04: Retrospective - Career) [DOOR: RIGHT at X = +3.6, Z = -90]
Z = -120m (Sector 05: Sanctuary - Claude Monument) [DOOR: LEFT at X = -3.6, Z = -120]
Z = -155m (Sector 06: Horizon - Observation Deck) [DOOR: CENTER at X = 0, Z = -155]
```

### Room Bounding Boxes & Offsets
- **Left Rooms (`doorSide: 'left'`, Sectors 01, 03, 05):**
  - Center: `X = -14`, `Z = bay.doorZ`, Floor: `14m x 12m`, Height: `4.5m`
  - Entrance Threshold: `X = -10, Z = bay.doorZ`, facing `-X` (`yaw = Math.PI / 2`)
  - Clamped Camera Bounds: `X ∈ [-19.5, -8.5]`, `Z ∈ [bay.doorZ - 5.0, bay.doorZ + 5.0]`
- **Right Rooms (`doorSide: 'right'`, Sectors 02, 04):**
  - Center: `X = +14`, `Z = bay.doorZ`, Floor: `14m x 12m`, Height: `4.5m`
  - Entrance Threshold: `X = +10, Z = bay.doorZ`, facing `+X` (`yaw = -Math.PI / 2`)
  - Clamped Camera Bounds: `X ∈ [8.5, 19.5]`, `Z ∈ [bay.doorZ - 5.0, bay.doorZ + 5.0]`
- **Center Room (`doorSide: 'center'`, Sector 06):**
  - Cantilevered observation terrace overlooking twilight gradient sky
  - Center: `X = 0`, `Z = -170`, Deck Bounds: `X ∈ [-10, 10]`, `Z ∈ [-180, -158]`
  - Entrance Threshold: `X = 0, Z = -162`, facing `-Z` (`yaw = 0`)
  - Clamped Camera Bounds: `X ∈ [-9.0, 9.0]`, `Z ∈ [-178.0, -160.0]`

---

## 3. CAMERA RIG & FREE-ROAM LOCOMOTION ENGINE
Located at `src/components/canvas/camera/CorridorCameraRig.tsx`.

### Coordinate Mathematics & Rotation
- `yaw` ($\theta$): Radians around Y-axis. `0` = facing $-Z$ (corridor forward).
- `pitch` ($\phi$): Radians around local pitch axis. Clamped: `[-1.25, 1.25]` rad ($\approx \pm 71.6^\circ$).
- Direction vector:
  - $f_x = -\sin(\theta) \cos(\phi)$
  - $f_y = \sin(\phi)$
  - $f_z = -\cos(\theta) \cos(\phi)$
- Right (strafe) vector:
  - $r_x = \cos(\theta)$
  - $r_y = 0$
  - $r_z = -\sin(\theta)$
- `lookAtTarget = pos + f * 10`

### Input Processing
1. **Mouse / Trackpad Click & Drag:**
   - Active on primary pointer down (filters out UI buttons / inputs).
   - Horizontal drag: `targetYaw -= dx * 0.0035`
   - Vertical drag: `targetPitch -= dy * 0.003` (clamped)
   - Cursor feedback: `document.body.style.cursor = 'grabbing'` during drag.
2. **Trackpad Two-Finger Pan (`WheelEvent.deltaX`):**
   - `targetYaw -= e.deltaX * 0.0025` (swiping two fingers left/right turns camera view).
3. **Trackpad Vertical Scroll / Wheel (`WheelEvent.deltaY`):**
   - Corridor: `targetPos.z = clamp(targetPos.z - e.deltaY * 0.025, -155, 22)`
   - Room: Dollies along current facing direction:
     `targetPos.x += fwdX * (-e.deltaY * 0.015)`
     `targetPos.z += fwdZ * (-e.deltaY * 0.015)` (clamped by `clampRoomPosition`)
4. **Continuous Keyboard Locomotion (`keydown` / `keyup` set):**
   - `W` / `ArrowUp`: Forward along facing horizontal vector ($+f_{xz}$).
   - `S` / `ArrowDown`: Backward ($-f_{xz}$).
   - `A` / `ArrowLeft`: Strafe left ($-r$). ArrowLeft also yaws left (`targetYaw += 0.035`).
   - `D` / `ArrowRight`: Strafe right ($+r$). ArrowRight also yaws right (`targetYaw -= 0.035`).
   - `Q`: Yaw turn left (`targetYaw += 0.04`).
   - `E`: Yaw turn right (`targetYaw -= 0.04`).
   - Corridor clamping: $X \in [-3.0, 3.0]$, $Z \in [-155, 22]$.
   - Room clamping: calls `clampRoomPosition(targetPos, currentRoomId)`.
5. **Inertial Dampening & Parallax:**
   - Angle Lerp: `yaw += (targetYaw - yaw) * 0.12`, `pitch += (targetPitch - pitch) * 0.12`
   - Position Lerp: `currentPos.lerp(targetPos, 0.1)`
   - Idle mouse parallax (only when not dragging): `pointer.x * 0.08`, `pointer.y * 0.06`.
   - Subtle auto-glance near corridor doors (only when not dragging and facing mostly forward).
6. **Drag vs Click Threshold Protection:**
   - To prevent dragging from accidentally triggering door entrance or opening dossiers, all interactive 3D meshes check `if (e.delta && e.delta > 8) return;` before processing `onClick`.

---

## 4. STATE MACHINE & DEEP-LINKING (`SceneContext.tsx`)
Located at `src/context/SceneContext.tsx`.

### Modes
- `mode = 'corridor'` | `'transitioning'` | `'room'`
- `currentRoomId = string | null` (e.g. `'room-systems'`, `'room-ai-lab'`, `'room-distributed'`, `'room-career'`, `'room-certification'`, `'room-contact'`)
- `activeSector = SectorBay` (dynamically computed from closest bay to `cameraZ`)

### URL Deep-Linking Params
- `?z=10` — Sets camera Z in corridor directly.
- `?sector=1` or `?sector=SYS.01` — Snaps camera to sector bay Z.
- `?room=systems` or `?room=room-systems` or `?room=claude` — Spawns user inside the specified room.
- `?overlay=qodeai` — Opens the technical dossier modal on launch.

### Transition Flow
- **Enter Room:**
  `soundEngine.playEnterRoom()` → `mode = 'transitioning'` → GSAP animates `currentPos` & `yaw` to room entrance → after 1200ms `mode = 'room'` engages free-roam.
- **Exit Room:**
  `soundEngine.playExitRoom()` → `currentRoomId = null` (IMMEDIATE) → `mode = 'transitioning'` → GSAP animates `currentPos` back to `(0, 1.7, bay.doorZ)` and `yaw = 0` → after 1000ms `mode = 'corridor'` engages corridor traversal.

---

## 5. FILE TREE & MODULE MAP

```
D:\Playground\Projects\ayan-pal-portfolio
├── src
│   ├── main.tsx                           # React 19 root mount
│   ├── App.tsx                            # Root scene canvas + HUD + overlays + a11y tree
│   ├── index.css                          # Tailwind CSS v4 directives + font styling
│   │
│   ├── context
│   │   └── SceneContext.tsx               # Primary spatial state machine & audio bindings
│   │
│   ├── types
│   │   └── spatial.ts                     # SectorBay, SECTOR_BAYS, DossierContent schemas
│   │
│   ├── data
│   │   ├── resumeData.ts                  # Raw verified Ayan Pal resume facts
│   │   └── caseStudies.ts                 # Full technical dossiers & architectural specs
│   │
│   ├── utils
│   │   └── synthesizer.ts                 # Web Audio API procedural synthesizer (zero audio files)
│   │
│   ├── components
│   │   ├── canvas
│   │   │   ├── camera
│   │   │   │   └── CorridorCameraRig.tsx  # Free-roam camera rig (yaw/pitch, WASD, trackpad pan)
│   │   │   │
│   │   │   ├── common
│   │   │   │   └── SpatialText.tsx        # Troika Three Text wrapper with safe SDF fallback
│   │   │   │
│   │   │   ├── corridor
│   │   │   │   ├── ArchitecturalCorridor.tsx # Basalt corridor floor, ceiling, wall slabs, light strips
│   │   │   │   └── DoorwayBay.tsx         # Pneumatic animated sliding doors, beacons, signs
│   │   │   │
│   │   │   └── rooms
│   │   │       ├── Room01_Systems.tsx     # 4 server consoles: QodeAI, Roche, Lumberfi, Social Hub
│   │   │       ├── Room02_AILab.tsx       # 120-node vector cloud, OCR agent, ServiceNow RAG, LLM failover
│   │   │       ├── Room03_Distributed.tsx # Suspended multi-cloud mesh (Java Core, AWS, Azure, GCP, K8s)
│   │   │       ├── Room04_Career.tsx      # 4 carbon monoliths (Foundations -> Autonomous AI Apex)
│   │   │       ├── Room05_Certification.tsx# Vault sanctuary with golden octahedron & 4 pillar tablets
│   │   │       └── Room06_Contact.tsx     # Observation deck, dusk sky, GitHub, Email, LinkedIn plinths
│   │   │
│   │   └── dom
│   │       ├── a11y
│   │       │   └── SemanticA11yTree.tsx   # Hidden screen-reader accessible HTML DOM tree
│   │       ├── hud
│   │       │   └── TelemetryHUD.tsx       # Minimal glass HUD bar, quick nav (Cmd+K), audio toggle
│   │       └── overlay
│   │           └── GlobalDossierOverlay.tsx # High-density architectural dossier modal with ASCII diagrams
│   │
│   └── (config)
│       ├── vite.config.ts                 # Vite 8 config with rolldown code-splitting chunks
│       ├── package.json                   # Dependencies: three, @react-three/fiber, gsap, lucide-react
│       └── tsconfig.app.json              # TypeScript compilation rules
```

---

## 6. SYNTHESIZER AUDIO SPECIFICATIONS (`synthesizer.ts`)
Zero `.mp3` or `.wav` dependencies. Generated on-the-fly via Web Audio API:
- `playClick(freq = 1200)`: Clean high-tech sine blip (1200Hz → 600Hz decay over 45ms).
- `playNodePulse(freq = 880)`: Resonant harmonic chime (880Hz → 440Hz triangle over 250ms).
- `playHover()`: Debounced (120ms) high sine tick (1600Hz, 30ms).
- `playDoorSlide()`: Dual bandpass sweep (`400Hz → 1800Hz`) + pink noise burst simulating pneumatic servo depressurization.
- `playEnterRoom()`: Low sub-bass resonant sweep (`90Hz → 45Hz` sine) with filtered buffer drone.
- `playExitRoom()`: Reverse harmonic chord sweep (`55Hz → 110Hz`).
- `isMuted`: Global state toggleable in top HUD or `toggleAudio()`.

---

## 7. RESOLVED TECHNICAL PITFALLS & SOLUTIONS
1. **Camera Reverse Glitch on Room Exit:**
   - *Bug:* In `SceneContext.tsx`, `exitRoom()` previously retained `currentRoomId` during transition, causing the rig to think it was entering instead of exiting.
   - *Fix:* Immediate `setCurrentRoomId(null)` in `exitRoom()` paired with `activeBayRef.current` in `CorridorCameraRig.tsx` ensures deterministic return to the exact bay.
2. **Troika 3D Text Depth Occlusion:**
   - *Bug:* Text glyphs in Room 06 disappeared behind plinth glass meshes due to subtle depth-buffer precision limits.
   - *Fix:* Use `material-depthTest={false}` and `renderOrder={20}` on all critical 3D floating text.
3. **Mobile Flex Wrap Overflow:**
   - *Bug:* Mobile viewports (< 400px) had badges overflowing horizontally in the Dossier overlay due to flex child `min-width: auto`.
   - *Fix:* Explicit `w-full min-w-0 max-w-[calc(100vw-24px)]` and `flex-wrap sm:flex-nowrap` on headers, badges, and footers.
4. **Drag-to-Look vs. Mesh Click Collision:**
   - *Bug:* Dragging the mouse to rotate the camera in 3D would trigger `onClick` on whatever mesh the pointer was released over.
   - *Fix:* Guarded every click listener with `if (e.delta && e.delta > 8) return;` (Three.js event delta tracks pixel distance between down and up).

---

## 8. IMMEDIATE ACTION CHECKLIST FOR FUTURE SESSIONS
- To test production build: `npm.cmd run build` (takes ~650–750ms).
- To start dev server: `npm.cmd run dev` (running on `http://localhost:5173/`).
- To test free roam: Click & drag mouse / swipe trackpad horizontally to look 360°, use `W`/`A`/`S`/`D` to walk, scroll wheel to dolly.
- To modify resume content: Edit `src/data/resumeData.ts` and `src/data/caseStudies.ts`.
- To modify 3D materials/lights: Inspect corresponding room in `src/components/canvas/rooms/RoomXX_*.tsx`.
