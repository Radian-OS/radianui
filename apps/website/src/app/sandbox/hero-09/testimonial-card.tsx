"use client"

import React from "react"

export function TestimonialCard() {
	return (
		<div className="border-border flex h-full w-full flex-col justify-between rounded-xl border bg-gray-950 p-8 shadow-xs dark:bg-zinc-950">
			{/* Main Quote Text */}
			<p className="text-2xl leading-snug font-normal text-white">
				&ldquo;Working with them helped us turn scattered ideas into a powerful
				&amp; consistent.&rdquo;
			</p>

			{/* Author Information */}
			<div className="flex flex-col gap-0.5 pt-4">
				<p className="text-sm font-medium text-white">Jonathan Doe</p>
				<p className="text-xs text-white/50">Head of Finance @SHADCN SPACE</p>
			</div>
		</div>
	)
}
