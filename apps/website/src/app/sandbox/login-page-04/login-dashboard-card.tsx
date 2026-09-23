"use client"

import React from "react"
import Image from "next/image"
import { Card } from "@/styles/default/ui/card"

export function LoginDashboardCard() {
	return (
		<div className="border-border bg-elevation-level2 relative flex min-h-[560px] w-full flex-col justify-between overflow-hidden rounded-3xl border p-8 sm:min-h-[640px] sm:p-12 lg:min-h-screen lg:rounded-none lg:p-16">
			{/* Top Heading Content */}
			<div className="relative z-10 flex flex-col gap-3">
				<h2 className="heading-2 text-fg max-w-lg font-bold">
					Welcome back! Please sign in to your Shadcn Studio account
				</h2>
				<p className="text-fg-secondary max-w-md text-xs leading-relaxed sm:text-sm">
					Thank you for registering! Please check your inbox and click the
					verification link to activate your account.
				</p>
			</div>

			{/* Bottom Dashboard Preview Image (Rule 10 & 35: placeholder.svg) */}
			<div className="relative z-10 mt-8 w-full">
				<Card className="border-border bg-card overflow-hidden rounded-2xl border p-2 shadow-2xl">
					<div className="bg-fill2 relative aspect-[16/10] w-full overflow-hidden rounded-xl">
						<Image
							src="/sandbox/placeholder.svg"
							alt="Dashboard preview"
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
							className="object-cover"
							priority
						/>
					</div>
				</Card>
			</div>
		</div>
	)
}
