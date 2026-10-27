export const DENSITY = [
	{
		value: "compact",
		name: "Compact",
		type: "registry:density",
		density: {
			spacing: "3px",
		},
	},
	{
		value: "cozy",
		name: "Cozy",
		type: "registry:density",
		density: {
			spacing: "3.5px",
		},
	},
	{
		value: "default",
		name: "Default",
		type: "registry:density",
		density: {
			spacing: "4px",
		},
	},
	{
		value: "relaxed",
		name: "Relaxed",
		type: "registry:density",
		density: {
			spacing: "4.5px",
		},
	},
	{
		value: "spacious",
		name: "Spacious",
		type: "registry:density",
		density: {
			spacing: "5px",
		},
	},
] as const

export const DENSITIES = DENSITY

export type Density = (typeof DENSITY)[number]
export type DensityValue = Density["value"]
