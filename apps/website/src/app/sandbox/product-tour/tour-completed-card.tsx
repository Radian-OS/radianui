"use client"

import React from "react"
import { CheckCircle2, RotateCcw } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"

interface TourCompletedCardProps {
	onRestart: () => void
}

export function TourCompletedCard({ onRestart }: TourCompletedCardProps) {
	return (
		<Card className="border-border/80 bg-card w-full max-w-xl rounded-2xl border p-8 text-center shadow-xl">
			<CardContent className="flex flex-col items-center gap-4 p-0">
				<div className="bg-success/15 text-success flex size-12 items-center justify-center rounded-full">
					<CheckCircle2 className="size-7 stroke-[2.2]" />
				</div>
				<div className="flex flex-col gap-1.5">
					<h3 className="heading-6 text-foreground">Tour Completed!</h3>
					<p className="text-fg-secondary max-w-md text-xs leading-relaxed sm:text-sm">
						You&apos;re all set to explore your workspace. You can revisit this
						interactive walkthrough anytime from your settings.
					</p>
				</div>
				<Button
					type="button"
					variant="strong"
					color="neutral"
					size="36"
					className="mt-2 gap-2 font-medium shadow-xs"
					onClick={onRestart}>
					<RotateCcw className="size-3.5" />
					Restart Tour
				</Button>
			</CardContent>
		</Card>
	)
}
