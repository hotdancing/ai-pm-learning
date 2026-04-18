'use client';

import { useState } from 'react';
import { useProgressStore } from '@/stores/progressStore';
import { Phase, Unit } from '@/lib/types';

interface UnitPageClientProps {
  phase: Phase;
  unit: Unit;
}

export default function UnitPageClient({ phase, unit }: UnitPageClientProps) {
  const [activeTab, setActiveTab] = useState<'read' | 'understand' | 'experiment' | 'output'>('read');
  const [outputText, setOutputText] = useState(unit.feynmanOutput?.text || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [feynmanScore, setFeynmanScore] = useState<number | null>(unit.feynmanOutput?.feynmanScore ?? null);
  const [feynmanFeedback, setFeynmanFeedback] = useState(unit.feynmanOutput?.feynmanFeedback || '');
  
  const { completeUnit, updateFeynmanOutput } = useProgressStore();

  const handleSubmitOutput = async () => {
    if (!outputText.trim()) return;
    
    setIsScoring(true);
    
    // AI scoring simulation (in production, call LLM API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple scoring based on length and content
    let score = 3;
    const wordCount = outputText.length;
    const hasSimpleWords = /外婆|妈妈|爷爷|奶奶|小朋友|小孩|讲故事/.test(outputText);
    const hasTechnicalWords = /向量|Embedding|检索|Transformer|参数|神经网络/.test(outputText);
    
    if (wordCount < 30) score = 2;
    if (wordCount >= 50 && wordCount <= 200) score = 4;
    if (hasSimpleWords && !hasTechnicalWords) score += 1;
    if (hasTechnicalWords) score -= 1;
    score = Math.max(1, Math.min(5, score));
    
    const feedbacks = [
      '⚠️ 太简短了，试着用更多日常语言解释这个概念。想象你在给一个完全不懂技术的人讲解。',
      '⚠️ 内容太技术化了。试着避免使用专业术语，用生活化的比喻来解释。',
      '✅ 不错！你在试着用简单的语言解释，但可以再想想有没有更通俗的比方。',
      '✅ 很好！你用简单的语言解释了这个概念。如果能加入更多生活化的比喻会更好。',
      '🌟 完美！你的解释非常通俗易懂，真正做到了费曼学习法的精髓。'
    ];
    
    setFeynmanScore(score);
    setFeynmanFeedback(feedbacks[score - 1]);
    setIsScoring(false);
    
    // Save output
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

  const tabs = [
    { id: 'read', label: '📖 学习', count: unit.read.items.length },
    { id: 'understand', label: '💭 思考', count: unit.understand.length },
    { id: 'experiment', label: '🧪 实验', count: 1 },
    { id: 'output', label: '✍️ 费曼输出', count: 1 },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Phase & Unit Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <a href="/learn" className="hover:text-indigo-600">学习</a>
          <span>/</span>
          <span style={{ color: phase.color }}>{phase.name}</span>
          <span>/</span>
          <span className="text-gray-800">{unit.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="w-4 h-4 rounded"
            style={{ backgroundColor: phase.color }}
          />
          <h1 className="text-2xl font-bold text-gray-900">{unit.name}</h1>
        </div>
        <div className="flex gap-2 mt-3">
          {unit.jdSkills.map(skill => (
            <span key={skill} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {/* READ */}
        {activeTab === 'read' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📖 学习材料</h2>
            <p className="text-gray-600 text-sm mb-6">
              仔细阅读以下材料，理解每个概念。如有不懂的地方，记录下来稍后思考。
            </p>
            <div className="space-y-3">
              {unit.read.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:underline mt-1 inline-block"
                      >
                        查看详情 →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UNDERSTAND */}
        {activeTab === 'understand' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">💭 思考题</h2>
            <p className="text-gray-600 text-sm mb-6">
              带着这些问题思考，这些问题没有标准答案，重要的是形成自己的理解。
            </p>
            <div className="space-y-4">
              {unit.understand.map((question, index) => (
                <div key={index} className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-800">{question}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <p className="text-sm text-indigo-800">
                💡 <strong>提示：</strong>这些问题的答案不需要提交，但建议你简单记录到笔记本或 Obsidian 中。
                思考的过程比答案本身更重要。
              </p>
            </div>
          </div>
        )}

        {/* EXPERIMENT */}
        {activeTab === 'experiment' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🧪 实验任务</h2>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 mb-6">
              <h3 className="font-medium text-indigo-900 mb-2">{unit.experiment.title}</h3>
              <p className="text-sm text-indigo-700 whitespace-pre-line">{unit.experiment.description}</p>
            </div>
            {unit.experiment.verification && (
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-sm text-green-800">
                  ✅ <strong>验收标准：</strong>{unit.experiment.verification}
                </p>
              </div>
            )}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">
                📝 <strong>记录你的实验：</strong>完成实验后，将你的发现和结论记录下来，
                这将成为你费曼输出的素材。
              </p>
            </div>
          </div>
        )}

        {/* OUTPUT */}
        {activeTab === 'output' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">✍️ 费曼输出</h2>
            
            {/* Output Prompt */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6">
              <p className="text-sm text-amber-800">
                <strong>任务：</strong>{unit.output.prompt}
              </p>
              <div className="mt-3 space-y-1">
                {unit.output.constraints.map((constraint, index) => (
                  <p key={index} className="text-xs text-amber-700">• {constraint}</p>
                ))}
              </div>
            </div>

            {/* Output Textarea */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                你的输出 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                placeholder="用你自己的话写出来，不要复制粘贴..."
                className="w-full h-48 p-4 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>已输入 {outputText.length} 字</span>
                {unit.output.wordLimit && (
                  <span>建议 {unit.output.wordLimit} 字以内</span>
                )}
              </div>
            </div>

            {/* AI Scoring */}
            {(feynmanScore !== null || isScoring) && (
              <div className={`p-4 rounded-xl border ${
                feynmanScore !== null && feynmanScore >= 4 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-amber-50 border-amber-200'
              }`}>
                {isScoring ? (
                  <div className="flex items-center gap-2 text-amber-700">
                    <span className="animate-spin">⏳</span>
                    <span className="text-sm">AI 正在评分...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">
                        {feynmanScore !== null && feynmanScore >= 4 ? '🌟' : '⚠️'}
                      </span>
                      <span className="font-medium">
                        费曼指数：{feynmanScore}/5
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{feynmanFeedback}</p>
                  </>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {!feynmanScore && (
                <button
                  onClick={handleSubmitOutput}
                  disabled={!outputText.trim() || isScoring}
                  className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isScoring ? '评分中...' : '🤖 AI 评分'}
                </button>
              )}
              {feynmanScore !== null && unit.status !== 'completed' && (
                <button
                  onClick={handleComplete}
                  className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                >
                  ✅ 完成本单元
                </button>
              )}
              {unit.status === 'completed' && (
                <div className="flex-1 py-3 px-4 bg-green-50 text-green-700 rounded-xl font-medium text-center">
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
