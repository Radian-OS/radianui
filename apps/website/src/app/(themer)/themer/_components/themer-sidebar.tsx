"use client"

import { useEffect, useState } from "react"
import { ChevronDown, MoonIcon, Palette, SunIcon, Type } from "lucide-react"
import { useTheme } from "next-themes"
import { useThemerPreset } from "@/lib/themer-preset"
import { DEFAULT_CONFIG, PRESETS } from "@/registry/config"
import { FontValue } from "@/registry/fonts"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RadiusValue } from "@/registry/radius"
import { STYLES, StyleValue } from "@/registry/styles"
import { THEMES } from "@/registry/themes"
import {
	Dropdown,
	DropdownContent,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/styles/default/ui/dropdown"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
import { ColorSwatch, ThemeColorSwatch } from "./color-swatch"
import { CreateProjectDialog } from "./create-project-dialog"
import { FontCombobox } from "./font-combobox"
import { RADII, RadiusPill } from "./radius-pill"
import { SectionLabel } from "./section-label"

interface ThemerSidebarProps {
	selectedComponent: string
	setSelectedComponent: (value: string) => void
}

const COMPONENTS_DATA = [
	"preview-02",
	"preview-03",
	"signin",
	"signup",
	"new-password",
	"reset-email",
	"sidebar-inset",
]

export function ThemerSidebar({
	selectedComponent,
	setSelectedComponent,
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
	const selectedStyle = STYLES.find((t) => t.value === params.style)

	const handleThemeChange = (value: typeof params.theme) => {
		setParams({
			theme: value,
			primaryColor: value === "default" ? DEFAULT_CONFIG.primaryColor : null,
		})
	}

	return (
		<aside className="bg-elevation-level1 border-border flex w-80 shrink-0 flex-col border-r">
			{/* Header */}
			<div className="border-border flex flex-col gap-1 border-b px-5 py-4">
				<div className="flex items-center gap-2">
					<Palette className="text-primary size-4" />
					<h1 className="text-fg text-sm font-semibold">Theme Builder</h1>
				</div>
				<p className="text-fg-tertiary text-xs">
					Customize your design tokens and preview live.
				</p>
			</div>

			{/* Scrollable controls */}
			<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
				{/* Theme Mode Toggle */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Theme Mode</SectionLabel>
					{mounted && (
						<Tabs
							value={resolvedTheme === "dark" ? "dark" : "light"}
							onValueChange={(value) => setTheme(value)}>
							<TabsList width="full" variant="default" size="md">
								<TabsTrigger value="light">
									<SunIcon aria-hidden="true" />
									Light
								</TabsTrigger>
								<TabsTrigger value="dark">
									<MoonIcon aria-hidden="true" />
									Dark
								</TabsTrigger>
							</TabsList>
						</Tabs>
					)}
				</div>
				{/* Theme Section */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Theme</SectionLabel>
					<Dropdown>
						<DropdownTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{params.theme.charAt(0).toUpperCase() + params.theme.slice(1)}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="right" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={params.theme}
								onValueChange={(value) =>
									handleThemeChange(value as typeof params.theme)
								}>
								{THEMES.map((theme) => (
									<DropdownRadioItem
										key={theme.value}
										value={theme.value}
										onSelect={(e) => e.preventDefault()}>
										<div className="flex flex-col gap-1">
											<span className="text-fg font-medium">{theme.name}</span>
											<span className="text-fg-tertiary text-xs leading-snug">
												{theme.description}
											</span>
										</div>
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>
				</div>

				{/* Style Section */}

				<div className="flex flex-col gap-3">
					<SectionLabel>Styles</SectionLabel>
					<Dropdown>
						<DropdownTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">{selectedStyle?.name}</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="right" className="max-h-96 w-64">
							<DropdownRadioGroup
								value={selectedStyle?.value}
								onValueChange={(value) => {
									const preset = PRESETS.find((p) => p.name === value)
									setParams({
										style: value as StyleValue,
										...(preset && {
											...preset,
										}),
										theme: params.theme,
										primaryColor: params.primaryColor,
									})
								}}>
								{STYLES.map((style) => (
									<DropdownRadioItem
										key={style.value}
										value={style.value}
										className="py-2.5"
										onSelect={(e) => e.preventDefault()}>
										<div className="flex flex-col gap-1">
											<span className="text-fg font-medium">{style.name}</span>
											<span className="text-fg-tertiary text-xs leading-snug">
												{style.description}
											</span>
										</div>
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
						{params.theme !== "default" && (
							<ThemeColorSwatch
								isSelected={params.primaryColor === null}
								onClick={() => setParams({ primaryColor: null })}
							/>
						)}
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
					<SectionLabel>Preview</SectionLabel>
					<Dropdown>
						<DropdownTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{selectedComponentName}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="left" className="max-h-96 w-56">
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
