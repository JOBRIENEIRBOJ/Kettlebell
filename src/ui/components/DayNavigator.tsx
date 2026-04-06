interface DayNavigatorProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const DayNavigator = ({ onPrevious, onNext }: DayNavigatorProps) => (
  <div className="day-navigator" aria-label="Workout navigation">
    <button type="button" className="ghost-button" onClick={onPrevious}>
      Previous
    </button>
    <button type="button" className="ghost-button" onClick={onNext}>
      Skip to next
    </button>
  </div>
);
