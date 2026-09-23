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
		<footer className="mt-12 flex flex-col gap-6 border-t border-white/10 py-10 sm:flex-row sm:items-center sm:justify-between">
			{/* Left: Copyright */}
			<p className="font-mono text-xs text-neutral-400">
				&copy; 2026 Williams Samuel
			</p>

			{/* Right: Links & Scroll to top */}
			<div className="flex items-center gap-6">
				<a
					href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					className="font-mono text-xs text-neutral-400 transition-colors hover:text-white">
					github
				</a>
				<a
					href="https://twitter.com"
					target="_blank"
					rel="noopener noreferrer"
					className="font-mono text-xs text-neutral-400 transition-colors hover:text-white">
					twitter
				</a>
				<Button
					color="neutral"
					variant="ghost"
					size="28"
					onClick={scrollToTop}
					className="h-auto p-0 font-mono text-xs text-neutral-400 transition-colors hover:bg-transparent hover:text-white">
					scroll to top &uArr;
				</Button>
			</div>
		</footer>
	)
}
