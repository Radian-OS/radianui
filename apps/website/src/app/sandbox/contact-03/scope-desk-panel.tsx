import React from "react"
import { Headphones, Mail } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/styles/default/ui/badge"

const contactLinks = [
	{
		icon: Mail,
		label: "studio@reui.example",
		href: "mailto:studio@reui.example",
	},
	{
		icon: Headphones,
		label: "+1 415 555 0184",
		href: "tel:+14155550184",
	},
]

export function ScopeDeskPanel() {
	return (
		<div className="from-elevation-level1 via-fill2 to-elevation-level2 text-fg relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-8 sm:p-12">
			{/* Dot matrix texture overlay */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-fg)_1px,transparent_1px)] bg-[size:16px_16px] opacity-10"
				aria-hidden="true"
			/>

			{/* Subtle curved wave glow accents */}
			<div
				className="bg-primary/20 pointer-events-none absolute -top-24 -right-24 size-96 rounded-full blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="bg-info/20 pointer-events-none absolute bottom-0 left-0 size-80 rounded-full blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--color-primary)_30%,transparent),transparent_70%)] opacity-30"
				aria-hidden="true"
			/>

			{/* Top Content: Scope Desk Eyebrow + Main Headline */}
			<div className="relative z-10">
				<div>
					<Badge
						variant="outline"
						color="neutral"
						className="border-border/60 bg-fill2/60 text-fg rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm">
						Scope Desk
					</Badge>
				</div>

				<h2 className="heading-1 text-fg mt-8">
					Got A Launch <br className="hidden sm:inline" />
					In Motion?
				</h2>
			</div>

			{/* Bottom Content: Description & Contact Badges */}
			<div className="relative z-10 mt-16 sm:mt-24">
				<p className="text-fg-secondary max-w-md text-sm leading-relaxed sm:text-base">
					Plan adoption, registry setup, and launch polish before work drifts.
				</p>

				{/* Contact Pills (Rendered via .map, No Underline rule) */}
				<div className="mt-8 flex flex-wrap items-center gap-3">
					{contactLinks.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="border-border bg-fill2 text-fg hover:bg-fill3 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium backdrop-blur-md transition-colors">
							<item.icon className="text-fg size-4 shrink-0" />
							<span>{item.label}</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
