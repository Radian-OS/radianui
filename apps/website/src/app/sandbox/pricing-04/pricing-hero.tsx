"use client"

import React from "react"
import { AudioLines } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"

export function PricingHero() {
	return (
		<div className="relative mx-auto flex w-full max-w-5xl flex-col items-center pt-8 pb-4 text-center sm:pt-12">
			{/* Left Decorative Schematic Wire (Desktop) */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute top-10 left-0 hidden w-64 lg:block">
				<div className="relative h-20 w-full">
					{/* Horizontal wire */}
					<div className="bg-border/80 absolute top-4 left-0 h-px w-44" />

					{/* Audio icon pill node */}
					<div className="bg-bg border-border/80 text-fg-secondary absolute top-0.5 left-24 flex size-7 items-center justify-center rounded-lg border shadow-xs">
						<AudioLines className="size-3.5" />
					</div>

					{/* Rounded corner turning downwards */}
					<div className="border-border/80 absolute top-4 left-44 h-12 w-6 rounded-tr-2xl border-t border-r" />

					{/* Blue accent indicator tick */}
					<div className="bg-info absolute top-16 left-[199px] h-4 w-0.5 rounded-full" />
				</div>
			</div>

			{/* Right Decorative Schematic Wire (Desktop) */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute top-16 right-0 hidden w-64 lg:block">
				<div className="relative h-20 w-full">
					{/* Horizontal wire */}
					<div className="bg-border/80 absolute top-6 right-0 h-px w-44" />

					{/* Pill node with 'A' */}
					<div className="bg-bg border-border/80 text-fg-secondary absolute top-2.5 right-36 flex size-7 items-center justify-center rounded-lg border text-xs font-semibold shadow-xs">
						A
					</div>

					{/* Curve towards edge */}
					<div className="border-border/80 absolute top-6 right-20 h-8 w-6 rounded-tl-xl border-t border-l" />
				</div>
			</div>

			{/* Center Annual Discount Badge */}
			<div className="mb-4 flex items-center justify-center">
				<Badge variant="outline" color="neutral" className="gap-2 px-3 py-1">
					<span className="text-fg-secondary text-xs font-medium tracking-wide uppercase">
						Annual Discount
					</span>
					<Badge variant="soft" color="success" size="sm">
						%40
					</Badge>
				</Badge>
			</div>

			{/* Main Title - strictly following Rule 2 */}
			<h1 className="heading-1 text-fg max-w-3xl text-center font-serif">
				Choose Pricing Plan
			</h1>

			{/* Subtitle */}
			<p className="text-fg-secondary mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed sm:text-base">
				Choose the perfect plan for your voice creation needs — from getting
				started to scaling your production.
			</p>
		</div>
	)
}
