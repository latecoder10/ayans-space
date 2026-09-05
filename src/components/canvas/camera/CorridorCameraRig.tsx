import React, { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useScene } from '../../../context/SceneContext';
import { SECTOR_BAYS, SectorBay } from '../../../types/spatial';

export const CorridorCameraRig: React.FC = () => {
  const { camera } = useThree();
  const {
    mode,
    targetZ,
    setTargetZ,
    updateCameraZ,
    currentRoomId,
    distanceToClosestBay,
    closestBay,
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
  const lastReportedZ = useRef(20);
  const activeBayRef = useRef<SectorBay | null>(null);

  // Keyboard navigation tracking
  const keysDown = useRef<Set<string>>(new Set());

  // Helper: Clamp position within specific room boundaries
  const clampRoomPosition = useCallback((pos: THREE.Vector3, roomId: string | null) => {
    if (!roomId) return;
    const bay = SECTOR_BAYS.find((b) => b.id === roomId);
    if (!bay) return;

    if (bay.doorSide === 'left') {
      // Left rooms (Archive 01, Core 03, Monument 05)
      // Center: X = -14, Z = bay.doorZ
      pos.x = Math.max(-19.5, Math.min(-8.5, pos.x));
      pos.z = Math.max(bay.doorZ - 5.0, Math.min(bay.doorZ + 5.0, pos.z));
    } else if (bay.doorSide === 'right') {
      // Right rooms (AI Lab 02, Career 04)
      // Center: X = +14, Z = bay.doorZ
      pos.x = Math.max(8.5, Math.min(19.5, pos.x));
      pos.z = Math.max(bay.doorZ - 5.0, Math.min(bay.doorZ + 5.0, pos.z));
    } else if (bay.doorSide === 'center') {
      // Sector 06 Observation Deck
      // Center: X = 0, Z = -170
      pos.x = Math.max(-9.0, Math.min(9.0, pos.x));
      pos.z = Math.max(-178.0, Math.min(-160.0, pos.z));
    }
  }, []);

  // Initialize camera position based on initial URL parameters or state
  useEffect(() => {
    if (mode === 'room' && currentRoomId) {
      const bay = SECTOR_BAYS.find((b) => b.id === currentRoomId);
      if (bay) {
        let initX = 0;
        let initZ = bay.doorZ;
        let initYaw = 0;

        if (bay.doorSide === 'left') {
          initX = -10;
          initYaw = Math.PI / 2;
        } else if (bay.doorSide === 'right') {
          initX = 10;
          initYaw = -Math.PI / 2;
        } else if (bay.doorSide === 'center') {
          initX = 0;
          initZ = -162;
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

    currentPos.current.set(0, 1.7, targetZ);
    targetPos.current.set(0, 1.7, targetZ);
    yaw.current = 0;
    targetYaw.current = 0;
    pitch.current = 0;
    targetPitch.current = 0;
    camera.position.copy(currentPos.current);
  }, [camera, mode, currentRoomId, targetZ]);

  // Sync external warp targetZ (e.g. from Cmd+K quick travel)
  useEffect(() => {
    if (mode === 'corridor' && Math.abs(targetZ - targetPos.current.z) > 4) {
      targetPos.current.z = targetZ;
      targetPos.current.x = 0;
      targetYaw.current = 0;
    }
  }, [targetZ, mode]);

  // Pointer drag & trackpad listeners for free-look rotation
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Don't drag if clicking UI buttons, modals or inputs
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('.pointer-events-auto'))
      ) {
        return;
      }

      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      document.body.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };

      // Free look rotation: drag left turns left, drag up looks up
      targetYaw.current -= dx * 0.0035;
      targetPitch.current -= dy * 0.003;

      // Clamp pitch to prevent camera flip (~ -72 deg to +72 deg)
      targetPitch.current = Math.max(-1.25, Math.min(1.25, targetPitch.current));
    };

    const handlePointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = 'auto';
      }
    };

    // Trackpad two-finger pan (deltaX) & vertical scroll (deltaY)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Trackpad two-finger horizontal swipe -> smooth yaw rotation
      if (Math.abs(e.deltaX) > 0.5) {
        targetYaw.current -= e.deltaX * 0.0025;
      }

      // Vertical scroll / trackpad two-finger swipe
      if (mode === 'corridor') {
        const delta = e.deltaY * 0.025;
        targetPos.current.z = Math.min(22, Math.max(-155, targetPos.current.z - delta));
        setTargetZ(targetPos.current.z);
      } else if (mode === 'room') {
        // Dolly forward/backward in the current camera facing direction
        const moveDist = -e.deltaY * 0.015;
        const fwdX = -Math.sin(yaw.current);
        const fwdZ = -Math.cos(yaw.current);
        targetPos.current.x += fwdX * moveDist;
        targetPos.current.z += fwdZ * moveDist;
        clampRoomPosition(targetPos.current, currentRoomId);
      }
    };

    // Keyboard event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      keysDown.current.add(e.code);

      // Instant step fallback for arrow keys / page keys
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'PageUp') {
        if (mode === 'corridor') setTargetZ((prev) => prev + 1.5);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'PageDown') {
        if (mode === 'corridor') setTargetZ((prev) => prev - 1.5);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDown.current.delete(e.code);
    };

    // Touch event listeners for mobile free roaming
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartPos.current.x;
        const dy = e.touches[0].clientY - touchStartPos.current.y;
        touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        targetYaw.current -= dx * 0.005;
        targetPitch.current -= dy * 0.004;
        targetPitch.current = Math.max(-1.25, Math.min(1.25, targetPitch.current));

        // Touch drag up/down also propels forward/backward slightly
        if (mode === 'corridor') {
          targetPos.current.z += dy * 0.03;
          targetPos.current.z = Math.min(22, Math.max(-155, targetPos.current.z));
          setTargetZ(targetPos.current.z);
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
  }, [mode, setTargetZ, clampRoomPosition, currentRoomId]);

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
        targetX = -10;
        targetYawVal = Math.PI / 2; // Face into left room
      } else if (bay.doorSide === 'right') {
        targetX = 10;
        targetYawVal = -Math.PI / 2; // Face into right room
      } else if (bay.doorSide === 'center') {
        targetX = 0;
        targetRoomZ = -162;
        targetYawVal = 0; // Face toward twilight horizon
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
  useFrame(({ pointer }) => {
    // 1. Evaluate active keyboard inputs for continuous 3D locomotion
    const fwdX = -Math.sin(yaw.current);
    const fwdZ = -Math.cos(yaw.current);
    const rightX = Math.cos(yaw.current);
    const rightZ = -Math.sin(yaw.current);

    const moveSpeed = 0.12;
    let fwd = 0;
    let strafe = 0;

    if (keysDown.current.has('KeyW') || keysDown.current.has('ArrowUp')) fwd += 1;
    if (keysDown.current.has('KeyS') || keysDown.current.has('ArrowDown')) fwd -= 1;
    if (keysDown.current.has('KeyA')) strafe -= 1;
    if (keysDown.current.has('KeyD')) strafe += 1;

    // Arrow Left / Right turn view
    if (keysDown.current.has('ArrowLeft')) targetYaw.current += 0.035;
    if (keysDown.current.has('ArrowRight')) targetYaw.current -= 0.035;

    // Q / E turn view
    if (keysDown.current.has('KeyQ')) targetYaw.current += 0.04;
    if (keysDown.current.has('KeyE')) targetYaw.current -= 0.04;

    if (fwd !== 0 || strafe !== 0) {
      if (mode === 'corridor') {
        targetPos.current.x += (fwdX * fwd + rightX * strafe) * moveSpeed;
        targetPos.current.z += (fwdZ * fwd + rightZ * strafe) * moveSpeed;
        // Keep within corridor width bounds
        targetPos.current.x = Math.max(-3.0, Math.min(3.0, targetPos.current.x));
        targetPos.current.z = Math.max(-155, Math.min(22, targetPos.current.z));
        setTargetZ(targetPos.current.z);
      } else if (mode === 'room') {
        // True 3D first-person walking in room
        targetPos.current.x += (fwdX * fwd + rightX * strafe) * moveSpeed;
        targetPos.current.z += (fwdZ * fwd + rightZ * strafe) * moveSpeed;
        clampRoomPosition(targetPos.current, currentRoomId);
      }
    }

    // 2. Smoothly interpolate Euler angles (inertial dampening)
    yaw.current += (targetYaw.current - yaw.current) * 0.12;
    pitch.current += (targetPitch.current - pitch.current) * 0.12;

    // 3. Smoothly interpolate position (lerp)
    if (mode !== 'transitioning') {
      currentPos.current.lerp(targetPos.current, 0.1);
    }

    // 4. Subtle mouse parallax bias when NOT actively dragging
    const parallaxYaw = isDragging.current ? 0 : pointer.x * 0.08;
    const parallaxPitch = isDragging.current ? 0 : pointer.y * 0.06;

    // Optional gentle auto-glance bias towards door when walking near it in corridor
    let autoGlanceYaw = 0;
    if (
      mode === 'corridor' &&
      !isDragging.current &&
      Math.abs(yaw.current) < 0.4 &&
      closestBay &&
      distanceToClosestBay < 6
    ) {
      const intensity = (1 - distanceToClosestBay / 6) * 0.22;
      if (closestBay.doorSide === 'left') autoGlanceYaw = intensity;
      else if (closestBay.doorSide === 'right') autoGlanceYaw = -intensity;
    }

    const effectiveYaw = yaw.current + parallaxYaw + autoGlanceYaw;
    const effectivePitch = pitch.current + parallaxPitch;

    // 5. Compute forward look direction vector from spherical angles
    const cosP = Math.cos(effectivePitch);
    const sinP = Math.sin(effectivePitch);
    const cosY = Math.cos(effectiveYaw);
    const sinY = Math.sin(effectiveYaw);

    const dirX = -sinY * cosP;
    const dirY = sinP;
    const dirZ = -cosY * cosP;

    // 6. LookAt target 10 units forward along viewing direction
    const lookTarget = new THREE.Vector3(
      currentPos.current.x + dirX * 10,
      currentPos.current.y + dirY * 10,
      currentPos.current.z + dirZ * 10
    );

    camera.position.copy(currentPos.current);
    camera.lookAt(lookTarget);

    // 7. Report Z position to context throttled to avoid React thrashing
    if (mode === 'corridor' && Math.abs(currentPos.current.z - lastReportedZ.current) > 0.15) {
      lastReportedZ.current = currentPos.current.z;
      updateCameraZ(currentPos.current.z);
    }
  });

  return null;
};
