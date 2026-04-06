import type { ProgramProgress, WorkoutCompletion } from "../entities/workout";

export interface CompletionInput {
  sessionId: string;
  weightUsed: string;
  roundsCompleted: number;
  notes?: string;
}

export const createEmptyProgress = (): ProgramProgress => ({
  currentSessionIndex: 0,
  completions: {},
});

export const clampSessionIndex = (index: number, totalSessions: number): number => {
  if (totalSessions <= 0) {
    return 0;
  }

  if (!Number.isFinite(index)) {
    return 0;
  }

  return Math.min(Math.max(Math.trunc(index), 0), totalSessions - 1);
};

export const getNextSessionIndex = (
  currentSessionIndex: number,
  totalSessions: number,
): number => {
  if (totalSessions <= 0) {
    return 0;
  }

  return (clampSessionIndex(currentSessionIndex, totalSessions) + 1) % totalSessions;
};

export const getPreviousSessionIndex = (
  currentSessionIndex: number,
  totalSessions: number,
): number => {
  if (totalSessions <= 0) {
    return 0;
  }

  const normalizedIndex = clampSessionIndex(currentSessionIndex, totalSessions);
  return normalizedIndex === 0 ? totalSessions - 1 : normalizedIndex - 1;
};

export const createWorkoutCompletion = ({
  sessionId,
  weightUsed,
  roundsCompleted,
  notes,
}: CompletionInput): WorkoutCompletion => ({
  sessionId,
  completedAt: new Date().toISOString(),
  weightUsed: weightUsed.trim(),
  roundsCompleted,
  notes: notes?.trim() || undefined,
});

export const getCompletedSessionCount = (progress: ProgramProgress): number =>
  Object.keys(progress.completions).length;
