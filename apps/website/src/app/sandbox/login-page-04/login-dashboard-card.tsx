"use client"

import React from "react"
import Image from "next/image"
import { Card } from "@/styles/default/ui/card"

export function LoginDashboardCard() {
	return (
		<div className="relative flex min-h-[560px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#121316] p-8 sm:min-h-[640px] sm:p-12 lg:min-h-screen lg:rounded-none lg:p-16">
			{/* Top Heading Content */}
			<div className="relative z-10 flex flex-col gap-3">
				<h2 className="heading-2 max-w-lg font-bold text-white">
					Welcome back! Please sign in to your Shadcn Studio account
				</h2>
				<p className="max-w-md text-xs leading-relaxed text-white/70 sm:text-sm">
					Thank you for registering! Please check your inbox and click the
					verification link to activate your account.
				</p>
			</div>

			{/* Bottom Dashboard Preview Image (Rule 10 & 35: placeholder.svg) */}
			<div className="relative z-10 mt-8 w-full">
				<Card className="overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-2xl">
					<div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-100">
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
