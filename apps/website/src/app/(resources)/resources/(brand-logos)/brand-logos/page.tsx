import type { Metadata } from "next"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { BrandLogosResourcePage } from "../components/BrandLogosResourcePage"

const pageUrl = absoluteUrl("/resources/brand-logos")
const pageTitle = "Free Brand Logos SVG & PNG Download | Radian Resources"
const pageDescription =
	"Download free brand logos in SVG and PNG. Browse 244 brand icons and wordmarks, copy SVG code, and choose light or dark variants for websites and apps."
const pageImage = absoluteUrl("/media/assets-page/popular-brands-light.png")

export const metadata: Metadata = {
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

export default function Page() {
	return <BrandLogosResourcePage />
}
