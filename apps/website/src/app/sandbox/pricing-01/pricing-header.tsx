"use client"

import React from "react"
import { Badge } from "@/styles/default/ui/badge"

interface PricingHeaderProps {
	badge?: string
	title?: string
	description?: string
}

export function PricingHeader({
	badge = "Pricing plan",
	title = "Affordable pricing",
	description = "A glimpse into our creativity—exploring innovative designs, successful collaborations, and transformative digital experiences.",
}: PricingHeaderProps) {
	return (
		<div className="flex flex-col items-center gap-4 text-center">
			<Badge>{badge}</Badge>

			<h2 className="heading-2 max-w-2xl text-center">{title}</h2>

			<p className="text-fg-secondary max-w-2xl text-center text-base leading-relaxed sm:text-lg">
				{description}
			</p>
		</div>
	)
}
