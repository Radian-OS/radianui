"use client"

import React from "react"
import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

export function PortfolioFooter() {
	return (
		<footer className="border-border/60 text-fg-secondary mt-8 flex items-center justify-between border-t py-6 text-xs">
			<div className="flex flex-col gap-0.5">
				<span className="text-fg font-semibold">Kishor K. Khadka</span>
				<Link
					href="mailto:imkishor24@gmail.com"
					className="text-fg-secondary hover:text-fg transition-colors">
					imkishor24@gmail.com
				</Link>
			</div>

			<div className="flex items-center gap-3">
				<Link
					href="https://linkedin.com"
					target="_blank"
					rel="noreferrer"
					aria-label="LinkedIn"
					className="text-fg-secondary hover:text-fg transition-colors">
					<Linkedin className="size-4" />
				</Link>
				<Link
					href="https://instagram.com"
					target="_blank"
					rel="noreferrer"
					aria-label="Instagram"
					className="text-fg-secondary hover:text-fg transition-colors">
					<Instagram className="size-4" />
				</Link>
			</div>
		</footer>
	)
}
