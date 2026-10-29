import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Step {
  step: number;
  title: string;
  description: string;
}

interface StepGuideProps {
  steps: Step[];
}

export const StepGuide: React.FC<StepGuideProps> = ({ steps }) => {
  return (
    <div className="space-y-4 my-4">
      {steps.map((s) => (
        <div key={s.step} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">
              {s.step}
            </div>
            {s.step < steps.length && <div className="w-0.5 h-full bg-slate-800 my-1" />}
          </div>
          <div className="space-y-1 pb-2">
            <h4 className="text-xs font-semibold text-slate-200">{s.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};