"use client"

import React from "react"
import Image from "next/image"

interface PartnerItem {
	name: string
	src: string
}

const PARTNERS: PartnerItem[] = [
	{
		name: "Dribbble",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/design-creative/icon/dribbble.svg",
	},
	{
		name: "Figma",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/design-creative/icon/figma.svg",
	},
	{
		name: "Slack",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/productivity-work/icon/slack.svg",
	},
	{
		name: "Teams",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/productivity-work/icon/teams.svg",
	},
	{
		name: "Docker",
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/cloud-devops/icon/docker.svg",
	},
]

interface TrustedPartnersProps {
	title?: string
	partners?: PartnerItem[]
}

export function TrustedPartners({
	title = "More than 487 trusted partners & clients",
	partners = PARTNERS,
}: TrustedPartnersProps) {
	return (
		<div className="flex flex-col items-center gap-8 pt-4 sm:pt-6">
			<p className="text-fg-tertiary text-center text-xs font-medium tracking-wide sm:text-sm">
				{title}
			</p>

			<div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
				{partners.map((partner, index) => (
					<div
						key={`${partner.name}-${index}`}
						className="flex items-center gap-2 opacity-50 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0">
						<Image
							src={partner.src}
							alt={`${partner.name} Logo`}
							width={20}
							height={20}
							className="object-contain"
							unoptimized
						/>
						<span className="text-fg text-base font-bold tracking-tight">
							{partner.name}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
