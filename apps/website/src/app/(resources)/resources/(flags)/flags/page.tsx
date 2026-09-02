import type { Metadata } from "next"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl } from "@/lib/structured-data"
import { ResourcePage } from "../../components/ResourcePage"
import FlagsHeroActionButtons from "../components/FlagsHeroActionButtons"
import FlagsPlayground from "../components/FlagsPlayground"
import FlagsDocs from "../docs/FlagsDocs"

const pageUrl = absoluteUrl("/resources/flags")
const pageTitle = "Free Country Flag Pack – SVG Flags for React & Figma"
const pageDescription =
	"Browse production-ready country flags for React and Figma. Search, copy, and use rectangular or circular SVG flags in your next interface."
const pageImage = absoluteUrl("/media/assets-page/flags-light.png")
const flagCdnRoot =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/country-flags/src/64px/circle"

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

const heroFlags = [
	{ name: "Germany", size: "small" },
	{ name: "United States", size: "large" },
	{ name: "Argentina", size: "small" },
] as const

export default function Page() {
	return (
		<ResourcePage
			badge={{
				count: "250+ Flags",
				label: "Curated Country Flag Collection",
			}}
			heroVisual={
				<div className="flex items-center -space-x-2">
					{heroFlags.map(({ name, size }) => (
						<div
							key={name}
							className={`relative overflow-hidden rounded-full ${
								size === "large" ? "z-10 size-20" : "size-12"
							}`}>
							<img
								src={`${flagCdnRoot}/${encodeURIComponent(name)}.png`}
								alt={`${name} flag`}
								width={64}
								height={64}
								className="size-full object-contain"
							/>
						</div>
					))}
				</div>
			}
			title="Beautiful, Production-Ready Country Flags 🏁"
			description="Access a complete collection of country and regional flags, optimized for Figma, React, and modern web applications."
			actions={<FlagsHeroActionButtons />}
			showcaseLabel="Browse free country flag assets"
			showcase={<FlagsPlayground />}
			documentation={<FlagsDocs />}
		/>
	)
}
