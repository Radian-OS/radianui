"use client"

import React from "react"
import Link from "next/link"
import { ArrowUpRight, Check, Zap } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/styles/default/ui/card"
import type { PricingPlan } from "./types"

interface PricingCardProps {
	plan: PricingPlan
}

export function PricingCard({ plan }: PricingCardProps) {
	return (
		<Card
			className={`border-soft bg-elevation-level1 relative flex flex-col gap-0 overflow-hidden rounded-3xl p-0 shadow-sm transition-all duration-300 hover:shadow-md ${
				plan.isPopular ? "ring-primary/20 ring-1" : ""
			}`}>
			{/* Top Subtle Gradient for Most Popular Plan */}
			{plan.isPopular && (
				<div
					aria-hidden="true"
					className="from-primary/50 via-primary-accent pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b to-transparent"
				/>
			)}

			{/* Top Header & Pricing Section */}
			<CardHeader className="border-soft relative z-10 flex flex-col gap-5 border-b p-6 sm:p-8">
				<div className="flex items-center justify-between gap-2">
					<CardTitle className="text-fg text-base font-semibold">
						{plan.name}
					</CardTitle>

					{plan.isPopular && (
						<Badge variant="strong">
							<Zap className="fill-current" />
							<span>{plan.badgeText || "Most popular"}</span>
						</Badge>
					)}
				</div>

				<div className="flex items-baseline gap-1.5">
					<span className="text-fg text-4xl font-bold tracking-tight sm:text-5xl">
						{plan.price}
					</span>
					<span className="text-fg-tertiary text-sm font-medium">
						/{plan.period}
					</span>
				</div>

				<CardDescription className="text-fg-secondary min-h-[40px] text-sm leading-relaxed">
					{plan.description}
				</CardDescription>

				<Button
					variant="strong"
					color="neutral"
					size="44"
					asChild
					className="w-full justify-between rounded-full pr-1.5 pl-6 font-semibold">
					<Link href={plan.buttonHref}>
						<span className="mx-auto">{plan.buttonText}</span>
						<span className="bg-bg text-fg flex size-8 shrink-0 items-center justify-center rounded-full shadow-xs">
							<ArrowUpRight className="size-4" />
						</span>
					</Link>
				</Button>
			</CardHeader>

			{/* Features Content Section */}
			<CardContent className="relative z-10 flex flex-1 flex-col gap-4 p-6 sm:p-8">
				<p className="text-fg text-sm font-semibold">{plan.featuresTitle}</p>

				<ul className="flex flex-col gap-3.5">
					{plan.features.map((feature, idx) => (
						<li key={idx} className="flex items-center gap-3">
							<span className="bg-fg text-bg flex size-4.5 shrink-0 items-center justify-center rounded-full">
								<Check className="size-2.5 stroke-[3]" />
							</span>
							<span className="text-fg-secondary text-sm font-normal">
								{feature}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
