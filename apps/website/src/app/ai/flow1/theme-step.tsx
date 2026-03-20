"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

type ThemeOption = "system" | "light" | "dark"

function ThemePreviewLight() {
	return (
		<div className="border-soft bg-fill2 flex flex-col gap-3 rounded-xl border p-3">
			{/* Dots */}
			<div className="flex gap-1">
				<div className="bg-primary size-1.5 rounded-full" />
				<div className="bg-primary size-1.5 rounded-full" />
				<div className="bg-primary size-1.5 rounded-full" />
			</div>
			{/* Lines */}
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center gap-1.5">
					<div className="bg-primary size-2.5 rounded-full" />
					<div className="bg-fill4 h-1 w-7 rounded-full" />
				</div>
				<div className="flex items-center gap-1.5">
					<div className="bg-primary size-2.5 rounded-full" />
					<div className="bg-fill4 h-1 w-7 rounded-full" />
				</div>
				<div className="flex items-center gap-1.5">
					<div className="bg-success size-2.5 rounded-full" />
					<div className="bg-fill4 h-1 w-7 rounded-full" />
				</div>
				<div className="flex items-center gap-1.5">
					<div className="bg-info size-2.5 rounded-full" />
					<div className="bg-fill4 h-1 w-7 rounded-full" />
				</div>
			</div>
		</div>
	)
}

function ThemePreviewDark() {
	return (
		<div className="flex flex-col gap-3 rounded-xl border border-[#1c1e21] bg-[#1c1e21] p-3">
			{/* Dots */}
			<div className="flex gap-1">
				<div className="bg-primary size-1.5 rounded-full" />
				<div className="bg-primary size-1.5 rounded-full" />
				<div className="bg-primary size-1.5 rounded-full" />
			</div>
			{/* Lines */}
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center gap-1.5">
					<div className="size-2.5 rounded-full bg-[#7c5cf5]" />
					<div className="h-1 w-7 rounded-full bg-[#2f3237]" />
				</div>
				<div className="flex items-center gap-1.5">
					<div className="size-2.5 rounded-full bg-[#7c5cf5]" />
					<div className="h-1 w-7 rounded-full bg-[#2f3237]" />
				</div>
				<div className="flex items-center gap-1.5">
					<div className="bg-success size-2.5 rounded-full" />
					<div className="h-1 w-7 rounded-full bg-[#2f3237]" />
				</div>
				<div className="flex items-center gap-1.5">
					<div className="bg-info size-2.5 rounded-full" />
					<div className="h-1 w-7 rounded-full bg-[#2f3237]" />
				</div>
			</div>
		</div>
	)
}

function SystemPreview() {
	return (
		<div className="relative h-[143px] w-full overflow-hidden rounded-2xl">
			{/* Light half */}
			<div className="absolute inset-0 w-1/2 bg-[#dee0e3]">
				<div className="absolute left-6 top-4">
					<ThemePreviewLight />
				</div>
			</div>
			{/* Dark half */}
			<div className="absolute right-0 top-0 h-full w-1/2 bg-[#2f3237]">
				<div className="absolute right-6 top-4">
					<ThemePreviewDark />
				</div>
			</div>
		</div>
	)
}

const themeOptions: {
	id: ThemeOption
	label: string
}[] = [
	{ id: "system", label: "System Default" },
	{ id: "light", label: "Light" },
	{ id: "dark", label: "Dark" },
]

export default function ThemeStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [selectedTheme, setSelectedTheme] = useState<ThemeOption>("system")

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Personalize your experience</h1>
					<p className="text-fg-secondary text-sm">
						Customize your experience with light, dark or system default mode.
					</p>
				</div>
			</div>

			{/* Theme Options */}
			<div className="flex gap-3">
				{themeOptions.map((option) => {
					const isSelected = selectedTheme === option.id
					return (
						<button
							key={option.id}
							type="button"
							onClick={() => setSelectedTheme(option.id)}
							className="flex flex-1 flex-col items-center gap-4">
							<div
								className={`w-full overflow-hidden rounded-2xl ${
									isSelected
										? "ring-primary ring-offset-bg ring-[3px] ring-offset-2"
										: ""
								} ${
									option.id === "dark" ? "bg-[#2f3237]" : "bg-fill4"
								} h-[143px]`}>
								{option.id === "system" && <SystemPreview />}
								{option.id === "light" && (
									<div className="flex h-full items-start justify-center pt-4">
										<ThemePreviewLight />
									</div>
								)}
								{option.id === "dark" && (
									<div className="flex h-full items-start justify-center pt-4">
										<ThemePreviewDark />
									</div>
								)}
							</div>
							{isSelected ? (
								<Badge variant="strong" color="primary" size="24">
									{option.label}
								</Badge>
							) : (
								<span className="text-fg text-[13px] font-medium">
									{option.label}
								</span>
							)}
						</button>
					)
				})}
			</div>

			{/* Action Buttons */}
			<div className="flex gap-3">
				<Button
					variant="outline"
					color="neutral"
					className="flex-1"
					type="button"
					onClick={onSkip}>
					Skip
				</Button>
				<Button
					variant="strong"
					color="primary"
					className="flex-1"
					type="button"
					onClick={onNext}>
					Continue
				</Button>
			</div>
		</div>
	)
}
