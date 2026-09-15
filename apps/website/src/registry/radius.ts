export const RADIUS = [
	{
		value: "none",
		name: "None",
		type: "registry:radius",
		radius: {
			"radius-base": "0px",
			"control-radius-base": "0px",
		},
	},
	{
		value: "small",
		name: "Small",
		type: "registry:radius",
		radius: {
			"radius-base": "6px",
			"control-radius-base": "6px",
		},
	},
	{
		value: "medium",
		name: "Medium",
		type: "registry:radius",
		radius: {
			"radius-base": "8px",
			"control-radius-base": "8px",
		},
	},
	{
		value: "large",
		name: "Large",
		type: "registry:radius",
		radius: {
			"radius-base": "10px",
			"control-radius-base": "10px",
		},
	},
	{
		value: "full",
		name: "Full",
		type: "registry:radius",
		radius: {
			"radius-base": "12px",
			"control-radius-base": "calc(infinity * 1px)",
		},
	},
] as const

export type Radius = (typeof RADIUS)[number]
export type RadiusValue = Radius["value"]
