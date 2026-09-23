"use client"

import React from "react"
import { Button } from "@/styles/default/ui/button"

export function WilliamsFooter() {
	const scrollToTop = () => {
		if (typeof window !== "undefined") {
			window.scrollTo({ top: 0, behavior: "smooth" })
		}
	}

	return (
		<footer className="border-border mt-12 flex flex-col gap-6 border-t py-10 sm:flex-row sm:items-center sm:justify-between">
			{/* Left: Copyright */}
			<p className="text-fg-secondary font-mono text-xs">
				&copy; 2026 Williams Samuel
			</p>

			{/* Right: Links & Scroll to top */}
			<div className="flex items-center gap-6">
				<a
					href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-fg-secondary hover:text-fg font-mono text-xs transition-colors">
					github
				</a>
				<a
					href="https://twitter.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-fg-secondary hover:text-fg font-mono text-xs transition-colors">
					twitter
				</a>
				<Button
					color="neutral"
					variant="ghost"
					size="28"
					onClick={scrollToTop}
					className="text-fg-secondary hover:text-fg h-auto p-0 font-mono text-xs transition-colors hover:bg-transparent">
					scroll to top &uArr;
				</Button>
			</div>
		</footer>
	)
}
