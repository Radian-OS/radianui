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
		<div className="text-fg flex flex-col justify-between p-6 sm:p-10 lg:p-14">
			{/* Top Header */}
			<div>
				<h1 className="heading-1 text-fg">Request a Free Quote</h1>
				<p className="text-fg-secondary mt-4 max-w-lg text-sm leading-relaxed sm:text-base">
					Tell us about your project and we&apos;ll provide a customized
					estimate within 24 hours. No hidden fees or obligations.
				</p>

				{/* Feature Highlights (Rule: rendered via .map) */}
				<div className="mt-10 flex flex-col gap-6">
					{features.map((feature) => (
						<div key={feature.title} className="flex items-start gap-4">
							<div className="border-border bg-fill2 text-fg flex size-10 shrink-0 items-center justify-center rounded-xl border shadow-xs backdrop-blur-md">
								<feature.icon className="size-5" />
							</div>
							<div>
								<h2 className="heading-6 text-fg">{feature.title}</h2>
								<p className="text-fg-secondary mt-0.5 text-xs">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom Direct Contact & Booking */}
			<div className="border-border/60 mt-12 border-t pt-8">
				<Link
					href="mailto:hello@shadcnspace@gmail.com"
					className="text-fg hover:text-primary text-sm font-semibold transition-colors">
					hello@shadcnspace@gmail.com
				</Link>

				<p className="text-fg-secondary mt-2 text-xs">
					Always busy and want to book an exact time to call?
				</p>

				<div className="mt-4">
					<Button
						variant="strong"
						color="neutral"
						size="36"
						asChild
						className="rounded-lg px-5 text-xs font-semibold shadow-sm transition-colors">
						<Link href="#book-call">Book a free call</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
