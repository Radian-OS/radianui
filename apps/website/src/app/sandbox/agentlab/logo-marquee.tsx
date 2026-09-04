"use client"

import React from "react"
import Image from "next/image"

interface BrandLogo {
	name: string
	url: string
	width: number
	height: number
}

const brandLogos: BrandLogo[] = [
	{
		name: "Craftgram",
		url: "https://framerusercontent.com/images/0tQJ7SlKdpCZUVbUjxOEy57XRhA.svg",
		width: 96,
		height: 30,
	},
	{
		name: "Pulse",
		url: "https://framerusercontent.com/images/hsbt5NG4UUe3LO7ERSFGv8A0PrA.svg",
		width: 94,
		height: 27,
	},
	{
		name: "Swift",
		url: "https://framerusercontent.com/images/O7fimt1JVKhKUjjZOGgeAWTdLQ.svg",
		width: 120,
		height: 25,
	},
	{
		name: "ZenZap",
		url: "https://framerusercontent.com/images/yg73mxfKVqYxGdl9PXd5goIE.svg",
		width: 80,
		height: 21,
	},
	{
		name: "Sparkle",
		url: "https://framerusercontent.com/images/6Fbv7vEmmB0WPOWiVDEZNhoZ0.svg",
		width: 68,
		height: 19,
	},
	{
		name: "ZenZap Duplicate",
		url: "https://framerusercontent.com/images/yg73mxfKVqYxGdl9PXd5goIE.svg",
		width: 80,
		height: 21,
	},
]

export function AgentlabLogoMarquee() {
	return (
		<section className="border-border/60 bg-bg/50 border-y py-10">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-wrap items-center justify-around gap-8 sm:gap-12 md:gap-16">
					{brandLogos.map((logo, index) => (
						<div
							key={`${logo.name}-${index}`}
							className="flex items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:invert">
							<Image
								src={logo.url}
								alt={logo.name}
								width={logo.width}
								height={logo.height}
								className="h-7 w-auto object-contain"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
