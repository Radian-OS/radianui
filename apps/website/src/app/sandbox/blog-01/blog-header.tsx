"use client"

import React from "react"
import { ARTICLE_SUBTITLE, ARTICLE_TITLE } from "./types"

interface BlogHeaderProps {
	title?: string
	subtitle?: string
}

export function BlogHeader({
	title = ARTICLE_TITLE,
	subtitle = ARTICLE_SUBTITLE,
}: BlogHeaderProps) {
	return (
		<header className="flex flex-col gap-2.5">
			<h1 className="heading-1 text-fg">{title}</h1>
			<p className="text-fg-secondary max-w-2xl text-sm leading-relaxed sm:text-base">
				{subtitle}
			</p>
		</header>
	)
}
