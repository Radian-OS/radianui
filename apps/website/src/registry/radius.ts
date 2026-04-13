export const RADIUS = [
	{
		value: "none",
		name: "None",
		type: "registry:radius",
		radius: {
			xs: "0px",
			sm: "0px",
			md: "0px",
			lg: "0px",
			xl: "0px",
			"2xl": "0px",
		},
	},
	{
		value: "small",
		name: "Small",
		type: "registry:radius",
		radius: {
			xs: "1px",
			sm: "2px",
			md: "4px",
			lg: "4px",
			xl: "6px",
			"2xl": "8px",
		},
	},
	{
		value: "medium",
		name: "Medium",
		type: "registry:radius",
		radius: {
			xs: "2px",
			sm: "4px",
			md: "6px",
			lg: "8px",
			xl: "12px",
			"2xl": "16px",
		},
	},
	{
		value: "large",
		name: "Large",
		type: "registry:radius",
		radius: {
			xs: "2px",
			sm: "4px",
			md: "8px",
			lg: "12px",
			xl: "20px",
			"2xl": "28px",
		},
	},
] as const

export type Radius = (typeof RADIUS)[number]
export type RadiusValue = Radius["value"]
