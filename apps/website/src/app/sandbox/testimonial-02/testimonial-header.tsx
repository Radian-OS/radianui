"use client"

import React from "react"
import { Badge } from "@/styles/default/ui/badge"

interface TestimonialHeaderProps {
	badgeText?: string
	title?: string
}

export function TestimonialHeader({
	badgeText = "Testimonials",
	title = "Success Stories",
}: TestimonialHeaderProps) {
	return (
		<div className="flex flex-col items-start gap-3">
			<Badge
				variant="strong"
				color="neutral"
				size="24"
				className="rounded-full px-3 font-medium">
				{badgeText}
			</Badge>
			<h2 className="heading-2 text-fg">{title}</h2>
		</div>
	)
}
