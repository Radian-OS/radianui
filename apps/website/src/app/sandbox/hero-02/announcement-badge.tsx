"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface AnnouncementBadgeProps {
	text?: string
	href?: string
}

export function AnnouncementBadge({
	text = "Announcing API 1.0",
	href = "#api-announcement",
}: AnnouncementBadgeProps) {
	return (
		<Link
			href={href}
			className="group border-border bg-bg text-fg hover:bg-fill2 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium shadow-2xs transition-colors">
			<span className="size-1.5 rounded-full bg-emerald-500" />
			<span>{text}</span>
			<ArrowRight className="text-fg-secondary size-3.5 transition-transform group-hover:translate-x-0.5" />
		</Link>
	)
}
