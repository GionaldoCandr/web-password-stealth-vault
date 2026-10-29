import { SideBarNav } from '@/components/docs/SideBarNav';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { installationGuide } from '@/data/guides/installation';

export default function DocsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      <SideBarNav />

      <section className="flex-1 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Guidebook & Installation Manual</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Panduan lengkap instalasi, konfigurasikan registry alias, dan alur integrasi multi-device.
          </p>
        </div>

        <div className="space-y-6">
          {installationGuide.map((guide) => (
            <Card key={guide.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-cyan-300">{guide.title}</h2>
                <Badge variant="cyan">{guide.badge}</Badge>
              </div>

              <p className="text-xs text-slate-400">{guide.subtitle}</p>

              <div className="space-y-4 pt-2">
                {guide.steps.map((s) => (
                  <div key={s.step} className="border-l-2 border-cyan-500/40 pl-4 space-y-1">
                    <div className="flex items-center gap-2 font-medium text-xs text-slate-200">
                      <span className="text-cyan-400 font-mono">Langkah {s.step}:</span>
                      <span>{s.title}</span>
                    </div>
                    <p className="text-xs text-slate-400">{s.description}</p>
                    {s.command && <CodeBlock code={s.command} language="bash" />}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}