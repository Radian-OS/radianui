"use client"

import { useBrandLogoTheme } from "./use-brand-logo-theme"
import { BrandLogoTile } from "./BrandLogoTile"
import type {
	BrandLogo,
	BrandLogoColorway,
	BrandLogoId,
	BrandLogoVariant,
} from "./brand-logos-data"

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
	const theme = useBrandLogoTheme()
	return (
		<ul
			aria-label="Brand logos"
			className="grid w-full list-none grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
			{logos.map((brand, index) => (
				<BrandLogoTile
					key={brand.id}
					id={brand.id}
					variant={variant}
					colorway={colorway}
					onSelect={onSelect}
					priority={index < 24}
					theme={theme}
				/>
			))}
		</ul>
	)
}
