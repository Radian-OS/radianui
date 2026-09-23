"use client"

import React from "react"
import { Card, CardContent } from "@/styles/default/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/styles/default/ui/avatar"
import type { ExperienceItem } from "./types"

interface ExperienceCardProps {
	item: ExperienceItem
}

export function ExperienceCard({ item }: ExperienceCardProps) {
	// Parse period to highlight PRESENT in green if current
	const renderPeriod = () => {
		if (item.period.includes("PRESENT")) {
			const parts = item.period.split("PRESENT")
			return (
				<>
					{parts[0]}
					<span className="font-semibold text-emerald-400">PRESENT</span>
					{parts[1] || ""}
				</>
			)
		}
		return item.period
	}

	return (
		<Card className="flex flex-col gap-4 border-white/10 bg-neutral-900/60 p-5 shadow-lg backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-neutral-900/80">
			<CardContent className="flex flex-col gap-3 p-0">
				{/* Top Row: Logo & Job Details */}
				<div className="flex items-start gap-4">
					<Avatar
						size="40"
						rounded="square"
						className="shrink-0 border border-white/10 bg-neutral-800">
						<AvatarImage
							src={`https://www.google.com/s2/favicons?sz=64&domain=${item.domain}`}
							alt={`${item.company} logo`}
						/>
						<AvatarFallback className="text-xs font-bold text-white">
							{item.initials}
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-1 flex-col">
						<h3 className="text-base font-bold text-white">{item.company}</h3>
						<span className="text-xs font-medium text-neutral-300">
							{item.role}
						</span>
						<span className="pt-0.5 font-mono text-[11px] tracking-wider text-neutral-400 uppercase">
							{renderPeriod()}
						</span>
					</div>
				</div>

				{/* Role Description */}
				<p className="text-xs leading-relaxed text-neutral-400 sm:text-[13px]">
					{item.description}
				</p>
			</CardContent>
		</Card>
	)
}
