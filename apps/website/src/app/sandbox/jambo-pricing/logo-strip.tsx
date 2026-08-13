import React from "react"
import Image from "next/image"

interface LogoItem {
	name: string
	domain: string
}

const partnerLogos: LogoItem[] = [
	{ name: "Notion", domain: "notion.so" },
	{ name: "Dribbble", domain: "dribbble.com" },
	{ name: "Figma", domain: "figma.com" },
	{ name: "Slack", domain: "slack.com" },
	{ name: "Notion Alt", domain: "notion.so" },
]

export function LogoStrip() {
	return (
		<div className="flex flex-col items-center gap-6">
			<div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
				{partnerLogos.map((logo, index) => (
					<div
						key={`${logo.name}-${index}`}
						className="relative flex items-center justify-center opacity-40 grayscale transition-all hover:opacity-80 hover:grayscale-0">
						<Image
							src={`https://www.google.com/s2/favicons?sz=64&domain=${logo.domain}`}
							alt={`${logo.name} Logo`}
							width={24}
							height={24}
							className="object-contain"
							unoptimized
						/>
					</div>
				))}
			</div>
			<p className="text-fg-tertiary max-w-2xl px-4 text-center text-xs leading-relaxed">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna.
			</p>
		</div>
	)
}
