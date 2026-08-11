"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronDown, MoonIcon, Palette, SunIcon, Type } from "lucide-react"
import { useTheme } from "next-themes"
import { useThemerLocks } from "@/lib/themer-locks"
import { useThemerPreset } from "@/lib/themer-preset"
import {
	BASE_COLORS,
	BASE_COLORS_MAP,
	BaseColorValue,
} from "@/registry/base-colors"
import { PRESETS } from "@/registry/config"
import { FONTS, FontValue } from "@/registry/fonts"
import {
	ICON_LIBRARIES,
	ICON_LIBRARY_LABELS,
	IconLibrary,
} from "@/registry/icon/icon-libraries"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RADIUS, RadiusValue } from "@/registry/radius"
import { STYLES, StyleValue } from "@/registry/styles"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
import { ColorSwatch } from "./color-swatch"
import { CreateProjectDialog } from "./create-project-dialog"
import { FontCombobox } from "./font-combobox"
import { RADII, RadiusLockPill, RadiusPill } from "./radius-pill"
import { SectionLabel } from "./section-label"

interface ThemerSidebarProps {
	selectedComponent: string
	setSelectedComponent: (value: string) => void
}

const humanizeName = (name: string) =>
	name
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ")

const BLOCK_PREVIEWS = [
	"preview-02",
	"preview-03",
	"preview-04",
	"signin",
	"signup",
	"new-password",
	"reset-email",
	"sidebar-inset",
].map((name) => ({
	value: name,
	label: humanizeName(name),
	description: "Block preview",
}))

const COMPONENT_PREVIEW_GROUPS = [
	{ name: "accordion", examplesCount: 10 },
	{ name: "alert", examplesCount: 8 },
	{ name: "alert-dialog", examplesCount: 6 },
	{ name: "aspect-ratio", examplesCount: 4 },
	{ name: "auth-blocks", examplesCount: 5 },
	{ name: "avatar", examplesCount: 9 },
	{ name: "badge", examplesCount: 10 },
	{ name: "banner", examplesCount: 8 },
	{ name: "breadcrumb", examplesCount: 6 },
	{ name: "button", examplesCount: 21 },
	{ name: "calendar", examplesCount: 8 },
	{ name: "card", examplesCount: 3 },
	{ name: "carousel", examplesCount: 8 },
	{ name: "checkbox", examplesCount: 8 },
	{ name: "code-area", examplesCount: 5 },
	{ name: "collapsible", examplesCount: 4 },
	{ name: "combobox", examplesCount: 7 },
	{ name: "command", examplesCount: 1 },
	{ name: "currency-input", examplesCount: 13 },
	{ name: "date-picker", examplesCount: 4 },
	{ name: "dialog", examplesCount: 7 },
	{ name: "divider", examplesCount: 4 },
	{ name: "drawer", examplesCount: 5 },
	{ name: "dropdown", examplesCount: 5 },
	{ name: "empty", examplesCount: 12 },
	{ name: "file-upload", examplesCount: 5 },
	{ name: "form", examplesCount: 3 },
	{ name: "hover-card", examplesCount: 5 },
	{ name: "input", examplesCount: 19 },
	{ name: "label", examplesCount: 1 },
	{ name: "otp-field", examplesCount: 7 },
	{ name: "pagination", examplesCount: 4 },
	{ name: "phone-number-input", examplesCount: 8 },
	{ name: "popover", examplesCount: 5 },
	{ name: "progress", examplesCount: 3 },
	{ name: "radio-group", examplesCount: 4 },
	{ name: "resizable", examplesCount: 3 },
	{ name: "scroll-area", examplesCount: 1 },
	{ name: "select", examplesCount: 8 },
	{ name: "skeleton", examplesCount: 1 },
	{ name: "slider", examplesCount: 7 },
	{ name: "sonner", examplesCount: 5 },
	{ name: "spinner", examplesCount: 3 },
	{ name: "switch", examplesCount: 10 },
	{ name: "table", examplesCount: 6 },
	{ name: "tabs", examplesCount: 13 },
	{ name: "text-area", examplesCount: 4 },
	{ name: "tooltip", examplesCount: 9 },
]

