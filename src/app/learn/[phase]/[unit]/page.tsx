import { curriculum } from '@/data/curriculum';
import UnitPageClient from '@/components/learn/unit-page-client';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/header';

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
    <main className="min-h-screen bg-slate-50">
      <Header active="learn" />
      <div className="max-w-3xl mx-auto px-6 py-8">
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
