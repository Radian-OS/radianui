"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { BLOG_AUTHOR } from "./types"

export function BlogAuthorBio() {
	const initials = BLOG_AUTHOR.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()

	return (
		<div className="border-border/50 flex items-start gap-4 border-b pb-8">
			<Avatar size="40" rounded="circle" className="border-border/60 border">
				<AvatarImage src={BLOG_AUTHOR.avatarUrl} alt={BLOG_AUTHOR.name} />
				<AvatarFallback className="text-fg text-xs font-semibold">
					{initials}
				</AvatarFallback>
			</Avatar>

			<div className="flex flex-col">
				<span className="text-fg text-sm font-semibold">
					Written by {BLOG_AUTHOR.name}
				</span>
				<p className="text-fg-secondary mt-1 text-xs leading-relaxed sm:text-sm">
					{BLOG_AUTHOR.bio}
				</p>
			</div>
		</div>
	)
}
