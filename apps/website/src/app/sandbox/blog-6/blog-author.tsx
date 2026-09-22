"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import type { BlogAuthor as BlogAuthorType } from "./types"

interface BlogAuthorProps {
	author: BlogAuthorType
}

export function BlogAuthor({ author }: BlogAuthorProps) {
	const initials = author.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()

	return (
		<div className="border-border/80 bg-elevation-level1/70 flex w-fit items-center gap-3 rounded-full border px-3.5 py-1.5 shadow-2xs backdrop-blur-xs">
			<Avatar size="32" rounded="circle" className="border-border/60 border">
				<AvatarImage src={author.avatarUrl} alt={author.name} />
				<AvatarFallback className="text-fg text-[11px] font-semibold">
					{initials}
				</AvatarFallback>
			</Avatar>

			<div className="flex flex-col">
				<span className="text-fg text-xs font-semibold">{author.name}</span>
				<span className="text-fg-secondary text-[11px]">
					{author.role} <span className="opacity-40">|</span> {author.date}{" "}
					<span className="opacity-40">|</span> {author.readTime}
				</span>
			</div>
		</div>
	)
}
