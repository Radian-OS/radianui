"use client"

import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import { ARTICLE_TOPICS } from "./types"

export function BlogTopics() {
	return (
		<div className="border-border/50 flex flex-wrap items-center gap-3 border-b pb-8">
			<span className="text-fg-tertiary text-[11px] font-semibold tracking-wider uppercase">
				Topics
			</span>
			<div className="flex flex-wrap items-center gap-2">
				{ARTICLE_TOPICS.map((topic) => (
					<Badge
						key={topic}
						variant="outline"
						color="neutral"
						size="24"
						className="bg-elevation-level1/50 text-fg-secondary hover:text-fg text-xs font-medium transition-colors">
						{topic}
					</Badge>
				))}
			</div>
		</div>
	)
}
