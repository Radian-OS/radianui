export const RADIUS = [
	{
		value: "default",
		name: "Default",
		type: "registry:radius",
		radius: {
			"radius-base": "8px",
			"control-radius-base": "8px",
		},
	},
	{
		value: "flat",
		name: "Flat",
		type: "registry:radius",
		radius: {
			"radius-base": "0px",
			"control-radius-base": "0px",
		},
	},

	{
		value: "fun",
		name: "Fun",
		type: "registry:radius",
		radius: {
			"radius-base": "12px",
			"control-radius-base": "12px",
		},
	},
	{
		value: "rounded",
		name: "Rounded",
		type: "registry:radius",
		radius: {
			"radius-base": "16px",
			"control-radius-base": "calc(infinity * 1px)",
		},
	},
] as const

export type Radius = (typeof RADIUS)[number]
export type RadiusValue = Radius["value"]
