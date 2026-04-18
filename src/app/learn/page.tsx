'use client';

import Link from 'next/link';
import Header from '@/components/ui/header';
import { useProgressStore } from '@/stores/progressStore';

const PHASES = [
  { id: 'phase-a', emoji: '🧠', name: 'AI 认知扫盲', desc: '理解 AI 能做什么、不能做什么，建立对 LLM 的基本认知', color: '#6366f1', bg: 'from-indigo-500 to-purple-600', units: 4 },
  { id: 'phase-b', emoji: '⚙️', name: '技术框架入门', desc: '理解 RAG、Agent、Prompt Engineering 三大核心技能', color: '#8b5cf6', bg: 'from-purple-500 to-pink-600', units: 4 },
  { id: 'phase-c', emoji: '🚀', name: '项目正式启动', desc: '从零到一启动铁三教练 AI 项目，完成需求确认到 MVP 验证', color: '#06b6d4', bg: 'from-cyan-500 to-blue-600', units: 4 },
  { id: 'phase-d', emoji: '📊', name: '运营体系建设', desc: '建立数据驱动的持续运营机制，让 AI 产品越用越好', color: '#f59e0b', bg: 'from-amber-500 to-orange-600', units: 2 },
  { id: 'phase-e', emoji: '💼', name: '简历与面试', desc: '把项目经历变成可呈现的简历素材，准备面试', color: '#10b981', bg: 'from-emerald-500 to-teal-600', units: 2 },
];

export default function LearnPage() {
  const { phases } = useProgressStore();

  return (
    <main className="min-h-screen bg-slate-50">
      <Header active="learn" />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-800 mb-1">学习路线图</h1>
          <p className="text-slate-500 text-sm">5个阶段，16个单元。从 AI 认知到简历面试，8个月系统化路径。</p>
        </div>

        {/* Phases */}
        <div className="space-y-4">
          {PHASES.map((phaseMeta, index) => {
            const phaseData = phases.find(p => p.id === phaseMeta.id);
            const completed = phaseData?.units.filter(u => u.status === 'completed').length || 0;
            const total = phaseMeta.units;
            const progress = Math.round((completed / total) * 100);
            const isLocked = phaseData?.status === 'locked';
            const isCompleted = phaseData?.status === 'completed';
            const isActive = phaseData?.status === 'active';

            return (
              <div
                key={phaseMeta.id}
                className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                  isLocked ? 'border-slate-200 opacity-75' : 'border-slate-200 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Phase header */}
                <div className="flex items-stretch">
                  {/* Color sidebar */}
                  <div className={`w-2 flex-shrink-0 bg-gradient-to-b ${phaseMeta.bg}`} />

                  {/* Content */}
                  <div className="flex-1 flex items-center gap-4 px-6 py-5">
                    {/* Emoji + info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                        isLocked ? 'bg-slate-100' : 'bg-gradient-to-br ' + phaseMeta.bg + ' shadow-lg'
                      }`}>
                        {isLocked ? '🔒' : phaseMeta.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold" style={{ color: phaseMeta.color }}>
                            Phase {String.fromCharCode(65 + index)}
                          </span>
                          {isActive && (
                            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">
                              进行中
                            </span>
                          )}
                          {isCompleted && (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">
                              已完成
                            </span>
                          )}
                          {isLocked && (
                            <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full font-semibold">
                              已锁定
                            </span>
                          )}
                        </div>
                        <h2 className="font-bold text-slate-800 leading-tight">{phaseMeta.name}</h2>
                        <p className="text-sm text-slate-400 mt-0.5 leading-snug">{phaseMeta.desc}</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-black" style={{ color: phaseMeta.color }}>
                          {progress}%
                        </div>
                        <div className="text-xs text-slate-400">{completed}/{total} 单元</div>
                      </div>

                      {/* Progress ring */}
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                          <circle
                            cx="24" cy="24" r="20" fill="none"
                            stroke={phaseMeta.color}
                            strokeWidth="4"
                            strokeDasharray={`${2 * Math.PI * 20}`}
                            strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isCompleted ? (
                            <span className="text-sm">✓</span>
                          ) : isLocked ? (
                            <span className="text-sm">🔒</span>
                          ) : (
                            <span className="text-xs font-bold" style={{ color: phaseMeta.color }}>
                              {completed}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      {!isLocked && (
                        <Link
                          href={`/learn/${phaseMeta.id}`}
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow transition-all hover:shadow-md"
                          style={{ backgroundColor: phaseMeta.color }}
                        >
                          →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase detail: units within each phase */}
        <div className="mt-10 space-y-6">
          {PHASES.map((phaseMeta, index) => {
            const phaseData = phases.find(p => p.id === phaseMeta.id);
            const isLocked = phaseData?.status === 'locked';

            return (
              <div key={phaseMeta.id} className={isLocked ? 'opacity-50 pointer-events-none' : ''}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg">{phaseMeta.emoji}</div>
                  <h3 className="font-bold text-slate-800">Phase {String.fromCharCode(65 + index)}: {phaseMeta.name}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phaseData?.units.map((unit, ui) => {
                    const unitNum = String(ui + 1).padStart(2, '0');
                    return (
                      <Link
                        key={unit.id}
                        href={`/learn/${phaseMeta.id}/${unit.id}`}
                        className={`flex items-center gap-3 bg-white rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                          unit.status === 'completed'
                            ? 'border-green-200 bg-green-50'
                            : unit.status === 'in-progress'
                            ? 'border-indigo-200 bg-indigo-50'
                            : 'border-slate-200'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                          style={{
                            backgroundColor: unit.status === 'completed' ? '#10b981' : unit.status === 'in-progress' ? phaseMeta.color : '#e2e8f0',
                            color: unit.status === 'pending' ? '#94a3b8' : 'white',
                          }}
                        >
                          {unit.status === 'completed' ? '✓' : unitNum}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 text-sm leading-snug">{unit.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {unit.status === 'completed' ? '已完成' : unit.status === 'in-progress' ? '进行中' : '未开始'}
                          </p>
                        </div>
                        {unit.status === 'completed' && (
                          <span className="text-green-500 text-lg">✓</span>
                        )}
                        {unit.status === 'in-progress' && (
                          <span className="text-indigo-400 text-lg">→</span>
                        )}
                        {unit.status === 'pending' && (
                          <span className="text-slate-300 text-sm">○</span>
                        )}
                      </Link>
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
