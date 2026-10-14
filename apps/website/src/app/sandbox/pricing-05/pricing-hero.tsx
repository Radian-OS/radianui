"use client"

import React from "react"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Badge } from "@/styles/default/ui/badge"
import { TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
import { REVIEW_AVATARS } from "./pricing-data"

export function PricingHero() {
	return (
		<div className="flex flex-col gap-10 pt-12 pb-8 sm:pt-16">
			{/* Top Row: Heading on Left, Avatar Rating on Right */}
			<div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
				{/* Title following Rule 2 */}
				<h1 className="heading-1 max-w-2xl">
					We&apos;ve got a{" "}
					<span className="font-serif font-normal italic">plan</span>
					<br />
					<span className="font-serif font-normal italic">
						that&apos;s perfect
					</span>{" "}
					for you
				</h1>

				{/* Right: Review Avatars & Star Rating */}
				<div className="flex items-center gap-4">
					{/* Overlapping Avatar Stack using Canonical Radian OS Avatar */}
					<div className="flex -space-x-1.5 overflow-hidden">
						{REVIEW_AVATARS.map((user) => (
							<Avatar
								key={user.name}
								size="md"
								rounded="circle"
								className="bg-fg">
								<AvatarImage src={user.url} alt={user.name} />
								<AvatarFallback>{user.initials}</AvatarFallback>
							</Avatar>
						))}
					</div>

					{/* Stars and Review Count */}
					<div className="flex flex-col gap-0.5">
						<div className="flex items-center gap-1">
							<div className="flex items-center text-amber-400">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										className="size-3.5 fill-current stroke-transparent"
									/>
								))}
							</div>
							<span className="text-fg text-sm font-bold">5.0</span>
						</div>
						<p className="text-fg-secondary text-xs font-medium">
							from 4,000+ reviews
						</p>
					</div>
				</div>
			</div>

			{/* Bottom: Tabs Switcher (Monthly / Annual) */}
			<div className="flex items-center">
				<TabsList className="bg-fill2 rounded-xl p-1">
					<TabsTrigger value="monthly" className="rounded-lg px-4 py-2 text-sm">
						Monthly billing
					</TabsTrigger>
					<TabsTrigger
						value="annual"
						className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm">
						<span>Annual billing</span>
						<Badge variant="soft" color="neutral" size="sm">
							Save 16%
						</Badge>
					</TabsTrigger>
				</TabsList>
			</div>
		</div>
	)
}
