import React from "react"
import type { CTA07Data } from "./types"

const DEFAULT_HEADER_DATA: Pick<CTA07Data, "heading" | "description"> = {
	heading: "Ready to simplify your workflow?",
	description:
		"Bring everything together in one place and get more done with less effort.",
}

interface CtaHeaderProps {
	heading?: string
	description?: string
}

export function CtaHeader({
	heading = DEFAULT_HEADER_DATA.heading,
	description = DEFAULT_HEADER_DATA.description,
}: CtaHeaderProps) {
	return (
		<div className="flex flex-col items-center gap-4 text-center sm:gap-5">
			{/* Main Title strictly adhering to Rule 2 (no redundant size/weight classes) */}
			<h2 className="heading-1 text-foreground max-w-3xl text-center">
				{heading}
			</h2>

			{/* Subtitle */}
			<p className="text-fg-secondary max-w-xl text-center text-base">
				{description}
			</p>
		</div>
	)
}
