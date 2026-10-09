import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { notFound } from "next/navigation"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { EmojiResourcePage } from "../../components/EmojiResourcePage"
import {
	emojis,
	formatEmojiName,
	getEmojiBySlug,
	getEmojiMetadataDescription,
	getEmojiPagePath,
} from "../../components/emoji-data"

interface EmojiPageProps {
	params: Promise<{ slug: string }>
}

async function getEmojiFromParams({ params }: EmojiPageProps) {
	const { slug } = await params
	return getEmojiBySlug(slug)
}

export const dynamicParams = false

export function generateStaticParams() {
	return emojis.map((emoji) => ({ slug: emoji.slug }))
}

export async function generateMetadata({
	params,
}: EmojiPageProps): Promise<Metadata> {
	const emoji = await getEmojiFromParams({ params })
	if (!emoji) return {}

	const displayName = formatEmojiName(emoji.name)
	const title = `${displayName} Emoji — Meaning, Copy & Paste, Unicode`
	const description = getEmojiMetadataDescription(emoji)
	const url = absoluteUrl(getEmojiPagePath(emoji))
	const image = absoluteUrl("/media/assets-page/emojis-light.png")

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
				{
					url: image,
					width: 664,
					height: 418,
					alt: `${displayName} emoji`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
		},
	}
}

export default async function EmojiPage(props: EmojiPageProps) {
	const emoji = await getEmojiFromParams(props)
	if (!emoji) notFound()

	const url = absoluteUrl(getEmojiPagePath(emoji))
	const name = `${formatEmojiName(emoji.name)} Emoji`
	return (
		<>
			<JsonLd
				id="emoji-reference-structured-data"
				data={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					"@id": `${url}#webpage`,
					url,
					name,
					description: getEmojiMetadataDescription(emoji),
					isPartOf: {
						"@type": "CollectionPage",
						"@id": absoluteUrl("/resources/emoji"),
						name: "Emoji collection",
					},
					breadcrumb: {
						"@type": "BreadcrumbList",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Resources",
								item: absoluteUrl("/resources"),
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Emojis",
								item: absoluteUrl("/resources/emoji"),
							},
							{ "@type": "ListItem", position: 3, name, item: url },
						],
					},
				}}
			/>
			<EmojiResourcePage initialSelectedEmoji={emoji} />
		</>
	)
}
