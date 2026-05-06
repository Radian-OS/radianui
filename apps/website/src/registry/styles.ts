export const STYLES = [
	{
		value: "default",
		name: "Default",
		description: "Clear and balanced style",
	},
	{
		value: "sera",
		name: "Sera",
		description: "Flat design without shadows and square corners",
	},
] as const

export type Style = (typeof STYLES)[number]
export type StyleValue = Style["value"]
