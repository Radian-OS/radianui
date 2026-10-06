import React from "react"
import type { Metadata } from "next"
import { BlogHeader } from "./blog-header"
import { BlogGrid } from "./blog-grid"

export const metadata: Metadata = {
	title: "News, Insights, Field Notes — Cadence Blog",
	description:
		"Product updates, engineering write-ups, and design notes from the Cadence team.",
}

export default function Blog1Page() {
	return (
		<div className="bg-bg text-fg min-h-screen">
			<main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
				<div className="space-y-10 sm:space-y-12">
					<BlogHeader />
					<BlogGrid />
				</div>
			</main>
		</div>
	)
}
