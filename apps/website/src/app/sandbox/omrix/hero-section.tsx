"use client"

import React from "react"
import { CheckCircle2, Clock, CreditCard, Layers } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { OmrixDashboardMockup } from "./dashboard-mockup"

interface TrustBadgeItem {
	label: string
	icon: React.ComponentType<{ className?: string }>
}

const trustBadges: TrustBadgeItem[] = [
	{ label: "No credit card required", icon: CreditCard },
	{ label: "Setup in 5 minutes", icon: Clock },
	{ label: "Cancel anytime", icon: CheckCircle2 },
]

export function OmrixHeroSection() {
	return (
		<section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-20">
			{/* Subtle Background Grid Pattern */}
			<div className="border-border/30 pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />

			{/* Ambient Glowing Orbs on Left and Right (matching reference) */}
			<div className="bg-purple/15 pointer-events-none absolute -left-48 top-1/3 -z-10 h-[500px] w-[500px] rounded-full blur-[120px]" />
			<div className="bg-amber/15 pointer-events-none absolute -right-48 top-1/3 -z-10 h-[500px] w-[500px] rounded-full blur-[120px]" />

			<div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
				{/* Beta Announcement Pill Badge */}
				<div className="border-border/80 bg-background/90 shadow-xs hover:border-border mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-sm transition-all">
					<Layers className="text-fg-secondary size-3.5" />
					<span className="text-foreground text-[11px] font-semibold uppercase tracking-wider sm:text-xs">
						Now in Public Beta — Join 10,000+ Teams
					</span>
				</div>

				{/* Main Hero Headline (Rule 13: heading-1) */}
				<h1 className="heading-1 text-foreground max-w-4xl text-center text-4xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.12] md:text-6xl md:leading-[1.1] lg:text-7xl lg:leading-[1.08]">
					Build Smarter Workflows.
					<br />
					Ship Faster. Scale Further.
				</h1>

				{/* Subtitle Description */}
				<p className="text-fg-secondary mt-6 max-w-2xl text-center text-base leading-relaxed sm:text-lg">
					Omrix connects your tools, automates your processes, and gives your
					team the clarity to focus on work that actually moves the needle.
				</p>

				{/* Primary & Secondary Call to Action Buttons */}
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
					<Button
						variant="strong"
						color="primary"
						size="44"
						className="shadow-primary/25 rounded-xl px-7 text-sm font-semibold shadow-lg transition-all hover:scale-105 active:scale-95">
						<span>Start Free Trial</span>
					</Button>

					<Button
						variant="strong"
						color="neutral"
						size="44"
						className="shadow-xs rounded-xl px-7 text-sm font-semibold transition-all hover:scale-105 active:scale-95">
						<span>Book a Demo</span>
					</Button>
				</div>

				{/* Trust Line Items */}
				<div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:gap-8">
					{trustBadges.map((item) => {
						const Icon = item.icon
						return (
							<div
								key={item.label}
								className="text-fg-secondary flex items-center gap-2 font-medium">
								<Icon className="text-fg-tertiary size-4" />
								<span>{item.label}</span>
							</div>
						)
					})}
				</div>

				{/* Dashboard Preview Mockup Card */}
				<div className="sm:mt-18 mt-14 w-full md:mt-20">
					<OmrixDashboardMockup />
				</div>
			</div>
		</section>
	)
}
