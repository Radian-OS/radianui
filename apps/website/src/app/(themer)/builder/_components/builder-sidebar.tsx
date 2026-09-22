"use client"

import { useCallback } from "react"
import {
	ChevronDown,
	Download,
	MoonIcon,
	Palette,
	SunIcon,
	Type,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BASE_COLORS, type BaseColorValue } from "@/registry/base-colors"
import { FONTS, type FontValue } from "@/registry/fonts"
import {
	PRIMARY_COLORS,
	type PrimaryColorValue,
} from "@/registry/primary-colors"
import { RADIUS, type RadiusValue } from "@/registry/radius"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"
import type { DesignTokens } from "../_lib/design-tokens"
import type { NodeTree } from "../_lib/node-tree"
import { serializeTree } from "../_lib/node-tree"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BuilderSidebarProps {
	tokens: DesignTokens
	setTokens: React.Dispatch<React.SetStateAction<DesignTokens>>
	tree: NodeTree
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<span className="text-fg-tertiary text-[11px] font-medium tracking-wider uppercase">
			{children}
		</span>
	)
}

function ColorSwatch({
	color,
	isSelected,
	onClick,
}: {
	color: { name: string; cssVars: { light: Readonly<Record<string, string>> } }
	isSelected: boolean
	onClick: () => void
}) {
	const backgroundColor =
		color.cssVars.light["--color-primary"] ??
		color.cssVars.light["--color-fill1"] ??
		color.cssVars.light["--color-bg"] ??
		"transparent"

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					aria-label={color.name}
					onClick={onClick}
					className={cn(
						"size-7 rounded-full border-2 transition-all",
						isSelected
							? "border-fg scale-110 ring-2 ring-white"
							: "hover:border-border border-transparent hover:scale-110"
					)}
					style={{ backgroundColor }}
				/>
			</TooltipTrigger>
			<TooltipContent side="top">{color.name}</TooltipContent>
		</Tooltip>
	)
}

