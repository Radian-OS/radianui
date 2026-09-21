import React from "react"
import { Clock, DollarSign, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import type { FeatureItem } from "./types"

const features: FeatureItem[] = [
	{
		icon: Clock,
		title: "Fast Response",
		description: "We respond within 24 hours",
	},
	{
		icon: DollarSign,
		title: "Custom Pricing",
		description: "Tailored to your budget",
	},
	{
		icon: ShieldCheck,
		title: "No Obligation",
		description: "Free consultation, no strings attached",
	},
]

export function InfoPanel() {
	return (
		<div className="flex flex-col justify-between p-6 text-white sm:p-10 lg:p-14">
			{/* Top Header */}
			<div>
				<h1 className="heading-1 text-white">Request a Free Quote</h1>
				<p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-300 sm:text-base">
					Tell us about your project and we&apos;ll provide a customized
					estimate within 24 hours. No hidden fees or obligations.
				</p>

				{/* Feature Highlights (Rule: rendered via .map) */}
				<div className="mt-10 flex flex-col gap-6">
					{features.map((feature) => (
						<div key={feature.title} className="flex items-start gap-4">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-xs backdrop-blur-md">
								<feature.icon className="size-5" />
							</div>
							<div>
								<h2 className="heading-6 text-white">{feature.title}</h2>
								<p className="mt-0.5 text-xs text-zinc-300">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom Direct Contact & Booking */}
			<div className="mt-12 border-t border-white/10 pt-8">
				<Link
					href="mailto:hello@shadcnspace@gmail.com"
					className="hover:text-primary text-sm font-semibold text-white transition-colors">
					hello@shadcnspace@gmail.com
				</Link>

				<p className="mt-2 text-xs text-zinc-400">
					Always busy and want to book an exact time to call?
				</p>

				<div className="mt-4">
					<Button
						variant="strong"
						color="neutral"
						size="36"
						asChild
						className="rounded-lg bg-white px-5 text-xs font-semibold text-zinc-950 shadow-sm transition-colors hover:bg-zinc-200">
						<Link href="#book-call">Book a free call</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
