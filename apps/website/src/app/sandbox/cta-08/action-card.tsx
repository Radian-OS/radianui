import React from "react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import type { ActionCardData } from "./types"

const DEFAULT_ACTION_DATA: ActionCardData = {
	titleLine1: "See what we create.",
	titleLine2: "start building today.",
	secondaryButtonText: "See our work",
	secondaryButtonHref: "#work",
	primaryButtonText: "Start your project",
	primaryButtonHref: "#start",
}

interface ActionCardProps {
	data?: Partial<ActionCardData>
}

export function ActionCard({ data }: ActionCardProps) {
	const action = { ...DEFAULT_ACTION_DATA, ...data }

	return (
		<Card className="border-border/80 bg-background/95 rounded-2xl border p-6 shadow-2xl backdrop-blur-md sm:p-8">
			<CardContent className="flex flex-col gap-6 p-0 sm:flex-row sm:items-center sm:justify-between">
				{/* Callout headline */}
				<p className="text-foreground max-w-xs text-2xl leading-snug font-medium tracking-tight lg:text-3xl">
					{action.titleLine1}{" "}
					<span className="text-fg-secondary">{action.titleLine2}</span>
				</p>

				{/* Button Actions */}
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
					<Button
						variant="outline"
						color="neutral"
						size="48"
						asChild
						className="rounded-full px-6 font-medium">
						<Link href={action.secondaryButtonHref}>
							{action.secondaryButtonText}
						</Link>
					</Button>

					<Button
						variant="strong"
						color="neutral"
						size="48"
						asChild
						className="rounded-full bg-white px-6 font-semibold text-zinc-950 shadow-md transition-transform hover:bg-zinc-200 active:scale-95">
						<Link href={action.primaryButtonHref}>
							{action.primaryButtonText}
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
