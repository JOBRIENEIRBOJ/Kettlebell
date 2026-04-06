import { CompletionForm } from "./components/CompletionForm";
import { DayNavigator } from "./components/DayNavigator";
import { ProgramStats } from "./components/ProgramStats";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { WorkoutPanel } from "./components/WorkoutPanel";
import { useThemePreference } from "./hooks/useThemePreference";
import { useWorkoutProgress } from "./hooks/useWorkoutProgress";

const formatDate = (isoDate: string): string =>
  new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoDate));

export const App = () => {
  const { theme, setTheme, themeOptions } = useThemePreference();
  const {
    program,
    currentSession,
    currentCompletion,
    completedSessionCount,
    completionRate,
    recentCompletions,
    completeCurrentWorkout,
    goToNextWorkout,
    goToPreviousWorkout,
    resetProgress,
  } = useWorkoutProgress();

  const handleResetProgress = () => {
    const confirmed = window.confirm("Reset your saved year progress?");

    if (confirmed) {
      resetProgress();
    }
  };

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Mobile yearly planner</p>
          <h1>{program.title}</h1>
          <p>
            A friendly 52-week kettlebell tracker that shows today&apos;s complex, logs your bell
            weight and rounds, then advances to the next workout.
          </p>
        </div>
        <div className="hero-actions">
          <ThemeSwitcher options={themeOptions} value={theme} onChange={setTheme} />
          <button type="button" className="text-button" onClick={handleResetProgress}>
            Reset year
          </button>
        </div>
      </section>

      <ProgramStats
        completedCount={completedSessionCount}
        completionRate={completionRate}
        session={currentSession}
        totalSessions={program.sessions.length}
      />

      <div className="content-grid">
        <div>
          <DayNavigator onPrevious={goToPreviousWorkout} onNext={goToNextWorkout} />
          <WorkoutPanel session={currentSession} />
        </div>

        <aside className="side-panel">
          <CompletionForm
            completion={currentCompletion}
            session={currentSession}
            onComplete={completeCurrentWorkout}
          />

          <section className="history-card" aria-label="Recent workout history">
            <p className="eyebrow">Recent Logs</p>
            <h2>Momentum</h2>
            {recentCompletions.length > 0 ? (
              <ul>
                {recentCompletions.map((completion) => (
                  <li key={`${completion.sessionId}-${completion.completedAt}`}>
                    <span>{formatDate(completion.completedAt)}</span>
                    <strong>
                      {completion.weightUsed} · {completion.roundsCompleted} rounds
                    </strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">Your latest sessions will show up here after you log them.</p>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
};
