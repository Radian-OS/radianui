import { preconnect } from "react-dom"
import { cn } from "@/lib/utils"
import { ResourcePage } from "../../components/ResourcePage"
import BrandLogosDocs from "../docs/BrandLogosDocs"
import BrandLogosHeroActions from "./BrandLogosHeroActions"
import BrandLogosPlayground from "./BrandLogosPlayground"
import type { BrandLogoId } from "./brand-logos-data"
import {
	BRAND_LOGO_ASSET_COUNT,
	BRAND_LOGO_CDN_ORIGIN,
	brandLogos,
	getBrandLogo,
	getBrandLogoUrl,
} from "./brand-logos-data"

const heroLogos = [
	{ id: "figma", size: "small" },
	{ id: "openai", size: "large" },
	{ id: "react", size: "small" },
] as const

interface BrandLogosResourcePageProps {
	initialSelectedBrand?: BrandLogoId | null
}

export function BrandLogosResourcePage({
	initialSelectedBrand = null,
}: BrandLogosResourcePageProps) {
	preconnect(BRAND_LOGO_CDN_ORIGIN, { crossOrigin: "anonymous" })

	return (
		<ResourcePage
			badge={{
				count: `${brandLogos.length} Brands`,
				label: `${BRAND_LOGO_ASSET_COUNT.toLocaleString("en-US")} Ready-to-Use Logo Assets`,
			}}
			heroVisual={
				<div className="flex items-center -space-x-2">
					{heroLogos.map(({ id, size }) => {
						const brand = getBrandLogo(id)
						return (
							<div
								key={id}
								className={cn(
									"bg-bg border-soft relative flex items-center justify-center rounded-2xl border shadow-sm",
									size === "large" ? "z-10 size-20" : "size-14"
								)}>
								<img
									src={getBrandLogoUrl(id, "light", "icon")}
									alt={`${brand.name} logo`}
									width={64}
									height={64}
									className={cn(
										"object-contain dark:hidden",
										size === "large" ? "size-12" : "size-8"
									)}
								/>
								<img
									src={getBrandLogoUrl(id, "dark", "icon")}
									alt=""
									width={64}
									height={64}
									className={cn(
										"hidden object-contain dark:block",
										size === "large" ? "size-12" : "size-8"
									)}
								/>
							</div>
						)
					})}
				</div>
			}
			title="Popular Brand Logos for Every Interface"
			description="Browse 244 polished brand icons and wordmarks across 12 categories, with transparent PNGs for light and dark interfaces and browser-generated SVG exports."
			actions={<BrandLogosHeroActions />}
			showcaseLabel="Browse free brand logo assets"
			showcase={
				<BrandLogosPlayground initialSelectedBrand={initialSelectedBrand} />
			}
			documentation={<BrandLogosDocs />}
		/>
	)
}
