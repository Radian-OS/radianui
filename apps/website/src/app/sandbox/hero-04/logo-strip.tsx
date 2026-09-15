"use client"

import React from "react"
import Image from "next/image"

interface BrandLogo {
	id: string
	name: string
	lightSrc: string
	darkSrc: string
}

const brandLogos: BrandLogo[] = [
	{
		id: "synergy",
		name: "Synergy™",
		lightSrc: "https://alignui.com/images/blocks/hero-1-brand-1-400.svg",
		darkSrc: "https://alignui.com/images/blocks/hero-1-brand-1-400-dark.svg",
	},
	{
		id: "horizon",
		name: "Horizon™",
		lightSrc: "https://alignui.com/images/blocks/hero-1-brand-2-400.svg",
		darkSrc: "https://alignui.com/images/blocks/hero-1-brand-2-400-dark.svg",
	},
	{
		id: "catalyst",
		name: "Catalyst™",
		lightSrc: "https://alignui.com/images/blocks/hero-1-brand-3-400.svg",
		darkSrc: "https://alignui.com/images/blocks/hero-1-brand-3-400-dark.svg",
	},
	{
		id: "phoenix",
		name: "Phoenix™",
		lightSrc: "https://alignui.com/images/blocks/hero-1-brand-4-400.svg",
		darkSrc: "https://alignui.com/images/blocks/hero-1-brand-4-400-dark.svg",
	},
	{
		id: "pulse",
		name: "Pulse™",
		lightSrc: "https://alignui.com/images/blocks/hero-1-brand-5-400.svg",
		darkSrc: "https://alignui.com/images/blocks/hero-1-brand-5-400-dark.svg",
	},
	{
		id: "solaris",
		name: "Solaris™",
		lightSrc: "https://alignui.com/images/blocks/hero-1-brand-6-400.svg",
		darkSrc: "https://alignui.com/images/blocks/hero-1-brand-6-400-dark.svg",
	},
	{
		id: "aurora",
		name: "Aurora™",
		lightSrc: "https://alignui.com/images/blocks/hero-1-brand-7-400.svg",
		darkSrc: "https://alignui.com/images/blocks/hero-1-brand-7-400-dark.svg",
	},
]

export function LogoStrip() {
	return (
		<div className="border-border/60 bg-bg w-full border-b border-t">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
					{brandLogos.map((brand, idx) => (
						<div
							key={brand.id}
							className="flex shrink-0 items-center lg:w-full lg:shrink">
							<div
								className={`flex w-full items-center justify-center px-6 py-5 sm:px-8 lg:px-2 lg:py-6 ${
									idx !== brandLogos.length - 1
										? "lg:border-border/60 lg:border-r"
										: ""
								}`}>
								<Image
									src={brand.lightSrc}
									alt={brand.name}
									width={106}
									height={24}
									className="h-6 w-auto object-contain lg:h-5 xl:h-6 dark:hidden"
								/>
								<Image
									src={brand.darkSrc}
									alt={brand.name}
									width={106}
									height={24}
									className="hidden h-6 w-auto object-contain lg:h-5 xl:h-6 dark:block"
								/>
							</div>

							{/* Mobile vertical separator between items */}
							{idx !== brandLogos.length - 1 && (
								<div
									aria-hidden="true"
									className="bg-border/60 h-8 w-px shrink-0 lg:hidden"
								/>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
