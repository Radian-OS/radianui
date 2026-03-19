"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import RadianLogo from "./radian-logo"
import SupportFooter from "./support-footer"

type ThemeStepProps = {
	onNext: () => void
	onSkip: () => void
}

type ThemeOption = "system" | "light" | "dark"

function ThemePreviewCard({ variant }: { variant: "light" | "dark" }) {
	const isLight = variant === "light"
	const bgOuter = isLight ? "bg-fill4" : "bg-[#2f3237]"
	const bgSidebar = isLight ? "bg-fill2" : "bg-[#1c1e21]"
	const bgMain = isLight ? "bg-elevation-level1" : "bg-[#131416]"
	const borderColor = isLight ? "border-soft" : "border-[#1c1e21]"
	const barColor = isLight ? "bg-fill4" : "bg-[#2f3237]"

	return (
		<div
			className={cn("h-[143px] w-full overflow-hidden rounded-2xl", bgOuter)}>
			<div className="relative h-full w-full">
				<div
					className="absolute left-[73px] top-0 flex w-[180px] flex-col"
					style={{
						transform: "skewX(-30deg) rotate(30deg) scaleY(0.87)",
						transformOrigin: "top left",
					}}>
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							className={cn(
								"flex h-[140px] overflow-hidden rounded-xl border shadow-md",
								borderColor,
								i > 0 ? "-mt-[134px]" : ""
							)}
							style={{ zIndex: 3 - i }}>
							{i === 0 ? (
								<>
									<div
										className={cn(
											"flex h-full w-[80px] flex-col gap-3 p-3",
											bgSidebar
										)}>
										<div className="flex gap-1">
											<div className="bg-primary size-1.5 rounded-full opacity-60" />
											<div className="bg-success size-1.5 rounded-full opacity-60" />
											<div className="bg-error size-1.5 rounded-full opacity-60" />
										</div>
										<div className="flex flex-col gap-1">
											<div className="flex items-center gap-1.5">
												<div className="bg-primary size-2.5 rounded-full" />
												<div className={cn("h-1 w-7 rounded-sm", barColor)} />
											</div>
											<div className="flex items-center gap-1.5">
												<div className="bg-primary size-2.5 rounded-full" />
												<div className={cn("h-1 w-12 rounded-sm", barColor)} />
											</div>
											<div className="flex items-center gap-1.5">
												<div className="bg-info size-2.5 rounded-full" />
												<div className={cn("h-1 w-12 rounded-sm", barColor)} />
											</div>
											<div className="flex items-center gap-1.5">
												<div className="bg-warning size-2.5 rounded-full" />
												<div className={cn("h-1 w-12 rounded-sm", barColor)} />
											</div>
											<div className="flex items-center gap-1.5">
												<div className="bg-error size-2.5 rounded-full" />
												<div className={cn("h-1 w-12 rounded-sm", barColor)} />
											</div>
										</div>
									</div>
									<div className={cn("flex-1", bgMain)} />
								</>
							) : (
								<div className={cn("flex-1", bgMain)} />
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

function SystemPreviewCard() {
	return (
		<div className="relative h-[143px] w-full overflow-hidden rounded-2xl">
			<div className="absolute inset-0 w-1/2 overflow-hidden">
				<div className="h-full w-[200%]">
					<ThemePreviewCard variant="light" />
				</div>
			</div>
			<div className="absolute inset-0 left-1/2 w-1/2 overflow-hidden">
				<div className="-ml-[100%] h-full w-[200%]">
					<ThemePreviewCard variant="dark" />
				</div>
			</div>
		</div>
	)
}

const themes: { id: ThemeOption; label: string }[] = [
	{ id: "system", label: "System Default" },
	{ id: "light", label: "Light" },
	{ id: "dark", label: "Dark" },
]

export default function ThemeStep({ onNext, onSkip }: ThemeStepProps) {
	const [selectedTheme, setSelectedTheme] = useState<ThemeOption>("system")

	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4">
			<div className="flex w-full max-w-[480px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">Personalize your experience</h1>
						<p className="text-fg-secondary text-sm">
							Customize your experience with light, dark or system default mode.
						</p>
					</div>
				</div>

				<div className="flex gap-3">
					{themes.map((theme) => (
						<button
							key={theme.id}
							type="button"
							onClick={() => setSelectedTheme(theme.id)}
							className="flex flex-1 flex-col items-center gap-4">
							<div
								className={cn(
									"w-full rounded-2xl transition-shadow",
									selectedTheme === theme.id
										? "ring-primary ring-offset-bg ring-[3px] ring-offset-2"
										: ""
								)}>
								{theme.id === "system" ? (
									<SystemPreviewCard />
								) : (
									<ThemePreviewCard variant={theme.id} />
								)}
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

				<div className="flex gap-3">
					<Button
						variant="outline"
						color="neutral"
						className="flex-1"
						onClick={onSkip}>
						Skip
					</Button>
					<Button
						variant="strong"
						color="primary"
						className="flex-1"
						onClick={onNext}>
						Continue
					</Button>
				</div>
			</div>

			<div className="absolute bottom-10">
				<SupportFooter />
			</div>
		</div>
	)
}
