import type { ThemePreference } from "../hooks/useThemePreference";

interface ThemeSwitcherProps {
  options: Array<{ value: ThemePreference; label: string }>;
  value: ThemePreference;
  onChange: (theme: ThemePreference) => void;
}

export const ThemeSwitcher = ({ options, value, onChange }: ThemeSwitcherProps) => (
  <div className="theme-switcher" aria-label="Theme selector">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        className="theme-option"
        aria-pressed={option.value === value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
