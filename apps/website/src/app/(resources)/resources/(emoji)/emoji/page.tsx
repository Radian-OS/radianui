import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { EmojiResourcePage } from "../components/EmojiResourcePage"

const pageUrl = absoluteUrl("/resources/emoji")
const pageTitle = "Copy and Paste Emojis, PNG & SVG Downloads | Radian UI"
const pageDescription =
	"Search, copy and paste emojis, or download free PNG and SVG files. Browse emoji names, Unicode code points, categories, and skin tone variants."
const pageImage = absoluteUrl("/media/assets-page/emojis-light.png")
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
	return (
		<>
			<JsonLd
				id="emoji-application-structured-data"
				data={{
					"@context": "https://schema.org",
					"@type": "WebApplication",
					"@id": `${pageUrl}#application`,
					name: "Radian UI Emoji Copy and Paste",
					url: pageUrl,
					description: pageDescription,
					applicationCategory: "UtilitiesApplication",
					operatingSystem: "Any",
					isAccessibleForFree: true,
					publisher: {
						"@type": "Organization",
						name: websiteMetadata.organizationName,
						url: absoluteUrl("/"),
					},
				}}
			/>
			<JsonLd
				id="emoji-collection-structured-data"
				data={{
					"@context": "https://schema.org",
					"@type": "CollectionPage",
					"@id": pageUrl,
					url: pageUrl,
					name: "Unicode emoji collection",
					description: pageDescription,
					mainEntity: { "@id": `${pageUrl}#application` },
				}}
			/>
			<EmojiResourcePage />
		</>
	)
}
