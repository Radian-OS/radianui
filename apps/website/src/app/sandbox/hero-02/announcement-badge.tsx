"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge, BadgeDot } from "@/styles/default/ui/badge"
import { cn } from "@/lib/utils"

interface AnnouncementBadgeProps {
	text?: string
	href?: string
	className?: string
}

export function AnnouncementBadge({
	text = "Announcing API 1.0",
	href = "#api-announcement",
	className,
}: AnnouncementBadgeProps) {
	const content = (
		<>
			<BadgeDot className="bg-success" />
			<span>{text}</span>
			<ArrowRight className="text-fg-secondary size-3.5 transition-transform group-hover:translate-x-0.5" />
		</>
	)

	if (href) {
		return (
			<Badge
				asChild
				variant="outline"
				color="neutral"
				className={cn("group gap-2 rounded-full px-3", className)}>
				<Link href={href}>{content}</Link>
			</Badge>
		)
	}

	return (
		<Badge
			variant="outline"
			color="neutral"
			className={cn("gap-2 rounded-full px-3", className)}>
			{content}
		</Badge>
	)
}
