export const THEMES = ["system", "dark", "light"] as const
export const DEFAULT_THEME = "system"
export type Theme = (typeof THEMES)[number]
