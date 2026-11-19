import type { Metadata } from "next"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { BrandLogosResourcePage } from "../components/BrandLogosResourcePage"

import { getBrandLogoCatalog } from "../components/brand-logos-server"

const pageUrl = absoluteUrl("/resources/brand-logos")
const pageTitle = "Brand Logos & Tech Company Logos | SVG, PNG & CDN"
const pageImage = absoluteUrl("/media/assets-page/popular-brands-light.png")

export async function generateMetadata(): Promise<Metadata> {
	const { brandLogos } = await getBrandLogoCatalog()
	const pageDescription = `Explore ${brandLogos.length}+ brand and tech company logos. Download SVG and PNG, copy SVG code, or use CDN links with light and dark mode support.`
	return {
		title: pageTitle,
		description: pageDescription,
		alternates: { canonical: pageUrl },
		openGraph: {
			siteName: websiteMetadata.name,
			type: "website",
			title: pageTitle,
			description: pageDescription,
			url: pageUrl,
			images: [{ url: pageImage, width: 664, height: 418, alt: pageTitle }],
		},
		twitter: {
			card: "summary_large_image",
			title: pageTitle,
			description: pageDescription,
			images: [pageImage],
		},
	}
}

export default function Page() {
	return <BrandLogosResourcePage />
}
