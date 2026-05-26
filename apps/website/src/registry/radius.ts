export const RADIUS = [
	{
		value: "none",
		name: "None",
		type: "registry:radius",
		radius: {
			radius: "0px",
			"control-radius": "0px",
		},
	},
	{
		value: "small",
		name: "Small",
		type: "registry:radius",
		radius: {
			radius: "6px",
			"control-radius": "6px",
		},
	},
	{
		value: "medium",
		name: "Medium",
		type: "registry:radius",
		radius: {
			radius: "8px",
			"control-radius": "8px",
		},
	},
	{
		value: "large",
		name: "Large",
		type: "registry:radius",
		radius: {
			radius: "10px",
			"control-radius": "10px",
		},
	},
	{
		value: "full",
		name: "Full",
		type: "registry:radius",
		radius: {
			radius: "12px",
			"control-radius": "calc(infinity * 1px)",
		},
	},
] as const

export type Radius = (typeof RADIUS)[number]
export type RadiusValue = Radius["value"]
