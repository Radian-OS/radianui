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
		name: "Logoipsum 1",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-1.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-1.svg",
	},
	{
		name: "Logoipsum 2",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-2.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-2.svg",
	},
	{
		name: "Logoipsum 3",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-3.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-3.svg",
	},
	{
		name: "Logoipsum 4",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-4.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-4.svg",
	},
	{
		name: "Logoipsum 5",
		lightSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-5.svg",
		darkSrc:
			"https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-5.svg",
	},
]

export function LogoMarquee() {
	return (
		<div className="w-full py-8 sm:py-12">
			<div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4">
				{/* Section Label */}
				<p className="text-fg-tertiary text-xs font-semibold tracking-wider sm:text-sm">
					Brands that trusted us
				</p>

				{/* Logo Strip Grid / Carousel */}
				<div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative w-full overflow-hidden">
					<div className="flex w-full items-center justify-around gap-8 py-2 md:justify-center md:gap-14">
						{brandLogos.map((brand) => (
							<div
								key={brand.name}
								className="flex shrink-0 items-center justify-center opacity-70 transition-opacity duration-300 hover:opacity-100">
								{/* Light mode logo */}
								<Image
									src={brand.lightSrc}
									alt={brand.name}
									width={140}
									height={36}
									className="h-7 w-auto object-contain dark:hidden"
								/>
								{/* Dark mode logo */}
								<Image
									src={brand.darkSrc}
									alt={brand.name}
									width={140}
									height={36}
									className="hidden h-7 w-auto object-contain dark:block"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
