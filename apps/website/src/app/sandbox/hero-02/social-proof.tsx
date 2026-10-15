"use client"

import React from "react"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import type { Reviewer } from "./types"

const DEFAULT_REVIEWERS: Reviewer[] = [
	{
		id: "rev-1",
		name: "Alex Vance",
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/11.png",
		initials: "AV",
	},
	{
		id: "rev-2",
		name: "Sarah Miller",
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/42.png",
		initials: "SM",
	},
	{
		id: "rev-3",
		name: "David Kim",
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/108.png",
		initials: "DK",
	},
]

interface SocialProofProps {
	reviewers?: Reviewer[]
	rating?: number
}

export function SocialProof({
	reviewers = DEFAULT_REVIEWERS,
	rating = 4.2,
}: SocialProofProps) {
	return (
		<div className="flex items-center gap-3.5 pt-4">
			{/* Canonical Radian OS Avatar Stack */}
			<div className="flex shrink-0 -space-x-3">
				{reviewers.map((rev) => (
					<Avatar
						key={rev.id}
						size="lg"
						rounded="circle"
						className="border-bg border-2 shadow-xs">
						<AvatarImage src={rev.avatarUrl} alt={rev.name} />
						<AvatarFallback className="bg-fill2 text-fg text-xs font-semibold">
							{rev.initials}
						</AvatarFallback>
					</Avatar>
				))}
			</div>

			{/* Rating Text */}
			<p className="text-fg-secondary text-sm leading-snug font-normal">
				Rated{" "}
				<span className="text-fg inline-flex items-center gap-1 align-baseline font-semibold">
					<Star className="fill-fg text-fg size-3.5 shrink-0" />
					{rating.toFixed(1)}
				</span>{" "}
				by founders,
				<br />
				builders and teams
			</p>
		</div>
	)
}
