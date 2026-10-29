import { Suspense } from 'react';
import { SideBarNav } from '@/components/docs/SideBarNav';
import { Card } from '@/components/ui/Card';
import { installationGuide } from '@/data/guides/installation';

// 1. Beritahu Next.js semua slug yang valid secara statis
export async function generateStaticParams() {
  return installationGuide.map((guide) => ({
    slug: guide.id,
  }));
}

async function DocsContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <Card className="space-y-4">
      <h1 className="text-xl font-bold text-cyan-400 capitalize">
        Topic: {slug.replace('-', ' ')}
      </h1>
      <p className="text-xs text-slate-400 leading-relaxed">
        Panduan mendalam mengenai modul ini sedang ditampilkan. Gunakan navigasi di bilah samping untuk berpindah topik panduan lainnya.
      </p>
    </Card>
  );
}

export default function DynamicDocsPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      <SideBarNav />

      <section className="flex-1 space-y-6">
        <Suspense fallback={<div className="h-32 bg-slate-900/50 rounded-xl animate-pulse" />}>
          <DocsContent params={params} />
        </Suspense>
      </section>
    </main>
  );
}