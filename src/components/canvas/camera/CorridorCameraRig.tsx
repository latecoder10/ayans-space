import React, { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useScene } from '../../../context/SceneContext';
import { SECTOR_BAYS, SectorBay } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';

export const CorridorCameraRig: React.FC = () => {
  const { camera } = useThree();
  const {
    mode,
    targetZ,
    updateCameraZ,
    currentRoomId,
    closestBay,
    castActiveSpell,
    isEntranceIntroOpen,
  } = useScene();

  // Position references
  const currentPos = useRef(new THREE.Vector3(0, 1.7, 20));
  const targetPos = useRef(new THREE.Vector3(0, 1.7, 20));

  // Orientation references (in radians)
  // yaw: 0 = facing negative Z (down the corridor)
  // pitch: 0 = level horizon
  const yaw = useRef(0);
  const pitch = useRef(0);
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);

  // Dragging & free-look state
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const touchStartPos = useRef({ x: 0, y: 0 });
  const pointerStartTime = useRef(0);
  const pointerStartCoord = useRef({ x: 0, y: 0 });
  const lastReportedZ = useRef(20);
  const activeBayRef = useRef<SectorBay | null>(null);
  const walkTimer = useRef(0);

  // Keyboard navigation tracking
  const keysDown = useRef<Set<string>>(new Set());

  // Reusable vector for look target to prevent per-frame garbage collection
  const lookTarget = useRef(new THREE.Vector3());

  // Helper: Clamp position within specific room boundaries
  const clampRoomPosition = useCallback((pos: THREE.Vector3, roomId: string | null) => {
    if (!roomId) return;
    const bay = SECTOR_BAYS.find((b) => b.id === roomId);
    if (!bay) return;

    if (bay.doorSide === 'left') {
      // Left rooms (Archive 01, Core 03, Monument 05)
      // Center: X = -10, Door at X = -4
      pos.x = Math.max(-14.5, Math.min(-6.2, pos.x));
      pos.z = Math.max(bay.doorZ - 4.5, Math.min(bay.doorZ + 4.5, pos.z));
    } else if (bay.doorSide === 'right') {
      // Right rooms (AI Lab 02, Career 04)
      // Center: X = +10, Door at X = +4
      pos.x = Math.max(6.2, Math.min(14.5, pos.x));
      pos.z = Math.max(bay.doorZ - 4.5, Math.min(bay.doorZ + 4.5, pos.z));
    } else if (bay.doorSide === 'center') {
      // Sector 06 Contact Horizon Platform & Observation Deck
      // Center: X = 0, Z = -166, Deck radius = 10.5m
      pos.x = Math.max(-8.5, Math.min(8.5, pos.x));
      pos.z = Math.max(-173.0, Math.min(-153.0, pos.z));
    }
  }, []);

  // Initialize camera position once on mount or when room mode changes
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (mode === 'room' && currentRoomId) {
      const bay = SECTOR_BAYS.find((b) => b.id === currentRoomId);
      if (bay) {
        let initX = 0;
        let initZ = bay.doorZ;
        let initYaw = 0;

        if (bay.doorSide === 'left') {
          initX = -6.8;
          initYaw = Math.PI / 2;
        } else if (bay.doorSide === 'right') {
          initX = 6.8;
          initYaw = -Math.PI / 2;
        } else if (bay.doorSide === 'center') {
          initX = 0;
          initZ = -158.5;
          initYaw = 0;
        }

        currentPos.current.set(initX, 1.7, initZ);
        targetPos.current.set(initX, 1.7, initZ);
        yaw.current = initYaw;
        targetYaw.current = initYaw;
        pitch.current = 0;
        targetPitch.current = 0;

        camera.position.copy(currentPos.current);
        return;
      }
    }

    if (!hasInitialized.current) {
      currentPos.current.set(0, 1.7, targetZ);
      targetPos.current.set(0, 1.7, targetZ);
      yaw.current = 0;
      targetYaw.current = 0;
      pitch.current = 0;
      targetPitch.current = 0;
      camera.position.copy(currentPos.current);
      hasInitialized.current = true;
    }
  }, [camera, mode, currentRoomId, targetZ]);

  // Smoothly glide to warp targetZ (e.g. from Cmd+K quick travel or UI sector jumps)
  useEffect(() => {
    if (mode === 'corridor' && Math.abs(targetZ - targetPos.current.z) > 1.5) {
      // Instead of an abrupt jump that causes screen trembling, smoothly glide to the target
      targetPos.current.z = targetZ;
      targetPos.current.x = 0;
      targetYaw.current = 0;
    }
  }, [targetZ, mode]);

  // Pointer drag & trackpad listeners for free-look rotation
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Don't drag if clicking UI buttons, modals, overlays or inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('#in-game-dossier-popover') ||
          target.closest('.pointer-events-auto:not(#root canvas)'))
      ) {
        return;
      }

      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      pointerStartTime.current = Date.now();
      pointerStartCoord.current = { x: e.clientX, y: e.clientY };
      document.body.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };

      // Free look rotation: clean, responsive, natural sensitivity
      targetYaw.current -= dx * 0.0025;
      targetPitch.current -= dy * 0.002;

      // Restrict pitch to gentle eye-level angles (-30 deg to +30 deg) so users never get disoriented
      targetPitch.current = Math.max(-0.55, Math.min(0.55, targetPitch.current));
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = 'auto';

        const elapsed = Date.now() - pointerStartTime.current;
        const dist = Math.hypot(e.clientX - pointerStartCoord.current.x, e.clientY - pointerStartCoord.current.y);
        // Quick click without dragging casts the active spell!
        if (elapsed < 280 && dist < 8 && !isEntranceIntroOpen) {
          castActiveSpell();
        }
      }
    };

    // Smooth forward/backward wheel navigation without cross-axis yaw twisting
    const handleWheel = (e: WheelEvent) => {
      // Allow natural scrolling on DOM popups, modals, drawers, and scroll containers
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('#in-game-dossier-popover') ||
          target.closest('.overflow-y-auto') ||
          target.closest('.overflow-auto') ||
          target.closest('[data-scrollable="true"]') ||
          target.closest('.pointer-events-auto:not(#root canvas)'))
      ) {
        return;
      }

      e.preventDefault();

      // Clamp wheel delta to prevent sudden huge jumps
      const clampedDeltaY = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 50);

      if (mode === 'corridor') {
        const delta = clampedDeltaY * 0.035;
        targetPos.current.z = Math.min(22, Math.max(-149.2, targetPos.current.z - delta));
      } else if (mode === 'room') {
        const moveDist = -clampedDeltaY * 0.02;
        const fwdX = -Math.sin(yaw.current);
        const fwdZ = -Math.cos(yaw.current);
        targetPos.current.x += fwdX * moveDist;
        targetPos.current.z += fwdZ * moveDist;
        clampRoomPosition(targetPos.current, currentRoomId);
      }
    };

    // Keyboard event listeners - register keys cleanly without conflicting instant jumps
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      keysDown.current.add(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDown.current.delete(e.code);
    };

    // Mobile touch controls: smooth, predictable, no dizzying pitch twists
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('#in-game-dossier-popover') ||
          target.closest('.overflow-y-auto') ||
          target.closest('.pointer-events-auto:not(#root canvas)'))
      ) {
        return;
      }

      if (e.touches.length === 1) {
        touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('#in-game-dossier-popover') ||
          target.closest('.overflow-y-auto') ||
          target.closest('.pointer-events-auto:not(#root canvas)'))
      ) {
        return;
      }

      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartPos.current.x;
        const dy = e.touches[0].clientY - touchStartPos.current.y;
        touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        // Horizontal swipe smoothly turns view
        targetYaw.current -= dx * 0.003;

        // Vertical swipe glides forward/backward along line of sight, with zero pitch distortion
        if (mode === 'corridor') {
          targetPos.current.z += dy * 0.035;
          targetPos.current.z = Math.min(22, Math.max(-155, targetPos.current.z));
        } else if (mode === 'room') {
          const fwdX = -Math.sin(yaw.current);
          const fwdZ = -Math.cos(yaw.current);
          targetPos.current.x += fwdX * (-dy * 0.02);
          targetPos.current.z += fwdZ * (-dy * 0.02);
          clampRoomPosition(targetPos.current, currentRoomId);
        }
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.cursor = 'auto';
    };
  }, [mode, clampRoomPosition, currentRoomId]);

  // Handle Room Transitions with GSAP
  useEffect(() => {
    if (mode === 'transitioning' && currentRoomId) {
      const bay = SECTOR_BAYS.find((b) => b.id === currentRoomId);
      if (!bay) return;
      activeBayRef.current = bay;

      let targetX = 0;
      let targetRoomZ = bay.doorZ;
      let targetYawVal = 0;

      if (bay.doorSide === 'left') {
        targetX = -6.8;
        targetYawVal = Math.PI / 2; // Face straight into left room exhibits
      } else if (bay.doorSide === 'right') {
        targetX = 6.8;
        targetYawVal = -Math.PI / 2; // Face straight into right room exhibits
      } else if (bay.doorSide === 'center') {
        targetX = 0;
        targetRoomZ = -158.5;
        targetYawVal = 0; // Face forward toward observation deck, terminals & horizon
      }

      // Smoothly fly camera to room interior
      gsap.to(currentPos.current, {
        x: targetX,
        y: 1.7,
        z: targetRoomZ,
        duration: 1.2,
        ease: 'power2.inOut',
      });

      gsap.to(yaw, {
        current: targetYawVal,
        duration: 1.2,
        ease: 'power2.inOut',
      });

      gsap.to(pitch, {
        current: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      });

      // Synchronize targets for seamless control take-over after animation
      targetPos.current.set(targetX, 1.7, targetRoomZ);
      targetYaw.current = targetYawVal;
      targetPitch.current = 0;
    } else if (mode === 'transitioning' && !currentRoomId) {
      // Exiting room back to corridor
      const bay = activeBayRef.current || closestBay || SECTOR_BAYS[0];

      gsap.to(currentPos.current, {
        x: 0,
        y: 1.7,
        z: bay.doorZ,
        duration: 1.0,
        ease: 'power2.inOut',
      });

      gsap.to(yaw, {
        current: 0, // Face down corridor
        duration: 1.0,
        ease: 'power2.inOut',
      });

      gsap.to(pitch, {
        current: 0,
        duration: 1.0,
        ease: 'power2.inOut',
      });

      targetPos.current.set(0, 1.7, bay.doorZ);
      targetYaw.current = 0;
      targetPitch.current = 0;
    }
  }, [mode, currentRoomId, closestBay]);

  // Main Render Frame: Locomotion, Free Look Interpolation, and Camera Rigging
  useFrame((_, delta) => {
    // 1. Evaluate active keyboard inputs for continuous 3D locomotion (frame-rate independent)
    const fwdX = -Math.sin(yaw.current);
    const fwdZ = -Math.cos(yaw.current);
    const rightX = Math.cos(yaw.current);
    const rightZ = -Math.sin(yaw.current);

    const isSprinting = keysDown.current.has('ShiftLeft') || keysDown.current.has('ShiftRight');
    // Consistent movement speed based on actual delta time
    const moveSpeed = (isSprinting ? 16.0 : 10.5) * delta;
    let fwd = 0;
    let strafe = 0;

    if (keysDown.current.has('KeyW') || keysDown.current.has('ArrowUp')) fwd += 1;
    if (keysDown.current.has('KeyS') || keysDown.current.has('ArrowDown')) fwd -= 1;
    if (keysDown.current.has('KeyA')) strafe -= 1;
    if (keysDown.current.has('KeyD')) strafe += 1;

    // Arrow Left / Right turn view smoothly
    if (keysDown.current.has('ArrowLeft') || keysDown.current.has('KeyQ')) targetYaw.current += 1.8 * delta;
    if (keysDown.current.has('ArrowRight') || keysDown.current.has('KeyE')) targetYaw.current -= 1.8 * delta;

    const isMoving = fwd !== 0 || strafe !== 0;
    if (isMoving) {
      soundEngine.playStep(isSprinting);
      walkTimer.current += delta * (isSprinting ? 12 : 8);

      if (mode === 'corridor') {
        targetPos.current.x += (fwdX * fwd + rightX * strafe) * moveSpeed;
        targetPos.current.z += (fwdZ * fwd + rightZ * strafe) * moveSpeed;
        // Keep within corridor width bounds and allow traversal forward to Castle Forecourt (Z = 35.5)
        targetPos.current.x = Math.max(-2.8, Math.min(2.8, targetPos.current.x));
        targetPos.current.z = Math.max(-149.2, Math.min(35.5, targetPos.current.z));
      } else if (mode === 'room') {
        targetPos.current.x += (fwdX * fwd + rightX * strafe) * moveSpeed;
        targetPos.current.z += (fwdZ * fwd + rightZ * strafe) * moveSpeed;
        clampRoomPosition(targetPos.current, currentRoomId);
      }
    } else {
      walkTimer.current = THREE.MathUtils.lerp(walkTimer.current, 0, delta * 4);
    }

    // 2. Snappy, smooth rotation dampening without sluggish lag
    const rotLerp = Math.min(1, delta * 14);
    yaw.current += (targetYaw.current - yaw.current) * rotLerp;
    pitch.current += (targetPitch.current - pitch.current) * rotLerp;

    // 3. Smooth position interpolation (lerp)
    if (mode !== 'transitioning') {
      const posLerp = Math.min(1, delta * 10);
      currentPos.current.lerp(targetPos.current, posLerp);
    }

    // Organic first-person head bobbing inspired by hogwarts-3d/src/player.js
    const headBob = Math.sin(walkTimer.current) * (isSprinting ? 0.03 : 0.018);

    // 4. Clean, level-headed viewing angles (NO erratic parallax or sudden head-jerking auto-glance)
    const effectiveYaw = yaw.current;
    const effectivePitch = pitch.current;

    // 5. Compute forward look direction vector from spherical angles
    const cosP = Math.cos(effectivePitch);
    const sinP = Math.sin(effectivePitch);
    const cosY = Math.cos(effectiveYaw);
    const sinY = Math.sin(effectiveYaw);

    const dirX = -sinY * cosP;
    const dirY = sinP;
    const dirZ = -cosY * cosP;

    // 6. LookAt target forward along viewing direction using reusable vector (no GC stutter)
    lookTarget.current.set(
      currentPos.current.x + dirX * 10,
      currentPos.current.y + headBob + dirY * 10,
      currentPos.current.z + dirZ * 10
    );

    camera.position.set(
      currentPos.current.x,
      currentPos.current.y + headBob,
      currentPos.current.z
    );
    camera.lookAt(lookTarget.current);

    // 7. Report Z position to context throttled to avoid React thrashing
    if (mode === 'corridor' && Math.abs(currentPos.current.z - lastReportedZ.current) > 0.15) {
      lastReportedZ.current = currentPos.current.z;
      updateCameraZ(currentPos.current.z);
    }
  });

  return null;
};
