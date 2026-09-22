import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function HeroHeader() {
	return (
		<div className="flex flex-col items-start gap-4">
			<Link
				href="https://reui.io"
				target="_blank"
				rel="noopener noreferrer"
				className="border-border bg-card/80 text-fg-secondary hover:text-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium shadow-xs transition-colors">
				<span className="size-2 animate-pulse rounded-full bg-emerald-500" />
				<span>Browse ReUI Blocks</span>
				<ArrowUpRight className="text-fg-secondary size-3.5" />
			</Link>

			<h1 className="heading-1 text-foreground max-w-3xl">
				The complete shadcn registry for building modern{" "}
				<span className="inline-block rounded-md bg-amber-400 px-2 py-0.5 font-bold text-neutral-950">
					Next.js apps
				</span>{" "}
				with AI agents
			</h1>

			<p className="text-fg-secondary max-w-xl text-base sm:text-lg">
				Build faster with production-ready blocks, MCP support, and a curated
				shadcn registry.
			</p>
		</div>
	)
}
