import Link from 'next/link';
import { Shield, BookOpen, Terminal, Cpu, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400">
          <Shield className="w-3.5 h-3.5" />
          <span>Stealth Password Vault v1.0 Finale</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
          Volatile Memory Execution & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Zero Cloud Persistence</span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Dokumentasi resmi dan platform simulasi interaktif gaya TryHackMe. Pelajari cara kerja pengamanan kredensial berbasis RAM, pendaftaran Windows Registry Alias <code className="text-cyan-300 font-mono">mypass</code>, serta sinkronisasi P2P lokal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/lab">
            <Button size="lg" className="gap-2">
              <Terminal className="w-4 h-4" />
              <span>Buka Interactive Lab</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/docs">
            <Button variant="outline" size="lg" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Baca Guidebook</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-[#121827] sm:grid-cols-3 gap-6">
        <Card glow className="space-y-3">
          <div className="p-2.5 w-fit rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-100 text-base">RAM-Only Execution</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Kredensial disimpan dalam memori volatile RAM secara terenkripsi AES-256 GCM. Data langsung terhapus bersih (*zeroized*) saat proses ditutup.
          </p>
        </Card>

        <Card glow className="space-y-3">
          <div className="p-2.5 w-fit rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-100 text-base">Registry Alias (MyPass)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Eksekusi Vault secara tersembunyi langsung dari kotak dialog Windows Run (<kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px]">Win + R</kbd>) tanpa membuat shortcut desktop.
          </p>
        </Card>

        <Card glow className="space-y-3">
          <div className="p-2.5 w-fit rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-100 text-base">Local P2P Synchronization</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Sinkronisasi data antar perangkat (PC, Mobile Android, dan Extension) secara langsung via jaringan lokal tanpa melalui server cloud terpusat.
          </p>
        </Card>
      </section>
    </main>
  );
}