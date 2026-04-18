'use client';

import Link from 'next/link';
import Header from '@/components/ui/header';
import { useProgressStore } from '@/stores/progressStore';

const PHASE_META = [
  { id: 'phase-a', emoji: '🧠', name: 'AI 认知扫盲', color: '#6366f1', bg: 'from-indigo-500 to-purple-600' },
  { id: 'phase-b', emoji: '⚙️', name: '技术框架入门', color: '#8b5cf6', bg: 'from-purple-500 to-pink-600' },
  { id: 'phase-c', emoji: '🚀', name: '项目正式启动', color: '#06b6d4', bg: 'from-cyan-500 to-blue-600' },
  { id: 'phase-d', emoji: '📊', name: '运营体系建设', color: '#f59e0b', bg: 'from-amber-500 to-orange-600' },
  { id: 'phase-e', emoji: '💼', name: '简历与面试', color: '#10b981', bg: 'from-emerald-500 to-teal-600' },
];

export default function ProgressPage() {
  const { progress, phases, getFeynmanOutputs } = useProgressStore();
  const feynmanOutputs = getFeynmanOutputs();

  const totalPct = Math.round((progress.completedUnits / progress.totalUnits) * 100);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header active="progress" />

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-800 mb-1">学习进度</h1>
          <p className="text-slate-500 text-sm">追踪你的成长轨迹</p>
        </div>

        {/* Overall progress card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="48" cy="48" r="40" fill="none"
                  stroke="#6366f1" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - totalPct / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-indigo-600">{totalPct}%</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[
                { label: '已完成单元', value: `${progress.completedUnits}/${progress.totalUnits}`, color: 'text-indigo-600' },
                { label: '费曼输出', value: String(progress.feynmanOutputs), color: 'text-purple-600' },
                { label: '连续学习', value: `${progress.streakDays} 天`, color: 'text-amber-600' },
                { label: '总进度', value: `${totalPct}%`, color: 'text-slate-600' },
              ].map(s => (
                <div key={s.label}>
                  <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase breakdown */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">各阶段进度</h2>
          <div className="space-y-3">
            {PHASE_META.map((meta, i) => {
              const phaseData = phases.find(p => p.id === meta.id);
              const completed = phaseData?.units.filter(u => u.status === 'completed').length || 0;
              const total = phaseData?.units.length || 0;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div key={meta.id} className="bg-white rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                      phaseData?.status === 'locked' ? 'bg-slate-100' : 'bg-gradient-to-br ' + meta.bg
                    }`}>
                      {phaseData?.status === 'locked' ? '🔒' : meta.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: meta.color }}>
                          Phase {String.fromCharCode(65 + i)}
                        </span>
                        <span className="font-semibold text-slate-800 text-sm">{meta.name}</span>
                      </div>
                      <div className="text-xs text-slate-400">{completed}/{total} 单元完成</div>
                    </div>
                    <div className="text-lg font-black" style={{ color: meta.color }}>{pct}%</div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: meta.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feynman outputs */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">费曼输出</h2>
          {feynmanOutputs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <div className="text-4xl mb-3">✍️</div>
              <p className="text-lg font-semibold text-slate-700 mb-1">还没有费曼输出</p>
              <p className="text-sm text-slate-400 mb-4">完成学习单元后，你的费曼输出会显示在这里</p>
              <Link
                href="/learn/phase-a/a1"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
              >
                开始第一个单元 →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {feynmanOutputs.map(({ phase, unit, output }) => {
                const meta = PHASE_META.find(m => m.id === phase.id);
                return (
                  <div key={unit.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: meta?.color }} />
                      <span className="text-xs font-bold" style={{ color: meta?.color }}>
                        Phase {phase.id.split('-')[1].toUpperCase()}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-sm font-semibold text-slate-700">{unit.name}</span>
                      {output.feynmanScore && (
                        <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                          output.feynmanScore >= 4
                            ? 'bg-green-100 text-green-700'
                            : output.feynmanScore >= 3
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {output.feynmanScore}/5 分
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{output.text}</p>
                    {output.feynmanFeedback && (
                      <p className="text-xs text-slate-400 mt-2 italic">{output.feynmanFeedback}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
