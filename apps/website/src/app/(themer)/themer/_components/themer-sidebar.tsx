"use client"

import { useEffect, useState } from "react"
import { ChevronDown, MoonIcon, Palette, SunIcon, Type } from "lucide-react"
import { useTheme } from "next-themes"
import { COMPONENTS_DATA } from "@/config/navigation-config"
import { useThemerPreset } from "@/lib/themer-preset"
import { FontValue } from "@/registry/fonts"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RadiusValue } from "@/registry/radius"
import { IconButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { ColorSwatch } from "./color-swatch"
import { CreateProjectDialog } from "./create-project-dialog"
import { FontCombobox } from "./font-combobox"
import { RADII, RadiusPill } from "./radius-pill"
import { SectionLabel } from "./section-label"

const STYLES = [
	{ value: "lyra", label: "Lyra" },
	{ value: "nova", label: "Nova" },
] as const

interface ThemerSidebarProps {
	selectedComponent: string
	setSelectedComponent: (value: string) => void
	selectedStyle: string
	setSelectedStyle: (value: string) => void
}

export function ThemerSidebar({
	selectedComponent,
	setSelectedComponent,
	selectedStyle,
	setSelectedStyle,
}: ThemerSidebarProps) {
	const [params, setParams] = useThemerPreset()
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const selectedComponentName =
		COMPONENTS_DATA.find(
			(name) => name.toLowerCase().replace(/\s+/g, "-") === selectedComponent
		) ?? selectedComponent

	return (
		<aside className="bg-elevation-level1 border-border flex w-80 shrink-0 flex-col border-r">
			{/* Header */}
			<div className="border-border flex flex-col gap-1 border-b px-5 py-4">
				<div className="flex items-center gap-2">
					<Palette className="text-primary size-4" />
					<h1 className="text-fg text-sm font-semibold">Theme Builder</h1>
					<IconButton
						aria-label="Toggle light/dark mode"
						variant="ghost"
						color="neutral"
						size="28"
						className="ml-auto transition-transform duration-200 hover:scale-110"
						disabled={!mounted}
						onClick={() =>
							setTheme(resolvedTheme === "light" ? "dark" : "light")
						}>
						{mounted && resolvedTheme === "dark" ? (
							<SunIcon className="size-4" />
						) : (
							<MoonIcon className="size-4" />
						)}
					</IconButton>
				</div>
				<p className="text-fg-tertiary text-xs">
					Customize your design tokens and preview live.
				</p>
			</div>

			{/* Scrollable controls */}
			<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
				{/* Style Section */}

				<div className="flex flex-col gap-3">
					<SectionLabel>Styles</SectionLabel>
					<Dropdown>
						<DropdownTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="right" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={selectedStyle}
								onValueChange={setSelectedStyle}>
								{STYLES.map((style) => (
									<DropdownRadioItem
										key={style.value}
										value={style.value}
										onSelect={(e) => e.preventDefault()}>
										{style.label}
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>
				</div>

				{/* Color Section */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Primary Color</SectionLabel>
					<div className="flex flex-wrap gap-2">
						{PRIMARY_COLORS.map((color) => (
							<ColorSwatch
								key={color.value}
								color={color}
								isSelected={params.primaryColor === color.value}
								onClick={() =>
									setParams({
										primaryColor: color.value as PrimaryColorValue,
									})
								}
							/>
						))}
					</div>
				</div>

				{/* Component Preview */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Component</SectionLabel>
					<Dropdown>
						<DropdownTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{selectedComponentName}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="right" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={selectedComponent}
								onValueChange={setSelectedComponent}>
								{COMPONENTS_DATA.map((name) => (
									<DropdownRadioItem
										key={name}
										value={name.toLowerCase().replace(/\s+/g, "-")}
										onSelect={(e) => e.preventDefault()}>
										{name}
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>
				</div>

				{/* Typography */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-1.5">
						<Type className="text-fg-tertiary size-3" />
						<SectionLabel>Typography</SectionLabel>
					</div>
					<div className="flex flex-col gap-2">
						<FontCombobox
							label="Heading Font"
							value={params.headingFont}
							onValueChange={(value) =>
								setParams({ headingFont: value as FontValue })
							}
						/>
						<FontCombobox
							label="Body Font"
							value={params.bodyFont}
							onValueChange={(value) =>
								setParams({ bodyFont: value as FontValue })
							}
						/>
					</div>
				</div>

				{/* Radius */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Border Radius</SectionLabel>
					<div className="flex flex-wrap gap-1.5">
						{RADII.map((radius) => (
							<RadiusPill
								key={radius.value}
								radius={radius}
								isSelected={params.radius === radius.value}
								onClick={() =>
									setParams({ radius: radius.value as RadiusValue })
								}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Footer action */}
			<div className="border-border border-t px-5 py-4">
				<CreateProjectDialog />
			</div>
		</aside>
	)
}
