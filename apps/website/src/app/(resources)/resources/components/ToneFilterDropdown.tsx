"use client"

import React, { useRef, useState } from "react"
import { Ban, ChevronDown, Dices, X } from "lucide-react"
import Image from "next/image"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { Button, CompactButton, IconButton } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownLabel,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { ScrollArea } from "@/registry/ui/scroll-area"

const SOLID_COLORS = [
	{ id: "Cool-Gray/L100%", className: "bg-[#FFFFFF]" },
	{ id: "Cool-Gray/L94%", className: "bg-[#EEEFF1]" },
	{ id: "Red/100", className: "bg-[#FDD8D8]" },
	{ id: "Orange/100", className: "bg-[#FFE4D6]" },
	{ id: "Amber/100", className: "bg-[#FFEBC2]" },
	{ id: "Yellow/100", className: "bg-[#FFF3B8]" },
	{ id: "Neon/100", className: "bg-[#E7FFB8]" },
	{ id: "Green/100", className: "bg-[#D1FAD1]" },
	{ id: "Emerald/100", className: "bg-[#D1FADF]" },
	{ id: "Teal/100", className: "bg-[#BCFFEE]" },
	{ id: "Light-Blue/100", className: "bg-[#D1E6FA]" },
	{ id: "Blue/100", className: "bg-[#DCDFF9]" },
	{ id: "Violet-Blue/100", className: "bg-[#E5DFFB]" },
	{ id: "Purple/100", className: "bg-[#E9DFFB]" },
	{ id: "Dark-Orchid/100", className: "bg-[#F3DBFF]" },
	{ id: "Magenta/100", className: "bg-[#FBDAF0]" },
	{ id: "Rose/100", className: "bg-[#FBDAE5]" },
]

const SHEEN_OVERLAY = {
	overlayFrom: "rgba(255, 255, 255, 0)",
	overlayTo: "rgba(36, 46, 66, 0.16)",
} as const

type GradientDef = {
	id: string
	from?: string
	to?: string
	// For layered "sheen over solid" backgrounds like the Figma Red token
	base?: string
	overlayFrom?: string
	overlayTo?: string
}

