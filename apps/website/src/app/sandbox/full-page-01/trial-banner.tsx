"use client"

import React from "react"
import Link from "next/link"
import { Banner } from "@/styles/default/ui/banner"
import { Button } from "@/styles/default/ui/button"

export function TrialBanner() {
	return (
		<Banner>
			<div className="flex items-center gap-1.5 font-normal">
				<span>You have</span>
				<span className="font-bold">8 days left</span>
				<span>in your</span>
				Advanced trial
				<span>. Includes unlimited Fin usage.</span>
			</div>

			{/* Right actions */}
			<div className="flex items-center gap-4">
				<Link
					href="#specialist"
					className="text-fg-secondary hover:text-fg font-medium">
					Talk to a product specialist
				</Link>
				<Button type="button" variant="strong" color="neutral" size="28">
					Buy Intercom
				</Button>
			</div>
		</Banner>
	)
}
