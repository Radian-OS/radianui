import { createContext, useContext } from "react"

export const ThemerDrawerContext = createContext(false)

export function useThemerPickerPlacement(
	align: "start" | "end" = "start",
	sideOffset = 20
) {
	const inDrawer = useContext(ThemerDrawerContext)

	return inDrawer
		? ({ side: "top", align, sideOffset: 8, collisionPadding: 12 } as const)
		: ({ side: "right", align, sideOffset } as const)
}
