'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Cpu } from 'lucide-react';
import { StickmanShatterRebuilder } from '@/components/stickman/StickmanShatterRebuilder';
import { StickmanTabOrganizer } from '@/components/stickman/StickmanTabOrganizer';
import { useSandboxStore } from '@/stores/useSandboxStore';

interface TabTransitionWrapperProps {
  activeTab: string;
  children: React.ReactNode;
}

export const TabTransitionWrapper: React.FC<TabTransitionWrapperProps> = ({
  activeTab,
  children,
}) => {
  const { themeMode, shatterCount } = useSandboxStore();
  const isLight = themeMode === 'light';

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [contentTranslate, setContentTranslate] = useState(0);

  // Card Shatter & Stickmen Rebuilder Active State
  const [isShatterActive, setIsShatterActive] = useState(false);
  const [stickmanHudVisible, setStickmanHudVisible] = useState(false);
  const [stickmanHudStep, setStickmanHudStep] = useState<'scatter' | 'aligning' | 'locked'>('scatter');

  const prevTabRef = useRef(activeTab);
  const prevShatterCountRef = useRef(shatterCount);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  // Trigger function for Shatter & Rebuild sequence
  const executeShatterRebuildSequence = useCallback(() => {
    // 1. Begin Tab Telemetry Loading Beam & 2. Activate Stickman Shatter Theatre
    const tInit = setTimeout(() => {
      setIsBarVisible(true);
      setLoadingProgress(15);
      setContentOpacity(0.5);
      setContentTranslate(4);
      setIsShatterActive(true);
      setStickmanHudVisible(true);
      setStickmanHudStep('scatter');
    }, 0);

    // 3. Staggered Progress and Stickmen Gathering Shards
    const tProgress = setTimeout(() => {
      setLoadingProgress(55);
      setStickmanHudStep('aligning');
    }, 180);

    const tContent = setTimeout(() => {
      setLoadingProgress(85);
      setContentOpacity(1);
      setContentTranslate(0);

      // 4. Viewport-Aware Card Shatter & Snap Assembly
      // Operates ONLY on cards currently visible within user's viewport screen to prevent lag
      if (contentContainerRef.current && typeof window !== 'undefined') {
        const container = contentContainerRef.current;
        const viewH = window.innerHeight;
        const viewW = window.innerWidth;
        const isMobile = viewW < 640;
        const mult = isMobile ? 0.45 : 1.0;

        // Query potential modular card surfaces
        const cardSelectors =
          '.card-aurora, [data-card="true"], .grid > button, .grid > div, article > div, .rounded-3xl, .rounded-2xl';
        const candidateNodes = container.querySelectorAll<HTMLElement>(cardSelectors);

        const visibleCards: HTMLElement[] = [];
        for (let i = 0; i < candidateNodes.length; i++) {
          const el = candidateNodes[i];
          const rect = el.getBoundingClientRect();
          // Filter: Must be substantial card (not tiny button or entire outer page wrapper)
          if (rect.height < 55 || rect.width < 90) continue;
          if (rect.height > viewH * 0.88 && rect.width > viewW * 0.88) continue;

          // VIEWPORT CULLING: Only elements currently in the visible screen area
          if (rect.top >= -30 && rect.top < viewH * 0.95 && rect.bottom > 30) {
            const isChildOfSelected = visibleCards.some((parent) => parent.contains(el));
            if (!isChildOfSelected) {
              visibleCards.push(el);
            }
          }
          // Cap at 6 visible cards to ensure silky 60fps performance without lag
          if (visibleCards.length >= 6) break;
        }

        if (visibleCards.length > 0) {
          // Staggered scatter offsets (efek hancur berantakan seperti pecahan puzzle)
          const shatterPresets = [
            { x: -22 * mult, y: -14 * mult, rot: -5.5 * mult },
            { x: 24 * mult, y: 16 * mult, rot: 6.2 * mult },
            { x: -16 * mult, y: 18 * mult, rot: -4.0 * mult },
            { x: 20 * mult, y: -18 * mult, rot: 4.8 * mult },
            { x: -12 * mult, y: -20 * mult, rot: -3.2 * mult },
            { x: 15 * mult, y: 14 * mult, rot: 3.5 * mult },
          ];

          // A. Set instantaneous shattered pose with neon fracture outline
          visibleCards.forEach((card, idx) => {
            const p = shatterPresets[idx % shatterPresets.length];
            card.style.willChange = 'transform, opacity, filter, box-shadow';
            card.style.transition = 'none';
            card.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px) rotate(${p.rot}deg)`;
            card.style.opacity = '0.7';
            card.style.boxShadow = isLight
              ? '0 10px 25px -5px rgba(2, 132, 199, 0.35)'
              : '0 10px 30px -5px rgba(56, 189, 248, 0.45)';
          });

          // Force reflow
          void container.offsetHeight;

          // B. Snap cards into neat alignment as stickmen weld them together
          setTimeout(() => {
            visibleCards.forEach((card, idx) => {
              const delay = idx * 40; // wave snap
              card.style.transition = `transform 480ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 420ms ease ${delay}ms, box-shadow 450ms ease ${delay}ms`;
              card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
              card.style.opacity = '1';
              card.style.boxShadow = '';
            });
          }, 240);

          // C. Complete cleanup after animation ends (frees memory and resets DOM to zero overhead)
          setTimeout(() => {
            visibleCards.forEach((card) => {
              card.style.willChange = '';
              card.style.transition = '';
              card.style.transform = '';
              card.style.opacity = '';
              card.style.boxShadow = '';
            });
          }, 850);
        }
      }
    }, 200);

    // 5. Stickman "Locked & Aligned" Victory Pose
    const tLocked = setTimeout(() => {
      setLoadingProgress(100);
      setStickmanHudStep('locked');
    }, 480);

    // 6. Dismiss Loading Bar
    const tDismissBar = setTimeout(() => {
      setIsBarVisible(false);
      setLoadingProgress(0);
    }, 620);

    // 7. Dismiss Stickman HUD
    const tDismissHud = setTimeout(() => {
      setStickmanHudVisible(false);
    }, 1150);

    return () => {
      clearTimeout(tInit);
      clearTimeout(tProgress);
      clearTimeout(tContent);
      clearTimeout(tLocked);
      clearTimeout(tDismissBar);
      clearTimeout(tDismissHud);
    };
  }, [isLight]);

  // Run on activeTab change
  useEffect(() => {
    if (prevTabRef.current === activeTab) return;
    prevTabRef.current = activeTab;
    return executeShatterRebuildSequence();
  }, [activeTab, executeShatterRebuildSequence]);

  // Run on explicit triggerShatterRebuild call
  useEffect(() => {
    if (shatterCount === 0 || prevShatterCountRef.current === shatterCount) return;
    prevShatterCountRef.current = shatterCount;
    return executeShatterRebuildSequence();
  }, [shatterCount, executeShatterRebuildSequence]);

  return (
    <div className="relative flex-1 flex flex-col min-h-0 overflow-hidden w-full">
      {/* Sleek Cyber Tab Loading Bar ("Mengisi Load") */}
      {isBarVisible && (
        <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
          {/* Main glowing progress beam */}
          <div className="relative h-[2.5px] w-full bg-slate-900/60 overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 transition-all duration-200 ease-out shadow-[0_0_14px_rgba(56,189,248,0.9)]"
              style={{ width: `${loadingProgress}%` }}
            />
            {/* Glowing lead beacon */}
            <div
              className="absolute top-0 bottom-0 w-8 bg-white/80 blur-[2px] transition-all duration-200 ease-out"
              style={{ left: `calc(${loadingProgress}% - 32px)` }}
            />
          </div>

          {/* Micro HUD Telemetry Badge */}
          <div
            className={`flex items-center justify-between px-4 py-1 text-[10px] font-mono border-b backdrop-blur-md animate-pulse ${
              isLight
                ? 'bg-white/80 border-cyan-300 text-cyan-800'
                : 'bg-slate-950/70 border-cyan-500/20 text-cyan-300/80'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-cyan-500 animate-spin [animation-duration:4s]" />
              MEM_HEAP: RECONSTRUCTING &amp; WELDING [{activeTab.toUpperCase()}]...
            </span>
            <span className={`font-bold ${isLight ? 'text-cyan-800' : 'text-cyan-400'}`}>
              {loadingProgress}%
            </span>
          </div>
        </div>
      )}

      {/* Main Tab Content Container */}
      <div
        ref={contentContainerRef}
        className="flex-1 flex flex-col min-h-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentTranslate}px)`,
        }}
      >
        {children}
      </div>

      {/* =========================================================
          THE FULL CARD SHATTER & STICKMEN REBUILD THEATER
          Visual: Card hancur -> stickman pungut -> susun & las rapi
          ========================================================= */}
      <StickmanShatterRebuilder
        isActive={isShatterActive}
        activeTab={activeTab}
        isLight={isLight}
        onFinish={() => setIsShatterActive(false)}
      />

      {/* Floating Stickman Card Organizer HUD Status in bottom right */}
      <StickmanTabOrganizer
        isVisible={stickmanHudVisible}
        activeTab={activeTab}
        step={stickmanHudStep}
        isLight={isLight}
      />
    </div>
  );
};
