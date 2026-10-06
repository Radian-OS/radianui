"use client"

import React from "react"
import { Card } from "@/styles/default/ui/card"

export function BlogFeaturedImage() {
	return (
		<Card className="border-border/60 bg-elevation-level1 relative min-h-[340px] w-full overflow-hidden rounded-2xl border p-0 shadow-2xl sm:min-h-[420px] sm:rounded-3xl">
			{/* Abstract 3D Fluid Wave Ribbon Background */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				{/* Elevation base */}
				<div className="bg-elevation-level1 absolute inset-0" />

				{/* Luminous violet flow */}
				<div className="from-primary/50 via-info/30 absolute -top-1/4 -right-1/4 size-[600px] rounded-full bg-gradient-to-br to-transparent blur-[80px]" />

				{/* Electric blue wave curve */}
				<div className="from-info/50 via-primary/30 absolute top-1/3 -right-10 size-[500px] rounded-full bg-gradient-to-tr to-transparent opacity-80 blur-[70px]" />

				{/* Soft ambient ripple */}
				<div className="bg-primary/20 absolute top-10 right-1/4 size-[400px] rounded-full blur-[100px]" />

				{/* Center luminous depth */}
				<div className="bg-primary/25 absolute bottom-10 left-1/4 size-[350px] rounded-full blur-[90px]" />

				{/* Wave mesh overlay styling */}
				<div
					className="absolute inset-0 opacity-40 mix-blend-overlay"
					style={{
						backgroundImage:
							"radial-gradient(ellipse at 75% 35%, color-mix(in srgb, var(--color-primary) 40%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 65% 75%, color-mix(in srgb, var(--color-info) 35%, transparent) 0%, transparent 50%)",
					}}
				/>

				{/* Subtle perimeter border gradient vignette */}
				<div className="from-elevation-level1/60 to-elevation-level1/20 absolute inset-0 bg-gradient-to-t via-transparent" />
			</div>
		</Card>
	)
}
