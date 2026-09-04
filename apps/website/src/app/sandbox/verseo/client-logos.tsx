"use client"

import React from "react"
import Image from "next/image"

interface ClientLogo {
	name: string
	logoUrl: string
	width: number
	height: number
}

const clientLogos: ClientLogo[] = [
	{
		name: "Courto",
		logoUrl:
			"https://framerusercontent.com/images/QCk9cViz1F2xnGiau496ziuo0.svg",
		width: 147,
		height: 40,
	},
	{
		name: "Vista",
		logoUrl:
			"https://framerusercontent.com/images/TEhQDP8wXbK7ykvjjeOZ4T6whY4.svg",
		width: 134,
		height: 41,
	},
	{
		name: "Rentigo",
		logoUrl:
			"https://framerusercontent.com/images/rk7BarLvRq1CODbxSAWbsERxdg.svg",
		width: 112,
		height: 44,
	},
	{
		name: "Carvia",
		logoUrl:
			"https://framerusercontent.com/images/lVhMUf5x9wehQI1PonsBsvD57yE.svg",
		width: 143,
		height: 40,
	},
	{
		name: "DriveON",
		logoUrl:
			"https://framerusercontent.com/images/sl1agytIn7rTvY5T2FMRTaytw.svg",
		width: 126,
		height: 41,
	},
]

export function VerseoClientLogos() {
	return (
		<section className="border-border/40 bg-fill1/20 border-y py-10">
			<div className="mx-auto max-w-5xl px-4">
				<p className="text-fg-tertiary text-center text-xs font-semibold uppercase tracking-wider">
					Trusted by modern teams
				</p>

				{/* Logos Strip (Rule 9: brand logo via Image, Rule 18: map) */}
				<div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-14">
					{clientLogos.map((client) => (
						<div
							key={client.name}
							className="flex items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
							<Image
								src={client.logoUrl}
								alt={client.name}
								width={client.width}
								height={client.height}
								className="h-7 w-auto object-contain dark:invert"
								unoptimized
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
