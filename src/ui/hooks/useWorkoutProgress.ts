import { useMemo, useState } from "react";
import { annualProgram } from "../../domain/program/annualProgram";
import {
  createEmptyProgress,
  createWorkoutCompletion,
  getCompletedSessionCount,
  getNextSessionIndex,
  getPreviousSessionIndex,
} from "../../domain/useCases/programProgress";
import type { ProgramProgress, WorkoutCompletion } from "../../domain/entities/workout";
import { localWorkoutProgressRepository } from "../../data/repositories/localWorkoutProgressRepository";

interface CompleteWorkoutInput {
  weightUsed: string;
  roundsCompleted: number;
  notes?: string;
}

const totalSessions = annualProgram.sessions.length;

export const useWorkoutProgress = () => {
  const [progress, setProgress] = useState<ProgramProgress>(() =>
    localWorkoutProgressRepository.load(totalSessions),
  );

  const currentSession = annualProgram.sessions[progress.currentSessionIndex] ?? annualProgram.sessions[0];

  const persist = (nextProgress: ProgramProgress) => {
    localWorkoutProgressRepository.save(nextProgress);
    setProgress(nextProgress);
  };

  const completeCurrentWorkout = ({ weightUsed, roundsCompleted, notes }: CompleteWorkoutInput) => {
    const completion = createWorkoutCompletion({
      sessionId: currentSession.id,
      weightUsed,
      roundsCompleted,
      notes,
    });

    persist({
      completions: {
        ...progress.completions,
        [currentSession.id]: completion,
      },
      currentSessionIndex: getNextSessionIndex(progress.currentSessionIndex, totalSessions),
    });
  };

  const goToNextWorkout = () => {
    persist({
      ...progress,
      currentSessionIndex: getNextSessionIndex(progress.currentSessionIndex, totalSessions),
    });
  };

  const goToPreviousWorkout = () => {
    persist({
      ...progress,
      currentSessionIndex: getPreviousSessionIndex(progress.currentSessionIndex, totalSessions),
    });
  };

  const resetProgress = () => {
    const emptyProgress = localWorkoutProgressRepository.reset();
    setProgress(emptyProgress);
  };

  const recentCompletions = useMemo(
    () =>
      (Object.values(progress.completions) as WorkoutCompletion[])
        .sort((left, right) => right.completedAt.localeCompare(left.completedAt))
        .slice(0, 5),
    [progress.completions],
  );

  const completionRate = getCompletedSessionCount(progress) / totalSessions;

  return {
    program: annualProgram,
    progress: progress.currentSessionIndex < totalSessions ? progress : createEmptyProgress(),
    currentSession,
    currentCompletion: progress.completions[currentSession.id],
    completedSessionCount: getCompletedSessionCount(progress),
    completionRate,
    recentCompletions,
    completeCurrentWorkout,
    goToNextWorkout,
    goToPreviousWorkout,
    resetProgress,
  };
};
