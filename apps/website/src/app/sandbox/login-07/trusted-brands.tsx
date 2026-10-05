"use client"

import React from "react"
import { BRAND_LOGOS, type BrandLogo } from "./types"

interface TrustedBrandsProps {
	title?: string
	brands?: BrandLogo[]
}

export function TrustedBrands({
	title = "Trusted by growing businesses",
	brands = BRAND_LOGOS,
}: TrustedBrandsProps) {
	return (
		<div className="flex w-full flex-col items-center gap-5">
			{/* Divider with text */}
			<div className="flex w-full items-center justify-center gap-3">
				<div className="h-px flex-1 bg-white/20" />
				<p className="shrink-0 text-xs font-normal whitespace-nowrap text-white/70 sm:text-sm">
					{title}
				</p>
				<div className="h-px flex-1 bg-white/20" />
			</div>

			{/* Logos */}
			<div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3.5">
				{brands.map((brand) => (
					<img
						key={brand.alt}
						src={brand.src}
						alt={brand.alt}
						height={20}
						style={{ width: brand.width }}
						className="h-5 w-auto opacity-70 transition-opacity hover:opacity-100"
					/>
				))}
			</div>
		</div>
	)
}
