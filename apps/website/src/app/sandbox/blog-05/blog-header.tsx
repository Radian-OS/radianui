import React from "react"

export function BlogHeader() {
	return (
		<div className="space-y-3">
			<span className="text-fg-secondary text-sm font-medium tracking-wide">
				Blog
			</span>
			<h1 className="heading-1 text-fg">News, Insights, Field Notes</h1>
			<p className="text-fg-secondary max-w-2xl text-base sm:text-lg">
				Product updates, engineering write-ups, and design notes from the
				Cadence team.
			</p>
		</div>
	)
}
