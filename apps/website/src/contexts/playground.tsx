"use client"

import { ReactNode, createContext, useContext, useState } from "react"

export type LayoutOption = "signin-1" | "signin-2" | "signin-3" | "signin-4" | "signup-1" | "signup-2"
export type ColorOption =
	| "red"
	| "orange"
	| "amber"
	| "yellow"
	| "neon"
	| "green"
	| "emerald"
	| "teal"
	| "cyan"
	| "light-blue"
	| "blue"
	| "violet-blue"
	| "purple"
	| "dark-orchid"
	| "fuchsia"
	| "magenta"
	| "rose"

export type RadiusOption = "default" | "rounded" | "flat" | "fun"

interface PlaygroundContextType {
	layout: LayoutOption
	setLayout: (layout: LayoutOption) => void
	color: ColorOption
	setColor: (color: ColorOption) => void
	radius: RadiusOption
	setRadius: (radius: RadiusOption) => void
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined)

export const usePlayground = () => {
	const context = useContext(PlaygroundContext)
	if (context === undefined) {
		throw new Error("usePlayground must be used within a PlaygroundProvider")
	}
	return context
}

export const PlaygroundProvider = ({ children }: { children: ReactNode }) => {
	const [layout, setLayout] = useState<LayoutOption>("signin-1")
	const [color, setColor] = useState<ColorOption>("violet-blue")
	const [radius, setRadius] = useState<RadiusOption>("default")

	return <PlaygroundContext.Provider value={{ layout, setLayout, color, setColor, radius, setRadius }}>{children}</PlaygroundContext.Provider>
}
