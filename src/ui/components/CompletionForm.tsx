import { FormEvent, useEffect, useState } from "react";
import type { WorkoutCompletion, WorkoutSession } from "../../domain/entities/workout";

interface CompletionFormProps {
  completion?: WorkoutCompletion;
  session: WorkoutSession;
  onComplete: (input: { weightUsed: string; roundsCompleted: number; notes?: string }) => void;
}

export const CompletionForm = ({ completion, session, onComplete }: CompletionFormProps) => {
  const [weightUsed, setWeightUsed] = useState("");
  const [roundsCompleted, setRoundsCompleted] = useState(String(session.roundTarget.min));
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setWeightUsed(completion?.weightUsed ?? "");
    setRoundsCompleted(String(completion?.roundsCompleted ?? session.roundTarget.min));
    setNotes(completion?.notes ?? "");
  }, [completion, session.id, session.roundTarget.min]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedRounds = Number(roundsCompleted);

    if (!weightUsed.trim() || !Number.isFinite(parsedRounds) || parsedRounds <= 0) {
      return;
    }

    onComplete({
      weightUsed,
      roundsCompleted: Math.trunc(parsedRounds),
      notes,
    });
  };

  return (
    <form className="completion-card" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">Log Today</p>
        <h2>Complete workout</h2>
        <p className="muted">Add the bell weight and rounds you completed. Saving moves you forward.</p>
      </div>

      <label>
        Weight used
        <input
          value={weightUsed}
          onChange={(event) => setWeightUsed(event.target.value)}
          placeholder="24 kg or 53 lb"
          inputMode="text"
          required
        />
      </label>

      <label>
        Rounds completed
        <input
          value={roundsCompleted}
          onChange={(event) => setRoundsCompleted(event.target.value)}
          type="number"
          min="1"
          max="20"
          required
        />
      </label>

      <label>
        Notes
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={3}
          placeholder="Optional: grip, tempo, rest, or how it felt"
        />
      </label>

      <button type="submit" className="primary-button">
        Complete and load next workout
      </button>
    </form>
  );
};
