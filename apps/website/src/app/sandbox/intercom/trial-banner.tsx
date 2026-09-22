"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"

export function TrialBanner() {
	return (
		<div className="text-fg flex min-h-10 w-full flex-wrap items-center justify-between gap-3 border-b border-purple-200/80 bg-purple-100/70 px-4 py-1.5 text-xs transition-colors select-none dark:border-purple-800/40 dark:bg-purple-950/40">
			{/* Left trial message */}
			<div className="flex items-center gap-1.5 font-normal">
				<span>You have</span>
				<span className="font-bold">8 days left</span>
				<span>in your</span>
				<Link href="#trial" className="font-medium underline hover:underline">
					Advanced trial
				</Link>
				<span>. Includes unlimited Fin usage.</span>
			</div>

			{/* Right actions */}
			<div className="flex items-center gap-4">
				<Link
					href="#specialist"
					className="text-fg-secondary hover:text-fg font-medium hover:underline">
					Talk to a product specialist
				</Link>
				<Button
					type="button"
					variant="strong"
					color="neutral"
					size="28"
					className="rounded-lg px-3 text-xs font-semibold shadow-xs">
					Buy Intercom
				</Button>
			</div>
		</div>
	)
}
