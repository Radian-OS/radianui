"use client"

import * as React from "react"
import { Plus, Trash2 } from "lucide-react"
import { PRIMARY_COLORS, PrimaryColor } from "@/registry/primary-colors"
import { generateCustomColorShades } from "@/lib/shade-generator"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"
import { Button } from "@/styles/default/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { CustomColorPicker } from "./custom-color-picker"

import ntc from "ntcjs"

function ShadeItem({
	label,
	value,
	badge,
}: {
	label: string
	value: string
	badge?: string
}) {
	const [copied, setCopied] = React.useState(false)

	const handleCopy = (e: React.MouseEvent) => {
		e.stopPropagation()
		navigator.clipboard.writeText(value)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div
			className="bg-elevation-level2 group flex cursor-pointer items-center justify-between rounded-md p-1.5 pr-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
			onClick={handleCopy}>
			<div className="flex items-center gap-2.5">
				<div
					className="size-6 rounded-md border border-black/10 shadow-sm"
					style={{ backgroundColor: value }}
				/>
				<span className="text-fg text-[13px]">{label}</span>
			</div>
			{badge ? (
				<span className="bg-fg text-bg rounded px-1.5 py-0.5 text-[10px] font-medium">
					{badge}
				</span>
			) : (
				<button
					className={cn(
						"rounded px-2 py-0.5 text-xs font-medium transition-opacity",
						copied
							? "bg-success text-success-fg opacity-100"
							: "bg-elevation-level3 text-fg opacity-0 group-hover:opacity-100"
					)}>
					{copied ? "Copied!" : "Copy"}
				</button>
			)}
		</div>
	)
}

interface ColorPaletteSelectorProps {
	mainColorValue: string
	onMainColorChange: (value: string) => void
	extraColors: string[]
	onExtraColorsChange: (colors: string[]) => void
}

function getColorByValue(value: string): PrimaryColor | undefined {
	const preset = PRIMARY_COLORS.find((c) => c.value === value)
	if (preset) return preset

	if (value.startsWith("#")) {
		const generated = generateCustomColorShades(value)
		const colorName = ntc.name(value)[1]
		return {
			name: colorName,
			value: value,
			cssVars: {
				light: generated,
				dark: generated,
			},
		} as unknown as PrimaryColor
	}
	return undefined
}

