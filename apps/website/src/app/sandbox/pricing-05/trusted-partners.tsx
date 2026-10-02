"use client"

import React from "react"
import {
	Boxes,
	Globe,
	Infinity as InfinityIcon,
	Link2,
	SunMedium,
} from "lucide-react"

interface PartnerItem {
	id: string
	name: string
	icon: React.ElementType
	colorClass: string
}

const PARTNERS: PartnerItem[] = [
	{
		id: "1",
		name: "Logoipsum",
		icon: Link2,
		colorClass: "text-blue-500",
	},
	{
		id: "2",
		name: "Logoipsum",
		icon: SunMedium,
		colorClass: "text-orange-500",
	},
	{
		id: "3",
		name: "Logoipsum",
		icon: InfinityIcon,
		colorClass: "text-emerald-500",
	},
	{
		id: "4",
		name: "Logoipsum",
		icon: Globe,
		colorClass: "text-cyan-500",
	},
	{
		id: "5",
		name: "logoipsum*",
		icon: Boxes,
		colorClass: "text-rose-500",
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
				{partners.map((partner) => {
					const Icon = partner.icon
					return (
						<div
							key={partner.id}
							className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80">
							<Icon className={`size-5 ${partner.colorClass}`} />
							<span className="text-fg text-base font-bold tracking-tight">
								{partner.name}
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}
