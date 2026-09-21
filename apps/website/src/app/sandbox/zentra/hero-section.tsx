import React from "react"
import { Badge } from "@/styles/default/ui/badge"

export function HeroSection() {
	return (
		<section className="flex flex-col items-center justify-center pt-12 pb-8 text-center sm:pt-16 sm:pb-12">
			{/* Centered Blog Pill Badge */}
			<div className="mb-6 flex justify-center">
				<Badge
					variant="outline"
					color="neutral"
					className="border-border bg-fill1-alpha text-fg-secondary rounded-full px-3.5 py-1 text-xs font-medium">
					Blog
				</Badge>
			</div>

			{/* Main Title with strict typography utility rule */}
			<h1 className="heading-1 text-fg max-w-4xl text-center">
				Insights and trends shaping the future of finance
			</h1>

			{/* Subtitle */}
			<p className="text-fg-secondary mt-6 max-w-2xl text-center text-base leading-relaxed sm:text-lg">
				Stay informed with the most recent updates on Slash and the dynamic
				world of business finance, where trends and insights are constantly
				evolving.
			</p>
		</section>
	)
}