function ColorBlock({
	color,
	isMain,
	onColorSelect,
	onRemove,
}: {
	color?: PrimaryColor
	isMain?: boolean
	onColorSelect: (value: string) => void
	onRemove?: () => void
}) {
	const [isOpen, setIsOpen] = React.useState(false)

	if (!color) {
		return (
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<button
						className="border-border hover:bg-elevation-level2 bg-elevation-level1 flex h-full min-h-[100px] w-full items-center justify-center rounded-lg border border-dashed transition-colors"
						aria-label="Add color">
						<Plus className="text-fg-tertiary size-6" />
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-64 p-3" align="start">
					<div className="text-fg mb-3 text-xs font-semibold">Select Color</div>
					<div className="grid grid-cols-5 gap-2">
						{PRIMARY_COLORS.map((pc) => (
							<button
								key={pc.value}
								className="size-8 rounded-md border border-black/10 shadow-sm transition-transform hover:scale-110"
								style={{
									backgroundColor: pc.cssVars.light["--color-primary"],
								}}
								title={pc.name}
								onClick={() => {
									onColorSelect(pc.value)
									setIsOpen(false)
								}}
							/>
						))}
					</div>
				</PopoverContent>
			</Popover>
		)
	}

	const shadeGroups: {
		title: string
		items: { label: string; value: string; badge?: string }[]
	}[] = [
		{
			title: "Pastel",
			items: [
				{
					label: `${color.name} • Lighter`,
					value: color.cssVars.light["--color-primary-accent"],
				},
				{
					label: `${color.name} • Light`,
					value: color.cssVars.light["--color-primary-focus"],
				},
			],
		},
		{
			title: "Mid-Tone",
			items: [
				{
					label: `${color.name} • Border`,
					value: color.cssVars.light["--color-primary-border"],
				},
				{
					label: color.name,
					value: color.cssVars.light["--color-primary"],
					badge: "Base",
				},
				{
					label: `${color.name} • Dark`,
					value: color.cssVars.light["--color-primary-hover"],
				},
			],
		},
		{
			title: "Deep",
			items: [
				{
					label: `${color.name} • Darker`,
					value: color.cssVars.light["--color-primary-text"],
				},
			],
		},
	]

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<button
					className={cn(
						"group relative flex w-full cursor-pointer flex-col justify-between overflow-hidden rounded-lg p-2 py-3 text-left transition-transform hover:scale-[1.02]",
						isMain ? "h-[208px]" : "h-[100px]"
					)}
					style={{ backgroundColor: color.cssVars.light["--color-primary"] }}>
					<div className="flex w-full items-start justify-between">
						<span
							className="text-xs font-medium"
							style={{ color: color.cssVars.light["--color-primary-fg"] }}>
							{color.name}
						</span>
						{!isMain && onRemove && (
							<div
								className="opacity-0 transition-opacity group-hover:opacity-100"
								onClick={(e) => {
									e.stopPropagation()
									onRemove()
								}}
								title="Delete">
								<Trash2
									className="size-4"
									style={{ color: color.cssVars.light["--color-primary-fg"] }}
								/>
							</div>
						)}
					</div>

					<div className="flex w-full flex-col items-end justify-between gap-2">
						<div className="border-fg-tertiary flex h-1.5 w-full overflow-hidden rounded-full border">
							{shadeGroups
								.flatMap((g) => g.items)
								.map((item, i) => (
									<div
										key={i}
										className="h-full flex-1"
										style={{ backgroundColor: item.value }}
									/>
								))}
						</div>
						{isMain && <Badge size="20">Main</Badge>}
					</div>
				</button>
			</PopoverTrigger>
			<PopoverContent
				className="w-80 overflow-hidden p-0"
				align="center"
				side="right"
				sideOffset={16}
				collisionPadding={16}>
				<div className="flex max-h-[700px] flex-col overflow-y-auto">
					<div className="border-border border-b p-4">
						<CustomColorPicker
							color={
								color.cssVars.light["--color-primary"].startsWith("oklch")
									? color.cssVars.light["--color-primary"]
									: color.value // Fallback to value if it's already hex
							}
							onChange={(val) => {
								onColorSelect(val)
							}}
						/>
					</div>
					<div className="p-4 pb-2">
						<div className="text-fg mb-4 text-[15px] font-semibold">Shades</div>
						<div className="flex flex-col gap-5">
							{shadeGroups.map((group) => (
								<div key={group.title} className="flex flex-col gap-2">
									<div className="text-fg-tertiary text-[11px] font-medium tracking-wider uppercase">
										{group.title}
									</div>
									<div className="flex flex-col gap-1.5">
										{group.items.map((item, i) => (
											<ShadeItem
												key={i}
												label={item.label}
												value={item.value}
												badge={item.badge}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="border-border bg-elevation-level1 border-t p-4">
						<div className="text-fg mb-3 text-xs font-semibold">Presets</div>
						<div className="grid grid-cols-6 gap-2">
							{PRIMARY_COLORS.map((pc) => (
								<button
									key={pc.value}
									className="size-8 rounded-md border border-black/10 shadow-sm transition-transform hover:scale-110"
									style={{
										backgroundColor: pc.cssVars.light["--color-primary"],
									}}
									title={pc.name}
									onClick={() => onColorSelect(pc.value)}
								/>
							))}
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export function ColorPaletteSelector({
	mainColorValue,
	onMainColorChange,
	extraColors,
	onExtraColorsChange,
}: ColorPaletteSelectorProps) {
	const mainColor = getColorByValue(mainColorValue)

	const handleAddExtraColor = (value: string) => {
		if (extraColors.length < 4) {
			onExtraColorsChange([...extraColors, value])
		}
	}

	const handleChangeExtraColor = (index: number, value: string) => {
		const next = [...extraColors]
		next[index] = value
		onExtraColorsChange(next)
	}

	const handleRemoveExtraColor = (index: number) => {
		const next = [...extraColors]
		next.splice(index, 1)
		onExtraColorsChange(next)
	}

	return (
		<div className="flex gap-2">
			<div className="w-[120px] shrink-0">
				<ColorBlock
					color={mainColor}
					isMain
					onColorSelect={onMainColorChange}
				/>
			</div>
			<div className="grid flex-1 grid-cols-2 gap-2">
				{extraColors.map((colorValue, index) => (
					<ColorBlock
						key={index}
						color={getColorByValue(colorValue)}
						onColorSelect={(value) => handleChangeExtraColor(index, value)}
						onRemove={() => handleRemoveExtraColor(index)}
					/>
				))}
				{extraColors.length < 4 && (
					<ColorBlock onColorSelect={handleAddExtraColor} />
				)}
			</div>
		</div>
	)
}
