"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"

interface Reviewer {
	name: string
	initials: string
	imageSrc: string
}

const reviewers: Reviewer[] = [
	{
		name: "Alex",
		initials: "AL",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/rough.webp",
	},
	{
		name: "Jessica",
		initials: "JE",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
	},
	{
		name: "Albert",
		initials: "AB",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/albert.webp",
	},
	{
		name: "Linda",
		initials: "LI",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/linda.webp",
	},
	{
		name: "Tom",
		initials: "TO",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/tom.webp",
	},
]

export function ReviewBadge() {
	return (
		<div className="flex flex-col items-center gap-3 sm:flex-row">
			{/* Overlapping Avatar Stack using canonical Radian UI Avatar */}
			<div className="flex items-center -space-x-2.5 pr-1">
				{reviewers.map((reviewer, index) => (
					<Avatar
						key={reviewer.name}
						size="40"
						rounded="circle"
						className="border-background border-2 shadow-2xs transition-transform duration-200 hover:z-20 hover:scale-110"
						style={{ zIndex: reviewers.length - index }}>
						<AvatarImage src={reviewer.imageSrc} alt={reviewer.name} />
						<AvatarFallback className="text-xs font-medium">
							{reviewer.initials}
						</AvatarFallback>
					</Avatar>
				))}
			</div>

			{/* Review Rating Count */}
			<p className="text-sm font-normal text-[#030712] dark:text-white">
				4.6 Rate by 18,000+ Reviews
			</p>
		</div>
	)
}
