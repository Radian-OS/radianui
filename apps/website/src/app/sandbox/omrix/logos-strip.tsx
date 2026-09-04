"use client"

import React from "react"
import Image from "next/image"

interface CompanyLogo {
	name: string
	domain: string
	styleClass: string
	badge?: string
}

const companyLogos: CompanyLogo[] = [
	{
		name: "luminous",
		domain: "luminous.com",
		styleClass: "font-bold tracking-tight lowercase",
	},
	{
		name: "SAVANNAH",
		domain: "savannah.com",
		styleClass: "font-black tracking-widest uppercase",
	},
	{
		name: "Amsterdam",
		domain: "amsterdam.nl",
		styleClass: "font-semibold tracking-tight",
	},
	{
		name: "Theo",
		domain: "theo.com",
		styleClass: "font-serif italic font-medium tracking-wide",
	},
	{
		name: "MILANO",
		domain: "milano.it",
		styleClass: "font-bold tracking-widest uppercase",
		badge: "M",
	},
	{
		name: "luminous",
		domain: "luminous.com",
		styleClass: "font-bold tracking-tight lowercase",
	},
]

export function OmrixLogosStrip() {
	return (
		<section className="relative overflow-hidden py-14 sm:py-20">
			<div className="mx-auto max-w-5xl px-4 text-center">
				{/* Section Subheading */}
				<p className="text-fg-tertiary text-xs font-semibold uppercase tracking-wider">
					Trusted by teams at world-class companies
				</p>

				{/* Logos Row */}
				<div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
					{companyLogos.map((company, index) => (
						<div
							key={`${company.name}-${index}`}
							className="text-fg-secondary hover:text-foreground flex items-center gap-2.5 opacity-70 transition-all hover:opacity-100">
							{company.badge ? (
								<span className="bg-neutral text-neutral-fg size-5.5 rounded-xs flex items-center justify-center text-[11px] font-black">
									{company.badge}
								</span>
							) : (
								<Image
									src={`https://www.google.com/s2/favicons?sz=32&domain=${company.domain}`}
									alt={`${company.name} logo`}
									width={18}
									height={18}
									unoptimized
									className="size-4.5 brightness-75 contrast-125 grayscale"
								/>
							)}
							<span className={`text-sm sm:text-base ${company.styleClass}`}>
								{company.name}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
