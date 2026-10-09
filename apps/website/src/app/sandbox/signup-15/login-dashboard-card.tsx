"use client"

import React from "react"

export function LoginDashboardCard() {
	return (
		<div className="flex h-full flex-col items-center justify-between gap-12 bg-neutral-950 p-10 text-white max-lg:hidden xl:p-16">
			{/* Top Heading Content */}
			<div className="w-full text-left">
				<h1 className="mb-6 text-3xl font-bold text-white">
					A new beginning for all your ideas and ambitions.
				</h1>
				<p className="text-xl tracking-[-0.02em] text-white/90">
					Create an account, explore new possibilities, and bring your ideas to
					life.
				</p>
			</div>

			{/* Center Dashboard Preview Card - exact 472px height and 569px max-width matching reference */}
			<div className="flex h-[472px] w-full max-w-[569px] items-center justify-center rounded-xl border-[12px] border-white bg-white shadow-2xl">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/auth/image-1.png"
					alt="dashboard"
					className="size-full rounded-xl object-contain"
				/>
			</div>

			{/* Bottom Brand Logos Pill */}
			<div className="flex shrink-0 gap-2 rounded-full bg-white/20 px-3 py-2">
				<a
					href="#"
					className="flex size-9 items-center justify-center rounded-full bg-white">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/tailwind-logo.png"
						alt="TailwindCSS Logo"
						className="w-7 object-contain"
					/>
				</a>
				<a
					href="#"
					className="flex size-9 items-center justify-center rounded-full bg-white">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/nextjs-logo.png"
						alt="Next.js Logo"
						className="w-5.5 object-contain"
					/>
				</a>
				<a
					href="#"
					className="flex size-9 items-center justify-center rounded-full bg-white">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/shadcn-logo.png"
						alt="Shadcn Logo"
						className="w-5.5 object-contain"
					/>
				</a>
			</div>
		</div>
	)
}
