import { create } from "zustand"
import { BASE_COLORS } from "@/registry/base-colors"
import { DEFAULT_CONFIG, type ThemerConfig } from "@/registry/config"
import { DENSITIES } from "@/registry/density"
import { FONTS } from "@/registry/fonts"
import { ICON_LIBRARIES } from "@/registry/icon/icon-libraries"
import { PRIMARY_COLORS } from "@/registry/primary-colors"
import { RADIUS } from "@/registry/radius"
import { THEMES } from "@/registry/themes"

const PRIMARY_COLOR_VALUES = PRIMARY_COLORS.map((c) => c.value)
const BASE_COLOR_VALUES = BASE_COLORS.map((c) => c.value)
// Use only first 10 fonts because other fonts are ugly
const FONT_VALUES = FONTS.slice(0, 10).map((f) => f.value)
const RADIUS_VALUES = RADIUS.map((r) => r.value)
const DENSITY_VALUES = DENSITIES.map((d) => d.value)

function pickOther<T>(items: readonly T[], current: T): T {
	const choices =
		items.length > 1 ? items.filter((item) => item !== current) : items
	return choices[Math.floor(Math.random() * choices.length)]!
}

export type ThemerLockKey =
	| "primaryColor"
	| "baseColor"
	| "headingFont"
	| "bodyFont"
	| "radius"
	| "density"
	| "iconLibrary"
	| "defaultTheme"

const DEFAULT_LOCKS: Record<ThemerLockKey, boolean> = {
	primaryColor: false,
	baseColor: false,
	headingFont: false,
	bodyFont: false,
	radius: false,
	density: false,
	iconLibrary: false,
	defaultTheme: false,
}

function alignExtraLocks(
	extraColorSchemes: readonly string[],
	lockedExtraColors: readonly boolean[]
): boolean[] {
	return extraColorSchemes.map((_, i) => lockedExtraColors[i] ?? false)
}

interface ThemerStoreState {
	params: ThemerConfig
	locked: Record<ThemerLockKey, boolean>
	lockedExtraColors: boolean[]
	setParams: (updates: Partial<ThemerConfig>) => void
	removeExtraColor: (index: number) => void
	toggleLock: (key: ThemerLockKey) => void
	toggleExtraColorLock: (index: number) => void
	resetParams: () => void
	shuffleFundamentals: () => void
}

export const useThemerStore = create<ThemerStoreState>()((set) => ({
	params: DEFAULT_CONFIG,
	locked: DEFAULT_LOCKS,
	lockedExtraColors: [],
	setParams: (updates) =>
		set((state) => ({
			params: { ...state.params, ...updates },
			lockedExtraColors:
				updates.extraColorSchemes !== undefined
					? alignExtraLocks(updates.extraColorSchemes, state.lockedExtraColors)
					: state.lockedExtraColors,
		})),
	removeExtraColor: (index) =>
		set((state) => {
			if (index < 0 || index >= state.params.extraColorSchemes.length) {
				return state
			}
			return {
				params: {
					...state.params,
					extraColorSchemes: state.params.extraColorSchemes.filter(
						(_, i) => i !== index
					),
				},
				lockedExtraColors: alignExtraLocks(
					state.params.extraColorSchemes,
					state.lockedExtraColors
				).filter((_, i) => i !== index),
			}
		}),
	toggleLock: (key) =>
		set((state) => ({
			locked: {
				...state.locked,
				[key]: !state.locked[key],
			},
		})),
	toggleExtraColorLock: (index) =>
		set((state) => {
			if (index < 0 || index >= state.params.extraColorSchemes.length) {
				return state
			}
			const next = alignExtraLocks(
				state.params.extraColorSchemes,
				state.lockedExtraColors
			)
			next[index] = !next[index]
			return { lockedExtraColors: next }
		}),
	resetParams: () =>
		set({
			params: DEFAULT_CONFIG,
			locked: DEFAULT_LOCKS,
			lockedExtraColors: [],
		}),
	shuffleFundamentals: () =>
		set((state) => {
			const pick = <T>(key: ThemerLockKey, items: readonly T[], current: T) =>
				state.locked[key] ? current : pickOther(items, current)

			const radius = pick("radius", RADIUS_VALUES, state.params.radius)

			return {
				params: {
					...state.params,
					primaryColor: pick(
						"primaryColor",
						PRIMARY_COLOR_VALUES,
						state.params.primaryColor
					),
					baseColor: pick(
						"baseColor",
						BASE_COLOR_VALUES,
						state.params.baseColor
					),
					headingFont: pick(
						"headingFont",
						FONT_VALUES,
						state.params.headingFont
					),
					bodyFont: pick("bodyFont", FONT_VALUES, state.params.bodyFont),
					radius,
					controlRadius: state.locked.radius
						? state.params.controlRadius
						: radius,
					density: pick("density", DENSITY_VALUES, state.params.density),
					iconLibrary: pick(
						"iconLibrary",
						ICON_LIBRARIES,
						state.params.iconLibrary
					),
					defaultTheme: pick("defaultTheme", THEMES, state.params.defaultTheme),
				},
			}
		}),
}))
