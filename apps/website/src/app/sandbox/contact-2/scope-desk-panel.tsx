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
		<div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-950 p-8 text-white sm:p-12">
			{/* Dot matrix texture overlay */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40"
				aria-hidden="true"
			/>

			{/* Subtle curved wave glow accents */}
			<div
				className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-blue-500/25 blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute bottom-0 left-0 size-80 rounded-full bg-purple-500/20 blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.3),transparent_70%)] opacity-30"
				aria-hidden="true"
			/>

			{/* Top Content: Scope Desk Eyebrow + Main Headline */}
			<div className="relative z-10">
				<div>
					<Badge
						variant="outline"
						color="neutral"
						className="rounded-full border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
						Scope Desk
					</Badge>
				</div>

				<h2 className="heading-1 mt-8 text-white">
					Got A Launch <br className="hidden sm:inline" />
					In Motion?
				</h2>
			</div>

			{/* Bottom Content: Description & Contact Badges */}
			<div className="relative z-10 mt-16 sm:mt-24">
				<p className="max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
					Plan adoption, registry setup, and launch polish before work drifts.
				</p>

				{/* Contact Pills (Rendered via .map, No Underline rule) */}
				<div className="mt-8 flex flex-wrap items-center gap-3">
					{contactLinks.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20">
							<item.icon className="size-4 shrink-0 text-white/90" />
							<span>{item.label}</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
