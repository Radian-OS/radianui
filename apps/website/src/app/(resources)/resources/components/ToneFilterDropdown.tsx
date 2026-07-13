"use client"

import React, { useState } from "react"
import { Ban, ChevronDown, Dices, Pipette, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownLabel,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

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

const ToneFilterDropdown = ({
	value,
	onChange,
}: {
	value: string
	onChange: (value: string) => void
}) => {
	const [open, setOpen] = useState(false)

	const activeSwatch = SOLID_COLORS.find((c) => c.id === value)
	const activeLabel = activeSwatch ? "Custom" : "Neutral"

	return (
		<Dropdown open={open} onOpenChange={setOpen} indicatorPosition="right">
			<DropdownTrigger asChild>
				<Button color="neutral" variant="outline">
					<span
						className={`border-border size-3.5 rounded-full border ${
							activeSwatch?.className ?? "bg-elevation-level2"
						}`}
					/>
					{activeLabel}
					<ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownTrigger>

			<DropdownContent align="center">
				{/* Header */}
				<div className="flex items-center justify-between px-4 pb-2 pt-4">
					<span className="text-sm font-semibold">Change Background</span>
					<Button
						onClick={() => setOpen(false)}
						color="neutral"
						variant="ghost">
						<X className="size-4" />
					</Button>
				</div>

				<div className="flex flex-col gap-4 px-4 pb-4">
					{/* Colors */}
					<div className="flex flex-col gap-2">
						<DropdownLabel className="px-0 text-xs">Colors</DropdownLabel>
						<div className="grid grid-cols-8 gap-2">
							{SOLID_COLORS.map((c) => (
								<div
									key={c.id}
									onClick={() => onChange(c.id)}
									className={`size-8 cursor-pointer rounded-lg ${c.className} ${
										value === c.id ? "ring-primary ring-2 ring-offset-2" : ""
									}`}
								/>
							))}
							{/* Rainbow / custom color */}
							<div
								onClick={() => onChange("custom-color")}
								style={{
									background:
										"conic-gradient(from 180deg, #f87171, #fbbf24, #a3e635, #34d399, #38bdf8, #818cf8, #e879f9, #f87171)",
								}}
								className="border-border size-8 rounded-lg border"
							/>
							<Button
								type="button"
								onClick={() => onChange("pick-color")}
								color="neutral"
								variant="ghost">
								<Pipette className="text-fg-secondary size-4" />
							</Button>
							<Button
								type="button"
								onClick={() => onChange("none")}
								color="neutral"
								variant="ghost">
								<Ban className="text-fg-secondary size-4" />
							</Button>
						</div>
					</div>

					<DropdownDivider className="mx-0" />

					{/* Gradients */}
					<div className="flex flex-col gap-2">
						<DropdownLabel className="px-0 text-xs">Gradients</DropdownLabel>
						<div className="grid grid-cols-8 gap-2">
							{GRADIENTS.map((g) => (
								<div
									key={g.id}
									onClick={() => onChange(g.id)}
									style={{
										backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})`,
									}}
									className={`size-8 rounded-lg ${
										value === g.id ? "ring-primary ring-2 ring-offset-2" : ""
									}`}
								/>
							))}
							<div
								onClick={() => onChange("gradient-white")}
								className="border-border size-8 rounded-lg border bg-white"
							/>
							<Button
								type="button"
								onClick={() => onChange("pick-gradient")}
								color="neutral"
								variant="ghost">
								<Pipette className="text-fg-secondary size-4" />
							</Button>
						</div>
					</div>

					<DropdownDivider className="mx-0" />

					{/* Background images */}
					<div className="flex flex-col gap-2">
						<DropdownLabel className="px-0 text-xs">Background</DropdownLabel>
						<div className="grid grid-cols-4 gap-2">
							<div
								onClick={() => onChange("upload-background")}
								className="bg-fill1 flex aspect-square items-center justify-center rounded-lg">
								<Dices className="text-fg-secondary size-4" />
							</div>
							{BACKGROUNDS.map((src) => (
								<div
									key={src}
									onClick={() => onChange(src)}
									className={`relative aspect-square overflow-hidden rounded-lg ${
										value === src ? "ring-primary ring-2 ring-offset-2" : ""
									}`}>
									<Image
										src={src}
										alt={src}
										fill
										sizes="80px"
										className="object-cover"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</DropdownContent>
		</Dropdown>
	)
}

export default ToneFilterDropdown
