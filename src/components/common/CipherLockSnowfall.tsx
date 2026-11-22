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
  colorType: 'cyan' | 'emerald' | 'blue';
  rotation: number;
  rotationSpeed: number;
}

const CIPHER_CHARS = ['0', '1', '7', '9', '3', '8', 'A', 'F', 'X', 'B', 'E', '%', '#', '$', '*', '&'];

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

    // Mouse coordinates for gentle interactive breeze
    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Density based on screen size
    const particleCount = width < 768 ? 22 : 44;

    const createParticle = (initialY?: number): Particle => {
      const baseX = Math.random() * width;
      const size = 11 + Math.random() * 8; // 11px to 19px
      const colorRand = Math.random();
      const colorType: 'cyan' | 'emerald' | 'blue' =
        colorRand > 0.4 ? 'cyan' : colorRand > 0.2 ? 'emerald' : 'blue';

      return {
        x: baseX,
        y: initialY !== undefined ? initialY : Math.random() * height,
        baseX,
        speedY: 0.35 + Math.random() * 0.65, // slow, gentle snow drift
        swaySpeed: 0.01 + Math.random() * 0.018,
        swayAmount: 14 + Math.random() * 26,
        angle: Math.random() * Math.PI * 2,
        size,
        char: CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)],
        scrambleTimer: 0,
        scrambleSpeed: 6 + Math.floor(Math.random() * 8),
        phase: Math.random() > 0.5 ? 'number' : 'lock',
        phaseTimer: Math.floor(Math.random() * 120),
        morphProgress: 0,
        alpha: 0.1 + Math.random() * 0.2,
        maxAlpha: 0.45 + Math.random() * 0.4, // subtle, not glaring
        colorType,
        rotation: (Math.random() - 0.5) * 0.2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
      };
    };

    const particles: Particle[] = Array.from({ length: particleCount }, () =>
      createParticle()
    );

    // Helper: Draw stylized cyber padlock directly with vector canvas path
    const drawPadlock = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number,
      colorType: 'cyan' | 'emerald' | 'blue',
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
          : isLight ? '#2563eb' : '#60a5fa';

      const glowColor =
        colorType === 'cyan'
          ? 'rgba(56, 189, 248, 0.7)'
          : colorType === 'emerald'
          ? 'rgba(52, 211, 153, 0.7)'
          : 'rgba(96, 165, 250, 0.7)';

      pCtx.shadowColor = glowColor;
      pCtx.shadowBlur = 8 * morphFactor;

      const scale = 0.8 + 0.2 * morphFactor;
      pCtx.scale(scale, scale);

      const w = size * 0.95;
      const h = size * 0.8;
      const shackleRadius = w * 0.32;

      // 1. Shackle (Lengkungan Kunci Gembok)
      pCtx.beginPath();
      pCtx.lineWidth = Math.max(1.4, size * 0.16);
      pCtx.strokeStyle = primaryColor;
      pCtx.lineCap = 'round';
      // Arched shackle
      pCtx.arc(0, -h * 0.38, shackleRadius, Math.PI, 0, false);
      pCtx.lineTo(shackleRadius, -h * 0.08);
      pCtx.stroke();

      // 2. Padlock Body (Badan Gembok Persegi Membulat)
      pCtx.beginPath();
      const bodyW = w * 0.92;
      const bodyH = h * 0.72;
      const radius = 3;
      pCtx.fillStyle = isLight ? 'rgba(241, 245, 249, 0.95)' : 'rgba(15, 23, 42, 0.85)';
      pCtx.roundRect(-bodyW / 2, -h * 0.1, bodyW, bodyH, radius);
      pCtx.fill();

      pCtx.lineWidth = 1.2;
      pCtx.strokeStyle = primaryColor;
      pCtx.stroke();

      // 3. Keyhole (Lubang Kunci Bersinar)
      pCtx.beginPath();
      pCtx.fillStyle = primaryColor;
      pCtx.arc(0, h * 0.16, Math.max(1.1, size * 0.09), 0, Math.PI * 2);
      pCtx.fill();

      pCtx.beginPath();
      pCtx.moveTo(-size * 0.045, h * 0.2);
      pCtx.lineTo(size * 0.045, h * 0.2);
      pCtx.lineTo(size * 0.07, h * 0.38);
      pCtx.lineTo(-size * 0.07, h * 0.38);
      pCtx.closePath();
      pCtx.fill();

      pCtx.restore();
    };

    // Helper: Draw Cipher character
    const drawCipher = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      char: string,
      size: number,
      alpha: number,
      colorType: 'cyan' | 'emerald' | 'blue',
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
          : isLight ? '#2563eb' : '#60a5fa';

      const glowColor =
        colorType === 'cyan'
          ? 'rgba(56, 189, 248, 0.6)'
          : colorType === 'emerald'
          ? 'rgba(52, 211, 153, 0.6)'
          : 'rgba(96, 165, 250, 0.6)';

      pCtx.shadowColor = glowColor;
      pCtx.shadowBlur = 6;
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
        // Fall down
        p.y += p.speedY;
        p.angle += p.swaySpeed;
        p.rotation += p.rotationSpeed;

        // Sine wave swaying left and right
        p.x = p.baseX + Math.sin(p.angle) * p.swayAmount;

        // Subtle interactive mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          const force = (90 - dist) / 90;
          p.baseX += (dx / (dist || 1)) * force * 1.5;
        }

        // Cipher scrambling timer
        p.scrambleTimer++;
        if (p.scrambleTimer >= p.scrambleSpeed) {
          p.scrambleTimer = 0;
          p.char = CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
        }

        // State Machine Lifecycle:
        // 1. 'number': drifts down as scrambled cipher number
        // 2. 'morph': smoothly transitions into a lock
        // 3. 'lock': drifts as a glowing padlock
        // 4. 'fade': dissolves/disappears into background
        p.phaseTimer++;

        if (p.phase === 'number') {
          // Fade in gently as it enters from top
          if (p.alpha < p.maxAlpha) {
            p.alpha = Math.min(p.maxAlpha, p.alpha + 0.015);
          }

          drawCipher(ctx, p.x, p.y, p.char, p.size, p.alpha, p.colorType, p.rotation);

          // After some drift (~100-180 frames), begin morphing into padlock
          if (p.phaseTimer > 110 + (p.baseX % 70)) {
            p.phase = 'morph';
            p.phaseTimer = 0;
            p.morphProgress = 0;
          }
        } else if (p.phase === 'morph') {
          p.morphProgress += 0.04;

          // Cross-fade between scrambling number and vector padlock
          const numberAlpha = p.alpha * Math.max(0, 1 - p.morphProgress * 1.3);
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

          // Hold padlock for a while (~90-150 frames), then start fading out
          if (p.phaseTimer > 100 + (p.baseX % 60)) {
            p.phase = 'fade';
          }
        } else if (p.phase === 'fade') {
          p.alpha -= 0.008; // smooth dissolve
          if (p.alpha > 0) {
            drawPadlock(ctx, p.x, p.y, p.size, p.alpha, p.colorType, 1, p.rotation);
          } else {
            // Reset particle back to the top
            Object.assign(p, createParticle(-25));
          }
        }

        // Reset if drifted beyond bottom edge
        if (p.y > height + 30) {
          Object.assign(p, createParticle(-25));
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
