import { Dashboard } from '@/components/ui/progress-ring';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI PM 学习旅程</h1>
              <p className="text-sm text-gray-500">从零到 Inspire AI PM</p>
            </div>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm font-medium text-indigo-600">首页</a>
              <a href="/learn" className="text-sm font-medium text-gray-600 hover:text-gray-900">学习</a>
              <a href="/progress" className="text-sm font-medium text-gray-600 hover:text-gray-900">进度</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">欢迎开始 AI PM 学习之旅 🚀</h2>
          <p className="text-indigo-100 mb-4">
            基于费曼学习法，每一步学习都有输出。完成学习后用你自己的话讲出来，才是真正的理解。
          </p>
          <div className="flex gap-4">
            <a 
              href="/learn/phase-a" 
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              开始学习 →
            </a>
          </div>
        </div>

        {/* Dashboard */}
        <Dashboard />
      </div>
    </main>
  );
}
