"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Radian } from "../icon/radian"

const themeOptions = [
	{ id: "system", label: "System Default" },
	{ id: "light", label: "Light" },
	{ id: "dark", label: "Dark" },
] as const

function ThemePreviewLight() {
	return (
		<div className="flex h-full flex-col gap-3 rounded-xl bg-[#eeeff1] p-3">
			<div className="flex gap-1">
				{[0, 1, 2].map((i) => (
					<div key={i} className="size-[6px] rounded-full bg-[#dee0e3]" />
				))}
			</div>
			<div className="flex flex-col gap-1">
				{[0, 1, 2, 3, 4].map((i) => (
					<div key={i} className="flex items-center gap-1.5">
						<div
							className={cn(
								"size-2.5 rounded-full",
								i < 2 ? "bg-primary" : i === 2 ? "bg-success" : "bg-warning"
							)}
						/>
						<div className="h-1 w-10 rounded bg-[#dee0e3]" />
					</div>
				))}
			</div>
		</div>
	)
}

function ThemePreviewDark() {
	return (
		<div className="flex h-full flex-col gap-3 rounded-xl bg-[#1c1e21] p-3">
			<div className="flex gap-1">
				{[0, 1, 2].map((i) => (
					<div key={i} className="size-[6px] rounded-full bg-[#3a3d42]" />
				))}
			</div>
			<div className="flex flex-col gap-1">
				{[0, 1, 2, 3, 4].map((i) => (
					<div key={i} className="flex items-center gap-1.5">
						<div
							className={cn(
								"size-2.5 rounded-full",
								i < 2 ? "bg-primary" : i === 2 ? "bg-success" : "bg-warning"
							)}
						/>
						<div className="h-1 w-10 rounded bg-[#2f3237]" />
					</div>
				))}
			</div>
		</div>
	)
}

function SystemPreview() {
	return (
		<div className="relative h-[143px] w-full overflow-hidden rounded-2xl">
			{/* Light half */}
			<div className="absolute inset-0 w-1/2 overflow-hidden bg-[#dee0e3]">
				<div className="absolute left-[50%] top-0 w-[180px] origin-top-left rotate-[30deg] -skew-x-[30deg] scale-y-[0.87]">
					<div className="flex h-[100px] overflow-hidden rounded-xl border border-[#e9eaec] bg-white shadow-md">
						<ThemePreviewLight />
						<div className="flex-1 bg-white" />
					</div>
				</div>
			</div>
			{/* Dark half */}
			<div className="absolute inset-0 left-1/2 w-1/2 overflow-hidden bg-[#2f3237]">
				<div className="absolute right-[50%] top-0 w-[180px] origin-top-right rotate-[30deg] -skew-x-[30deg] scale-y-[0.87]">
					<div className="flex h-[100px] overflow-hidden rounded-xl border border-[#1c1e21] bg-[#131416] shadow-md">
						<ThemePreviewDark />
						<div className="flex-1 bg-[#1c1e21]" />
					</div>
				</div>
			</div>
		</div>
	)
}

function LightPreview() {
	return (
		<div className="relative h-[143px] w-full overflow-hidden rounded-2xl bg-[#dee0e3]">
			<div className="absolute left-[48px] top-0 w-[180px] origin-top-left rotate-[30deg] -skew-x-[30deg] scale-y-[0.87]">
				<div className="flex h-[100px] overflow-hidden rounded-xl border border-[#e9eaec] bg-white shadow-md">
					<ThemePreviewLight />
					<div className="flex-1 bg-white" />
				</div>
			</div>
		</div>
	)
}

function DarkPreview() {
	return (
		<div className="relative h-[143px] w-full overflow-hidden rounded-2xl bg-[#2f3237]">
			<div className="absolute left-[48px] top-0 w-[180px] origin-top-left rotate-[30deg] -skew-x-[30deg] scale-y-[0.87]">
				<div className="flex h-[100px] overflow-hidden rounded-xl border border-[#1c1e21] bg-[#131416] shadow-md">
					<ThemePreviewDark />
					<div className="flex-1 bg-[#1c1e21]" />
				</div>
			</div>
		</div>
	)
}

export default function ThemeStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [selectedTheme, setSelectedTheme] = useState<string>("system")

	const previews: Record<string, React.ReactNode> = {
		system: <SystemPreview />,
		light: <LightPreview />,
		dark: <DarkPreview />,
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />

				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Personalize your experience</h1>
					<p className="text-fg-secondary text-sm">
						Customize your experience with light, dark or system default mode.
					</p>
				</div>
			</div>

			{/* Theme Options */}
			<div className="flex gap-3">
				{themeOptions.map((theme) => (
					<button
						key={theme.id}
						type="button"
						onClick={() => setSelectedTheme(theme.id)}
						className="flex flex-1 flex-col items-center gap-4">
						<div
							className={cn(
								"w-full overflow-hidden rounded-2xl transition-all",
								selectedTheme === theme.id &&
									"ring-primary ring-offset-bg ring-[3px] ring-offset-2"
							)}>
							{previews[theme.id]}
						</div>
						{selectedTheme === theme.id ? (
							<Badge variant="strong" color="primary" size="24">
								{theme.label}
							</Badge>
						) : (
							<span className="text-fg text-[13px] font-medium">
								{theme.label}
							</span>
						)}
					</button>
				))}
			</div>

			{/* Actions */}
			<div className="flex gap-3">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="flex-1"
					onClick={onSkip}>
					Skip
				</Button>
				<Button
					type="button"
					variant="strong"
					color="primary"
					size="36"
					className="flex-1"
					onClick={onNext}>
					Continue
				</Button>
			</div>
		</div>
	)
}
