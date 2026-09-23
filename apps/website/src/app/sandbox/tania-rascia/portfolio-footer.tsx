"use client"

import React from "react"
import Link from "next/link"
import { Coffee, Github, Mail, Rss, Twitter } from "lucide-react"

export function PortfolioFooter() {
	return (
		<footer className="border-border/60 text-fg-secondary mt-12 flex flex-col gap-6 border-t pt-8 pb-12 text-xs">
			{/* Horizontal Links */}
			<div className="flex flex-wrap items-center gap-5">
				<Link
					href="#"
					className="hover:text-foreground flex items-center gap-1.5 transition-colors">
					<Mail className="text-fg-tertiary size-3.5" />
					<span>Email signup</span>
				</Link>
				<Link
					href="#"
					className="hover:text-foreground flex items-center gap-1.5 transition-colors">
					<Rss className="text-fg-tertiary size-3.5" />
					<span>RSS feed</span>
				</Link>
				<Link
					href="#"
					className="hover:text-foreground flex items-center gap-1.5 transition-colors">
					<Twitter className="text-fg-tertiary size-3.5" />
					<span>Bluesky</span>
				</Link>
				<Link
					href="#"
					className="hover:text-foreground flex items-center gap-1.5 transition-colors">
					<Coffee className="text-fg-tertiary size-3.5" />
					<span>Buy me a coffee</span>
				</Link>
			</div>

			{/* Tech Stack Badges */}
			<div className="flex flex-wrap items-center gap-2.5">
				<div className="border-border/70 bg-elevation-level1/40 flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-semibold text-purple-400">
					<span className="size-2 rounded-full bg-purple-500" />
					<span>Gatsby</span>
				</div>
				<div className="border-border/70 bg-elevation-level1/40 text-foreground flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-semibold">
					<Github className="size-3.5" />
					<span>GitHub</span>
				</div>
				<div className="border-border/70 bg-elevation-level1/40 flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-semibold text-emerald-400">
					<span className="size-2 rounded-full bg-emerald-500" />
					<span>Netlify</span>
				</div>
			</div>

			{/* Made with love */}
			<p className="text-fg-tertiary text-[11px]">
				Made with ❤️ by Tania Rascia
			</p>
		</footer>
	)
}
