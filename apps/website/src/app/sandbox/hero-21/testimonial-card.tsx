"use client"

import React from "react"
import { Quote } from "lucide-react"

export function TestimonialCard() {
	return (
		<div className="border-border bg-fill1/60 shadow-xs flex h-full min-h-[320px] flex-col justify-between rounded-2xl border p-6 backdrop-blur-sm sm:min-h-[380px] sm:p-8">
			{/* Quote Icon & Content */}
			<div className="flex flex-col gap-4">
				<div className="bg-fill3 text-primary flex size-8 items-center justify-center rounded-lg">
					<Quote className="size-4" />
				</div>
				<p className="text-foreground text-xl font-normal leading-snug sm:text-2xl">
					&ldquo;Working with them helped us turn scattered ideas into a
					powerful &amp; consistent.&rdquo;
				</p>
			</div>

			{/* Author Details */}
			<div className="border-border/50 mt-8 flex flex-col gap-0.5 border-t pt-4">
				<p className="text-foreground text-sm font-semibold">Jonathan Doe</p>
				<p className="text-fg-tertiary text-xs">
					Head of Finance @SHADCN SPACE
				</p>
			</div>
		</div>
	)
}
