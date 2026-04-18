export interface FeynmanOutput {
  text?: string;
  audioUrl?: string;
  imageUrls?: string[];
  feynmanScore?: number;
  feynmanFeedback?: string;
  createdAt: string;
  syncedToObsidian: boolean;
}

export interface Unit {
  id: string;
  name: string;
  phase: string;
  read: {
    items: { type: 'article' | 'video' | 'link'; title: string; url?: string; content?: string }[];
  };
  understand: string[];
  experiment: {
    title: string;
    description: string;
    verification?: string;
  };
  output: {
    title: string;
    prompt: string;
    constraints: string[];
    wordLimit?: number;
  };
  status: 'pending' | 'in-progress' | 'completed';
  feynmanOutput?: FeynmanOutput;
  completedAt?: string;
  jdSkills: string[];
}

export interface Phase {
  id: string;
  name: string;
  description: string;
  units: Unit[];
  status: 'locked' | 'active' | 'completed';
  color: string;
}

export interface Progress {
  phaseA: number;
  phaseB: number;
  phaseC: number;
  phaseD: number;
  phaseE: number;
  totalUnits: number;
  completedUnits: number;
  feynmanOutputs: number;
  streakDays: number;
  lastActiveDate: string;
}

export interface LearningState {
  phases: Phase[];
  progress: Progress;
  currentPhase: string | null;
  currentUnit: string | null;
}
