"use client"

import React from "react"
import { Compass, Cpu, Layers, Sparkles, Wind } from "lucide-react"

interface PartnerLogo {
	name: string
	icon: React.ComponentType<{ className?: string }>
}

const partnerLogos: PartnerLogo[] = [
	{ name: "Bioplex", icon: Sparkles },
	{ name: "Zenithia", icon: Compass },
	{ name: "Nexiflow", icon: Layers },
	{ name: "Vortexia", icon: Wind },
	{ name: "LUMITRIX", icon: Cpu },
]

export function AiworkLogosStrip() {
	return (
		<section className="border-border/60 bg-fill1/30 border-y py-12">
			<div className="mx-auto max-w-5xl px-4 text-center">
				<p className="text-fg-tertiary text-xs font-semibold uppercase tracking-wider">
					Trusted by 10,000+ founders &amp; business owners
				</p>

				<div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-14">
					{partnerLogos.map((logo) => {
						const Icon = logo.icon
						return (
							<div
								key={logo.name}
								className="text-fg-tertiary hover:text-foreground flex items-center gap-2 transition-colors duration-200">
								<Icon className="size-5 opacity-70" />
								<span className="text-base font-bold tracking-tight">
									{logo.name}
								</span>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
