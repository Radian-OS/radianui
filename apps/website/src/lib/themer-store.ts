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

interface ThemerStoreState {
	params: ThemerConfig
	setParams: (updates: Partial<ThemerConfig>) => void
	resetParams: () => void
	shuffleFundamentals: () => void
}

export const useThemerStore = create<ThemerStoreState>()((set) => ({
	params: DEFAULT_CONFIG,
	setParams: (updates) =>
		set((state) => ({
			params: { ...state.params, ...updates },
		})),
	resetParams: () => set({ params: DEFAULT_CONFIG }),
	shuffleFundamentals: () =>
		set((state) => {
			const radius = pickOther(RADIUS_VALUES, state.params.radius)
			return {
				params: {
					...state.params,
					primaryColor: pickOther(
						PRIMARY_COLOR_VALUES,
						state.params.primaryColor
					),
					baseColor: pickOther(BASE_COLOR_VALUES, state.params.baseColor),
					headingFont: pickOther(FONT_VALUES, state.params.headingFont),
					bodyFont: pickOther(FONT_VALUES, state.params.bodyFont),
					radius,
					controlRadius: radius,
					density: pickOther(DENSITY_VALUES, state.params.density),
					iconLibrary: pickOther(ICON_LIBRARIES, state.params.iconLibrary),
					defaultTheme: pickOther(THEMES, state.params.defaultTheme),
				},
			}
		}),
}))
