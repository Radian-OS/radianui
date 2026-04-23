export const STYLES = ["default", "sera"] as const

export type Style = (typeof STYLES)[number]
