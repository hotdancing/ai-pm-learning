import Link from 'next/link';
import Header from '@/components/ui/header';

const PHASES = [
  { id: 'phase-a', emoji: '🧠', name: 'AI 认知扫盲', desc: '理解 AI 能做什么', color: '#6366f1', bg: 'from-indigo-500 to-purple-600', units: 4 },
  { id: 'phase-b', emoji: '⚙️', name: '技术框架入门', desc: 'RAG / Agent / Prompt', color: '#8b5cf6', bg: 'from-purple-500 to-pink-600', units: 4 },
  { id: 'phase-c', emoji: '🚀', name: '项目正式启动', desc: '从 0 到 1 落地', color: '#06b6d4', bg: 'from-cyan-500 to-blue-600', units: 4 },
  { id: 'phase-d', emoji: '📊', name: '运营体系建设', desc: '数据飞轮与监控', color: '#f59e0b', bg: 'from-amber-500 to-orange-600', units: 2 },
  { id: 'phase-e', emoji: '💼', name: '简历与面试', desc: '项目经历武器化', color: '#10b981', bg: 'from-emerald-500 to-teal-600', units: 2 },
];

const STATS = [
  { label: '已完成单元', value: '0', suffix: '/16', icon: '📚' },
  { label: '费曼输出', value: '0', suffix: '篇', icon: '✍️' },
  { label: '连续学习', value: '0', suffix: '天', icon: '🔥' },
  { label: '目标岗位', value: 'Inspire', suffix: '', icon: '🎯' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header active="home" />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Hero */}
        <div className="relative mb-12 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative px-10 py-14 md:py-16 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-6">
                <span>🔥</span>
                <span className="font-medium">费曼学习法 · 每步都有输出</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                成为<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-yellow-200">
                  AI 产品经理
                </span>
              </h1>
              <p className="text-lg text-indigo-100 mb-8 leading-relaxed max-w-md">
                从 LLM 原理到 RAG/Agent，从项目启动到简历面试。8 个月系统化路径，目标是 Inspire AI PM 岗位。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/learn/phase-a/a1"
                  className="inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  开始 Unit 1 <span className="text-lg">→</span>
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                >
                  查看路线图
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-center min-w-[130px]">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-black text-white mb-0.5">
                    {s.value}<span className="text-base opacity-70">{s.suffix}</span>
                  </div>
                  <div className="text-xs text-indigo-200 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why this */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-800 mb-5">这个学习方法有什么特别</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { emoji: '🎓', title: '费曼输出', desc: '每学完一个单元，用自己的话写出来。能不能讲清楚，是真懂的唯一标准。', color: '#f59e0b' },
              { emoji: '🧠', title: 'JD 驱动', desc: '每个知识点都直接对应 Inspire 的 JD 要求。学完就知道哪里有用。', color: '#6366f1' },
              { emoji: '⚡', title: '项目实战', desc: '铁三教练 AI 项目贯穿全程。不是 Demo，是真正从 0 到 1 的产品。', color: '#10b981' },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-slate-800 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Roadmap */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-800">学习路线图</h2>
            <span className="text-sm text-slate-400">5个阶段 · 16个单元</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {PHASES.map((p, i) => (
              <Link
                key={p.id}
                href={`/learn/${p.id}`}
                className="group relative bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.bg}`} />
                <div className="text-3xl mb-3">{p.emoji}</div>
                <div className="text-xs font-bold mb-1" style={{ color: p.color }}>
                  Phase {String.fromCharCode(65 + i)}
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1 leading-snug">{p.name}</h3>
                <p className="text-xs text-slate-400 mb-2 leading-snug">{p.desc}</p>
                <div className="text-xs text-slate-400 font-medium">{p.units} 单元</div>
                <div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                  style={{ color: p.color }}
                >
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl px-10 py-12 text-white text-center">
          <div className="text-5xl mb-4">✍️</div>
          <h3 className="text-2xl font-black mb-2">费曼输出才是真正学会的标志</h3>
          <p className="text-indigo-100 mb-8 max-w-md mx-auto">
            读一遍 ≠ 学会了。关上资料，用自己的话写出来，能让一个完全不懂的人听懂，这才是真的理解。
          </p>
          <Link
            href="/learn/phase-a/a1"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            开始第一个单元 <span className="text-lg">→</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
