export type WorkoutBlock = "muscle-gain" | "fat-loss" | "reset";

export type WorkoutDayNumber = 1 | 2 | 3 | 4;

export type ScheduleDay = "Mon" | "Tue" | "Thu" | "Sat";

export interface Exercise {
  name: string;
  prescription: string;
  note?: string;
}

export interface Finisher {
  name: string;
  prescription: string;
}

export interface RoundTarget {
  min: number;
  max: number;
  label: string;
}

export interface RestTarget {
  minSeconds: number;
  maxSeconds: number;
  label: string;
}

export interface WorkoutTemplate {
  dayNumber: WorkoutDayNumber;
  title: string;
  focus: string;
  exercises: Exercise[];
  baseRounds: RoundTarget;
  baseRest: RestTarget;
  finishers?: Finisher[];
}

export interface WorkoutSession {
  id: string;
  weekNumber: number;
  phaseWeek: number;
  dayNumber: WorkoutDayNumber;
  scheduleDay: ScheduleDay;
  block: WorkoutBlock;
  blockTitle: string;
  template: WorkoutTemplate;
  roundTarget: RoundTarget;
  restTarget: RestTarget;
  progressionNote: string;
  coachingCue: string;
  testPrompt?: string;
}

export interface WorkoutCompletion {
  sessionId: string;
  completedAt: string;
  weightUsed: string;
  roundsCompleted: number;
  notes?: string;
}

export interface ProgramProgress {
  currentSessionIndex: number;
  completions: Record<string, WorkoutCompletion>;
}

export interface AnnualProgram {
  title: string;
  totalWeeks: number;
  sessions: WorkoutSession[];
}
