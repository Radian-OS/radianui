"use client"

import { ChevronsRight, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { BeamDashboard } from "./beam-dashboard"
import { BeamLogoStrip } from "./beam-logo-strip"

export function BeamHeaderSection() {
	return (
		<section
			id="beam-header-section"
			className="bg-bg relative w-full overflow-hidden px-4 pb-0 pt-12 sm:px-6 sm:pt-16 md:pt-20 lg:px-10 lg:pt-24">
			{/* Hero Content */}
			<div className="relative z-10 mx-auto max-w-3xl text-center">
				{/* Badge */}
				<div className="border-border bg-fill2 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
					<Zap className="text-primary size-3.5" />
					<span className="text-fg-secondary text-xs font-medium sm:text-sm">
						Empower Innovation!
					</span>
				</div>

				{/* Heading */}
				<h1 className="heading-1 text-fg mb-6">
					Shaping innovation one beam at a time
				</h1>

				{/* Subheading */}
				<p className="text-fg-secondary mx-auto mb-10 max-w-xl text-sm leading-relaxed sm:text-base md:mb-14">
					Lorem ipsum dolor sit{" "}
					<span className="text-fg font-semibold">amet consectetur</span> Lectus
					massa sodales at sit aliquet velit ipsum Elementum turpis enim
					consequat{" "}
					<span className="text-fg font-semibold">pharetra iaculis</span> enim
					odio id tellus.
				</p>
			</div>

			{/* Dashboard Preview with Glow & CTA */}
			<div className="relative z-10 mx-auto max-w-5xl">
				{/* Purple glow behind dashboard */}
				<div
					className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-[120px] sm:h-[500px] sm:w-[800px]"
					style={{
						background:
							"radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 70%)",
					}}
				/>

				{/* Logo Section */}
				<div className="mb-8 text-center md:mb-10">
					<p className="text-primary-text mb-6 text-xs font-medium uppercase tracking-widest sm:text-sm">
						Making the cloud effortless for 2,500+ companies
					</p>
					<BeamLogoStrip />
				</div>

				{/* Dashboard Container with floating CTA */}
				<div className="relative">
					{/* Floating Get Started Button */}
					<div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2">
						<Button
							color="primary"
							variant="strong"
							size="44"
							className="shadow-primary/30 rounded-full px-6 shadow-lg"
							asChild>
							<Link href="#" className="hover:underline">
								<ChevronsRight className="size-4" />
								<span>Get Started</span>
							</Link>
						</Button>
					</div>

					{/* Dashboard Card */}
					<div className="border-border/30 bg-bg overflow-hidden rounded-t-2xl border border-b-0 shadow-2xl sm:rounded-t-3xl">
						<BeamDashboard />
					</div>
				</div>
			</div>
		</section>
	)
}
