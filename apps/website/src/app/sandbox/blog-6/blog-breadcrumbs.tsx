"use client"

import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BlogBreadcrumbsProps {
	rootLabel?: string
	currentLabel?: string
	rootHref?: string
}

export function BlogBreadcrumbs({
	rootLabel = "Blog",
	currentLabel = "Product Update",
	rootHref = "#",
}: BlogBreadcrumbsProps) {
	return (
		<nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
			<Link
				href={rootHref}
				className="text-fg-secondary hover:text-fg font-medium transition-colors">
				{rootLabel}
			</Link>
			<ChevronRight className="text-fg-tertiary size-3" />
			<span className="text-fg font-semibold">{currentLabel}</span>
		</nav>
	)
}
