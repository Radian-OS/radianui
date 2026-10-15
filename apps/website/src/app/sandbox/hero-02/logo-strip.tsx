"use client"

import React from "react"
import Image from "next/image"
import type { BrandLogo } from "./types"

const DEFAULT_LOGOS: BrandLogo[] = [
	{
		id: "anthropic",
		name: "Anthropic",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/icon/anthropic.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/icon/anthropic.svg",
	},
	{
		id: "copilot",
		name: "Copilot",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/icon/copilot.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/icon/copilot.svg",
	},
	{
		id: "openai",
		name: "OpenAI",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/icon/openai.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/icon/openai.svg",
	},
	{
		id: "claude",
		name: "Claude",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/icon/claude.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/icon/claude.svg",
	},
	{
		id: "perplexity",
		name: "Perplexity",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/icon/perplexity.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/icon/perplexity.svg",
	},
]

interface LogoStripProps {
	logos?: BrandLogo[]
}

export function LogoStrip({ logos = DEFAULT_LOGOS }: LogoStripProps) {
	return (
		<div className="border-border bg-bg w-full border-b">
			<div className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
				<div className="border-border divide-border grid grid-cols-2 divide-x divide-y border-x sm:grid-cols-3 sm:divide-y-0 md:grid-cols-5">
					{logos.map((logo) => {
						const lightSrc = logo.src.includes("/dark/")
							? logo.src.replace("/dark/", "/light/")
							: logo.src
						const darkSrc =
							logo.darkSrc ||
							(logo.src.includes("/light/")
								? logo.src.replace("/light/", "/dark/")
								: logo.src)

						return (
							<div
								key={logo.id}
								className="flex h-20 items-center justify-center px-6 py-4 transition-opacity duration-200 hover:opacity-75">
								<Image
									src={lightSrc}
									alt={logo.name}
									width={32}
									height={32}
									unoptimized
									className="h-8 w-auto object-contain opacity-70 transition-opacity duration-200 hover:opacity-100 dark:hidden"
								/>
								<Image
									src={darkSrc}
									alt={logo.name}
									width={32}
									height={32}
									unoptimized
									className="hidden h-8 w-auto object-contain opacity-70 transition-opacity duration-200 hover:opacity-100 dark:block"
								/>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
