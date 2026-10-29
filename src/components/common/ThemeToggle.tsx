'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md text-xs transition-colors ${
          theme === 'dark' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
        title="Dark Mode"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md text-xs transition-colors ${
          theme === 'light' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
        title="Light Mode"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md text-xs transition-colors ${
          theme === 'system' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
        title="System Theme"
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};