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
		<Card className="border-border/60 relative min-h-[360px] w-full overflow-hidden rounded-2xl border bg-black p-0 shadow-2xl sm:min-h-[420px] sm:rounded-3xl">
			{/* Abstract 3D Fluid Ribbon & Wave Background */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				{/* Deep navy base */}
				<div className="absolute inset-0 bg-[#070b19]" />

				{/* Luminous violet glow */}
				<div className="absolute -top-1/4 -right-1/4 size-[600px] rounded-full bg-gradient-to-br from-indigo-600/60 via-purple-700/40 to-transparent blur-[80px]" />

				{/* Electric blue wave crest */}
				<div className="absolute top-1/3 -right-10 size-[500px] rounded-full bg-gradient-to-tr from-blue-600/50 via-cyan-500/30 to-transparent opacity-80 blur-[70px]" />

				{/* Soft ambient center ripple */}
				<div className="absolute top-10 right-1/4 size-[400px] rounded-full bg-purple-500/20 blur-[100px]" />

				{/* Wave mesh overlay styling */}
				<div
					className="absolute inset-0 opacity-40 mix-blend-overlay"
					style={{
						backgroundImage:
							"radial-gradient(ellipse at 80% 30%, rgba(120, 119, 198, 0.45) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.35) 0%, transparent 50%)",
					}}
				/>

				{/* Dark bottom vignette for perfect text contrast */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
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
