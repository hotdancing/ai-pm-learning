'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProgressStore } from '@/stores/progressStore';
import { Phase, Unit } from '@/lib/types';

const TABS = [
  { id: 'read', label: '📖 学习材料' },
  { id: 'understand', label: '💭 思考题' },
  { id: 'experiment', label: '🧪 实验' },
  { id: 'output', label: '✍️ 费曼输出' },
] as const;

export default function UnitPageClient({ phase, unit }: UnitPageClientProps) {
  const [activeTab, setActiveTab] = useState<'read' | 'understand' | 'experiment' | 'output'>('read');
  const [outputText, setOutputText] = useState(unit.feynmanOutput?.text || '');
  const [isScoring, setIsScoring] = useState(false);
  const [feynmanScore, setFeynmanScore] = useState<number | null>(unit.feynmanOutput?.feynmanScore ?? null);
  const [feynmanFeedback, setFeynmanFeedback] = useState(unit.feynmanOutput?.feynmanFeedback || '');

  const { updateFeynmanOutput, completeUnit } = useProgressStore();

  const handleAIScore = async () => {
    if (!outputText.trim()) return;
    setIsScoring(true);
    await new Promise(r => setTimeout(r, 1500));

    let score = 3;
    const wordCount = outputText.length;
    const hasSimple = /外婆|妈妈|爷爷|奶奶|小朋友|讲故事/.test(outputText);
    const hasTech = /向量|Embedding|检索|Transformer|参数|神经网络/.test(outputText);
    if (wordCount < 30) score = 2;
    if (wordCount >= 50 && wordCount <= 300) score = 4;
    if (hasSimple && !hasTech) score += 1;
    if (hasTech) score -= 1;
    score = Math.max(1, Math.min(5, score));

    const feedbacks = [
      '太简短了，试着用更多日常语言。想象你在给一个完全不懂技术的人讲解。',
      '内容太技术化了，避免使用专业术语，用生活化的比喻来解释。',
      '不错！你在试着用简单的语言解释，但可以再想想有没有更通俗的比方。',
      '很好！你用简单的语言解释了这个概念。如果能加入更多生活化的比喻会更好。',
      '完美！你的解释非常通俗易懂，真正做到了费曼学习法的精髓。🌟',
    ];

    setFeynmanScore(score);
    setFeynmanFeedback(feedbacks[score - 1]);
    setIsScoring(false);
    updateFeynmanOutput(phase.id, unit.id, {
      text: outputText,
      feynmanScore: score,
      feynmanFeedback: feedbacks[score - 1],
      createdAt: new Date().toISOString(),
      syncedToObsidian: false,
    });
  };

  const handleComplete = () => {
    if (!outputText.trim()) return;
    completeUnit(phase.id, unit.id, {
      text: outputText,
      feynmanScore: feynmanScore ?? 3,
      feynmanFeedback,
      createdAt: new Date().toISOString(),
      syncedToObsidian: false,
    });
    window.location.href = `/learn/${phase.id}`;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/learn" className="hover:text-indigo-600 transition-colors">学习</Link>
        <span>/</span>
        <Link href={`/learn/${phase.id}`} className="hover:text-indigo-600 transition-colors" style={{ color: phase.color }}>{phase.name}</Link>
        <span>/</span>
        <span className="text-slate-700">{unit.name}</span>
      </div>

      {/* Unit header */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
        <div className="h-1.5 bg-gradient-to-r" style={{ background: `linear-gradient(to right, ${phase.color}, ${phase.color}80)` }} />
        <div className="px-8 py-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: phase.color }}>
                  Phase {phase.id.split('-')[1].toUpperCase()}
                </span>
                {unit.status === 'completed' && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">已完成 ✓</span>
                )}
              </div>
              <h1 className="text-2xl font-black text-slate-800">{unit.name}</h1>
            </div>
            <Link
              href={`/learn/${phase.id}`}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 mt-1"
            >
              ← 返回阶段
            </Link>
          </div>

          {/* JD skills */}
          <div className="flex flex-wrap gap-2">
            {unit.jdSkills.map(skill => (
              <span key={skill} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: phase.color + '15', color: phase.color }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl mb-6">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        {/* READ */}
        {activeTab === 'read' && (
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">学习材料</h2>
            <div className="space-y-3">
              {unit.read.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 text-white" style={{ backgroundColor: phase.color }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UNDERSTAND */}
        {activeTab === 'understand' && (
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">💭 思考题</h2>
            <p className="text-sm text-slate-500 mb-4">这些问题没有标准答案，重要的是形成自己的理解。</p>
            <div className="space-y-3">
              {unit.understand.map((q, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-sm text-indigo-700">
                💡 提示：这些问题不需要提交，但建议记录到笔记本或 Obsidian 中。思考的过程比答案本身更重要。
              </p>
            </div>
          </div>
        )}

        {/* EXPERIMENT */}
        {activeTab === 'experiment' && (
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">🧪 实验任务</h2>
            <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100 mb-4">
              <p className="font-semibold text-indigo-900 mb-2">{unit.experiment.title}</p>
              <p className="text-sm text-indigo-700 whitespace-pre-line leading-relaxed">{unit.experiment.description}</p>
            </div>
            {unit.experiment.verification && (
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-sm text-green-700">
                  ✅ 验收标准：{unit.experiment.verification}
                </p>
              </div>
            )}
          </div>
        )}

        {/* OUTPUT */}
        {activeTab === 'output' && (
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">✍️ 费曼输出</h2>

            {/* Prompt */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-5">
              <p className="text-sm text-amber-800">
                <strong>任务：</strong>{unit.output.prompt}
              </p>
              <div className="mt-2 space-y-1">
                {unit.output.constraints.map((c, i) => (
                  <p key={i} className="text-xs text-amber-600">• {c}</p>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="mb-4">
              <textarea
                value={outputText}
                onChange={e => setOutputText(e.target.value)}
                placeholder="用你自己的话写出来，不要复制粘贴..."
                className="w-full h-40 p-4 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm leading-relaxed"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                <span>{outputText.length} 字</span>
                {unit.output.wordLimit && <span>建议 {unit.output.wordLimit} 字以内</span>}
              </div>
            </div>

            {/* AI Score */}
            {(feynmanScore !== null || isScoring) && (
              <div className={`p-4 rounded-xl border mb-4 ${feynmanScore !== null && feynmanScore >= 4 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                {isScoring ? (
                  <div className="flex items-center gap-2 text-amber-700">
                    <span className="animate-spin">⏳</span>
                    <span className="text-sm">AI 正在评分...</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{feynmanScore !== null && feynmanScore >= 4 ? '🌟' : '💡'}</span>
                      <span className="font-bold">费曼指数：{feynmanScore}/5</span>
                    </div>
                    <p className="text-sm text-slate-700">{feynmanFeedback}</p>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!feynmanScore && (
                <button
                  onClick={handleAIScore}
                  disabled={!outputText.trim() || isScoring}
                  className="flex-1 py-3 px-5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isScoring ? '评分中...' : '🤖 AI 评分'}
                </button>
              )}
              {feynmanScore !== null && unit.status !== 'completed' && (
                <button
                  onClick={handleComplete}
                  className="flex-1 py-3 px-5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm"
                >
                  ✅ 完成本单元
                </button>
              )}
              {unit.status === 'completed' && (
                <div className="flex-1 py-3 px-5 bg-green-50 text-green-700 rounded-xl font-semibold text-center text-sm border border-green-200">
                  ✓ 已完成
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface UnitPageClientProps {
  phase: Phase;
  unit: Unit;
}
