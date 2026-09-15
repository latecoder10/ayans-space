import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  pulsing: number;
  pulseSpeed: number;
}

interface LumosParticlesProps {
  wandActive?: boolean;
}

export const LumosParticles: React.FC<LumosParticlesProps> = ({ wandActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });
  const sparklesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Ambient dust motes (lightweight count for mobile & laptop efficiency)
    const ambientCount = Math.min(22, Math.floor(width / 45));
    const ambientParticles: Particle[] = [];
    const goldPalette = ['#FDE047', '#F5CE62', '#D4AF37', '#FFF4CC'];

    for (let i = 0; i < ambientCount; i++) {
      const baseAlpha = Math.random() * 0.5 + 0.2;
      ambientParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.1, // Gently drift up
        size: Math.random() * 2.2 + 0.8,
        alpha: baseAlpha,
        baseAlpha,
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        pulsing: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };

      // Spawn wand trail spark if wand is active
      if (wandActive && Math.random() > 0.4) {
        sparklesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.6,
          size: Math.random() * 3 + 1.2,
          alpha: 1,
          baseAlpha: 1,
          color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
          pulsing: 0,
          pulseSpeed: 0.08,
        });

        // Cap sparks
        if (sparklesRef.current.length > 50) {
          sparklesRef.current.shift();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!wandActive) return;
      // Stardust burst on click
      for (let i = 0; i < 14; i++) {
        const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 3.5 + 1.2;
        sparklesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.5,
          alpha: 1,
          baseAlpha: 1,
          color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
          pulsing: 0,
          pulseSpeed: 0.04,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render ambient floating embers
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulsing += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsing) * 0.25;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowColor = '#F5CE62';
        ctx.shadowBlur = p.size * 4;
        ctx.fill();
        ctx.restore();
      }

      // 2. Render wand sparkles
      for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
        const s = sparklesRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.size *= 0.94;
        s.alpha -= 0.025;

        if (s.alpha <= 0.05 || s.size <= 0.3) {
          sparklesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.shadowColor = '#FDE047';
        ctx.shadowBlur = s.size * 6;
        ctx.fill();
        ctx.restore();
      }

      // 3. Subtle wand cursor aura
      if (wandActive && mouseRef.current.active) {
        ctx.save();
        const radGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          36
        );
        radGrad.addColorStop(0, 'rgba(253, 224, 71, 0.28)');
        radGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.08)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [wandActive]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
