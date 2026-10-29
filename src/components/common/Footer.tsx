import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-8 mt-auto text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Stealth Password Vault v1.0 Finale &copy; 2026</span>
        </div>
        <div>
          <span>Built for Universitis Pertamina - PAW Practicum</span>
        </div>
      </div>
    </footer>
  );
};