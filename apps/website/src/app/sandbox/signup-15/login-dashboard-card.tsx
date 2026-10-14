"use client"

import React from "react"
import Link from "next/link"
import { WavesRipplesGradient } from "./waves-ripples-gradient"
import { WorkforceDashboardCard } from "./workforce-dashboard-card"

export function LoginDashboardCard() {
	return (
		<div className="relative flex h-full min-h-[640px] flex-col justify-between overflow-x-hidden overflow-y-auto bg-[#020305] p-6 text-white select-none sm:p-8 lg:p-10 xl:p-12">
			{/* Animated Waves, Ripples, Blurry Shapes Dark Silver Metallic Gradient Background */}
			<div className="absolute inset-0 z-0">
				<WavesRipplesGradient />
			</div>

			{/* Top Bar: Brand Logo */}
			<div className="relative z-10 flex w-full items-center justify-between pb-4">
				<div className="flex w-fit items-center gap-2">
					<img src="/logo.svg" alt="Radian Logo" className="size-8" />
					<span className="text-xl font-bold">Radian</span>
				</div>
			</div>

			{/* Center: Workforce Dashboard Card + Overlapping Add Member Modal + Logos */}
			<div className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-2">
				<WorkforceDashboardCard />
			</div>

			{/* Bottom Left Section Text */}
			<div className="relative z-10 mt-auto w-full pt-6">
				<h3 className="text-[24px] leading-tight font-bold tracking-tight text-white">
					Create more. Design smarter.
				</h3>
				<p className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/75 sm:max-w-2xl lg:max-w-3xl">
					Join a community of creators using Radian to turn bold ideas into
					beautiful products. Bring your vision to life, faster than ever.
				</p>
			</div>
		</div>
	)
}
