"use client"

import React from "react"
import { ARTICLE_LEAD } from "./types"

interface BlogLeadProps {
	lead?: string
}

export function BlogLead({ lead = ARTICLE_LEAD }: BlogLeadProps) {
	return (
		<div className="border-border/50 border-b pb-8">
			<h3 className="heading-4 text-fg font-semibold">{lead}</h3>
		</div>
	)
}
