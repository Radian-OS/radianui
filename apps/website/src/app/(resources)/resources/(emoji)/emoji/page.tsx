import type { Metadata } from "next"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { EmojiResourcePage } from "../components/EmojiResourcePage"

const pageUrl = absoluteUrl("/resources/emoji")
const pageTitle = "Free Emoji Library — Copy & Paste Unicode Emojis"
const pageDescription =
	"Browse Unicode emojis by category, search by name, and copy emoji text, HTML entities, Unicode escapes, and Next.js snippets."
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
	return <EmojiResourcePage />
}
