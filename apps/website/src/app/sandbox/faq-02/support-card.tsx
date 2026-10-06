"use client"

import React from "react"
import Link from "next/link"
import { HelpCircle, Mail, MessageSquare } from "lucide-react"
import { Card } from "@/styles/default/ui/card"
import { Button } from "@/styles/default/ui/button"
import type { SupportCardData } from "./types"

const DEFAULT_SUPPORT_DATA: SupportCardData = {
	title: "Still Have Questions?",
	description:
		"Tell us your stack and timeline. A real engineer replies within a business day.",
	buttonText: "Talk to Support",
	buttonHref: "#support",
	email: "support@reui.dev",
}

interface SupportCardProps {
	support?: SupportCardData
}

export function SupportCard({
	support = DEFAULT_SUPPORT_DATA,
}: SupportCardProps) {
	return (
		<Card className="border-border/80 bg-elevation-level1/95 rounded-2xl border p-6 shadow-sm sm:p-8">
			<div className="flex flex-col gap-6">
				<div className="border-border bg-fill2/60 text-fg flex size-10 items-center justify-center rounded-lg border">
					<HelpCircle className="text-primary size-5" />
				</div>

				<div className="space-y-2">
					<h3 className="text-fg text-xl font-semibold">{support.title}</h3>
					<p className="text-fg-secondary text-sm leading-relaxed">
						{support.description}
					</p>
				</div>

				<Button
					variant="strong"
					color="neutral"
					size="44"
					asChild
					className="w-full rounded-xl font-medium">
					<Link
						href={support.buttonHref}
						className="flex items-center justify-center gap-2">
						<MessageSquare className="size-4" />
						<span>{support.buttonText}</span>
					</Link>
				</Button>

				<div className="text-fg-secondary flex items-center gap-2 text-xs">
					<Mail className="text-fg-tertiary size-3.5" />
					<span>Prefer email?</span>
					<Link
						href={`mailto:${support.email}`}
						className="text-fg hover:text-primary font-medium transition-colors">
						{support.email}
					</Link>
				</div>
			</div>
		</Card>
	)
}
