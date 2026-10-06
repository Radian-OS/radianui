"use client"

import React from "react"

export function LoginOrbitalBackground() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			{/* Top-Right Dashed Circular Arcs */}
			<div className="border-border/60 absolute -top-32 -right-32 size-[480px] rounded-full border border-dashed sm:size-[600px]" />
			<div className="border-border/40 absolute -top-16 -right-16 size-[360px] rounded-full border sm:size-[450px]" />

			{/* Bottom-Left Dashed Circular Arcs */}
			<div className="border-border/60 absolute -bottom-36 -left-36 size-[460px] rounded-full border border-dashed sm:size-[560px]" />
			<div className="border-border/40 absolute -bottom-20 -left-20 size-[340px] rounded-full border sm:size-[420px]" />

			{/* Subtle ambient lighting */}
			<div className="bg-primary/5 absolute top-1/4 left-1/2 size-[600px] -translate-x-1/2 rounded-full blur-[120px]" />
		</div>
	)
}
