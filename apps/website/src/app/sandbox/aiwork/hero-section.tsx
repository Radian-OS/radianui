"use client"

import React from "react"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { AiworkDashboardMockup } from "./dashboard-mockup"

export function AiworkHeroSection() {
	return (
		<section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16">
			{/* Ambient blue top glow */}
			<div className="bg-primary/10 pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-full max-w-5xl -translate-x-1/2 rounded-full blur-3xl" />

			<div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
				{/* Trustpilot Review Pill Badge */}
				<div className="border-border/80 bg-fill2/70 shadow-xs mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-sm">
					<div className="flex size-4 items-center justify-center rounded-sm bg-[#00b67a] text-white">
						<Star className="size-2.5 fill-white text-white" />
					</div>
					<span className="text-foreground text-xs font-medium">
						4.8 (2500+) Reviews on
					</span>
					<span className="text-fg-tertiary">|</span>
					<span className="text-foreground flex items-center gap-1 text-xs font-bold">
						<Star className="size-3 fill-[#00b67a] text-[#00b67a]" />
						<span>trustpilot</span>
					</span>
				</div>

				{/* Main Hero Heading (Rule 13: heading-1) */}
				<h1 className="heading-1 text-foreground max-w-4xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl sm:leading-[1.1] md:text-6xl md:leading-[1.1] lg:text-7xl lg:leading-[1.1]">
					AI agents for less
					<br />
					manual work
				</h1>

				{/* Subtitle Description */}
				<p className="text-fg-secondary mt-6 max-w-2xl text-center text-sm leading-relaxed sm:text-base md:text-lg">
					Automate dispatching, booking, driver communication, and paperwork all
					from a single AI-powered dashboard built for modern trucking
					operations.
				</p>

				{/* Primary CTA Button (Rule 15: color="primary") */}
				<div className="mt-8 flex items-center justify-center">
					<Button
						variant="strong"
						color="primary"
						size="40"
						className="shadow-primary/30 gap-2 rounded-full px-6 text-sm font-semibold shadow-xl transition-all hover:scale-105 active:scale-95">
						<span>Get Early Access</span>
						<ArrowRight className="size-4" />
					</Button>
				</div>

				{/* High Fidelity Dashboard Preview Mockup */}
				<div className="mt-14 w-full md:mt-20">
					<AiworkDashboardMockup />
				</div>
			</div>
		</section>
	)
}
