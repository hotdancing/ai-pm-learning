import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Phase, Unit, Progress, FeynmanOutput } from '@/lib/types';
import { curriculum } from '@/data/curriculum';

interface ProgressStore {
  phases: Phase[];
  progress: Progress;
  
  // Actions
  startUnit: (phaseId: string, unitId: string) => void;
  completeUnit: (phaseId: string, unitId: string, output: FeynmanOutput) => void;
  updateFeynmanOutput: (phaseId: string, unitId: string, output: Partial<FeynmanOutput>) => void;
  getPhaseProgress: (phaseId: string) => number;
  getCurrentUnit: () => { phase: Phase; unit: Unit } | null;
  getCompletedUnits: () => Unit[];
  getFeynmanOutputs: () => { phase: Phase; unit: Unit; output: FeynmanOutput }[];
  resetProgress: () => void;
}

const initialProgress: Progress = {
  phaseA: 0,
  phaseB: 0,
  phaseC: 0,
  phaseD: 0,
  phaseE: 0,
  totalUnits: curriculum.reduce((acc, phase) => acc + phase.units.length, 0),
  completedUnits: 0,
  feynmanOutputs: 0,
  streakDays: 0,
  lastActiveDate: '',
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      phases: curriculum,
      progress: initialProgress,

      startUnit: (phaseId: string, unitId: string) => {
        set((state) => {
          const newPhases = state.phases.map((phase) => {
            if (phase.id === phaseId) {
              return {
                ...phase,
                units: phase.units.map((unit) => {
                  if (unit.id === unitId) {
                    return { ...unit, status: 'in-progress' as const };
                  }
                  return unit;
                }),
                status: 'active' as const,
              };
            }
            return phase;
          });
          return { phases: newPhases };
        });
      },

      completeUnit: (phaseId: string, unitId: string, output: FeynmanOutput) => {
        set((state) => {
          const newPhases = state.phases.map((phase) => {
            if (phase.id === phaseId) {
              const newUnits = phase.units.map((unit) => {
                if (unit.id === unitId) {
                  return {
                    ...unit,
                    status: 'completed' as const,
                    feynmanOutput: output,
                    completedAt: new Date().toISOString(),
                  };
                }
                return unit;
              });
              
              // Check if all units in phase are completed
              const allCompleted = newUnits.every((u) => u.status === 'completed');
              
              // Unlock next phase if this one is completed
              const phaseIndex = state.phases.findIndex((p) => p.id === phaseId);
              let nextPhaseStatus: 'locked' | 'active' | 'completed' = phase.status;
              if (allCompleted) {
                nextPhaseStatus = 'completed';
              }
              
              return {
                ...phase,
                units: newUnits,
                status: nextPhaseStatus,
              };
            }
            return phase;
          });

          // Unlock next phase
          const completedPhaseIndex = newPhases.findIndex((p) => p.id === phaseId);
          if (completedPhaseIndex >= 0 && newPhases[completedPhaseIndex].status === 'completed') {
            const nextPhase = newPhases[completedPhaseIndex + 1];
            if (nextPhase && nextPhase.status === 'locked') {
              newPhases[completedPhaseIndex + 1].status = 'active';
            }
          }

          const completedUnits = newPhases.reduce(
            (acc, phase) => acc + phase.units.filter((u) => u.status === 'completed').length,
            0
          );

          const feynmanOutputs = newPhases.reduce(
            (acc, phase) => acc + phase.units.filter((u) => u.feynmanOutput?.text).length,
            0
          );

          const newProgress = {
            ...state.progress,
            completedUnits,
            feynmanOutputs,
            [`phase${phaseId.split('-')[1].toUpperCase()}`]: Math.round(
              (newPhases.find((p) => p.id === phaseId)?.units.filter((u) => u.status === 'completed').length || 0) /
                (newPhases.find((p) => p.id === phaseId)?.units.length || 1) *
                100
            ),
            lastActiveDate: new Date().toISOString().split('T')[0],
          };

          return { phases: newPhases, progress: newProgress };
        });
      },

      updateFeynmanOutput: (phaseId: string, unitId: string, output: Partial<FeynmanOutput>) => {
        set((state) => {
          const newPhases = state.phases.map((phase) => {
            if (phase.id === phaseId) {
              return {
                ...phase,
                units: phase.units.map((unit) => {
                  if (unit.id === unitId) {
                    return {
                      ...unit,
                      feynmanOutput: { ...unit.feynmanOutput, ...output } as FeynmanOutput,
                    };
                  }
                  return unit;
                }),
              };
            }
            return phase;
          });
          return { phases: newPhases };
        });
      },

      getPhaseProgress: (phaseId: string) => {
        const state = get();
        const phase = state.phases.find((p) => p.id === phaseId);
        if (!phase) return 0;
        const completed = phase.units.filter((u) => u.status === 'completed').length;
        return Math.round((completed / phase.units.length) * 100);
      },

      getCurrentUnit: () => {
        const state = get();
        for (const phase of state.phases) {
          if (phase.status === 'active' || phase.status === 'completed') {
            const currentUnit = phase.units.find((u) => u.status === 'in-progress' || u.status === 'pending');
            if (currentUnit) {
              return { phase, unit: currentUnit };
            }
          }
        }
        // Return first pending unit from first active phase
        for (const phase of state.phases) {
          if (phase.status === 'active') {
            const firstPending = phase.units.find((u) => u.status === 'pending');
            if (firstPending) {
              return { phase, unit: firstPending };
            }
          }
        }
        return null;
      },

      getCompletedUnits: () => {
        const state = get();
        return state.phases.flatMap((phase) =>
          phase.units.filter((unit) => unit.status === 'completed')
        );
      },

      getFeynmanOutputs: () => {
        const state = get();
        const outputs: { phase: Phase; unit: Unit; output: FeynmanOutput }[] = [];
        for (const phase of state.phases) {
          for (const unit of phase.units) {
            if (unit.feynmanOutput?.text) {
              outputs.push({ phase, unit, output: unit.feynmanOutput });
            }
          }
        }
        return outputs;
      },

      resetProgress: () => {
        set({ phases: curriculum, progress: initialProgress });
      },
    }),
    {
      name: 'ai-pm-learning-progress',
    }
  )
);