const COMPONENT_PREVIEWS = COMPONENT_PREVIEW_GROUPS.map((group) => ({
	value: group.name,
	label: humanizeName(group.name),
	description: `${group.examplesCount} examples`,
}))

const PREVIEW_ITEMS = [...BLOCK_PREVIEWS, ...COMPONENT_PREVIEWS]

const RADIUS_DISABLED_STYLES: StyleValue[] = ["sera"]

const getRandomItem = <T,>(items: readonly T[]) =>
	items[Math.floor(Math.random() * items.length)]

export function ThemerSidebar({
	selectedComponent,
	setSelectedComponent,
}: ThemerSidebarProps) {
	const [params, setParams] = useThemerPreset()
	const { locked, toggleLock } = useThemerLocks()
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const selectedComponentName =
		PREVIEW_ITEMS.find((item) => item.value === selectedComponent)?.label ??
		humanizeName(selectedComponent)
	const selectedStyle = STYLES.find((t) => t.value === params.style)
	const isRadiusDisabled = RADIUS_DISABLED_STYLES.includes(
		params.style as StyleValue
	)

	useEffect(() => {
		if (isRadiusDisabled && params.radius !== "none") {
			setParams({ radius: "none" })
		}
	}, [isRadiusDisabled, params.radius, setParams])

	const handleRandomize = useCallback(() => {
		const style = getRandomItem(STYLES)
		const primaryColor = getRandomItem(PRIMARY_COLORS)
		const baseColor = getRandomItem(BASE_COLORS)
		const headingFont = getRandomItem(FONTS)
		const bodyFont = getRandomItem(FONTS)
		const radius = getRandomItem(RADIUS)
		const iconLibrary = getRandomItem(ICON_LIBRARIES)
		const isNextRadiusDisabled = RADIUS_DISABLED_STYLES.includes(
			style.value as StyleValue
		)

		setParams({
			style: style.value as StyleValue,
			primaryColor: primaryColor.value as PrimaryColorValue,
			baseColor: baseColor.value as BaseColorValue,
			iconLibrary: iconLibrary as IconLibrary,
			...(isNextRadiusDisabled && {
				radius: "none",
			}),
			...(!locked.headingFont && {
				headingFont: headingFont.value as FontValue,
			}),
			...(!locked.bodyFont && {
				bodyFont: bodyFont.value as FontValue,
			}),
			...(!locked.radius &&
				!isNextRadiusDisabled && {
					radius: radius.value as RadiusValue,
				}),
		})
	}, [locked, setParams])

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
							<TabsList width="full" variant="default">
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

				{/* Style Section */}

				<div className="flex flex-col gap-3">
					<SectionLabel>Styles</SectionLabel>
					<DropdownMenu>
						<DropdownMenuTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">{selectedStyle?.name}</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownMenuTrigger>
						<DropdownMenuContent side="right" className="max-h-96 w-64">
							<DropdownMenuRadioGroup
								value={selectedStyle?.value}
								onValueChange={(value) => {
									const preset = PRESETS.find((p) => p.name === value)
									const isNextRadiusDisabled = RADIUS_DISABLED_STYLES.includes(
										value as StyleValue
									)
									setParams({
										style: value as StyleValue,
										...(preset && {
											headingFont: preset.headingFont,
											bodyFont: preset.bodyFont,
											radius: preset.radius,
											template: preset.template,
											useSrcDir: preset.useSrcDir,
										}),
										primaryColor: params.primaryColor,
										...(locked.headingFont && {
											headingFont: params.headingFont,
										}),
										...(locked.bodyFont && {
											bodyFont: params.bodyFont,
										}),
										...(locked.radius &&
											!isNextRadiusDisabled && {
												radius: params.radius,
											}),
										...(isNextRadiusDisabled && {
											radius: "none",
										}),
									})
								}}>
								{STYLES.map((style) => (
									<DropdownMenuRadioItem
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
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
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

				{/* Base Color Section */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Base Color</SectionLabel>
					{/* <div className="flex flex-wrap gap-2">
						{BASE_COLORS.map((color) => (
							<ColorSwatch
								key={color.value}
								color={color}
								isSelected={params.baseColor === color.value}
								onClick={() =>
									setParams({
										baseColor: color.value as BaseColorValue,
									})
								}
							/>
						))}
					</div> */}
					<DropdownMenu>
						<DropdownMenuTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{BASE_COLORS_MAP[params.baseColor].name}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownMenuTrigger>
						<DropdownMenuContent side="left" className="max-h-96 w-56">
							<DropdownMenuRadioGroup
								value={params.baseColor}
								onValueChange={(value) =>
									setParams({ baseColor: value as BaseColorValue })
								}>
								{BASE_COLORS.map((baseColor) => (
									<DropdownMenuRadioItem
										key={baseColor.value}
										value={baseColor.value}
										onSelect={(e) => e.preventDefault()}>
										{baseColor.name}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Component Preview */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Preview</SectionLabel>
					<DropdownMenu>
						<DropdownMenuTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{selectedComponentName}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownMenuTrigger>
						<DropdownMenuContent side="left" className="max-h-96 w-56">
							<DropdownMenuRadioGroup
								value={selectedComponent}
								onValueChange={setSelectedComponent}>
								{PREVIEW_ITEMS.map((item) => (
									<DropdownMenuRadioItem
										key={item.value}
										value={item.value}
										onSelect={(e) => e.preventDefault()}>
										<div className="flex flex-col gap-0.5">
											<span>{item.label}</span>
											<span className="text-fg-tertiary text-xs">
												{item.description}
											</span>
										</div>
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Icon Library */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Icons</SectionLabel>
					<DropdownMenu>
						<DropdownMenuTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{ICON_LIBRARY_LABELS[params.iconLibrary as IconLibrary]}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownMenuTrigger>
						<DropdownMenuContent side="left" className="max-h-96 w-56">
							<DropdownMenuRadioGroup
								value={params.iconLibrary}
								onValueChange={(value) =>
									setParams({ iconLibrary: value as IconLibrary })
								}>
								{ICON_LIBRARIES.map((iconLibrary) => (
									<DropdownMenuRadioItem
										key={iconLibrary}
										value={iconLibrary}
										onSelect={(e) => e.preventDefault()}>
										{ICON_LIBRARY_LABELS[iconLibrary]}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
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
							isLocked={locked.headingFont}
							onToggleLock={() => toggleLock("headingFont")}
						/>
						<FontCombobox
							label="Body Font"
							value={params.bodyFont}
							onValueChange={(value) =>
								setParams({ bodyFont: value as FontValue })
							}
							isLocked={locked.bodyFont}
							onToggleLock={() => toggleLock("bodyFont")}
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
								isSelected={
									(isRadiusDisabled ? "none" : params.radius) === radius.value
								}
								disabled={isRadiusDisabled}
								onClick={() =>
									setParams({ radius: radius.value as RadiusValue })
								}
							/>
						))}
						<RadiusLockPill
							isLocked={locked.radius}
							disabled={isRadiusDisabled}
							onToggle={() => toggleLock("radius")}
						/>
					</div>
				</div>

				<Button
					type="button"
					variant="outline"
					color="neutral"
					className="w-full"
					onClick={handleRandomize}>
					Randomize Preset
				</Button>
			</div>

			{/* Footer action */}
			<div className="border-border border-t px-5 py-4">
				<CreateProjectDialog />
			</div>
		</aside>
	)
}
