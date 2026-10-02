"use client"

import React from "react"
import Image from "next/image"
import type { BrandLogo } from "./types"

const DEFAULT_LOGOS: BrandLogo[] = [
	{
		id: "1",
		name: "Brand 1",
		src: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-1.svg",
	},
	{
		id: "2",
		name: "Brand 2",
		src: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-2.svg",
	},
	{
		id: "3",
		name: "Brand 3",
		src: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-3.svg",
	},
	{
		id: "4",
		name: "Brand 4",
		src: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-4.svg",
	},
	{
		id: "5",
		name: "Brand 5",
		src: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-5.svg",
	},
]

interface LogoStripProps {
	logos?: BrandLogo[]
}

export function LogoStrip({ logos = DEFAULT_LOGOS }: LogoStripProps) {
	return (
		<div className="border-border bg-bg w-full border-b">
			<div className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
				<div className="border-border divide-border grid grid-cols-2 divide-x divide-y border-x sm:grid-cols-3 sm:divide-y-0 md:grid-cols-5">
					{logos.map((logo) => (
						<div
							key={logo.id}
							className="flex h-20 items-center justify-center px-6 py-4 transition-opacity duration-200 hover:opacity-75">
							<Image
								src={logo.src}
								alt={logo.name}
								width={135}
								height={32}
								unoptimized
								className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
