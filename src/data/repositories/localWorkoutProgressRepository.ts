import type { ProgramProgress } from "../../domain/entities/workout";
import type { WorkoutProgressRepository } from "../../domain/repositories/workoutProgressRepository";
import { clampSessionIndex, createEmptyProgress } from "../../domain/useCases/programProgress";

const storageKey = "kettlebell-year.progress.v1";

const isProgress = (value: unknown): value is ProgramProgress => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as ProgramProgress;
  return (
    typeof candidate.currentSessionIndex === "number" &&
    Boolean(candidate.completions) &&
    typeof candidate.completions === "object"
  );
};

export class LocalWorkoutProgressRepository implements WorkoutProgressRepository {
  load(totalSessions: number): ProgramProgress {
    if (typeof window === "undefined") {
      return createEmptyProgress();
    }

    const rawProgress = window.localStorage.getItem(storageKey);

    if (!rawProgress) {
      return createEmptyProgress();
    }

    try {
      const parsedProgress: unknown = JSON.parse(rawProgress);

      if (!isProgress(parsedProgress)) {
        return createEmptyProgress();
      }

      return {
        currentSessionIndex: clampSessionIndex(parsedProgress.currentSessionIndex, totalSessions),
        completions: parsedProgress.completions,
      };
    } catch {
      return createEmptyProgress();
    }
  }

  save(progress: ProgramProgress): void {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(progress));
  }

  reset(): ProgramProgress {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }

    return createEmptyProgress();
  }
}

export const localWorkoutProgressRepository = new LocalWorkoutProgressRepository();
