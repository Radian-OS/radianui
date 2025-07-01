import type { Metadata } from "next"
import { websiteMetadata } from "@/config/website-metadata-config"
import { blocks } from "@/data/blocks"
import BlockPreview from "./block-viewer"

export const metadata: Metadata = {
	title: {
		default: "Blocks - Radian",
		template: "%s - Radian",
	},
	description: "Browse all Radian components by category to find the perfect UI block for your project.",
	openGraph: {
		title: "Radian Blocks Gallery",
		description: "A comprehensive list of UI blocks built with React and Tailwind CSS.",
		url: new URL(`${websiteMetadata.url}/blocks`),
		images: [
			{
				url: websiteMetadata.ogImage,
				width: 1200,
				height: 630,
				alt: "Radian blocks gallery preview",
			},
		],
		locale: "en_US",
		type: "article",
	},
	twitter: {
		card: "summary_large_image",
		site: "@radiandev",
		creator: "@radiandev",
		title: "Radian Blocks Gallery",
		description: "Explore Radian\u2019s React & Tailwind CSS blocks library.",
		images: websiteMetadata.ogImage,
	},
	alternates: {
		canonical: new URL(`${websiteMetadata.url}/blocks`),
	},
}

export default function BlockPage() {
	return (
		<div className="mx-auto max-w-7xl">
			<div id="header" className="lg:py-7.5 flex flex-col gap-1">
				<h1 className="heading-4 text-text">Blocks</h1>
				<p className="body-15 text-text-secondary font-normal">Get all the ready-made ui blocks.</p>
			</div>
			{blocks.map((block, index) => (
				<BlockPreview preview={block.preview} code={block.code} title={block.title} category={block.category} key={index} />
			))}
		</div>
	)
}
