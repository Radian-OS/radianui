import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { EmojiDetailPage } from "../../components/EmojiDetailPage"
import {
	emojis,
	formatEmojiName,
	getEmojiBySlug,
	getEmojiKeywords,
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
		keywords: getEmojiKeywords(emoji),
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

	return <EmojiDetailPage emoji={emoji} />
}
