'use client';

import { useProgressStore } from '@/stores/progressStore';
import Link from 'next/link';

const phaseEmojis: Record<string, string> = {
  'phase-a': '🧠',
  'phase-b': '⚙️',
  'phase-c': '🚀',
  'phase-d': '📈',
  'phase-e': '💼',
};

const phaseIcons: Record<string, string> = {
  'phase-a': '🧠',
  'phase-b': '⚙️',
  'phase-c': '🚀',
  'phase-d': '📈',
  'phase-e': '💼',
};

export default function LearnPage() {
  const { phases } = useProgressStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">
                AI
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">学习旅程</h1>
                <p className="text-xs text-slate-500">5 个阶段 · 16 个单元</p>
              </div>
            </div>
            <nav className="flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                首页
              </Link>
              <Link href="/learn" className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">
                学习
              </Link>
              <Link href="/progress" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                进度
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">学习路线图</h1>
          <p className="text-slate-500">按阶段系统学习，成为 AI PM</p>
        </div>

        {/* Phase Cards */}
        <div className="space-y-6 stagger-children">
          {phases.map((phase, index) => {
            const completedCount = phase.units.filter(u => u.status === 'completed').length;
            const totalCount = phase.units.length;
            const progress = Math.round((completedCount / totalCount) * 100);
            const isLocked = phase.status === 'locked';
            const isActive = phase.status === 'active';
            const isCompleted = phase.status === 'completed';
            const emoji = phaseEmojis[phase.id] || '📚';

            return (
              <div 
                key={phase.id}
                className={`rounded-3xl overflow-hidden transition-all duration-300 ${
                  isLocked 
                    ? 'opacity-75' 
                    : 'hover:shadow-xl hover:-translate-y-1'
                }`}
                style={{
                  boxShadow: isLocked ? 'none' : '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              >
                {/* Phase Header */}
                <div 
                  className="relative px-6 py-5 md:py-6"
                  style={{ 
                    background: isLocked 
                      ? 'linear-gradient(to right, #f1f5f9, #f8fafc)'
                      : `linear-gradient(135deg, ${phase.color}15, ${phase.color}05)`,
                    borderBottom: `1px solid ${isLocked ? '#e2e8f0' : phase.color + '30'}`,
                  }}
                >
                  {/* Background decoration */}
                  {!isLocked && (
                    <div 
                      className="absolute top-0 right-0 w-48 h-full opacity-10"
                      style={{
                        background: `linear-gradient(to left, ${phase.color}, transparent)`,
                      }}
                    />
                  )}
                  
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Phase Icon */}
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                        style={{ 
                          backgroundColor: isLocked ? '#e2e8f0' : phase.color,
                          boxShadow: isLocked ? 'none' : `0 4px 14px ${phase.color}40`,
                        }}
                      >
                        {isLocked ? '🔒' : emoji}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Phase {String.fromCharCode(65 + index)}
                          </span>
                          
                          {isLocked && (
                            <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                              🔒 已锁定
                            </span>
                          )}
                          {isActive && (
                            <span 
                              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium animate-pulse"
                              style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                            >
                              ⚡ 进行中
                            </span>
                          )}
                          {isCompleted && (
                            <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                              ✓ 已完成
                            </span>
                          )}
                        </div>
                        
                        <h2 className="text-xl font-bold text-slate-800 mb-1">{phase.name}</h2>
                        <p className="text-sm text-slate-500">{phase.description}</p>
                      </div>
                    </div>
                    
                    {/* Progress */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div 
                          className="text-3xl font-bold"
                          style={{ color: isLocked ? '#94a3b8' : phase.color }}
                        >
                          {progress}%
                        </div>
                        <div className="text-xs text-slate-400">
                          {completedCount}/{totalCount} 单元
                        </div>
                      </div>
                      
                      {/* Circular Progress */}
                      <div className="relative w-14 h-14">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="3"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            stroke={isLocked ? '#94a3b8' : phase.color}
                            strokeWidth="3"
                            strokeDasharray={`${progress}, 100`}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isCompleted ? (
                            <span className="text-emerald-500 text-lg">✓</span>
                          ) : isActive ? (
                            <span className="text-indigo-500 text-lg">⚡</span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Units List */}
                <div className="bg-white">
                  {phase.units.map((unit, unitIndex) => {
                    const isUnitLocked = isLocked || (unitIndex > 0 && phase.units[unitIndex - 1].status !== 'completed');
                    
                    return (
                      <div 
                        key={unit.id}
                        className={`px-6 py-4 flex items-center gap-4 transition-colors ${
                          unitIndex !== phase.units.length - 1 ? 'border-b border-slate-100' : ''
                        } ${isUnitLocked ? 'opacity-50' : 'hover:bg-slate-50'}`}
                      >
                        {/* Unit Number */}
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{
                            backgroundColor: unit.status === 'completed' 
                              ? '#10b981' 
                              : unit.status === 'in-progress'
                              ? phase.color
                              : '#e2e8f0',
                            color: unit.status === 'pending' ? '#94a3b8' : 'white',
                            boxShadow: unit.status === 'in-progress' ? `0 4px 12px ${phase.color}40` : 'none',
                          }}
                        >
                          {unit.status === 'completed' ? '✓' : unitIndex + 1}
                        </div>
                        
                        {/* Unit Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-medium text-slate-800 truncate">{unit.name}</h3>
                            {unit.status === 'in-progress' && (
                              <span 
                                className="inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                                style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                              >
                                进行中
                              </span>
                            )}
                            {unit.status === 'completed' && (
                              <span className="inline-flex items-center text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                                ✓ 已完成
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 truncate">
                            {unit.status === 'completed' && unit.feynmanOutput?.text 
                              ? unit.feynmanOutput.text.slice(0, 40) + '...'
                              : `${unit.read.items.length} 个学习材料 · ${unit.understand.length} 道思考题`
                            }
                          </p>
                        </div>
                        
                        {/* Action */}
                        {isUnitLocked ? (
                          <span className="text-sm text-slate-400 flex items-center gap-1">
                            <span>🔒</span>
                            <span className="hidden sm:inline">先完成上一单元</span>
                          </span>
                        ) : (
                          <Link
                            href={`/learn/${phase.id}/${unit.id}`}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                              unit.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                : unit.status === 'in-progress'
                                ? 'text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                                : 'text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                            }`}
                            style={{
                              backgroundColor: unit.status === 'completed' 
                                ? undefined 
                                : unit.status === 'in-progress'
                                ? phase.color
                                : '#6366f1',
                            }}
                          >
                            {unit.status === 'completed' ? '查看' : unit.status === 'in-progress' ? '继续' : '开始'}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