function RadiusPill({
	label,
	isSelected,
	onClick,
}: {
	label: string
	isSelected: boolean
	onClick: () => void
}) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"rounded-md border px-3 py-1.5 text-xs font-medium transition-all",
				isSelected
					? "border-primary bg-primary-accent text-primary-text"
					: "border-border bg-elevation-level2 text-fg-secondary",
				!isSelected && "hover:border-fg-disabled hover:text-fg"
			)}>
			{label}
		</button>
	)
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function BuilderSidebar({
	tokens,
	setTokens,
	tree,
}: BuilderSidebarProps) {
	const updateToken = useCallback(
		<K extends keyof DesignTokens>(key: K, value: DesignTokens[K]) => {
			setTokens((prev) => ({ ...prev, [key]: value }))
		},
		[setTokens]
	)

	const handleExport = useCallback(() => {
		const json = serializeTree(tree)
		const blob = new Blob([json], { type: "application/json" })
		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = url
		a.download = "website-tree.json"
		a.click()
		URL.revokeObjectURL(url)
	}, [tree])

	const selectedBaseColor = BASE_COLORS.find(
		(c) => c.value === tokens.baseColor
	)

	const selectedHeadingFont = FONTS.find((f) => f.value === tokens.headingFont)

	const selectedBodyFont = FONTS.find((f) => f.value === tokens.bodyFont)

	return (
		<aside className="bg-elevation-level1 border-border flex w-80 shrink-0 flex-col border-r">
			{/* Header */}
			<div className="border-border flex flex-col gap-1 border-b px-5 py-4">
				<div className="flex items-center gap-2">
					<Palette className="text-primary size-4" />
					<h1 className="text-fg text-sm font-semibold">Website Builder</h1>
				</div>
				<p className="text-fg-tertiary text-xs">
					Customize design tokens and preview your site live.
				</p>
			</div>

			{/* Scrollable controls */}
			<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
				{/* Theme Mode Toggle */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Theme Mode</SectionLabel>
					<div className="bg-fill2 flex rounded-lg p-1">
						<button
							onClick={() => updateToken("darkMode", false)}
							className={cn(
								"flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
								!tokens.darkMode
									? "bg-elevation-level1 text-fg shadow-sm"
									: "text-fg-tertiary hover:text-fg-secondary"
							)}>
							<SunIcon className="size-3.5" />
							Light
						</button>
						<button
							onClick={() => updateToken("darkMode", true)}
							className={cn(
								"flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
								tokens.darkMode
									? "bg-elevation-level1 text-fg shadow-sm"
									: "text-fg-tertiary hover:text-fg-secondary"
							)}>
							<MoonIcon className="size-3.5" />
							Dark
						</button>
					</div>
				</div>

				{/* Primary Color */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Primary Color</SectionLabel>
					<div className="flex flex-wrap gap-2">
						{PRIMARY_COLORS.map((color) => (
							<ColorSwatch
								key={color.value}
								color={color}
								isSelected={tokens.primaryColor === color.value}
								onClick={() =>
									updateToken("primaryColor", color.value as PrimaryColorValue)
								}
							/>
						))}
					</div>
				</div>

				{/* Base Color */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Base Color</SectionLabel>
					<DropdownMenu>
						<DropdownMenuTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<span className="text-fg font-medium">
								{selectedBaseColor?.name ?? "Default"}
							</span>
							<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
						</DropdownMenuTrigger>
						<DropdownMenuContent side="right" className="max-h-96 w-56">
							<DropdownMenuRadioGroup
								value={tokens.baseColor}
								onValueChange={(value) =>
									updateToken("baseColor", value as BaseColorValue)
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

				{/* Typography */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-1.5">
						<Type className="text-fg-tertiary size-3" />
						<SectionLabel>Typography</SectionLabel>
					</div>
					<div className="flex flex-col gap-2">
						{/* Heading Font */}
						<div className="flex flex-col gap-1">
							<span className="text-fg-tertiary text-[10px] font-medium uppercase">
								Heading
							</span>
							<DropdownMenu>
								<DropdownMenuTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
									<span className="text-fg font-medium">
										{selectedHeadingFont?.name ?? "Geist"}
									</span>
									<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
								</DropdownMenuTrigger>
								<DropdownMenuContent
									side="right"
									className="max-h-72 w-56 overflow-y-auto">
									<DropdownMenuRadioGroup
										value={tokens.headingFont}
										onValueChange={(value) =>
											updateToken("headingFont", value as FontValue)
										}>
										{FONTS.slice(0, 40).map((font) => (
											<DropdownMenuRadioItem
												key={font.value}
												value={font.value}
												onSelect={(e) => e.preventDefault()}>
												{font.name}
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						{/* Body Font */}
						<div className="flex flex-col gap-1">
							<span className="text-fg-tertiary text-[10px] font-medium uppercase">
								Body
							</span>
							<DropdownMenu>
								<DropdownMenuTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
									<span className="text-fg font-medium">
										{selectedBodyFont?.name ?? "Inter"}
									</span>
									<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
								</DropdownMenuTrigger>
								<DropdownMenuContent
									side="right"
									className="max-h-72 w-56 overflow-y-auto">
									<DropdownMenuRadioGroup
										value={tokens.bodyFont}
										onValueChange={(value) =>
											updateToken("bodyFont", value as FontValue)
										}>
										{FONTS.slice(0, 40).map((font) => (
											<DropdownMenuRadioItem
												key={font.value}
												value={font.value}
												onSelect={(e) => e.preventDefault()}>
												{font.name}
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>

				{/* Border Radius */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Border Radius</SectionLabel>
					<div className="flex flex-wrap gap-1.5">
						{RADIUS.map((radius) => (
							<RadiusPill
								key={radius.value}
								label={radius.name}
								isSelected={tokens.radius === radius.value}
								onClick={() =>
									updateToken("radius", radius.value as RadiusValue)
								}
							/>
						))}
					</div>
				</div>

				{/* Spacing */}
				<div className="flex flex-col gap-3">
					<SectionLabel>Spacing</SectionLabel>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-1">
							<span className="text-fg-tertiary text-[10px] font-medium uppercase">
								Section Padding
							</span>
							<input
								type="text"
								value={tokens.sectionPadding}
								onChange={(e) => updateToken("sectionPadding", e.target.value)}
								className="border-border bg-elevation-level2 text-fg focus:border-primary rounded-lg border px-3 py-2 text-sm transition-colors outline-none"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-fg-tertiary text-[10px] font-medium uppercase">
								Container Max Width
							</span>
							<input
								type="text"
								value={tokens.containerMaxWidth}
								onChange={(e) =>
									updateToken("containerMaxWidth", e.target.value)
								}
								className="border-border bg-elevation-level2 text-fg focus:border-primary rounded-lg border px-3 py-2 text-sm transition-colors outline-none"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="border-border flex flex-col gap-2 border-t px-5 py-4">
				<Button
					type="button"
					variant="strong"
					color="primary"
					className="w-full"
					onClick={handleExport}>
					<Download className="size-4" />
					Export Tree JSON
				</Button>
			</div>
		</aside>
	)
}
