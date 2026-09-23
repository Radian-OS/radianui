"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import type { CTAData } from "./types"

const DEFAULT_CTA_DATA: CTAData = {
	badge: "Get Started",
	heading: "Ready to unlock the full potential of your data",
	description:
		"With deep industry expertise and a commitment to accuracy, we deliver reliable analytics that give businesses complete clarity.",
	buttonText: "Start now",
	buttonHref: "#start",
}

interface CtaContentProps {
	data?: Partial<CTAData>
}

export function CtaContent({ data }: CtaContentProps) {
	const cta = { ...DEFAULT_CTA_DATA, ...data }

	return (
		<div className="flex flex-col items-start justify-center">
			{/* Top badge */}
			<Badge
				variant="outline"
				color="neutral"
				size="24"
				className="border-border/80 bg-fill2 text-fg-secondary mb-4 gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
				<Sparkles className="text-info size-3" />
				{cta.badge}
			</Badge>

			{/* Main Heading */}
			<h2 className="heading-2 text-fg mb-4">{cta.heading}</h2>

			{/* Subtitle / Description */}
			<p className="text-fg-secondary mb-8 max-w-lg text-sm leading-relaxed sm:text-base">
				{cta.description}
			</p>

			{/* Primary Action Button without underline */}
			<Button
				variant="strong"
				color="neutral"
				size="44"
				asChild
				className="rounded-full px-6 font-semibold shadow-md transition-transform active:scale-95">
				<Link href={cta.buttonHref}>
					<span>{cta.buttonText}</span>
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	)
}
