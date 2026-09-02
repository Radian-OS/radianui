import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { websiteMetadata } from "@/config/website-metadata-config"
import {
	absoluteUrl,
	getAvatarResourceStructuredData,
} from "@/lib/structured-data"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { ResourcePage } from "../../components/ResourcePage"
import AvatarHeroActionButtons from "../components/AvatarHeroActionButton"
import AvatarPlayground from "../components/AvatarPlayground"
import AvatarDocs from "../docs/AvatarDocs"

const pageUrl = absoluteUrl("/resources/avatar")
const pageTitle = "Free UI Avatar Pack (216) – No Copyright, SVG & PNG"
const pageDescription =
	"Free UI avatars for React & Figma — 216 royalty-free faces, no copyright required. Copy as HTML, download SVG or PNG, fully customizable."
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

const people = [
	{
		image: "/avatar/header-1.jpg",
		alt: "Woman with long dark hair wearing a green shirt",
	},
	{
		image: "/avatar/header-2.jpg",
		alt: "Bearded man wearing black glasses and a blue shirt",
	},
	{
		image: "/avatar/header-3.jpg",
		alt: "Man with shoulder-length dark hair and glasses on a red background",
	},
]

export default function Page() {
	return (
		<>
			<JsonLd
				id="avatar-resource-structured-data"
				data={getAvatarResourceStructuredData()}
			/>
			<ResourcePage
				badge={{
					count: "100+ Faces",
					label: "Curated UI Avatar Pack",
					href: "/docs/getting-started/changelog",
				}}
				heroVisual={
					<div className="flex items-center -space-x-2">
						{people.map((person) => (
							<Avatar
								size={person.image === "/avatar/header-2.jpg" ? "80" : "48"}
								key={person.image}>
								<AvatarImage
									className={
										person.image === "/avatar/header-2.jpg" ? "z-10" : ""
									}
									src={person.image}
									alt={person.alt}
								/>
							</Avatar>
						))}
					</div>
				}
				title="Beautiful, Free UI Avatars Production-Ready for Figma & React 👩🏼‍💼"
				description="216 diverse, royalty-free avatars ready to drop into your project. Copy the HTML or Next.js Image tag, grab the Figma frame, or download as SVG or PNG."
				actions={<AvatarHeroActionButtons />}
				showcaseLabel="Browse 216 free UI avatar illustrations"
				showcase={<AvatarPlayground />}
				documentation={<AvatarDocs />}
			/>
		</>
	)
}
