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
export type SpacingOption = "compact" | "default" | "spacious"
export type SizeOption = "small" | "default" | "large"
export type ButtonOption = "default" | "gradient" | "fancy" | "elevated"
export type FontCategory = "Sans Serif" | "Serif" | "Monospace" | "Display" | "Handwriting"
export type FontName = string

interface PlaygroundContextType {
	layout: LayoutOption
	setLayout: (layout: LayoutOption) => void
	color: ColorOption
	setColor: (color: ColorOption) => void
	radius: RadiusOption
	setRadius: (radius: RadiusOption) => void
	spacing?: SpacingOption
	setSpacing?: (spacing: SpacingOption) => void
	size?: SizeOption
	setSize?: (size: SizeOption) => void
	label?: boolean
	setLabel?: (label: boolean) => void
	placeholder?: boolean
	setPlaceholder?: (placeholder: boolean) => void
	icon?: boolean
	setIcon?: (icon: boolean) => void
	button?: ButtonOption
	setButton?: (button: ButtonOption) => void
	logoImage?: string
	setLogoImage?: (logo: string | undefined) => void
	fontName?: FontName
	setFontName?: (name: FontName) => void
	fontCategory?: FontCategory
	setFontCategory?: (category: FontCategory) => void
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
	const [spacing, setSpacing] = useState<SpacingOption>("default")
	const [size, setSize] = useState<SizeOption>("default")
	const [label, setLabel] = useState<boolean>(true)
	const [placeholder, setPlaceholder] = useState<boolean>(false)
	const [icon, setIcon] = useState<boolean>(false)
	const [button, setButton] = useState<ButtonOption>("default")
	const [logoImage, setLogoImage] = useState<string | undefined>(undefined)
	const [fontName, setFontName] = useState<FontName>("Inter")
	const [fontCategory, setFontCategory] = useState<FontCategory>("Sans Serif")

	return (
		<PlaygroundContext.Provider
			value={{
				layout,
				setLayout,
				color,
				setColor,
				radius,
				setRadius,
				spacing,
				setSpacing,
				size,
				setSize,
				label,
				setLabel,
				placeholder,
				setPlaceholder,
				icon,
				setIcon,
				button,
				setButton,
				logoImage,
				setLogoImage,
				fontName,
				setFontName,
				fontCategory,
				setFontCategory,
			}}>
			{children}
		</PlaygroundContext.Provider>
	)
}
