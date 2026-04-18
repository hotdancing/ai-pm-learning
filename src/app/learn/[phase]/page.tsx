import { curriculum } from '@/data/curriculum';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/header';

interface PageProps {
  params: Promise<{ phase: string }>;
}

const phaseEmojis: Record<string, string> = {
  'phase-a': '🧠',
  'phase-b': '⚙️',
  'phase-c': '🚀',
  'phase-d': '📈',
  'phase-e': '💼',
};

export default async function PhasePage({ params }: PageProps) {
  const { phase: phaseId } = await params;
  const phase = curriculum.find(p => p.id === phaseId);
  
  if (!phase) {
    notFound();
  }

  const phaseIndex = curriculum.findIndex(p => p.id === phaseId);
  const phaseLetter = String.fromCharCode(65 + phaseIndex);
  const emoji = phaseEmojis[phase.id] || '📚';
  
  const completedCount = phase.units.filter(u => u.status === 'completed').length;
  const totalCount = phase.units.length;
  const progress = Math.round((completedCount / totalCount) * 100);
  const isLocked = phase.status === 'locked';
  const isActive = phase.status === 'active';
  const isCompleted = phase.status === 'completed';

  return (
    <main className="min-h-screen bg-slate-50">
      <Header active="learn" />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back Link */}
        <Link 
          href="/learn" 
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <span>←</span> 返回学习路线图
        </Link>

        {/* Phase Header */}
        <div 
          className="relative rounded-3xl p-8 mb-8 overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${phase.color}15, ${phase.color}05)`,
            border: `1px solid ${phase.color}30`,
          }}
        >
          {/* Background decoration */}
          <div 
            className="absolute top-0 right-0 w-64 h-full opacity-20"
            style={{
              background: `linear-gradient(to left, ${phase.color}, transparent)`,
            }}
          />
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-30"
            style={{ backgroundColor: phase.color, filter: 'blur(60px)' }}
          />
          
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            {/* Phase Icon */}
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
              style={{ 
                backgroundColor: phase.color,
                boxShadow: `0 8px 24px ${phase.color}40`,
              }}
            >
              {emoji}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Phase {phaseLetter}
                </span>
                
                {isLocked && (
                  <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                    🔒 已锁定
                  </span>
                )}
                {isActive && (
                  <span 
                    className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium animate-pulse"
                    style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                  >
                    ⚡ 进行中
                  </span>
                )}
                {isCompleted && (
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-medium">
                    ✓ 已完成
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{phase.name}</h1>
              <p className="text-slate-500 mb-4">{phase.description}</p>
              
              {/* Progress bar */}
              <div className="flex items-center gap-4">
                <div className="flex-1 max-w-xs h-2 bg-white rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: phase.color,
                    }}
                  />
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  {completedCount}/{totalCount} 单元
                </span>
              </div>
            </div>
            
            {/* Large progress circle */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke={phase.color}
                  strokeWidth="3"
                  strokeDasharray={`${progress}, 100`}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: phase.color }}>
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Units List */}
        <div className="space-y-4 stagger-children">
          {phase.units.map((unit, index) => {
            const isUnitLocked = isLocked || (index > 0 && phase.units[index - 1].status !== 'completed' && phase.status !== 'locked');
            
            return (
              <div 
                key={unit.id}
                className={`bg-white rounded-2xl border border-slate-100 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  isUnitLocked ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-5">
                  {/* Unit Number */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{
                      backgroundColor: unit.status === 'completed' 
                        ? '#10b981' 
                        : unit.status === 'in-progress'
                        ? phase.color
                        : '#e2e8f0',
                      color: unit.status === 'pending' ? '#94a3b8' : 'white',
                      boxShadow: unit.status === 'in-progress' ? `0 4px 14px ${phase.color}40` : 'none',
                    }}
                  >
                    {unit.status === 'completed' ? '✓' : index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-800 text-lg">{unit.name}</h3>
                      
                      {unit.status === 'in-progress' && (
                        <span 
                          className="inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                        >
                          进行中
                        </span>
                      )}
                      {unit.status === 'completed' && (
                        <span className="inline-flex items-center text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                          ✓ 已完成
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-slate-500 mb-3">
                      {unit.read.items.length} 个学习材料 · {unit.understand.length} 道思考题
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {unit.jdSkills.map(skill => (
                        <span 
                          key={skill} 
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{ backgroundColor: `${phase.color}10`, color: phase.color }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {isUnitLocked ? (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>🔒</span>
                        <span>先完成上一单元解锁</span>
                      </div>
                    ) : (
                      <Link
                        href={`/learn/${phase.id}/${unit.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                        style={{ 
                          backgroundColor: unit.status === 'completed' ? '#10b981' : phase.color,
                          boxShadow: `0 4px 14px ${unit.status === 'completed' ? '#10b98140' : phase.color + '40'}`,
                        }}
                      >
                        {unit.status === 'completed' ? (
                          <>
                            <span>查看</span>
                            <span>→</span>
                          </>
                        ) : unit.status === 'in-progress' ? (
                          <>
                            <span>继续</span>
                            <span>→</span>
                          </>
                        ) : (
                          <>
                            <span>开始学习</span>
                            <span>→</span>
                          </>
                        )}
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
