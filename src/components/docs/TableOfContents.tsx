'use client';

import React from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
      <div className="flex items-center gap-2 text-slate-300 font-semibold mb-2">
        <List className="w-3.5 h-3.5 text-cyan-400" />
        <span>Daftar Isi Halaman</span>
      </div>
      <ul className="space-y-1.5 pl-2">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};