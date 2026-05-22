"use client"

import { useEffect, useState } from "react"
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
import { FontValue } from "@/registry/fonts"
import {
	ICON_LIBRARIES,
	ICON_LIBRARY_LABELS,
	IconLibrary,
} from "@/registry/icon/icon-libraries"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RadiusValue } from "@/registry/radius"
import { registryExampleGroups } from "@/registry/registry-map"
import { STYLES, StyleValue } from "@/registry/styles"
import {
	Dropdown,
	DropdownContent,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/styles/default/ui/dropdown"
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

const COMPONENT_PREVIEWS = registryExampleGroups.map((group) => ({
	value: group.name,
	label: humanizeName(group.name),
	description: `${group.examples.length} examples`,
}))

const PREVIEW_ITEMS = [...BLOCK_PREVIEWS, ...COMPONENT_PREVIEWS]

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
										...(locked.radius && {
											radius: params.radius,
										}),
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
					<Dropdown>
						<DropdownTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{BASE_COLORS_MAP[params.baseColor].name}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="left" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={params.baseColor}
								onValueChange={(value) =>
									setParams({ baseColor: value as BaseColorValue })
								}>
								{BASE_COLORS.map((baseColor) => (
									<DropdownRadioItem
										key={baseColor.value}
										value={baseColor.value}
										onSelect={(e) => e.preventDefault()}>
										{baseColor.name}
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>
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
								{PREVIEW_ITEMS.map((item) => (
									<DropdownRadioItem
										key={item.value}
										value={item.value}
										onSelect={(e) => e.preventDefault()}>
										<div className="flex flex-col gap-0.5">
											<span>{item.label}</span>
											<span className="text-fg-tertiary text-xs">
												{item.description}
											</span>
										</div>
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>
				</div>

				{/* Icon Library */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Icons</SectionLabel>
					<Dropdown>
						<DropdownTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{ICON_LIBRARY_LABELS[params.iconLibrary as IconLibrary]}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="left" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={params.iconLibrary}
								onValueChange={(value) =>
									setParams({ iconLibrary: value as IconLibrary })
								}>
								{ICON_LIBRARIES.map((iconLibrary) => (
									<DropdownRadioItem
										key={iconLibrary}
										value={iconLibrary}
										onSelect={(e) => e.preventDefault()}>
										{ICON_LIBRARY_LABELS[iconLibrary]}
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
								isSelected={params.radius === radius.value}
								onClick={() =>
									setParams({ radius: radius.value as RadiusValue })
								}
							/>
						))}
						<RadiusLockPill
							isLocked={locked.radius}
							onToggle={() => toggleLock("radius")}
						/>
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
