'use client';

import React, { useEffect, useRef } from 'react';
import { useSandboxStore } from '@/stores/useSandboxStore';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  speedY: number;
  swaySpeed: number;
  swayAmount: number;
  angle: number;
  size: number;
  char: string;
  scrambleTimer: number;
  scrambleSpeed: number;
  phase: 'number' | 'morph' | 'lock' | 'fade';
  phaseTimer: number;
  morphProgress: number; // 0 -> 1 during transition
  alpha: number;
  maxAlpha: number;
  colorType: 'cyan' | 'emerald' | 'violet' | 'amber';
  rotation: number;
  rotationSpeed: number;
  fallsToBottom: boolean; // True: travels all the way down past the screen edge!
  depth: 'foreground' | 'midground' | 'background';
}

const CIPHER_CHARS = ['0', '1', '0', '1', '01', '10', '7', '9', '3', '8', 'A', 'F', 'X', 'B', 'E', '%', '#', '$', '*', '&'];

export const CipherLockSnowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { snowfallEnabled, themeMode } = useSandboxStore();
  const isLight = themeMode === 'light';

  useEffect(() => {
    if (!snowfallEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Interactive pointer coordinates
    let pointerX = -1000;
    let pointerY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        pointerX = e.touches[0].clientX;
        pointerY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        pointerX = (e as MouseEvent).clientX;
        pointerY = (e as MouseEvent).clientY;
      }
    };

    const handlePointerLeave = () => {
      pointerX = -1000;
      pointerY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchend', handlePointerLeave);

    // Dynamic density: Mobile ~36, Tablet ~55, Laptop/Desktop ~80
    const getParticleCount = (w: number) => {
      if (w < 640) return 36;
      if (w < 1024) return 55;
      return 82;
    };

    const particleCount = getParticleCount(width);

    const createParticle = (initialY?: number): Particle => {
      const baseX = Math.random() * width;
      const depthRand = Math.random();
      
      let depth: 'foreground' | 'midground' | 'background';
      let size: number;
      let speedY: number;
      let maxAlpha: number;

      if (depthRand > 0.65) {
        // Foreground (large, bright, fast, falls boldly)
        depth = 'foreground';
        size = 16 + Math.random() * 6; // 16 - 22px
        speedY = 0.75 + Math.random() * 0.7; // 0.75 - 1.45 px/frame
        maxAlpha = 0.7 + Math.random() * 0.25; // 0.70 - 0.95
      } else if (depthRand > 0.3) {
        // Midground
        depth = 'midground';
        size = 12 + Math.random() * 4; // 12 - 16px
        speedY = 0.5 + Math.random() * 0.45;
        maxAlpha = 0.5 + Math.random() * 0.25;
      } else {
        // Background (small, soft atmospheric drift)
        depth = 'background';
        size = 9 + Math.random() * 3; // 9 - 12px
        speedY = 0.3 + Math.random() * 0.3;
        maxAlpha = 0.35 + Math.random() * 0.2;
      }

      const colorRand = Math.random();
      const colorType: 'cyan' | 'emerald' | 'violet' | 'amber' =
        colorRand > 0.5 ? 'cyan' : colorRand > 0.25 ? 'emerald' : colorRand > 0.1 ? 'violet' : 'amber';

      // 50% of all particles will fall all the way to the very bottom of the screen!
      const fallsToBottom = Math.random() < 0.52;

      return {
        x: baseX,
        y: initialY !== undefined ? initialY : Math.random() * height,
        baseX,
        speedY,
        swaySpeed: 0.012 + Math.random() * 0.02,
        swayAmount: 15 + Math.random() * 30,
        angle: Math.random() * Math.PI * 2,
        size,
        char: CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)],
        scrambleTimer: 0,
        scrambleSpeed: 5 + Math.floor(Math.random() * 9),
        phase: Math.random() > 0.45 ? 'number' : 'lock',
        phaseTimer: Math.floor(Math.random() * 100),
        morphProgress: 0,
        alpha: 0.1 + Math.random() * 0.2,
        maxAlpha,
        colorType,
        rotation: (Math.random() - 0.5) * 0.25,
        rotationSpeed: (Math.random() - 0.5) * 0.006,
        fallsToBottom,
        depth,
      };
    };

    const particles: Particle[] = Array.from({ length: particleCount }, () =>
      createParticle()
    );

    // Draw Vector Padlock
    const drawPadlock = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number,
      colorType: 'cyan' | 'emerald' | 'violet' | 'amber',
      morphFactor: number,
      rot: number
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(rot);
      pCtx.globalAlpha = Math.max(0, Math.min(1, alpha));

      const primaryColor =
        colorType === 'cyan'
          ? isLight ? '#0284c7' : '#38bdf8'
          : colorType === 'emerald'
          ? isLight ? '#059669' : '#34d399'
          : colorType === 'violet'
          ? isLight ? '#7c3aed' : '#a78bfa'
          : isLight ? '#d97706' : '#fbbf24';

      const glowColor =
        colorType === 'cyan'
          ? 'rgba(56, 189, 248, 0.8)'
          : colorType === 'emerald'
          ? 'rgba(52, 211, 153, 0.8)'
          : colorType === 'violet'
          ? 'rgba(167, 139, 250, 0.8)'
          : 'rgba(251, 191, 36, 0.8)';

      pCtx.shadowColor = glowColor;
      pCtx.shadowBlur = 10 * morphFactor;

      const scale = 0.85 + 0.15 * morphFactor;
      pCtx.scale(scale, scale);

      const w = size * 0.95;
      const h = size * 0.82;
      const shackleRadius = w * 0.32;

      // 1. Shackle
      pCtx.beginPath();
      pCtx.lineWidth = Math.max(1.5, size * 0.17);
      pCtx.strokeStyle = primaryColor;
      pCtx.lineCap = 'round';
      pCtx.arc(0, -h * 0.38, shackleRadius, Math.PI, 0, false);
      pCtx.lineTo(shackleRadius, -h * 0.08);
      pCtx.stroke();

      // 2. Padlock Body
      pCtx.beginPath();
      const bodyW = w * 0.92;
      const bodyH = h * 0.74;
      const radius = 3.5;
      pCtx.fillStyle = isLight ? 'rgba(241, 245, 249, 0.95)' : 'rgba(15, 23, 42, 0.88)';
      pCtx.roundRect(-bodyW / 2, -h * 0.1, bodyW, bodyH, radius);
      pCtx.fill();

      pCtx.lineWidth = 1.3;
      pCtx.strokeStyle = primaryColor;
      pCtx.stroke();

      // 3. Keyhole Dot & Slot
      pCtx.beginPath();
      pCtx.fillStyle = primaryColor;
      pCtx.arc(0, h * 0.16, Math.max(1.2, size * 0.095), 0, Math.PI * 2);
      pCtx.fill();

      pCtx.beginPath();
      pCtx.moveTo(-size * 0.05, h * 0.2);
      pCtx.lineTo(size * 0.05, h * 0.2);
      pCtx.lineTo(size * 0.075, h * 0.4);
      pCtx.lineTo(-size * 0.075, h * 0.4);
      pCtx.closePath();
      pCtx.fill();

      pCtx.restore();
    };

    // Draw Cipher Character
    const drawCipher = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      char: string,
      size: number,
      alpha: number,
      colorType: 'cyan' | 'emerald' | 'violet' | 'amber',
      rot: number
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(rot);
      pCtx.globalAlpha = Math.max(0, Math.min(1, alpha));

      const charColor =
        colorType === 'cyan'
          ? isLight ? '#0284c7' : '#38bdf8'
          : colorType === 'emerald'
          ? isLight ? '#059669' : '#34d399'
          : colorType === 'violet'
          ? isLight ? '#7c3aed' : '#a78bfa'
          : isLight ? '#d97706' : '#fbbf24';

      const glowColor =
        colorType === 'cyan'
          ? 'rgba(56, 189, 248, 0.75)'
          : colorType === 'emerald'
          ? 'rgba(52, 211, 153, 0.75)'
          : colorType === 'violet'
          ? 'rgba(167, 139, 250, 0.75)'
          : 'rgba(251, 191, 36, 0.75)';

      pCtx.shadowColor = glowColor;
      pCtx.shadowBlur = 8;
      pCtx.font = `bold ${Math.round(size)}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      pCtx.fillStyle = charColor;
      pCtx.textAlign = 'center';
      pCtx.textBaseline = 'middle';
      pCtx.fillText(char, 0, 0);

      pCtx.restore();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Fall down velocity
        p.y += p.speedY;
        p.angle += p.swaySpeed;
        p.rotation += p.rotationSpeed;

        // Gentle horizontal sway
        p.x = p.baseX + Math.sin(p.angle) * p.swayAmount;

        // Pointer repulsion (mouse or mobile touch)
        const dx = p.x - pointerX;
        const dy = p.y - pointerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.baseX += (dx / (dist || 1)) * force * 2;
        }

        // Cipher scrambling timer
        p.scrambleTimer++;
        if (p.scrambleTimer >= p.scrambleSpeed) {
          p.scrambleTimer = 0;
          p.char = CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
        }

        p.phaseTimer++;

        // Lifecycle handling
        if (p.phase === 'number') {
          // Fade in as it descends from top
          if (p.alpha < p.maxAlpha) {
            p.alpha = Math.min(p.maxAlpha, p.alpha + 0.02);
          }

          drawCipher(ctx, p.x, p.y, p.char, p.size, p.alpha, p.colorType, p.rotation);

          // Transition to morph
          if (p.phaseTimer > 80 + (p.baseX % 60)) {
            p.phase = 'morph';
            p.phaseTimer = 0;
            p.morphProgress = 0;
          }
        } else if (p.phase === 'morph') {
          p.morphProgress += 0.045;

          const numberAlpha = p.alpha * Math.max(0, 1 - p.morphProgress * 1.25);
          const lockAlpha = p.alpha * Math.min(1, p.morphProgress * 1.2);

          if (numberAlpha > 0.02) {
            drawCipher(ctx, p.x, p.y, p.char, p.size, numberAlpha, p.colorType, p.rotation);
          }
          if (lockAlpha > 0.02) {
            drawPadlock(ctx, p.x, p.y, p.size, lockAlpha, p.colorType, p.morphProgress, p.rotation);
          }

          if (p.morphProgress >= 1) {
            p.phase = 'lock';
            p.phaseTimer = 0;
          }
        } else if (p.phase === 'lock') {
          drawPadlock(ctx, p.x, p.y, p.size, p.alpha, p.colorType, 1, p.rotation);

          // If fallsToBottom is FALSE, fade out mid-screen to create depth
          if (!p.fallsToBottom && p.phaseTimer > 120 + (p.baseX % 70)) {
            p.phase = 'fade';
          }
          // If fallsToBottom is TRUE, it stays locked and keeps falling all the way to the bottom!
        } else if (p.phase === 'fade') {
          p.alpha -= 0.007; // Smooth dissolve
          if (p.alpha > 0) {
            drawPadlock(ctx, p.x, p.y, p.size, p.alpha, p.colorType, 1, p.rotation);
          } else {
            // Reset to top
            Object.assign(p, createParticle(-30));
          }
        }

        // Reset when it falls completely past the bottom of the screen (for laptop, tablet, phone)
        if (p.y > height + 25) {
          Object.assign(p, createParticle(-30));
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
    };
  }, [snowfallEnabled, isLight]);

  if (!snowfallEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
