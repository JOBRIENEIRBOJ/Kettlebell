import type { WorkoutSession } from "../../domain/entities/workout";

interface WorkoutPanelProps {
  session: WorkoutSession;
}

export const WorkoutPanel = ({ session }: WorkoutPanelProps) => (
  <section className={`workout-card ${session.block}`} aria-labelledby="workout-title">
    <div className="workout-card__header">
      <div>
        <p className="eyebrow">
          {session.scheduleDay} · Day {session.dayNumber}
        </p>
        <h2 id="workout-title">{session.template.title}</h2>
        <p>{session.template.focus}</p>
      </div>
      <div className="day-badge">W{session.weekNumber}</div>
    </div>

    <div className="target-grid" aria-label="Workout targets">
      <div>
        <span>Rounds</span>
        <strong>{session.roundTarget.label}</strong>
      </div>
      <div>
        <span>Rest</span>
        <strong>{session.restTarget.label}</strong>
      </div>
    </div>

    <div className="sequence-note">
      Run left side through the sequence, then right side, then any bilateral swing portion. That is
      one round.
    </div>

    <div className="rule-note">
      Use a bell that leaves about 1-3 reps in reserve on the hardest move. If snatches bother your
      shoulder, use high pulls.
    </div>

    <ol className="exercise-list">
      {session.template.exercises.map((exercise) => (
        <li key={`${exercise.name}-${exercise.prescription}`} className="exercise-item">
          <div>
            {exercise.demoUrl ? (
              <a
                className="exercise-link"
                href={exercise.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${exercise.name} exercise demo`}
              >
                <strong>{exercise.name}</strong>
                <span>Demo</span>
              </a>
            ) : (
              <strong>{exercise.name}</strong>
            )}
            {exercise.note ? <p>{exercise.note}</p> : null}
          </div>
          <span className="exercise-prescription">{exercise.prescription}</span>
        </li>
      ))}
    </ol>

    {session.template.finishers ? (
      <div className="finisher-card">
        <p className="eyebrow">
          {session.template.finishers.length > 1 ? "Choose One Finisher" : "Finisher"}
        </p>
        {session.template.finishers.map((finisher) => (
          <p key={`${finisher.name}-${finisher.prescription}`}>
            {finisher.demoUrl ? (
              <a
                className="finisher-link"
                href={finisher.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${finisher.name} exercise demo`}
              >
                <strong>{finisher.name}</strong>
              </a>
            ) : (
              <strong>{finisher.name}</strong>
            )}{" "}
            · {finisher.prescription}
          </p>
        ))}
      </div>
    ) : null}

    {session.testPrompt ? <div className="test-prompt">{session.testPrompt}</div> : null}

    <p className="coaching-cue">{session.coachingCue}</p>
    <p className="muted">{session.progressionNote}</p>
  </section>
);
