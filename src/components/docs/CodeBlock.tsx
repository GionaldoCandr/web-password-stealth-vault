'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-slate-800 bg-slate-950 my-3 font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400">
        <span className="uppercase text-[10px] tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-cyan-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};