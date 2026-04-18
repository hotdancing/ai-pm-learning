import Link from 'next/link';

export default function Header({ active }: { active?: 'home' | 'learn' | 'progress' }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-200 group-hover:shadow-xl transition-shadow">
            AI
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">AI PM 学习旅程</p>
            <p className="text-xs text-slate-400">从零到 Inspire</p>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          {[
            { key: 'home', label: '首页', href: '/' },
            { key: 'learn', label: '学习', href: '/learn' },
            { key: 'progress', label: '进度', href: '/progress' },
          ].map(item => (
            <Link
              key={item.key}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                active === item.key
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
