"use client"

import React from "react"
import Image from "next/image"

const TECH_STACK = [
	{ name: "Sanity", domain: "sanity.io", url: "https://sanity.io" },
	{ name: "Next.js", domain: "nextjs.org", url: "https://nextjs.org" },
	{ name: "Vercel", domain: "vercel.com", url: "https://vercel.com" },
]

export function PortfolioFooter() {
	return (
		<footer className="border-border mt-12 flex flex-col gap-6 border-t py-8 sm:flex-row sm:items-center sm:justify-between">
			{/* Built with badges */}
			<div className="text-fg-secondary flex flex-wrap items-center gap-3 text-xs">
				<span className="font-mono">Built with:</span>
				<div className="flex items-center gap-2">
					{TECH_STACK.map((tech) => (
						<a
							key={tech.name}
							href={tech.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group border-border bg-fill1 hover:border-alpha hover:bg-fill2 hover:text-fg text-fg-secondary flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors">
							<Image
								src={`https://www.google.com/s2/favicons?sz=32&domain=${tech.domain}`}
								alt={`${tech.name} logo`}
								width={14}
								height={14}
								className="size-3.5 rounded-xs object-contain opacity-80 transition-opacity group-hover:opacity-100"
								unoptimized
							/>
							<span>{tech.name}</span>
						</a>
					))}
				</div>
			</div>

			{/* Copyright notice */}
			<p className="text-fg-tertiary font-mono text-xs">
				Copyright &copy; Victor Eke 2026 All rights Reserved
			</p>
		</footer>
	)
}
