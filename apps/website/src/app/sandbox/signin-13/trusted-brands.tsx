"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { BRAND_LOGOS, type BrandLogo } from "./types"

interface TrustedBrandsProps {
	title?: string
	brands?: BrandLogo[]
}

export function TrustedBrands({
	title = "Chosen by top engineering teams",
	brands = BRAND_LOGOS,
}: TrustedBrandsProps) {
	const { resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])
	return (
		<div className="flex w-full flex-col items-center gap-5">
			{/* Divider with text */}
			<div className="flex w-full items-center justify-center gap-3">
				<div className="h-px flex-1 bg-white" />
				<p className="shrink-0 text-xs font-normal whitespace-nowrap text-white sm:text-sm">
					{title}
				</p>
				<div className="h-px flex-1 bg-white" />
			</div>

			{/* Logos */}
			<div className="flex w-full flex-wrap items-center justify-center gap-1">
				{brands.map((brand) => {
					return (
						<img
							key={brand.alt}
							src={brand.src}
							alt={brand.alt}
							className="h-7 w-auto opacity-70 transition-opacity hover:opacity-100"
						/>
					)
				})}
			</div>
		</div>
	)
}
