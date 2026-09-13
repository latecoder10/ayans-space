# Ayan Pal — 3D Spatial Engineering Universe

> **Enterprise Java Full Stack • Distributed Systems • AI Product Engineering • Claude Certified Architect**

An authentic, high-performance 3D spatial engineering universe built with Three.js, React Three Fiber, GSAP, and Tailwind CSS. Rather than a conventional 2D vertical scroll portfolio, this project functions as an interactive, brutalist architectural installation: a physical hallway traversing six engineering sectors, featuring pneumatic sliding stanchion doorways, volumetric telemetry, and immersive room chambers.

> 🤖 **Agent Note:** Comprehensive architectural memory, coordinate systems, camera kinematics, and resume specs are codified in [`AGENT_MEMORY.md`](./AGENT_MEMORY.md).

---

## 🏛️ Spatial Architecture & Sectors

The facility is arranged linearly along the negative Z-axis ($Z = 0$ to $Z = -155$). Traversal is continuous with smooth camera physics, proximity lighting, and directional glance mechanics.

| Sector | Coordinates | Name | Experience & Content |
| :--- | :--- | :--- | :--- |
| **01** | `Z = 0`, $X = -6$ | **Archive 01: Core Systems** | High-density server archive with 4 interactive holographic pedestals: **QodeAI**, **Roche Diagnostics DICOM Engine**, **Lumberfi**, and **Social Hub**. |
| **02** | `Z = -30`, $X = +6$ | **Laboratory 02: AI & LLM Systems** | Vector cloud laboratory with interactive 3D nodes representing the **OCR Agent Pipeline**, **ServiceNow Vector RAG**, and **Multi-Provider LLM Gateway**. |
| **03** | `Z = -60`, $X = -6$ | **Core 03: Distributed Architecture** | Suspended multi-cloud mesh (Java Core, AWS, Azure, GCP, K8s) demonstrating high-throughput event sourcing and consensus. |
| **04** | `Z = -90`, $X = +6$ | **Retrospective 04: Career Monoliths** | Monumental carbon pillars tracking career evolution from Foundations, Enterprise SaaS, Distributed Scale, to Autonomous AI. |
| **05** | `Z = -120`, $X = -6$ | **Monument 05: Claude Certified Architect** | Vaulted sanctuary with an oscillating golden octahedron prism and architectural tablet pylons detailing Anthropic architectural competencies. |
| **06** | `Z = -155`, $X = 0$ | **Observation 06: Transmission Horizon** | Cantilevered twilight observation terrace overlooking deep purple skies, housing interactive communication plinths for GitHub, LinkedIn, and Direct Email. |

---

## 🎮 Navigation & Controls

| Input Method | Action |
| :--- | :--- |
| **Scroll / Wheel** | Traverses forward and backward through the central corridor. |
| **Keyboard `W` / `S` or `↑` / `↓`** | Smooth forward/backward camera propulsion. |
| **Mouse Drag / Touch Swipe** | Spatial look, camera parallax, and corridor traversal on mobile devices. |
| **Click on Doorway / Bay Badge** | Triggers pneumatic door opening and initiates room entry camera dolly. |
| **`ESC` / In-Room HUD Button** | Seamlessly reverses room camera back into the main corridor at the exact sector bay. |
| **`Cmd + K` / `Ctrl + K`** | Opens the Warp Nav telemetry menu for instant jump navigation between sectors. |

---

## 🔊 Procedural Audio Synthesizer

Built with zero external audio assets using the pure Web Audio API (`AudioContext`):
- **Pneumatic Door Sliders:** Dual bandpass filter sweep with pink noise burst simulating air locks.
- **Room Transition Drones:** Low sub-bass resonant chord sweeps upon entering and exiting chambers.
- **Pedestal Node Pulses:** High-frequency sine pings for interactive inspection targets.
- **Audio HUD Toggle:** Instant ambient sound mute/unmute control in the top telemetry bar.

---

## 🛠️ Tech Stack & Implementation Details

- **Core Framework:** React 19 + TypeScript + Vite 8
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation Engine:** GSAP (GreenSock Animation Platform) for deterministic multi-axis camera rigs
- **Typography:** Troika Three Text (SDF font rendering with depth occlusion control)
- **Styling:** Tailwind CSS + Lucide React
- **Accessibility:** Screen-reader semantic tree (`SemanticA11yTree`) mirroring the 3D scene hierarchy

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Navigate to `http://localhost:5173`.

### Production Build
```bash
# Compile TypeScript & bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 🔗 Deep Linking Parameters

Direct URL parameters are supported for linking directly to specific coordinates and states:
- `?sector=1` — Jump directly to Sector 01 (Core Systems)
- `?room=systems` — Jump inside Sector 01
- `?room=ailab` — Jump inside Sector 02
- `?room=claude` — Jump inside the Claude Certified Architect sanctuary
- `?room=contact` — Jump to the Observation Deck
- `?overlay=qodeai` — Open the technical dossier overlay for QodeAI directly
