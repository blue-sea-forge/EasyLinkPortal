export const THEMES = [
  { id: "classic-light", label: "Classic light" },
  { id: "classic-dark", label: "Classic dark" },
  { id: "military", label: "Military" },
  { id: "cozy", label: "Cozy" },
  { id: "forest", label: "Forest" },
  { id: "sunset", label: "Sunset" },
  { id: "lavender", label: "Lavender" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

/** Colors of the page before the config is loaded, and the starting point of the generator. */
export const DEFAULT_THEME: ThemeId = "classic-light";

export function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

/** Switches the page to a theme. The CSS reads the data-theme attribute. */
export function applyTheme(theme: ThemeId): void {
  document.documentElement.dataset.theme = theme;
}
