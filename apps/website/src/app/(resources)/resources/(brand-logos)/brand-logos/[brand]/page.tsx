import { JsonLd } from "@/components/seo/json-ld"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { BrandLogosResourcePage } from "../../components/BrandLogosResourcePage"
import { getBrandLogoCatalog } from "../../components/brand-logos-server"

interface BrandLogoPageProps {
	params: Promise<{ brand: string }>
}

async function getBrandFromParams({ params }: BrandLogoPageProps) {
	const { getBrandLogoFromSlug } = await getBrandLogoCatalog()
	const { brand } = await params
	return getBrandLogoFromSlug(brand)
}

export const revalidate = 3600
export function generateStaticParams() {
	return []
}

export async function generateMetadata({
	params,
}: BrandLogoPageProps): Promise<Metadata> {
	const {
		getBrandLogoMetadataDescription,
		getBrandLogoPagePath,
		getBrandLogoUrl,
	} = await getBrandLogoCatalog()
	const brand = await getBrandFromParams({ params })
	if (!brand) return {}

	const title = `${brand.name} Logo SVG & PNG | ${websiteMetadata.name}`
	const description = getBrandLogoMetadataDescription(brand.id)
	const url = absoluteUrl(getBrandLogoPagePath(brand.id))
	const image = getBrandLogoUrl(brand.id, "light", "icon")

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
				{ url: image, width: 64, height: 64, alt: `${brand.name} logo` },
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
	const { getBrandLogoMetadataDescription, getBrandLogoPagePath } =
		await getBrandLogoCatalog()
	const brand = await getBrandFromParams(props)
	if (!brand) notFound()

	const url = absoluteUrl(getBrandLogoPagePath(brand.id))
	return (
		<>
			<JsonLd
				id="brand-logo-structured-data"
				data={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					"@id": `${url}#webpage`,
					url,
					name: `${brand.name} Logo SVG & PNG`,
					description: getBrandLogoMetadataDescription(brand.id),
					breadcrumb: {
						"@type": "BreadcrumbList",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Resources",
								item: absoluteUrl("/docs/getting-started/resources"),
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Brand Logos",
								item: absoluteUrl("/resources/brand-logos"),
							},
							{
								"@type": "ListItem",
								position: 3,
								name: `${brand.name} Logo`,
								item: url,
							},
						],
					},
					isPartOf: {
						"@type": "CollectionPage",
						"@id": absoluteUrl("/resources/brand-logos"),
						name: "Brand & Tech Company Logos",
					},
				}}
			/>
			<BrandLogosResourcePage initialSelectedBrand={brand.id} />
		</>
	)
}
