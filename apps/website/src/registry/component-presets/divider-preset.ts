// Thickness in pixels. These are initial choices, pending any designer guidance.
export const DIVIDER_THICKNESS_OPTIONS = [1, 2, 3] as const

export type DividerThickness = (typeof DIVIDER_THICKNESS_OPTIONS)[number]

export const DEFAULT_DIVIDER_THICKNESS: DividerThickness = 1
