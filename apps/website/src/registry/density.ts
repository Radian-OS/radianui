export const DENSITY = [
	{
		value: "default",
		name: "Default",
		type: "registry:density",
		density: {
			spacing: "0.25rem",
		},
	},
	{
		value: "compact",
		name: "Compact",
		type: "registry:density",
		density: {
			spacing: "0.188rem",
		},
	},
	{
		value: "spacious",
		name: "Spacious",
		type: "registry:density",
		density: {
			spacing: "0.313rem",
		},
	},
] as const

export const DENSITIES = DENSITY

export type Density = (typeof DENSITY)[number]
export type DensityValue = Density["value"]
