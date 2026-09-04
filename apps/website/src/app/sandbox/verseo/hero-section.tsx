"use client"

import React, { useState } from "react"
import {
	AudioWaveform,
	Bot,
	FileEdit,
	Layers,
	PenTool,
	Sparkles,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/styles/default/ui/button"

interface PromptChip {
	id: string
	label: string
	icon: React.ComponentType<{ className?: string }>
}

const promptChips: PromptChip[] = [
	{ id: "writer", label: "AI Writer", icon: PenTool },
	{ id: "voice", label: "Brand Voice", icon: Layers },
	{ id: "rewrite", label: "Rewrite", icon: FileEdit },
	{ id: "summarize", label: "Summarize", icon: Bot },
]

export function VerseoHeroSection() {
	const [activeChip, setActiveChip] = useState("writer")
	const [promptInput, setPromptInput] = useState("")

	return (
		<section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
			{/* Subtle perspective grid lines background */}
			<div
				className="pointer-events-none absolute inset-0 -z-10 opacity-30"
				style={{
					backgroundImage: `
						linear-gradient(to right, var(--color-border) 1px, transparent 1px),
						linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
					`,
					backgroundSize: "64px 64px",
				}}
			/>

			{/* Soft sky-blue ambient atmospheric glow at top and bottom */}
			<div className="bg-primary/10 pointer-events-none absolute left-1/2 top-10 -z-10 h-[450px] w-full max-w-4xl -translate-x-1/2 rounded-full blur-3xl" />
			<div className="from-primary/15 via-primary/5 pointer-events-none absolute bottom-0 left-0 -z-10 h-64 w-full bg-gradient-to-t to-transparent" />

			<div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
				{/* Top Tag Pill */}
				<div className="border-border/70 bg-background/80 text-fg-secondary shadow-xs mb-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm">
					<span>[</span>
					<span className="text-foreground">AI writing tool</span>
					<span>]</span>
				</div>

				{/* Rule 13: heading-1 with leading-[1.1] */}
				<h1 className="heading-1 text-foreground max-w-4xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl sm:leading-[1.1] md:text-6xl md:leading-[1.1] lg:text-7xl lg:leading-[1.1]">
					Write better content.
					<br />
					Faster. With AI
				</h1>

				{/* Hero Subtitle */}
				<p className="text-fg-secondary mt-6 max-w-2xl text-center text-sm leading-relaxed sm:text-base md:text-lg">
					Verseo helps teams, founders, and marketers generate high-quality
					content in seconds — without overthinking every word
				</p>

				{/* Dual CTA Buttons (Rule 15: explicit color prop) */}
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<Button
						variant="strong"
						color="primary"
						size="40"
						className="rounded-xl px-6 text-sm font-semibold shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]">
						<span>Get Started</span>
					</Button>
					<Button
						variant="outline"
						color="neutral"
						size="40"
						className="bg-background hover:bg-fill2 rounded-xl px-6 text-sm font-semibold">
						<span>Try Demo</span>
					</Button>
				</div>

				{/* Floating Interactive Prompt Card & Browser Mockup Preview */}
				<div className="relative mt-12 w-full max-w-4xl md:mt-16">
					{/* Floating Prompt Input Widget */}
					<div className="border-border/80 bg-background/95 relative z-20 mx-auto -mb-8 w-full max-w-xl rounded-2xl border p-3.5 shadow-2xl backdrop-blur-xl transition-all sm:p-4">
						<div className="border-border/40 flex items-center gap-2 border-b pb-3">
							<Sparkles className="text-primary size-4 shrink-0 animate-pulse" />
							<input
								type="text"
								value={promptInput}
								onChange={(e) => setPromptInput(e.target.value)}
								placeholder="What do you want to write today?"
								className="text-foreground placeholder-fg-tertiary w-full bg-transparent text-xs focus:outline-none sm:text-sm"
							/>
						</div>

						<div className="flex flex-wrap items-center justify-between gap-2 pt-3">
							{/* Action Chips (Rule 18: map) */}
							<div className="flex flex-wrap items-center gap-1.5">
								{promptChips.map((chip) => {
									const Icon = chip.icon
									const isActive = activeChip === chip.id
									return (
										<button
											key={chip.id}
											type="button"
											onClick={() => setActiveChip(chip.id)}
											className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
												isActive
													? "border-primary/30 bg-primary/10 text-primary shadow-xs border"
													: "border-border/50 bg-fill1 text-fg-secondary hover:bg-fill2 hover:text-foreground border"
											}`}>
											<Icon className="size-3" />
											<span>{chip.label}</span>
										</button>
									)
								})}
							</div>

							{/* Audio Waveform Action Icon */}
							<div className="bg-foreground text-background shadow-xs flex size-7 items-center justify-center rounded-lg">
								<AudioWaveform className="size-3.5" />
							</div>
						</div>
					</div>

					{/* High-Fidelity Browser Window Mockup (Rule 17: direct public image asset) */}
					<div className="border-border/80 bg-background/80 overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-sm sm:p-3">
						<div className="border-border/60 bg-fill1/30 relative aspect-[2151/720] w-full overflow-hidden rounded-xl border">
							<Image
								src="https://framerusercontent.com/images/yj2cqScVkBBWEyJJVdm9obYl4OU.png"
								alt="Verseo AI content generation dashboard preview"
								fill
								sizes="(min-width: 1280px) 1024px, 100vw"
								className="object-cover object-top"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
