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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">学习进度</h1>
              <p className="text-sm text-gray-500">追踪你的成长轨迹</p>
            </div>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">首页</a>
              <a href="/learn" className="text-sm font-medium text-gray-600 hover:text-gray-900">学习</a>
              <a href="/progress" className="text-sm font-medium text-indigo-600">进度</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Overall Progress */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">总体进度</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {progress.completedUnits}
              </div>
              <div className="text-sm text-gray-500">已完成单元</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {progress.totalUnits}
              </div>
              <div className="text-sm text-gray-500">总单元数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {progress.feynmanOutputs}
              </div>
              <div className="text-sm text-gray-500">费曼输出</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">
                {progress.streakDays}
              </div>
              <div className="text-sm text-gray-500">连续学习</div>
            </div>
          </div>
        </div>

        {/* Phase-by-Phase Progress */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">各阶段进度</h2>
          <div className="space-y-6">
            {phaseStats.map((phase) => (
              <div key={phase.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: phase.color }}
                    />
                    <span className="text-sm text-gray-500">Phase {phase.letter}</span>
                    <span className="font-medium text-gray-900">{phase.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {phase.completed}/{phase.total}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700"
                    style={{ 
                      width: `${phase.percentage}%`,
                      backgroundColor: phase.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feynman Outputs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">费曼输出集</h2>
          {feynmanOutputs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">还没有费曼输出</p>
              <p className="text-sm">完成学习单元后，你的费曼输出会显示在这里</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feynmanOutputs.map(({ phase, unit, output }) => (
                <div key={unit.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: phase.color }}
                    />
                    <span className="text-xs text-gray-500">{phase.name}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm font-medium text-gray-700">{unit.name}</span>
                    {output.feynmanScore && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        output.feynmanScore >= 4 
                          ? 'bg-green-100 text-green-700' 
                          : output.feynmanScore >= 3
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        费曼 {output.feynmanScore}/5
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700">{output.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
