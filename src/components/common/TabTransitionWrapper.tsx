'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Cpu, CheckCircle, Shield } from 'lucide-react';

interface TabTransitionWrapperProps {
  activeTab: string;
  children: React.ReactNode;
}

export const TabTransitionWrapper: React.FC<TabTransitionWrapperProps> = ({
  activeTab,
  children,
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [contentTranslate, setContentTranslate] = useState(0);
  const [currentTab, setCurrentTab] = useState(activeTab);
  const prevTabRef = useRef(activeTab);

  useEffect(() => {
    if (prevTabRef.current === activeTab) return;
    prevTabRef.current = activeTab;

    // Start tab loading sequence ("mengisi load")
    setIsBarVisible(true);
    setLoadingProgress(10);
    // Soft fade out previous tab slightly
    setContentOpacity(0.35);
    setContentTranslate(8);

    // Staggered fill over ~420ms (smooth for the human eye, not jarring)
    const t1 = setTimeout(() => {
      setLoadingProgress(45);
    }, 110);

    const t2 = setTimeout(() => {
      setLoadingProgress(85);
      // Switch to new tab content
      setCurrentTab(activeTab);
      // Fade in new tab content with gentle glide up
      setContentOpacity(1);
      setContentTranslate(0);
    }, 220);

    const t3 = setTimeout(() => {
      setLoadingProgress(100);
    }, 400);

    const t4 = setTimeout(() => {
      setIsBarVisible(false);
      setLoadingProgress(0);
    }, 550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [activeTab]);

  return (
    <div className="relative flex-1 flex flex-col min-h-0 overflow-hidden w-full">
      {/* Sleek Cyber Tab Loading Bar ("Mengisi Load") */}
      {isBarVisible && (
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
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
          <div className="flex items-center justify-between px-4 py-1 text-[10px] font-mono text-cyan-300/80 bg-slate-950/70 border-b border-cyan-500/20 backdrop-blur-md animate-pulse">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-cyan-400 animate-spin [animation-duration:4s]" />
              MEM_HEAP: DECRYPTING [MODULE_{activeTab.toUpperCase()}]...
            </span>
            <span className="font-bold text-cyan-400">{loadingProgress}%</span>
          </div>
        </div>
      )}

      {/* Tab Content Container with Smooth Organic Ease Transition */}
      <div
        className="flex-1 flex flex-col min-h-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentTranslate}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
