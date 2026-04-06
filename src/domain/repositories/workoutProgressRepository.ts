import type { ProgramProgress } from "../entities/workout";

export interface WorkoutProgressRepository {
  load(totalSessions: number): ProgramProgress;
  save(progress: ProgramProgress): void;
  reset(): ProgramProgress;
}
