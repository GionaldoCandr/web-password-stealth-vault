import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, glow = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl p-5 shadow-xl transition-all',
        glow && 'border-cyan-500/30 shadow-cyan-500/10 shadow-lg hover:border-cyan-500/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};