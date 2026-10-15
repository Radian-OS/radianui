import Link from "next/link"
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
	getBrandLogoSvgUrl,
	getBrandLogoMetadataDescription,
	getBrandLogoPagePath,
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
	const selectedBrand = initialSelectedBrand
		? getBrandLogo(initialSelectedBrand)
		: null
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
									src={getBrandLogoSvgUrl(id, "light", "colored", "icon")}
									alt={`${brand.name} logo`}
									width={64}
									height={64}
									className={cn(
										"object-contain dark:hidden",
										size === "large" ? "size-12" : "size-8"
									)}
								/>
								<img
									src={getBrandLogoSvgUrl(id, "dark", "colored", "icon")}
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
			title={
				selectedBrand
					? `${selectedBrand.name} Logo SVG & PNG`
					: "Brand & Tech Company Logos"
			}
			description={
				selectedBrand
					? getBrandLogoMetadataDescription(selectedBrand.id)
					: `Explore ${brandLogos.length}+ brand and tech company logos across AI, development, cloud, data, design, business, and gaming. Download SVG and PNG, copy SVG code, or use CDN links with light and dark mode support.`
			}
			actions={<BrandLogosHeroActions />}
			showcaseLabel="Browse free brand logo assets"
			showcase={
				<BrandLogosPlayground initialSelectedBrand={initialSelectedBrand} />
			}
			documentation={
				<>
					{selectedBrand ? (
						<section
							aria-label={`${selectedBrand.name} logo downloads`}
							className="mx-auto flex w-full max-w-200 flex-col gap-4 px-5 py-8">
							<h2 className="heading-4">
								Download the {selectedBrand.name} logo
							</h2>
							<p>
								Get the {selectedBrand.name} logo as a compact icon or a full
								wordmark. Choose colored or neutral artwork for light and dark
								backgrounds. Open the logo details to download SVG or PNG, copy
								SVG code, or copy its CDN link.
							</p>
							<p>
								Use SVG for scalable website graphics and PNG for presentations
								or image editors. Preserve the logo's proportions and follow the
								brand owner's usage guidelines.
							</p>
							<Link
								href={getBrandLogoSvgUrl(
									selectedBrand.id,
									"light",
									"colored",
									"icon"
								)}
								className="text-primary-text underline">
								{selectedBrand.name} logo SVG
							</Link>
							<Link
								href={getBrandLogoSvgUrl(
									selectedBrand.id,
									"light",
									"colored",
									"wordmark"
								)}
								className="text-primary-text underline">
								{selectedBrand.name} wordmark SVG
							</Link>
						</section>
					) : null}
					<BrandLogosDocs />
					<section
						aria-labelledby="brand-logo-directory-heading"
						className="mx-auto flex w-full max-w-200 flex-col gap-6 px-5 py-8">
						<h2 id="brand-logo-directory-heading" className="heading-4">
							Browse brand and tech company logos
						</h2>
						<p>
							Find Google, Microsoft, and other company logos. Each page
							includes SVG and PNG downloads, icons, wordmarks, and CDN links.
						</p>
						<ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
							{brandLogos.map((brand) => (
								<li key={brand.id}>
									<Link
										href={getBrandLogoPagePath(brand.id)}
										prefetch={false}
										className="text-primary-text underline">
										{brand.name} logo
									</Link>
								</li>
							))}
						</ul>
					</section>
				</>
			}
		/>
	)
}
