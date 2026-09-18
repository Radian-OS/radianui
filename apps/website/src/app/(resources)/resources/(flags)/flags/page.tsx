import type { Metadata } from "next"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { FlagsResourcePage } from "../components/FlagsResourcePage"

const pageUrl = absoluteUrl("/resources/flags")
const pageTitle = "Free Country Flag Pack – SVG Flags for React & Figma"
const pageDescription =
	"Browse production-ready country flags for React and Figma. Search, copy, and use rectangular or circular SVG flags in your next interface."
const pageImage = absoluteUrl("/media/assets-page/flags-light.png")
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
	return <FlagsResourcePage />
}
