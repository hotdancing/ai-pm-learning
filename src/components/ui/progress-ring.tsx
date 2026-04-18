'use client';

import { useProgressStore } from '@/stores/progressStore';

export function ProgressRing({
  percentage,
  size = 100,
  strokeWidth = 8,
  color = '#6366f1',
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black" style={{ color }}>{percentage}%</span>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { progress, phases } = useProgressStore();

  const totalPct = Math.round((progress.completedUnits / progress.totalUnits) * 100);
  const activePhase = phases.find(p => p.status === 'active');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
      <div className="flex items-center gap-6">
        <ProgressRing percentage={totalPct} size={90} strokeWidth={8} />
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '已完成单元', value: `${progress.completedUnits}/${progress.totalUnits}`, color: 'text-indigo-600' },
            { label: '费曼输出', value: String(progress.feynmanOutputs), color: 'text-purple-600' },
            { label: '连续学习', value: `${progress.streakDays}天`, color: 'text-amber-600' },
            { label: '当前阶段', value: activePhase?.name || '-', color: 'text-slate-600' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
