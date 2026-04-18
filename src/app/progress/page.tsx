'use client';

import { useProgressStore } from '@/stores/progressStore';

export default function ProgressPage() {
  const { progress, phases, getFeynmanOutputs } = useProgressStore();
  const feynmanOutputs = getFeynmanOutputs();

  const phaseStats = phases.map((phase, index) => {
    const completed = phase.units.filter(u => u.status === 'completed').length;
    const total = phase.units.length;
    return {
      ...phase,
      letter: String.fromCharCode(65 + index),
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  });

  const totalPercentage = Math.round((progress.completedUnits / progress.totalUnits) * 100);
  const totalXp = progress.completedUnits * 10;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">
                AI
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">学习进度</h1>
                <p className="text-xs text-slate-500">追踪你的成长轨迹</p>
              </div>
            </div>
            <nav className="flex items-center gap-1">
              <a href="/" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                首页
              </a>
              <a href="/learn" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                学习
              </a>
              <a href="/progress" className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">
                进度
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Overall Progress Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span>📊</span> 总体进度
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Circular Progress */}
            <div className="relative">
              <svg width="140" height="140" className="-rotate-90">
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="12"
                  strokeDasharray={`${totalPercentage * 3.77}, 377`}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">{totalPercentage}%</span>
                <span className="text-xs text-slate-400">完成度</span>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <div className="text-2xl mb-1">📚</div>
                <div className="text-xl font-bold text-indigo-600">{progress.completedUnits}</div>
                <div className="text-xs text-slate-500">已完成</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <div className="text-2xl mb-1">📝</div>
                <div className="text-xl font-bold text-emerald-600">{progress.feynmanOutputs}</div>
                <div className="text-xs text-slate-500">费曼输出</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-xl font-bold text-amber-600">{progress.streakDays}</div>
                <div className="text-xs text-slate-500">连续学习</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xl font-bold text-purple-600">{totalXp}</div>
                <div className="text-xs text-slate-500">总 XP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase-by-Phase Progress */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span>📍</span> 各阶段进度
          </h2>
          
          <div className="space-y-6">
            {phaseStats.map((phase) => (
              <div key={phase.id} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: phase.status === 'locked' ? '#94a3b8' : phase.color,
                        boxShadow: phase.status === 'active' ? `0 0 8px ${phase.color}` : 'none',
                      }}
                    />
                    <span className="text-xs text-slate-400 font-medium">Phase {phase.letter}</span>
                    <span className="font-medium text-slate-700">{phase.name}</span>
                    {phase.status === 'active' && (
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full font-medium animate-pulse"
                        style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                      >
                        进行中
                      </span>
                    )}
                    {phase.status === 'completed' && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-600">
                        已完成
                      </span>
                    )}
                    {phase.status === 'locked' && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-400">
                        已锁定
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-slate-500 font-medium">
                    {phase.completed}/{phase.total}
                  </span>
                </div>
                
                <div className="ml-6 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out relative"
                    style={{ 
                      width: `${phase.percentage}%`,
                      backgroundColor: phase.status === 'locked' ? '#94a3b8' : phase.color,
                    }}
                  >
                    {phase.percentage === 100 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feynman Outputs - Journal Style */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span>📔</span> 费曼输出日志
          </h2>
          
          {feynmanOutputs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg font-medium text-slate-700 mb-2">还没有费曼输出</p>
              <p className="text-sm text-slate-500">完成学习单元后，你的费曼输出会显示在这里</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feynmanOutputs.map(({ phase, unit, output }, index) => (
                <div 
                  key={unit.id} 
                  className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100 hover:shadow-md transition-all"
                >
                  {/* Journal entry decoration */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: phase.color }}
                    />
                    <span className="text-xs text-slate-400">
                      {output.createdAt ? new Date(output.createdAt).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) : ''}
                    </span>
                  </div>
                  
                  {/* Entry header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${phase.color}20` }}
                    >
                      📖
                    </div>
                    <div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: phase.color }}
                      >
                        {phase.name}
                      </span>
                      <span className="text-slate-300 mx-1">·</span>
                      <span className="text-sm font-medium text-slate-700">{unit.name}</span>
                    </div>
                  </div>
                  
                  {/* Entry content */}
                  <div className="pl-13">
                    <p className="text-slate-700 leading-relaxed mb-4 whitespace-pre-wrap">
                      {output.text}
                    </p>
                    
                    {/* Score */}
                    {output.feynmanScore && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                              key={star}
                              className={`text-sm transition-all ${
                                star <= output.feynmanScore! ? 'opacity-100' : 'opacity-30'
                              }`}
                              style={{ color: output.feynmanScore! >= 4 ? '#10b981' : '#f59e0b' }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span 
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{ 
                            backgroundColor: output.feynmanScore >= 4 
                              ? 'rgba(16, 185, 129, 0.1)' 
                              : 'rgba(245, 158, 11, 0.1)',
                            color: output.feynmanScore >= 4 ? '#10b981' : '#f59e0b',
                          }}
                        >
                          费曼指数 {output.feynmanScore}/5
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </main>
  );
}
