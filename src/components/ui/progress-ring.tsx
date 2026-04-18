'use client';

import { useProgressStore } from '@/stores/progressStore';
import Link from 'next/link';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showXp?: boolean;
  xp?: number;
  isActive?: boolean;
}

export function ProgressRing({ 
  percentage, 
  size = 140, 
  strokeWidth = 10, 
  color = '#6366f1',
  showXp = false,
  xp = 0,
  isActive = false,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Glow effect for active phase */}
      {isActive && (
        <div 
          className="absolute inset-0 rounded-full animate-pulse opacity-30"
          style={{ 
            backgroundColor: color,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      
      <svg 
        width={size} 
        height={size} 
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ 
            color: color,
            transition: 'stroke-dashoffset 700ms ease-out',
            filter: isActive ? `drop-shadow(0 0 6px ${color})` : 'none',
          }}
          className={isActive ? 'animate-glow' : ''}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-3xl font-bold tracking-tight"
          style={{ color: isActive ? color : '#1e293b' }}
        >
          {percentage}%
        </span>
        <span className="text-xs text-slate-500 font-medium">完成度</span>
        
        {showXp && xp > 0 && (
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs" style={{ color }}>⚡</span>
            <span className="text-xs font-semibold" style={{ color }}>{xp} XP</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  emoji: string;
  value: string | number;
  label: string;
  color?: string;
  delay?: number;
}

function StatCard({ emoji, value, label, color = '#6366f1', delay = 0 }: StatCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <div 
        className="text-2xl font-bold mb-1"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-xs text-slate-500 font-medium">{label}</div>
    </div>
  );
}

interface PhaseCardProps {
  phase: {
    id: string;
    name: string;
    description: string;
    color: string;
    status: 'locked' | 'active' | 'completed';
    completed: number;
    total: number;
    percentage: number;
  };
}

function PhaseCard({ phase }: PhaseCardProps) {
  const isLocked = phase.status === 'locked';
  const isCompleted = phase.status === 'completed';
  
  return (
    <Link 
      href={isLocked ? '#' : `/learn/${phase.id}`}
      className={`block p-5 rounded-2xl border-2 transition-all duration-200 ${
        isLocked 
          ? 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-70' 
          : isCompleted
          ? 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50 hover:shadow-md hover:-translate-y-0.5'
          : 'border-indigo-100 bg-white hover:shadow-lg hover:-translate-y-1 hover:border-indigo-200'
      }`}
      onClick={(e) => isLocked && e.preventDefault()}
    >
      <div className="flex items-center justify-between mb-3">
        <div 
          className={`w-4 h-4 rounded-full ${phase.status === 'active' ? 'animate-pulse' : ''}`}
          style={{ 
            backgroundColor: isLocked ? '#94a3b8' : phase.color,
            boxShadow: phase.status === 'active' ? `0 0 12px ${phase.color}` : 'none',
          }}
        />
        <div className="flex items-center gap-2">
          {isLocked && <span className="text-xs text-slate-400">🔒 已锁定</span>}
          {isCompleted && <span className="text-xs text-emerald-600 font-medium">✓ 已完成</span>}
          {phase.status === 'active' && (
            <span 
              className="text-xs px-2 py-0.5 rounded-full font-medium animate-pulse"
              style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
            >
              进行中
            </span>
          )}
        </div>
      </div>
      
      <h3 className="font-semibold text-slate-800 mb-1">{phase.name}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{phase.description}</p>
      
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: `${phase.percentage}%`,
              backgroundColor: isLocked ? '#94a3b8' : phase.color,
            }}
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {phase.completed}/{phase.total}
        </span>
      </div>
    </Link>
  );
}

export function Dashboard() {
  const { progress, phases } = useProgressStore();
  
  const totalPercentage = Math.round((progress.completedUnits / progress.totalUnits) * 100);
  
  const phaseProgress = phases.map((phase, index) => ({
    ...phase,
    completed: phase.units.filter(u => u.status === 'completed').length,
    total: phase.units.length,
    percentage: Math.round((phase.units.filter(u => u.status === 'completed').length / phase.units.length) * 100),
  }));

  // Calculate XP (10 XP per completed unit)
  const totalXp = progress.completedUnits * 10;
  
  // Find active phase
  const activePhase = phases.find(p => p.status === 'active');

  return (
    <div className="space-y-10">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Large Progress Ring */}
        <div className="md:col-span-1 flex justify-center items-center">
          <ProgressRing 
            percentage={totalPercentage} 
            size={160} 
            strokeWidth={12}
            color={activePhase?.color || '#6366f1'}
            showXp
            xp={totalXp}
            isActive={activePhase?.status === 'active'}
          />
        </div>
        
        {/* Stats Grid */}
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
          <StatCard 
            emoji="📚" 
            value={`${progress.completedUnits}/${progress.totalUnits}`} 
            label="已完成单元" 
            color="#6366f1"
            delay={0}
          />
          <StatCard 
            emoji="✍️" 
            value={progress.feynmanOutputs} 
            label="费曼输出" 
            color="#10b981"
            delay={100}
          />
          <StatCard 
            emoji="🔥" 
            value={`${progress.streakDays}`} 
            label="连续学习" 
            color="#f59e0b"
            delay={200}
          />
          <StatCard 
            emoji="⚡" 
            value={`${totalXp}`} 
            label="总经验值" 
            color="#8b5cf6"
            delay={300}
          />
        </div>
      </div>

      {/* Phase Progress Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <span>📍</span> 学习阶段
          </h2>
          <Link 
            href="/learn" 
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            查看全部 →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {phaseProgress.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>
      </div>

      {/* Recent Activity / Feynman Outputs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <span>💎</span> 费曼输出
          </h2>
          <Link 
            href="/progress" 
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            查看全部 →
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {progress.feynmanOutputs === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">📝</div>
              <p className="text-lg font-medium text-slate-700 mb-1">还没有费曼输出</p>
              <p className="text-sm text-slate-500">开始学习第一个单元，用自己的话讲出来</p>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <p className="font-medium text-slate-800">
                  已完成 <span className="text-indigo-600 font-bold">{progress.feynmanOutputs}</span> 篇费曼输出
                </p>
                <p className="text-sm text-slate-500">继续加油，把知识内化为自己的话</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
