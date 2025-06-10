import type { Metadata } from "next"
import { blocks } from "@/data/blocks"
import BlockPreview from "./block-viewer"

export const metadata: Metadata = {
	title: {
		default: "Blocks | Radian",
		template: "%s | Radian",
	},
	description: "Browse all Radian components by category to find the perfect UI block for your project.",
	openGraph: {
		title: "Radian Blocks Gallery",
		description: "A comprehensive list of UI blocks built with React and Tailwind CSS.",
		url: "https://dev.radianos/blocks",
		siteName: "Radian",
		images: [
			{
				url: "https://dev.radianos.com/radian.svg",
				width: 1200,
				height: 630,
				alt: "Radian blocks gallery preview",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		site: "@radiandev",
		creator: "@radiandev",
		title: "Radian Blocks Gallery",
		description: "Explore Radian\u2019s React & Tailwind CSS blocks library.",
		images: ["https://dev.radianos.com/radian.svg"],
	},
}

const BlocksPage = () => {
	return (
		<div>
			{blocks.map((block, index) => (
				<BlockPreview preview={block.preview} code={block.code} title={block.title} category={block.category} key={index} />
			))}
		</div>
	)
}

export default BlocksPage
