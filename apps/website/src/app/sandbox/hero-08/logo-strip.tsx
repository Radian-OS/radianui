"use client"

import React from "react"
import Image from "next/image"
import { motion } from "motion/react"

interface BrandLogo {
	id: string
	name: string
	lightSrc: string
	darkSrc: string
}

const brandLogos: BrandLogo[] = [
	{
		id: "linear",
		name: "Linear",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/productivity-work/wordmark/linear.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/productivity-work/wordmark/linear.svg",
	},
	{
		id: "slack",
		name: "Slack",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/productivity-work/wordmark/slack.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/productivity-work/wordmark/slack.svg",
	},
	{
		id: "discord",
		name: "Discord",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/social-content/wordmark/discord.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/social-content/wordmark/discord.svg",
	},
	{
		id: "github",
		name: "GitHub",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/development/wordmark/github.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/wordmark/github.svg",
	},
	{
		id: "vercel",
		name: "Vercel",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/cloud-devops/wordmark/vercel.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/cloud-devops/wordmark/vercel.svg",
	},
	{
		id: "stripe",
		name: "Stripe",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/finance-payments/wordmark/stripe.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/finance-payments/wordmark/stripe.svg",
	},
	{
		id: "airtable",
		name: "Airtable",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/productivity-work/wordmark/airtable.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/productivity-work/wordmark/airtable.svg",
	},
]

export function LogoStrip({ delay = 0.3 }: { delay?: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
			animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
			transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
			className="border-border/60 bg-bg w-full cursor-default border-t border-b select-none">
			<div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
				<div className="flex items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] xl:overflow-visible [&::-webkit-scrollbar]:hidden">
					{brandLogos.map((brand, idx) => (
						<div
							key={brand.id}
							className="flex min-w-[160px] shrink-0 items-center justify-center xl:w-full xl:min-w-0 xl:shrink">
							<div
								className={`flex w-full items-center justify-center px-4 py-5 sm:px-6 sm:py-6 xl:px-2 xl:py-6 ${
									idx !== brandLogos.length - 1
										? "border-border/60 border-r"
										: ""
								}`}>
								<Image
									src={brand.lightSrc}
									alt={brand.name}
									width={143}
									height={38}
									className="pointer-events-none h-[38px] w-auto opacity-45 select-none dark:hidden"
								/>
								<Image
									src={brand.darkSrc}
									alt={brand.name}
									width={143}
									height={38}
									className="pointer-events-none hidden h-[38px] w-auto opacity-40 select-none dark:block"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	)
}
