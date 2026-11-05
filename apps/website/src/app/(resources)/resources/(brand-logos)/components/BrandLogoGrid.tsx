"use client"

import { startTransition, useEffect, useState } from "react"
import { Skeleton } from "@/registry/ui/skeleton"
import { BrandLogoTile } from "./BrandLogoTile"
import type {
	BrandLogo,
	BrandLogoColorway,
	BrandLogoId,
	BrandLogoVariant,
} from "./brand-logos-data"

const BATCH_SIZE = 24

export function BrandLogoGrid({
	logos,
	variant,
	colorway,
	onSelect,
}: {
	logos: readonly BrandLogo[]
	variant: BrandLogoVariant
	colorway: BrandLogoColorway
	onSelect: (id: BrandLogoId) => void
}) {
	const [count, setCount] = useState(BATCH_SIZE)
	useEffect(() => {
		if (count >= logos.length) return
		const timer = setTimeout(() => {
			startTransition(() => setCount((value) => value + BATCH_SIZE))
		}, 32)
		return () => clearTimeout(timer)
	}, [count, logos.length])

	return (
		<ul
			aria-label="Brand logos"
			className="grid w-full list-none grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
			{logos.map((brand, index) =>
				index < count ? (
					<BrandLogoTile
						key={brand.id}
						id={brand.id}
						variant={variant}
						colorway={colorway}
						onSelect={onSelect}
					/>
				) : (
					<li
						key={brand.id}
						aria-label={`Loading ${brand.name} logo`}
						aria-busy="true"
						className="border-border bg-bg flex aspect-square items-center justify-center rounded-2xl border">
						<Skeleton className="size-12 animate-none rounded-md" />
					</li>
				)
			)}
		</ul>
	)
}
