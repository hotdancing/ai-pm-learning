'use client';

import { useState, useEffect } from 'react';
import { useProgressStore } from '@/stores/progressStore';
import { Phase, Unit } from '@/lib/types';

interface UnitPageClientProps {
  phase: Phase;
  unit: Unit;
}

const tabItems = [
  { id: 'read', label: '📖 学习', color: '#6366f1' },
  { id: 'understand', label: '💭 思考', color: '#f59e0b' },
  { id: 'experiment', label: '🧪 实验', color: '#8b5cf6' },
  { id: 'output', label: '✍️ 输出', color: '#10b981' },
] as const;

export default function UnitPageClient({ phase, unit }: UnitPageClientProps) {
  const [activeTab, setActiveTab] = useState<'read' | 'understand' | 'experiment' | 'output'>('read');
  const [outputText, setOutputText] = useState(unit.feynmanOutput?.text || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [feynmanScore, setFeynmanScore] = useState<number | null>(unit.feynmanOutput?.feynmanScore ?? null);
  const [feynmanFeedback, setFeynmanFeedback] = useState(unit.feynmanOutput?.feynmanFeedback || '');
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { completeUnit, updateFeynmanOutput } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmitOutput = async () => {
    if (!outputText.trim()) return;
    
    setIsScoring(true);
    
    // AI scoring simulation
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
      '⚠️ 太简短了，试着用更多日常语言解释这个概念。',
      '⚠️ 内容太技术化了。试着避免使用专业术语，用生活化的比喻。',
      '✅ 不错！可以再想想有没有更通俗的比方。',
      '✅ 很好！如果能加入更多生活化的比喻会更好。',
      '🌟 完美！你的解释非常通俗易懂，真正做到了费曼学习法的精髓。'
    ];
    
    setFeynmanScore(score);
    setFeynmanFeedback(feedbacks[score - 1]);
    setIsScoring(false);
    setShowScoreAnimation(true);
    
    // Save output
    updateFeynmanOutput(phase.id, unit.id, {
      text: outputText,
      feynmanScore: score,
      feynmanFeedback: feedbacks[score - 1],
      createdAt: new Date().toISOString(),
      syncedToObsidian: false,
    });
    
    setTimeout(() => setShowScoreAnimation(false), 1000);
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

  const currentTab = tabItems.find(t => t.id === activeTab) || tabItems[0];
  const wordLimit = unit.output.wordLimit || 150;
  const wordCount = outputText.length;
  const wordCountPercentage = Math.min((wordCount / wordLimit) * 100, 100);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-slate-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded mb-8"></div>
          <div className="h-12 w-full bg-slate-200 rounded mb-6"></div>
          <div className="h-64 w-full bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Phase & Unit Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <a href="/learn" className="hover:text-indigo-600 transition-colors">学习</a>
          <span>/</span>
          <a href={`/learn/${phase.id}`} className="hover:text-indigo-600 transition-colors" style={{ color: phase.color }}>
            {phase.name}
          </a>
          <span>/</span>
          <span className="text-slate-700">{unit.name}</span>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-5 h-5 rounded-md"
            style={{ backgroundColor: phase.color, boxShadow: `0 2px 8px ${phase.color}40` }}
          />
          <h1 className="text-2xl font-bold text-slate-800">{unit.name}</h1>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {unit.jdSkills.map(skill => (
            <span 
              key={skill} 
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Tab Navigation - Duolingo Style */}
      <div className="tab-container mb-6">
        {tabItems.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${
              activeTab === tab.id ? 'tab-button-active' : ''
            }`}
            style={{
              color: activeTab === tab.id ? tab.color : undefined,
            }}
          >
            <span className="text-base">{tab.label.split(' ')[0]}</span>
            <span className="hidden sm:inline text-xs">{tab.label.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div 
        className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm"
        style={{
          boxShadow: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.03)`,
        }}
      >
        {/* READ */}
        {activeTab === 'read' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-xl">
                📖
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">学习材料</h2>
                <p className="text-sm text-slate-500">仔细阅读，理解每个概念</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {unit.read.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-100 transition-all"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: phase.color }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800">{item.title}</p>
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:underline mt-1 inline-flex items-center gap-1"
                      >
                        查看详情 <span className="text-xs">↗</span>
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
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-xl">
                💭
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">思考题</h2>
                <p className="text-sm text-slate-500">形成自己的理解，没有标准答案</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {unit.understand.map((question, index) => (
                <div 
                  key={index} 
                  className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <span 
                      className="w-7 h-7 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    >
                      {index + 1}
                    </span>
                    <p className="text-slate-700 leading-relaxed">{question}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-sm text-indigo-700">
                💡 <strong>提示：</strong>这些问题的答案不需要提交，但建议你记录到笔记本或 Obsidian 中。
                思考的过程比答案本身更重要。
              </p>
            </div>
          </div>
        )}

        {/* EXPERIMENT */}
        {activeTab === 'experiment' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-xl">
                🧪
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">实验任务</h2>
                <p className="text-sm text-slate-500">动手实践，加深理解</p>
              </div>
            </div>
            
            <div 
              className="p-5 rounded-xl border-2 mb-4"
              style={{ 
                backgroundColor: `${phase.color}08`,
                borderColor: `${phase.color}30`,
              }}
            >
              <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span>🎯</span> {unit.experiment.title}
              </h3>
              <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                {unit.experiment.description}
              </p>
            </div>
            
            {unit.experiment.verification && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-sm text-emerald-700">
                  ✅ <strong>验收标准：</strong>{unit.experiment.verification}
                </p>
              </div>
            )}
            
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm text-slate-600">
                📝 <strong>记录你的实验：</strong>完成实验后，将你的发现和结论记录下来，
                这将成为你费曼输出的素材。
              </p>
            </div>
          </div>
        )}

        {/* OUTPUT */}
        {activeTab === 'output' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-xl">
                ✍️
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">费曼输出</h2>
                <p className="text-sm text-slate-500">用外婆能听懂的话解释</p>
              </div>
            </div>
            
            {/* Output Prompt */}
            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-800 mb-3">
                <strong>任务：</strong>{unit.output.prompt}
              </p>
              <div className="space-y-1">
                {unit.output.constraints.map((constraint, index) => (
                  <p key={index} className="text-xs text-amber-700 flex items-start gap-1">
                    <span>•</span>
                    <span>{constraint}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Output Textarea */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                你的输出 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                placeholder="用你自己的话写出来，不要复制粘贴..."
                className="w-full h-48 p-4 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
              />
              
              {/* Character count visualization */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${wordCountPercentage}%`,
                        backgroundColor: wordCount > wordLimit ? '#ef4444' : phase.color,
                      }}
                    />
                  </div>
                  <span className={`text-xs ${wordCount > wordLimit ? 'text-red-500' : 'text-slate-500'}`}>
                    {wordCount} / {wordLimit} 字
                  </span>
                </div>
                {wordCount > wordLimit && (
                  <span className="text-xs text-red-500">超出 {(wordCount - wordLimit).toLocaleString()} 字</span>
                )}
              </div>
            </div>

            {/* AI Scoring */}
            {(feynmanScore !== null || isScoring) && (
              <div 
                className={`p-5 rounded-xl border-2 transition-all duration-500 ${
                  showScoreAnimation ? 'scale-102' : ''
                } ${
                  feynmanScore !== null && feynmanScore >= 4 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200' 
                    : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
                }`}
              >
                {isScoring ? (
                  <div className="flex items-center gap-3 text-amber-700">
                    <span className="text-2xl animate-spin">⏳</span>
                    <div>
                      <p className="font-medium">AI 正在评分...</p>
                      <p className="text-xs text-amber-600">分析你的费曼输出质量</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">
                        {feynmanScore !== null && feynmanScore >= 4 ? '🌟' : '💡'}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-slate-800">
                            费曼指数
                          </span>
                          <span 
                            className="text-xl font-bold"
                            style={{ color: feynmanScore && feynmanScore >= 4 ? '#10b981' : '#f59e0b' }}
                          >
                            {feynmanScore}/5
                          </span>
                        </div>
                        {/* Score stars */}
                        <div className="flex gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                              key={star}
                              className={`text-sm transition-all ${
                                star <= (feynmanScore || 0) ? 'opacity-100' : 'opacity-30'
                              }`}
                              style={{ color: feynmanScore && feynmanScore >= 4 ? '#10b981' : '#f59e0b' }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{feynmanFeedback}</p>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {!feynmanScore && (
                <button
                  onClick={handleSubmitOutput}
                  disabled={!outputText.trim() || isScoring}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                  style={{ 
                    backgroundColor: '#6366f1',
                    color: 'white',
                  }}
                >
                  {isScoring ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      评分中...
                    </>
                  ) : (
                    <>
                      🤖 AI 评分
                    </>
                  )}
                </button>
              )}
              {feynmanScore !== null && unit.status !== 'completed' && (
                <button
                  onClick={handleComplete}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md"
                >
                  ✅ 完成本单元
                </button>
              )}
              {unit.status === 'completed' && (
                <div className="flex-1 py-3 px-4 bg-emerald-50 text-emerald-700 rounded-xl font-semibold text-center flex items-center justify-center gap-2">
                  <span>✓</span>
                  <span>已完成</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
