"use client"

import React from "react"
import Image from "next/image"
import { BRAND_LOGOS } from "./types"

interface LogoStripProps {
	title?: string
}

export function LogoStrip({
	title = "More than 12,000 businesses delight their customers with Shadcn Space",
}: LogoStripProps) {
	return (
		<div className="flex flex-col items-center gap-8">
			<p className="text-fg-secondary px-4 text-center text-sm font-normal sm:text-base">
				{title}
			</p>

			<div className="flex w-full flex-wrap items-center justify-center gap-8 sm:gap-12 lg:justify-between lg:gap-16">
				{BRAND_LOGOS.map((logo) => (
					<div
						key={logo.id}
						className="flex items-center justify-center opacity-85 transition-opacity duration-200 hover:opacity-100">
						<Image
							src={logo.lightSrc}
							alt={logo.name}
							width={140}
							height={36}
							unoptimized
							className="h-7 w-auto object-contain sm:h-8 dark:hidden"
						/>
						<Image
							src={logo.darkSrc}
							alt={logo.name}
							width={140}
							height={36}
							unoptimized
							className="hidden h-7 w-auto object-contain sm:h-8 dark:block"
						/>
					</div>
				))}
			</div>
		</div>
	)
}
