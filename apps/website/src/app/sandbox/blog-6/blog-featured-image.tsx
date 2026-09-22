"use client"

import React from "react"
import { Card } from "@/styles/default/ui/card"

export function BlogFeaturedImage() {
	return (
		<Card className="border-border/60 relative min-h-[340px] w-full overflow-hidden rounded-2xl border bg-black p-0 shadow-2xl sm:min-h-[420px] sm:rounded-3xl">
			{/* Abstract 3D Fluid Wave Ribbon Background */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				{/* Deep navy base */}
				<div className="absolute inset-0 bg-[#070b19]" />

				{/* Luminous violet flow */}
				<div className="absolute -top-1/4 -right-1/4 size-[600px] rounded-full bg-gradient-to-br from-indigo-600/60 via-purple-700/40 to-transparent blur-[80px]" />

				{/* Electric blue wave curve */}
				<div className="absolute top-1/3 -right-10 size-[500px] rounded-full bg-gradient-to-tr from-blue-600/50 via-cyan-500/30 to-transparent opacity-80 blur-[70px]" />

				{/* Soft ambient ripple */}
				<div className="absolute top-10 right-1/4 size-[400px] rounded-full bg-purple-500/20 blur-[100px]" />

				{/* Center luminous depth */}
				<div className="absolute bottom-10 left-1/4 size-[350px] rounded-full bg-blue-700/25 blur-[90px]" />

				{/* Wave mesh overlay styling */}
				<div
					className="absolute inset-0 opacity-40 mix-blend-overlay"
					style={{
						backgroundImage:
							"radial-gradient(ellipse at 75% 35%, rgba(120, 119, 198, 0.45) 0%, transparent 60%), radial-gradient(ellipse at 65% 75%, rgba(59, 130, 246, 0.35) 0%, transparent 50%)",
					}}
				/>

				{/* Subtle perimeter border gradient vignette */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
			</div>
		</Card>
	)
}
