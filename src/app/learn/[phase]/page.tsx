import { curriculum } from '@/data/curriculum';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ phase: string }>;
}

export default async function PhasePage({ params }: PageProps) {
  const { phase: phaseId } = await params;
  const phase = curriculum.find(p => p.id === phaseId);
  
  if (!phase) {
    notFound();
  }

  const phaseIndex = curriculum.findIndex(p => p.id === phaseId);
  const phaseLetter = String.fromCharCode(65 + phaseIndex);

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Phase Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-gray-500">Phase {phaseLetter}</span>
            {phase.status === 'locked' && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">🔒 已锁定</span>
            )}
            {phase.status === 'active' && (
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded">进行中</span>
            )}
            {phase.status === 'completed' && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">已完成</span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{phase.name}</h1>
          <p className="text-gray-600">{phase.description}</p>
        </div>

        {/* Units List */}
        <div className="space-y-4">
          {phase.units.map((unit, index) => {
            const isLocked = phase.status === 'locked';
            return (
              <div 
                key={unit.id}
                className={`bg-white rounded-2xl border p-6 ${
                  isLocked ? 'border-gray-100 opacity-75' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: isLocked ? '#9ca3af' : phase.color }}
                  >
                    {unit.status === 'completed' ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{unit.name}</h3>
                      {unit.status === 'in-progress' && (
                        <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded">进行中</span>
                      )}
                      {unit.status === 'completed' && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">已完成</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {unit.read.items.length} 个学习材料 · {unit.understand.length} 道思考题
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {unit.jdSkills.map(skill => (
                        <span key={skill} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {isLocked ? (
                      <span className="text-sm text-gray-400">🔒 先完成前面的单元</span>
                    ) : (
                      <Link
                        href={`/learn/${phase.id}/${unit.id}`}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          unit.status === 'completed'
                            ? 'bg-green-50 text-green-600 hover:bg-green-100'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {unit.status === 'completed' ? '查看' : unit.status === 'in-progress' ? '继续' : '开始学习'}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return curriculum.map(phase => ({ phase: phase.id }));
}
