import { Dashboard } from '@/components/ui/progress-ring';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">
                AI
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">AI PM 学习旅程</h1>
                <p className="text-xs text-slate-500">从零到 Inspire ✨</p>
              </div>
            </div>
            <nav className="flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">
                首页
              </Link>
              <Link href="/learn" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                学习
              </Link>
              <Link href="/progress" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                进度
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 opacity-10 rounded-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-200 to-indigo-200 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-6xl opacity-20">🚀</div>
            <div className="absolute bottom-4 left-4 text-5xl opacity-20">🎯</div>
            <div className="absolute top-1/2 right-1/4 text-3xl opacity-10">⭐</div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-6">
                <span className="text-lg">🔥</span>
                <span className="font-medium">基于费曼学习法，每一步都有输出</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                欢迎开始 AI PM<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-yellow-200">学习之旅</span>
              </h2>
              
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                用自己的话讲出来，才是真正的理解。完成学习后完成费曼输出，把知识内化成你的能力。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/learn/phase-a" 
                  className="inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>开始学习</span>
                  <span className="text-xl">→</span>
                </Link>
                <Link 
                  href="/learn" 
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all"
                >
                  <span>查看路线图</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>💡</span> 为什么用这个学
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl mb-4">
                🎓
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">费曼输出法</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                每学完一个单元，用外婆能听懂的话写出来。真正理解一个概念，是能用简单语言解释它。
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl mb-4">
                🧠
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">思考题驱动</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                不是填鸭式学习，而是通过高质量的思考题，引导你形成自己的理解，建立 AI PM 思维框架。
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-2xl mb-4">
                🔄
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">数据飞轮</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                从项目启动到运营体系，真正学完这个路径，你将掌握构建 AI 产品的完整方法论。
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <Dashboard />

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 text-center border border-indigo-100">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">准备好开始了吗？</h3>
          <p className="text-slate-500 mb-6">5 个阶段，16 个单元，从 AI 认知到简历面试</p>
          <Link 
            href="/learn/phase-a" 
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>从 Phase A 开始</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