const GRADIENTS: GradientDef[] = SOLID_COLORS.map((c) => {
	const hexMatch = c.className.match(/#[0-9A-Fa-f]+/)
	return {
		id: `grad-${c.id}`,
		base: hexMatch ? hexMatch[0] : c.className,
		...SHEEN_OVERLAY,
	}
})

function getGradientBackground(g: GradientDef): string {
	if (g.base) {
		return `linear-gradient(180deg, ${g.overlayFrom} 0%, ${g.overlayTo} 100%), ${g.base}`
	}
	return `linear-gradient(135deg, ${g.from}, ${g.to})`
}

const BACKGROUND_COLORS = [
	"Amber",
	"Blue",
	"Cyan",
	"Dark%20Orchid",
	"Emerald",
	"Fuchsia",
	"Green",
	"Grey",
	"Light%20Blue",
	"Magenta",
	"Neon",
	"Orange",
	"Purple",
	"Red",
	"Rose",
	"Teal",
	"Violet%20Blue",
	"White",
	"Yellow",
]

export const BACKGROUNDS = BACKGROUND_COLORS.map(
	(color) =>
		`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/avatars-background/src/IMG-${color}.png`
)

function formatColorName(id: string): string {
	return id
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ")
}

function getActiveInfo(value: string) {
	const solidMatch = SOLID_COLORS.find((c) => c.id === value)
	if (solidMatch) {
		return {
			label: formatColorName(solidMatch.id),
			type: "solid" as const,
			swatch: solidMatch,
		}
	}

	const gradMatch = GRADIENTS.find((g) => g.id === value)
	if (gradMatch) {
		const name = gradMatch.id
			.replace("Linear-Gradient", "")
			.split("-")
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(" → ")
		return { label: name, type: "gradient" as const, swatch: gradMatch }
	}

	const bgMatch = BACKGROUNDS.find((src) => src === value)
	if (bgMatch) {
		const idx = BACKGROUNDS.indexOf(bgMatch) + 1
		return {
			label: `Background ${idx}`,
			type: "background" as const,
			swatch: bgMatch,
		}
	}

	if (value === "custom-color")
		return { label: "Custom Color", type: "special" as const, swatch: null }
	if (value.startsWith("grad-custom:")) {
		const parts = value.split(":")
		return {
			label: "Random Gradient",
			type: "gradient" as const,
			swatch: { id: value, from: parts[1], to: parts[2] },
		}
	}
	if (value.startsWith("#"))
		return { label: "Custom Color", type: "custom-hex" as const, swatch: value }
	if (value === "pick-color")
		return { label: "Random Color", type: "special" as const, swatch: null }
	if (value === "pick-gradient")
		return { label: "Random Gradient", type: "special" as const, swatch: null }
	if (value === "upload-background")
		return {
			label: "Upload Background",
			type: "special" as const,
			swatch: null,
		}
	if (value === "none")
		return { label: "None", type: "none" as const, swatch: null }

	return { label: "Neutral", type: "none" as const, swatch: null }
}

const ToneFilterDropdown = ({
	value,
	onChange,
}: {
	value: string
	onChange: (value: string) => void
}) => {
	const [open, setOpen] = useState(false)
	const colorInputRef = useRef<HTMLInputElement>(null)

	const activeInfo = getActiveInfo(value)

	const renderTriggerSwatch = () => {
		if (activeInfo.type === "solid" && activeInfo.swatch) {
			return (
				<span
					className={`border-border size-3.5 rounded-full border ${(activeInfo.swatch as (typeof SOLID_COLORS)[number]).className}`}
				/>
			)
		}
		if (activeInfo.type === "gradient" && activeInfo.swatch) {
			const g = activeInfo.swatch as (typeof GRADIENTS)[number]
			return (
				<span
					className="border-border size-3.5 rounded-full border"
					style={{ background: getGradientBackground(g) }}
				/>
			)
		}
		if (activeInfo.type === "custom-hex" && activeInfo.swatch) {
			return (
				<span
					className="border-border size-3.5 rounded-full border"
					style={{ backgroundColor: activeInfo.swatch as string }}
				/>
			)
		}
		if (activeInfo.type === "background") {
			return (
				<span className="border-border relative size-3.5 overflow-hidden rounded-full border">
					<Image
						src={activeInfo.swatch as string}
						alt=""
						fill
						sizes="14px"
						className="object-cover"
					/>
				</span>
			)
		}
		return (
			<span className="border-border bg-elevation-level2 size-3.5 rounded-full border" />
		)
	}

	return (
		<Dropdown open={open} onOpenChange={setOpen} indicatorPosition="right">
			<DropdownTrigger asChild>
				<Button color="neutral" variant="outline">
					{renderTriggerSwatch()}
					{activeInfo.label}
					<ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownTrigger>

			<DropdownContent align="center" className="rounded-xl p-0">
				<ScrollArea className="h-105">
					{/* Header */}
					<div className="flex items-center justify-between px-4 py-3">
						<span className="text-sm font-semibold">Change Background</span>
						<CompactButton
							onClick={() => setOpen(false)}
							color="neutral"
							size="20"
							variant="soft">
							<X />
						</CompactButton>
					</div>
					<Divider className="p-0" />
					<div className="flex flex-col">
						{/* Colors */}
						<div className="flex flex-col gap-2.5 px-4 py-3">
							<DropdownLabel className="px-0 text-xs">Colors</DropdownLabel>
							<div className="grid grid-cols-9 gap-2">
								{SOLID_COLORS.map((c) => (
									<div
										key={c.id}
										onClick={() => onChange(c.id)}
										className={`size-7 cursor-pointer rounded-lg ${c.className} ${c.id === "Cool-Gray/L100%" ? "border-soft border" : ""} ${
											value === c.id ? "ring-primary ring-2 ring-offset-2" : ""
										}`}
									/>
								))}
								{/* Rainbow / custom color */}
								<div
									onClick={() => colorInputRef.current?.click()}
									style={{
										background:
											"conic-gradient(from 180deg, #f87171, #fbbf24, #a3e635, #34d399, #38bdf8, #818cf8, #e879f9, #f87171)",
									}}
									className="border-border size-7 cursor-pointer rounded-lg border"
								/>
								<input
									ref={colorInputRef}
									type="color"
									className="sr-only"
									onChange={(e) => {
										React.startTransition(() => {
											onChange(e.target.value)
										})
									}}
								/>
								<IconButton
									type="button"
									onClick={() => onChange("pick-color")}
									color="neutral"
									size="28"
									variant="outline">
									<Dices />
								</IconButton>
								<IconButton
									type="button"
									onClick={() => onChange("none")}
									color="neutral"
									size="28"
									variant="outline">
									<Ban />
								</IconButton>
							</div>
						</div>

						<DropdownDivider className="mx-0" />

						{/* Gradients */}
						<div className="flex flex-col gap-2.5 px-4 py-3">
							<DropdownLabel className="px-0 text-xs">Gradients</DropdownLabel>
							<div className="grid grid-cols-9 gap-2">
								{GRADIENTS.map((g) => (
									<div
										key={g.id}
										onClick={() => onChange(g.id)}
										style={{ background: getGradientBackground(g) }}
										className={`size-7 cursor-pointer rounded-lg ${
											value === g.id ? "ring-primary ring-2 ring-offset-2" : ""
										}`}
									/>
								))}
								<IconButton
									type="button"
									onClick={() => onChange("pick-gradient")}
									color="neutral"
									variant="outline"
									size="28">
									<Dices />
								</IconButton>
							</div>
						</div>

						<DropdownDivider className="mx-0" />

						{/* Background images */}
						<div className="flex flex-col gap-2.5 px-4 py-3">
							<DropdownLabel className="px-0 text-xs">Background</DropdownLabel>
							<div className="grid grid-cols-4 gap-2">
								<AspectRatio
									ratio={4 / 3}
									onClick={() => onChange("pick-background")}
									className="bg-fill1 flex cursor-pointer items-center justify-center rounded-lg">
									<Dices className="text-fg-secondary size-4" />
								</AspectRatio>
								{BACKGROUNDS.map((src) => (
									<AspectRatio
										ratio={4 / 3}
										key={src}
										onClick={() => onChange(src)}
										className={`relative cursor-pointer overflow-hidden rounded-lg ${
											value === src ? "ring-primary ring-2 ring-offset-2" : ""
										}`}>
										<Image
											src={src}
											alt={src}
											fill
											sizes="80px"
											className="object-cover"
										/>
									</AspectRatio>
								))}
							</div>
						</div>
					</div>
				</ScrollArea>
			</DropdownContent>
		</Dropdown>
	)
}

export default ToneFilterDropdown
