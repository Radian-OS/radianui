export const STYLES = ["default", "lyra", "nova"] as const

export type Style = (typeof STYLES)[number]
