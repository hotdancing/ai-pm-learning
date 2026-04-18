import { curriculum } from '@/data/curriculum';
import UnitPageClient from '@/components/learn/unit-page-client';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ phase: string; unit: string }>;
}

export default async function UnitPage({ params }: PageProps) {
  const { phase: phaseId, unit: unitId } = await params;
  
  const phase = curriculum.find(p => p.id === phaseId);
  if (!phase) {
    notFound();
  }
  
  const unit = phase.units.find(u => u.id === unitId);
  if (!unit) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI PM 学习旅程</h1>
              <p className="text-sm text-gray-500">从零到 Inspire AI PM</p>
            </div>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">首页</a>
              <a href="/learn" className="text-sm font-medium text-indigo-600">学习</a>
              <a href="/progress" className="text-sm font-medium text-gray-600 hover:text-gray-900">进度</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <UnitPageClient phase={phase} unit={unit} />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  const params: { phase: string; unit: string }[] = [];
  
  for (const phase of curriculum) {
    for (const unit of phase.units) {
      params.push({ phase: phase.id, unit: unit.id });
    }
  }
  
  return params;
}
