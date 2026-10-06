"use client"

import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import type { Cta09Button } from "./types"

const DEFAULT_HEADER_DATA = {
	heading: "Cleaning that works around your routine",
	description:
		"From quick touch-ups to deep cleaning, keep your space fresh without the hassle.",
	primaryButton: {
		text: "Book a service",
		href: "#book",
	} as Cta09Button,
	secondaryButton: {
		text: "Explore services",
		href: "#services",
	} as Cta09Button,
}

interface CtaHeaderProps {
	heading?: string
	description?: string
	primaryButton?: Cta09Button
	secondaryButton?: Cta09Button
}

export function CtaHeader({
	heading = DEFAULT_HEADER_DATA.heading,
	description = DEFAULT_HEADER_DATA.description,
	primaryButton = DEFAULT_HEADER_DATA.primaryButton,
	secondaryButton = DEFAULT_HEADER_DATA.secondaryButton,
}: CtaHeaderProps) {
	return (
		<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
			{/* Left Column: Main Heading */}
			<div className="lg:col-span-6">
				<h2 className="heading-2 text-fg max-w-xl">{heading}</h2>
			</div>

			{/* Spacer Column */}
			<div className="hidden lg:col-span-1 lg:block" />

			{/* Right Column: Description & Action Buttons */}
			<div className="lg:col-span-5">
				<div className="flex flex-col gap-6">
					<p className="text-fg-secondary text-base leading-relaxed sm:text-lg">
						{description}
					</p>

					<div className="flex flex-wrap items-center gap-3 sm:gap-4">
						<Button
							variant="strong"
							color="neutral"
							size="44"
							asChild
							className="gap-2 rounded-lg px-5 font-medium transition-transform active:scale-95">
							<Link href={primaryButton.href}>
								<ArrowUpRight className="size-4" />
								<span>{primaryButton.text}</span>
							</Link>
						</Button>

						<Button
							variant="soft"
							color="neutral"
							size="44"
							asChild
							className="gap-2 rounded-lg px-5 font-medium transition-transform active:scale-95">
							<Link href={secondaryButton.href}>
								<ArrowUpRight className="size-4" />
								<span>{secondaryButton.text}</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
