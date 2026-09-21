import React from "react"
import type { Metadata } from "next"
import { BlogHeader } from "./blog-header"
import { BlogGrid } from "./blog-grid"

export const metadata: Metadata = {
	title: "Blog 02 — Latest Articles Preview | Shadcn Space",
	description:
		"Stay updated with the latest news, insights and more from our design and engineering media center.",
}

export default function Blog02Page() {
	return (
		<div className="bg-bg text-fg min-h-screen">
			<main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-12">
				<div className="flex flex-col gap-10 md:gap-14">
					<BlogHeader />
					<BlogGrid />
				</div>
			</main>
		</div>
	)
}
