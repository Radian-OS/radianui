"use client"

import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import { Card } from "@/styles/default/ui/card"

interface BlogHeroProps {
	tag?: string
	badge?: string
	title?: string
}

export function BlogHero({
	tag = "Blog",
	badge = "Product Update",
	title = "What's New in Cadence 3.2",
}: BlogHeroProps) {
	return (
		<Card className="border-border/60 bg-elevation-level1 relative min-h-[360px] w-full overflow-hidden rounded-2xl border p-0 shadow-2xl sm:min-h-[420px] sm:rounded-3xl">
			{/* Abstract 3D Fluid Ribbon & Wave Background */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				{/* Elevation base */}
				<div className="bg-elevation-level1 absolute inset-0" />

				{/* Luminous violet glow */}
				<div className="from-primary/50 via-info/30 absolute -top-1/4 -right-1/4 size-[600px] rounded-full bg-gradient-to-br to-transparent blur-[80px]" />

				{/* Electric blue wave crest */}
				<div className="from-info/50 via-primary/30 absolute top-1/3 -right-10 size-[500px] rounded-full bg-gradient-to-tr to-transparent opacity-80 blur-[70px]" />

				{/* Soft ambient center ripple */}
				<div className="bg-primary/20 absolute top-10 right-1/4 size-[400px] rounded-full blur-[100px]" />

				{/* Wave mesh overlay styling */}
				<div
					className="absolute inset-0 opacity-40 mix-blend-overlay"
					style={{
						backgroundImage:
							"radial-gradient(ellipse at 80% 30%, color-mix(in srgb, var(--color-primary) 40%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, color-mix(in srgb, var(--color-info) 35%, transparent) 0%, transparent 50%)",
					}}
				/>

				{/* Dark bottom vignette for perfect text contrast */}
				<div className="from-elevation-level1/90 via-elevation-level1/40 absolute inset-0 bg-gradient-to-t to-transparent" />
			</div>

			{/* Hero Text Content */}
			<div className="relative z-10 flex flex-col items-start justify-end gap-3.5 p-6 sm:p-10 lg:p-12">
				<span className="text-xs font-semibold tracking-wider text-white/70 uppercase">
					{tag}
				</span>

				<Badge
					variant="soft"
					color="neutral"
					size="24"
					className="border border-white/15 bg-white/10 text-white backdrop-blur-md">
					{badge}
				</Badge>

				<h1 className="heading-1 max-w-2xl text-white">{title}</h1>
			</div>
		</Card>
	)
}
