import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { FlagsResourcePage } from "../../components/FlagsResourcePage"
import {
	flagNames,
	getFlagDisplayName,
	getFlagNameFromSlug,
	getFlagPagePath,
	getFlagSlug,
	getFlagUrl,
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
	const description = `Preview, copy, and download the ${displayName} flag as a flat or rounded PNG or SVG asset for React, Figma, and the web.`
	const url = absoluteUrl(getFlagPagePath(flag))
	const image = getFlagUrl(flag, "flat", 512)

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

	return <FlagsResourcePage initialSelectedFlag={flag} />
}
