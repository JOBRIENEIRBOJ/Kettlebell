import type { CSSProperties } from "react";
import type { WorkoutSession } from "../../domain/entities/workout";

interface ProgramStatsProps {
  completedCount: number;
  completionRate: number;
  session: WorkoutSession;
  totalSessions: number;
}

export const ProgramStats = ({
  completedCount,
  completionRate,
  session,
  totalSessions,
}: ProgramStatsProps) => {
  const progressDegrees = `${Math.round(completionRate * 360)}deg`;

  return (
    <section className="stats-card" aria-label="Program progress">
      <div
        className="progress-ring"
        style={{ "--progress": progressDegrees } as CSSProperties}
        aria-hidden="true"
      >
        <span>{Math.round(completionRate * 100)}%</span>
      </div>
      <div>
        <p className="eyebrow">Current Block</p>
        <h2>{session.blockTitle}</h2>
        <p className="muted">
          Week {session.weekNumber} of 52 · Phase week {session.phaseWeek}
        </p>
        <p className="muted">
          {completedCount} of {totalSessions} workouts logged
        </p>
      </div>
    </section>
  );
};
