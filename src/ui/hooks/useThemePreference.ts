import { useEffect, useState } from "react";

export type ThemePreference = "light" | "dark" | "pink-teal";

const storageKey = "kettlebell-year.theme.v1";

export const themeOptions: Array<{ value: ThemePreference; label: string }> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "pink-teal", label: "Pink/Teal" },
];

const isThemePreference = (value: string | null): value is ThemePreference =>
  value === "light" || value === "dark" || value === "pink-teal";

export const useThemePreference = () => {
  const [theme, setTheme] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const savedTheme = window.localStorage.getItem(storageKey);
    return isThemePreference(savedTheme) ? savedTheme : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    themeOptions,
  };
};
