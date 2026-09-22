import React from "react"
import Image from "next/image"
import { BRAND_LOGOS } from "./types"

export function HeroLogos() {
	return (
		<div className="text-fg-secondary flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-2">
			{BRAND_LOGOS.map((logo) => (
				<div
					key={logo.name}
					className="hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors">
					<Image
						src={`https://www.google.com/s2/favicons?sz=32&domain=${logo.domain}`}
						alt={logo.name}
						width={18}
						height={18}
						className="size-4.5 rounded-xs"
						unoptimized
					/>
					<span>{logo.name}</span>
				</div>
			))}
		</div>
	)
}
