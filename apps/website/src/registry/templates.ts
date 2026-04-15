export const TEMPLATES = ["next", "vite"] as const

export type Template = (typeof TEMPLATES)[number]
