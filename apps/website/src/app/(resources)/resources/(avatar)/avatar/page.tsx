import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { websiteMetadata } from "@/config/website-metadata-config"
import {
	absoluteUrl,
	getAvatarResourceStructuredData,
} from "@/lib/structured-data"
import { ResourcePage } from "../../components/ResourcePage"
import AvatarHeroActionButtons from "../components/AvatarHeroActionButton"
import AvatarPlayground from "../components/AvatarPlayground"
import AvatarDocs from "../docs/AvatarDocs"

const pageUrl = absoluteUrl("/resources/avatar")
const pageTitle = "Free Open Source Avatar Library for UI design"
const pageDescription =
	"Access free UI portraits, avatars, profile pictures, and placeholder images for Figma, React, UI design, and mockups"
const pageImage = absoluteUrl("/og/static-og.png")

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
		images: [{ url: pageImage, width: 1200, height: 630, alt: pageTitle }],
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
				id="avatar-resource-structured-data"
				data={getAvatarResourceStructuredData()}
			/>
			<ResourcePage
				badge={{
					count: "200+ Faces",
					label: "Curated UI Avatar Pack",
					href: "/docs/getting-started/changelog",
				}}
				heroVisual={null}
				title="Get Free High Quality UI Faces and Avatars"
				description="Access free UI portraits, avatars, profile pictures, and placeholder images for Figma, React, UI design, and mockups"
				actions={<AvatarHeroActionButtons />}
				showcaseLabel="Browse 216 free UI avatar illustrations"
				showcase={<AvatarPlayground />}
				documentation={<AvatarDocs />}
				headerClassName="pb-10 md:pb-25"
				showcaseClassName="mt-0"
				showcaseContentClassName="py-0"
			/>
		</>
	)
}
