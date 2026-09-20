import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { BrandLogosResourcePage } from "../../components/BrandLogosResourcePage"
import {
	brandLogos,
	getBrandLogoFromSlug,
	getBrandLogoPagePath,
	getBrandLogoUrl,
} from "../../components/brand-logos-data"

interface BrandLogoPageProps {
	params: Promise<{ brand: string }>
}

async function getBrandFromParams({ params }: BrandLogoPageProps) {
	const { brand } = await params
	return getBrandLogoFromSlug(brand)
}

export function generateStaticParams() {
	return brandLogos.map((brand) => ({ brand: brand.id }))
}

export async function generateMetadata({
	params,
}: BrandLogoPageProps): Promise<Metadata> {
	const brand = await getBrandFromParams({ params })
	if (!brand) return {}

	const title = `${brand.name} Logo – Free SVG & PNG Download`
	const description = `Preview, copy, and download the ${brand.name} logo as an icon or wordmark for light and dark interfaces.`
	const url = absoluteUrl(getBrandLogoPagePath(brand.id))
	const image = getBrandLogoUrl(brand.id, "light", "icon", "png")

	return {
		title,
		description,
		alternates: { canonical: url },
		openGraph: {
			siteName: websiteMetadata.name,
			type: "website",
			title,
			description,
			url,
			images: [
				{ url: image, width: 48, height: 48, alt: `${brand.name} logo` },
			],
		},
		twitter: {
			card: "summary",
			title,
			description,
			images: [image],
		},
	}
}

export default async function BrandLogoPage(props: BrandLogoPageProps) {
	const brand = await getBrandFromParams(props)
	if (!brand) notFound()

	return <BrandLogosResourcePage initialSelectedBrand={brand.id} />
}
