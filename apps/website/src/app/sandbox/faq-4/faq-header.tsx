import React from "react"
import { HelpCircle } from "lucide-react"
import type { FaqHeaderData } from "./types"

const DEFAULT_HEADER_DATA: FaqHeaderData = {
	eyebrow: "SUPPORT",
	heading: "Questions, Answered",
	description:
		"The practical details teams check before building production screens with ReUI blocks, from customizing primitives to ongoing updates.",
}

interface FaqHeaderProps {
	data?: Partial<FaqHeaderData>
}

export function FaqHeader({ data }: FaqHeaderProps) {
	const header = { ...DEFAULT_HEADER_DATA, ...data }

	return (
		<div className="flex flex-col items-center gap-4 text-center sm:gap-5">
			{/* Eyebrow with Help icon */}
			<div className="text-fg-secondary inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
				<HelpCircle className="size-3.5" />
				<span>{header.eyebrow}</span>
			</div>

			{/* Main Title strictly conforming to Rule 2 without redundant font size or weight classes */}
			<h2 className="heading-1 text-foreground max-w-2xl text-center">
				{header.heading}
			</h2>

			{/* Description */}
			<p className="text-fg-secondary max-w-xl text-center text-base leading-relaxed">
				{header.description}
			</p>
		</div>
	)
}
