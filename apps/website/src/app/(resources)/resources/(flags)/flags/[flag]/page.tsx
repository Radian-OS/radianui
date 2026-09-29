import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/seo/json-ld"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl, getFlagImageStructuredData } from "@/lib/structured-data"
import { FlagsResourcePage } from "../../components/FlagsResourcePage"
import {
	flagNames,
	getFlagCountryCodes,
	getFlagDisplayName,
	getFlagNameFromSlug,
	getFlagPagePath,
	getFlagSlug,
	getFlagSvgUrl,
} from "../../components/flags-data"

interface FlagPageProps {
	params: Promise<{ flag: string }>
}

async function getFlagFromParams({ params }: FlagPageProps) {
	const { flag } = await params
	return getFlagNameFromSlug(flag)
}

export function generateStaticParams() {
	return flagNames.map((name) => ({ flag: getFlagSlug(name) }))
}

export async function generateMetadata({
	params,
}: FlagPageProps): Promise<Metadata> {
	const flag = await getFlagFromParams({ params })
	if (!flag) return {}

	const displayName = getFlagDisplayName(flag)
	const title = `${displayName} Flag – Free PNG & SVG Download`
	const description = `Use the ${displayName} flag in React through the npm package, or download its flat and rounded SVG and PNG assets for Figma and other design tools.`
	const url = absoluteUrl(getFlagPagePath(flag))
	const image = getFlagSvgUrl(flag)
	const countryCodes = getFlagCountryCodes(flag)

	return {
		title,
		description,
		keywords: [
			`${displayName} flag`,
			`${displayName} flag PNG`,
			`${displayName} flag SVG`,
			`${displayName} flag icon`,
			`${displayName} flag image`,
			`${displayName} flag for React`,
			`${displayName} flag for Figma`,
			...countryCodes.map((code) => `${code} flag`),
			...(flag === "united-states" ? ["American flag PNG"] : []),
		],
		alternates: { canonical: url },
		openGraph: {
			siteName: websiteMetadata.name,
			type: "website",
			title,
			description,
			url,
			images: [
				{ url: image, width: 512, height: 512, alt: `${displayName} flag` },
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

export default async function FlagPage(props: FlagPageProps) {
	const flag = await getFlagFromParams(props)
	if (!flag) notFound()

	const displayName = getFlagDisplayName(flag)
	const url = absoluteUrl(getFlagPagePath(flag))
	const image = getFlagSvgUrl(flag)

	return (
		<>
			<JsonLd
				id="flag-image-structured-data"
				data={getFlagImageStructuredData({
					name: displayName,
					url,
					image,
				})}
			/>
			<FlagsResourcePage initialSelectedFlag={flag} />
		</>
	)
}
