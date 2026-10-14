"use client"

import React from "react"
import Image from "next/image"
import { Card } from "@/styles/default/ui/card"

export function LoginDashboardCard() {
	return (
		<div className="border-soft bg-elevation-level1 relative hidden min-h-[560px] w-full flex-col justify-between gap-5 overflow-hidden rounded-3xl border p-8 sm:min-h-[640px] sm:p-12 lg:flex lg:min-h-screen lg:rounded-none lg:p-16">
			{/* Top Heading Content */}
			<div className="relative z-10 flex flex-col gap-3">
				<h2 className="heading-2 max-w-lg">
					Welcome back! Please sign in to your Radian account
				</h2>
				<p className="text-fg-secondary max-w-md leading-relaxed sm:text-sm">
					Thank you for registering! Please check your inbox and click the
					verification link to activate your account.
				</p>
			</div>

			{/* Bottom Dashboard Preview Image (Rule 10 & 35: placeholder.svg) */}
			<div className="relative z-10 w-full">
				<Card className="border-soft bg-card overflow-hidden rounded-2xl border p-2 shadow-2xl">
					<div className="bg-fill2 relative aspect-[16/10] w-full overflow-hidden rounded-xl">
						<Image
							src="/sandbox/auth-1-editorial.jpg"
							alt="Dashboard preview"
							fill
							sizes="(max-width: 780px) 100vw, 50vw"
							className="object-cover"
							priority
						/>
					</div>
				</Card>
			</div>
		</div>
	)
}
