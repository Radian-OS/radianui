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
	{ id: "white", className: "bg-white" },
	{ id: "gray-100", className: "bg-gray-100" },
	{ id: "red-300", className: "bg-red-300" },
	{ id: "orange-300", className: "bg-orange-300" },
	{ id: "amber-300", className: "bg-amber-300" },
	{ id: "lime-300", className: "bg-lime-300" },
	{ id: "green-300", className: "bg-green-300" },
	{ id: "emerald-300", className: "bg-emerald-300" },
	{ id: "teal-300", className: "bg-teal-300" },
	{ id: "sky-300", className: "bg-sky-300" },
	{ id: "indigo-300", className: "bg-indigo-300" },
	{ id: "violet-300", className: "bg-violet-300" },
	{ id: "purple-300", className: "bg-purple-300" },
	{ id: "fuchsia-300", className: "bg-fuchsia-300" },
	{ id: "pink-300", className: "bg-pink-300" },
]

const GRADIENTS = [
	{ id: "grad-red-orange", from: "#fca5a5", to: "#fdba74" },
	{ id: "grad-orange-yellow", from: "#fdba74", to: "#fde047" },
	{ id: "grad-yellow-lime", from: "#fde047", to: "#bef264" },
	{ id: "grad-lime-green", from: "#bef264", to: "#86efac" },
	{ id: "grad-green-teal", from: "#86efac", to: "#5eead4" },
	{ id: "grad-teal-cyan", from: "#5eead4", to: "#67e8f9" },
	{ id: "grad-cyan-blue", from: "#67e8f9", to: "#93c5fd" },
	{ id: "grad-blue-indigo", from: "#93c5fd", to: "#a5b4fc" },
	{ id: "grad-indigo-violet", from: "#a5b4fc", to: "#c4b5fd" },
	{ id: "grad-violet-purple", from: "#c4b5fd", to: "#d8b4fe" },
	{ id: "grad-purple-fuchsia", from: "#d8b4fe", to: "#f0abfc" },
	{ id: "grad-fuchsia-pink", from: "#f0abfc", to: "#f9a8d4" },
]

const BACKGROUNDS = [
	"/blocks/bg-1.png",
	"/blocks/bg-2.jpg",
	"/blocks/bg-3.png",
	"/blocks/bg-4.png",
	"/blocks/bg-5.png",
	"/blocks/bg-6.jpg",
	"/blocks/bg-7.jpg",
]

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
			.replace("grad-", "")
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
	if (value === "gradient-white")
		return { label: "White Gradient", type: "special" as const, swatch: null }
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
					style={{
						backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})`,
					}}
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
										className={`size-7 cursor-pointer rounded-lg ${c.className} ${
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
									onChange={(e) => onChange(e.target.value)}
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
										style={{
											backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})`,
										}}
										className={`size-7 rounded-lg ${
											value === g.id ? "ring-primary ring-2 ring-offset-2" : ""
										}`}
									/>
								))}
								<div
									onClick={() => onChange("gradient-white")}
									className="border-border size-7 rounded-lg border bg-white"
								/>
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
											// w-65 h-48 aspect 4/3
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
