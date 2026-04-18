'use client';

import { useProgressStore } from '@/stores/progressStore';
import Link from 'next/link';

export default function LearnPage() {
  const { phases } = useProgressStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">学习旅程</h1>
              <p className="text-sm text-gray-500">按阶段系统学习 AI PM</p>
            </div>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">首页</a>
              <a href="/learn" className="text-sm font-medium text-indigo-600">学习</a>
              <a href="/progress" className="text-sm font-medium text-gray-600 hover:text-gray-900">进度</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {phases.map((phase, index) => {
            const completedCount = phase.units.filter(u => u.status === 'completed').length;
            const totalCount = phase.units.length;
            const progress = Math.round((completedCount / totalCount) * 100);

            return (
              <div 
                key={phase.id}
                className={`bg-white rounded-2xl border overflow-hidden ${
                  phase.status === 'locked' 
                    ? 'border-gray-100 opacity-75' 
                    : 'border-gray-200'
                }`}
              >
                {/* Phase Header */}
                <div 
                  className="px-6 py-4 flex items-center gap-4"
                  style={{ borderLeft: `4px solid ${phase.color}` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-gray-500">Phase {String.fromCharCode(65 + index)}</span>
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
                    <h2 className="text-lg font-semibold text-gray-900">{phase.name}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{phase.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: phase.color }}>{progress}%</div>
                    <div className="text-xs text-gray-500">{completedCount}/{totalCount} 单元</div>
                  </div>
                </div>

                {/* Units */}
                <div className="border-t border-gray-100">
                  {phase.units.map((unit, unitIndex) => (
                    <div 
                      key={unit.id}
                      className={`px-6 py-4 flex items-center gap-4 ${
                        unitIndex !== phase.units.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                        style={{
                          backgroundColor: unit.status === 'completed' ? '#10b981' : 
                                          unit.status === 'in-progress' ? phase.color : 
                                          '#e5e7eb',
                          color: unit.status === 'pending' ? '#9ca3af' : 'white'
                        }}
                      >
                        {unit.status === 'completed' ? '✓' : unitIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{unit.name}</h3>
                        <p className="text-sm text-gray-500">
                          {unit.status === 'completed' && unit.feynmanOutput?.text 
                            ? unit.feynmanOutput.text.slice(0, 50) + '...'
                            : unit.read.items.length + ' 个学习材料'
                          }
                        </p>
                      </div>
                      {phase.status === 'locked' ? (
                        <span className="text-gray-400 text-sm">先完成上一阶段</span>
                      ) : (
                        <Link
                          href={`/learn/${phase.id}/${unit.id}`}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            unit.status === 'completed'
                              ? 'bg-green-50 text-green-600 hover:bg-green-100'
                              : unit.status === 'in-progress'
                              ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {unit.status === 'completed' ? '查看' : unit.status === 'in-progress' ? '继续' : '开始'}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
