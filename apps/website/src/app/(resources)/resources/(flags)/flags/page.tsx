import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { websiteMetadata } from "@/config/website-metadata-config"
import {
	absoluteUrl,
	getFlagsResourceStructuredData,
} from "@/lib/structured-data"
import { FlagsResourcePage } from "../components/FlagsResourcePage"

const pageUrl = absoluteUrl("/resources/flags")
const pageTitle = "All Country Flags – SVG, PNG & React Icons | Radian"
const pageDescription =
	"Browse 250+ national flags of the world with names and ISO codes. Install the React npm package or download flag icons as SVG and PNG for Figma."
const pageImage = absoluteUrl("/media/assets-page/flags-light.png")
const pageImageAlt = "Country flag selector and currency picker interface"
export const metadata: Metadata = {
	title: pageTitle,
	description: pageDescription,
	keywords: null,
	alternates: { canonical: pageUrl },
	openGraph: {
		siteName: websiteMetadata.name,
		type: "website",
		title: pageTitle,
		description: pageDescription,
		url: pageUrl,
		images: [{ url: pageImage, width: 664, height: 418, alt: pageImageAlt }],
	},
	twitter: {
		card: "summary_large_image",
		title: pageTitle,
		description: pageDescription,
		images: [{ url: pageImage, alt: pageImageAlt }],
	},
}

export default function Page() {
	return (
		<>
			<JsonLd
				id="flags-resource-structured-data"
				data={getFlagsResourceStructuredData()}
			/>
			<FlagsResourcePage />
		</>
	)
}
