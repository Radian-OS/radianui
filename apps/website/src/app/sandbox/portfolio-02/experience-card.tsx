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
					<span className="text-success font-semibold">PRESENT</span>
					{parts[1] || ""}
				</>
			)
		}
		return item.period
	}

	return (
		<Card className="border-border bg-card hover:border-alpha hover:bg-fill1 flex flex-col gap-4 p-5 shadow-lg backdrop-blur-sm transition-colors">
			<CardContent className="flex flex-col gap-3 p-0">
				{/* Top Row: Logo & Job Details */}
				<div className="flex items-start gap-4">
					<Avatar
						size="40"
						rounded="square"
						className="border-border bg-fill2 shrink-0 border">
						<AvatarImage
							src={`https://www.google.com/s2/favicons?sz=64&domain=${item.domain}`}
							alt={`${item.company} logo`}
						/>
						<AvatarFallback className="text-fg text-xs font-bold">
							{item.initials}
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-1 flex-col">
						<h3 className="text-fg text-base font-bold">{item.company}</h3>
						<span className="text-fg-secondary text-xs font-medium">
							{item.role}
						</span>
						<span className="text-fg-tertiary pt-0.5 font-mono text-[11px] tracking-wider uppercase">
							{renderPeriod()}
						</span>
					</div>
				</div>

				{/* Role Description */}
				<p className="text-fg-secondary text-xs leading-relaxed sm:text-[13px]">
					{item.description}
				</p>
			</CardContent>
		</Card>
	)
}
