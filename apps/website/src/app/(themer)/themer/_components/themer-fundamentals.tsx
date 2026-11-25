import type { ReactNode } from "react"
import { SidebarGroup, SidebarGroupLabel } from "@/styles/default/ui/sidebar"
import { ColorSchemesPicker } from "./color-schemes-picker"
import BaseColorPicker from "./base-color-picker"
import PresetPicker from "./preset-picker"
import { GoogleIcon } from "./icons"
import FontPicker from "./font-picker"
import CornerPicker from "./corner-picker"
import DensityPicker from "./density-picker"
import IconLibraryPicker from "./icons-library-picker"
import AppearanceModePicker from "./appearance-mode-picker"
import { useThemerPreset } from "@/lib/themer-preset"
import { FONTS, FontValue } from "@/registry/fonts"
import { BaseColorValue } from "@/registry/base-colors"

export type FundamentalsSection =
	| "preset"
	| "color"
	| "neutral"
	| "fonts"
	| "radius"
	| "spacing"
	| "icons"
	| "appearance"

function FundamentalsGroup({
	section,
	selected,
	label,
	children,
}: {
	section: FundamentalsSection
	selected?: FundamentalsSection
	label: string
	children: ReactNode
}) {
	if (selected && section !== selected) return null

	return (
		<SidebarGroup
			className={
				selected === "fonts" ? "gap-3 p-0" : selected ? "p-0" : undefined
			}>
			{(!selected || selected === "fonts") && (
				<SidebarGroupLabel
					className={
						selected === "fonts"
							? "text-fg-tertiary h-auto px-0 font-medium"
							: "text-fg-tertiary h-6 px-0 font-medium"
					}>
					{label}
				</SidebarGroupLabel>
			)}
			{children}
		</SidebarGroup>
	)
}

export function ThemerFundamentals({
	section,
}: {
	section?: FundamentalsSection
}) {
	const [params, setParams] = useThemerPreset()

	const selectedHeadingFont = FONTS.find(
		(font) => params.headingFont === font.value
	)
	const selectedBodyFont = FONTS.find((font) => params.bodyFont === font.value)

	const formatCategory = (cat?: string) => {
		if (!cat) return "Sans-Serif"
		return cat
			.split("-")
			.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
			.join(" ")
	}

	const handlePrimaryColorChange = (val: string) =>
		setParams({ primaryColor: val })
	const handleBaseColorChange = (val: BaseColorValue) =>
		setParams({ baseColor: val })

	return (
		<>
			<FundamentalsGroup section="preset" selected={section} label="Presets">
				<PresetPicker />
			</FundamentalsGroup>
			<FundamentalsGroup section="color" selected={section} label="Colors">
				<ColorSchemesPicker
					primaryColor={params.primaryColor}
					onPrimaryChange={handlePrimaryColorChange}
					extraColorSchemes={params.extraColorSchemes}
					onExtraColorSchemesChange={(val) =>
						setParams({ extraColorSchemes: val })
					}
				/>
			</FundamentalsGroup>
			<FundamentalsGroup
				section="neutral"
				selected={section}
				label="Neutral Base">
				<BaseColorPicker
					baseColor={params.baseColor}
					primaryColor={params.primaryColor}
					onBaseColorChange={handleBaseColorChange}
				/>
			</FundamentalsGroup>

			<FundamentalsGroup section="fonts" selected={section} label="Typography">
				<div
					className={
						section === "fonts"
							? "grid grid-cols-2 gap-2"
							: "flex flex-col gap-3"
					}>
					<FontPicker
						label="Heading"
						fontName={selectedHeadingFont?.name || "Geist"}
						fontClass={
							selectedHeadingFont?.category === "serif"
								? "font-serif"
								: selectedHeadingFont?.category === "monospace"
									? "font-mono"
									: "font-sans"
						}
						provider="Google"
						type={formatCategory(selectedHeadingFont?.category)}
						icon={<GoogleIcon size={14} />}
						value={params.headingFont}
						onValueChange={(value) =>
							setParams({ headingFont: value as FontValue })
						}
					/>
					<FontPicker
						label="Body"
						fontName={selectedBodyFont?.name || "JetBrains Mono"}
						fontClass={
							selectedBodyFont?.category === "serif"
								? "font-serif"
								: selectedBodyFont?.category === "sans-serif"
									? "font-sans"
									: "font-mono"
						}
						provider="Google"
						type={formatCategory(selectedBodyFont?.category || "monospace")}
						icon={<GoogleIcon size={14} />}
						value={params.bodyFont}
						onValueChange={(value) =>
							setParams({ bodyFont: value as FontValue })
						}
					/>
				</div>
			</FundamentalsGroup>
			<FundamentalsGroup section="radius" selected={section} label="Corners">
				<CornerPicker />
			</FundamentalsGroup>
			<FundamentalsGroup section="spacing" selected={section} label="Density">
				<DensityPicker
					value={params.density}
					onValueChange={(value) => setParams({ density: value })}
				/>
			</FundamentalsGroup>
			<FundamentalsGroup section="icons" selected={section} label="Icons">
				<IconLibraryPicker
					value={params.iconLibrary}
					onValueChange={(value) => setParams({ iconLibrary: value })}
				/>
			</FundamentalsGroup>

			<FundamentalsGroup
				section="appearance"
				selected={section}
				label="Default Appearance Mode">
				<AppearanceModePicker />
			</FundamentalsGroup>
		</>
	)
}
