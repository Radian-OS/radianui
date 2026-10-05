"use client"

import React from "react"
import Image from "next/image"

interface BrandLogo {
	name: string
	lightSrc: string
	darkSrc: string
}

const brandLogos: BrandLogo[] = [
	{
		name: "Notion",
		lightSrc: "/brands/hero-21/notion-light.svg",
		darkSrc: "/brands/hero-21/notion-dark.svg",
	},
	{
		name: "Stripe",
		lightSrc: "/brands/hero-21/stripe-light.svg",
		darkSrc: "/brands/hero-21/stripe-dark.svg",
	},
	{
		name: "Slack",
		lightSrc: "/brands/hero-21/slack-light.svg",
		darkSrc: "/brands/hero-21/slack-dark.svg",
	},
	{
		name: "Linear",
		lightSrc: "/brands/hero-21/linear-light.svg",
		darkSrc: "/brands/hero-21/linear-dark.svg",
	},
	{
		name: "Vercel",
		lightSrc: "/brands/hero-21/vercel-light.svg",
		darkSrc: "/brands/hero-21/vercel-dark.svg",
	},
	{
		name: "Figma",
		lightSrc: "/brands/hero-21/figma-light.svg",
		darkSrc: "/brands/hero-21/figma-dark.svg",
	},
]

export function LogoMarquee() {
	return (
		<div className="w-full py-6 sm:py-10">
			<div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4">
				{/* Section Label */}
				<p className="text-sm font-normal text-[#4B5563] md:text-base dark:text-[#9CA3AF]">
					Brands that trusted us
				</p>

				{/* Continuous Infinite Animated Marquee */}
				<div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
					<div className="hero21-marquee-track flex w-max items-center gap-4 py-2 pr-4">
						{/* Render 4 duplicated sets of logos with exact 16px gap for seamless infinite looping */}
						{[...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos].map(
							(brand, idx) => (
								<div
									key={`${brand.name}-${idx}`}
									className="flex shrink-0 items-center transition-opacity duration-300">
									{/* Light mode logo (180x48px) */}
									<Image
										src={brand.lightSrc}
										alt={brand.name}
										width={180}
										height={48}
										className="h-12 w-[180px] object-contain dark:hidden"
									/>
									{/* Dark mode logo (180x48px) */}
									<Image
										src={brand.darkSrc}
										alt={brand.name}
										width={180}
										height={48}
										className="hidden h-12 w-[180px] object-contain dark:block"
									/>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
