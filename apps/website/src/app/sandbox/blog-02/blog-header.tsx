import React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"

export function BlogHeader() {
	return (
		<div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
			<div className="flex max-w-2xl flex-col gap-4">
				{/* Eyebrow: [06] Media center */}
				<div className="flex items-center gap-2 text-sm font-medium">
					<span className="text-fg font-mono">[06]</span>
					<span className="text-fg-secondary">Media center</span>
				</div>

				{/* Heading 2 with strict typography utility rule */}
				<h2 className="heading-2 text-fg">
					Stay updated with the latest news, insights and more
				</h2>
			</div>

			{/* View All action button with explicit color prop */}
			<div className="shrink-0">
				<Button
					variant="outline"
					color="neutral"
					asChild
					className="group h-auto gap-2 px-5 py-2.5 shadow-xs">
					<Link href="/sandbox/blog-02#all">
						<span>View All</span>
						<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</Button>
			</div>
		</div>
	)
}
