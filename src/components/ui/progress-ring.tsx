'use client';

import { useProgressStore } from '@/stores/progressStore';
import Link from 'next/link';

export function ProgressRing({ percentage, size = 120, strokeWidth = 8 }: { 
  percentage: number; 
  size?: number; 
  strokeWidth?: number; 
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
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
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
          className="text-indigo-600 transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
        <span className="text-xs text-gray-500">完成度</span>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { progress, phases } = useProgressStore();
  
  const totalPercentage = Math.round((progress.completedUnits / progress.totalUnits) * 100);
  
  const phaseProgress = phases.map(phase => ({
    ...phase,
    completed: phase.units.filter(u => u.status === 'completed').length,
    total: phase.units.length,
    percentage: Math.round((phase.units.filter(u => u.status === 'completed').length / phase.units.length) * 100),
  }));

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 flex justify-center">
          <ProgressRing percentage={totalPercentage} size={140} />
        </div>
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="已完成单元" value={`${progress.completedUnits}/${progress.totalUnits}`} />
          <StatCard label="费曼输出" value={String(progress.feynmanOutputs)} />
          <StatCard label="连续学习" value={`${progress.streakDays} 天`} />
          <StatCard label="当前阶段" value={phases.find(p => p.status === 'active')?.name || '已完成'} />
        </div>
      </div>

      {/* Phase Progress */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">学习阶段</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phaseProgress.map((phase) => (
            <Link 
              key={phase.id} 
              href={`/learn/${phase.id}`}
              className={`block p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                phase.status === 'locked' 
                  ? 'border-gray-100 bg-gray-50 opacity-60' 
                  : phase.status === 'completed'
                  ? 'border-green-200 bg-green-50'
                  : 'border-indigo-100 bg-white hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: phase.color }}
                />
                {phase.status === 'locked' && <span className="text-xs text-gray-400">🔒 已锁定</span>}
                {phase.status === 'completed' && <span className="text-xs text-green-600">✓ 已完成</span>}
                {phase.status === 'active' && <span className="text-xs text-indigo-600">进行中</span>}
              </div>
              <h3 className="font-medium text-gray-800 mb-1">{phase.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{phase.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${phase.percentage}%`,
                      backgroundColor: phase.color 
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500">{phase.completed}/{phase.total}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Outputs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">费曼输出</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {progress.feynmanOutputs === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">还没有费曼输出</p>
              <p className="text-sm">开始学习第一个单元，完成费曼输出环节</p>
            </div>
          ) : (
            <p className="text-gray-600">你已完成 {progress.feynmanOutputs} 篇费曼输出，继续加油！</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
      <div className="text-2xl font-bold text-indigo-600 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}
