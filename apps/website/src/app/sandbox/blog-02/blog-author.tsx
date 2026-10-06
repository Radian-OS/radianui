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
		<div className="border-soft bg-elevation-level1 flex w-fit items-center gap-3 rounded-full border px-3.5 py-1.5">
			<Avatar size="32" rounded="circle">
				<AvatarImage src={author.avatarUrl} alt={author.name} />
				<AvatarFallback className="text-fg text-[11px] font-semibold">
					{initials}
				</AvatarFallback>
			</Avatar>

			<div className="flex flex-col">
				<span className="text-fg text-xs font-semibold">{author.name}</span>
				<span className="text-fg-secondary text-xs">
					{author.role} <span className="opacity-40">|</span> {author.date}{" "}
					<span className="opacity-40">|</span> {author.readTime}
				</span>
			</div>
		</div>
	)
}
