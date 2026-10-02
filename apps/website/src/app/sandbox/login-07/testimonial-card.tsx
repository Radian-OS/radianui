"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Card, CardContent } from "@/styles/default/ui/card"
import type { TestimonialItem } from "./types"

interface TestimonialCardProps {
	testimonial: TestimonialItem
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
	return (
		<Card className="relative isolate h-[220px] w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-none ring-0 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
			<CardContent className="flex h-full flex-col justify-between p-0">
				<p className="line-clamp-4 text-sm leading-relaxed font-normal text-white/90">
					&ldquo;{testimonial.quote}&rdquo;
				</p>

				<div className="mt-auto flex items-center justify-between gap-3 pt-3">
					<div className="flex min-w-0 flex-1 flex-col gap-0.5">
						<span className="truncate text-xs font-medium text-white">
							{testimonial.author}
						</span>
						<span className="truncate text-xs text-white/50">
							{testimonial.role}
						</span>
					</div>

					<Avatar
						size="32"
						rounded="circle"
						className="shrink-0 border border-white/10 shadow-none">
						<AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} />
						<AvatarFallback className="bg-white/10 text-xs font-medium text-white">
							{testimonial.initials}
						</AvatarFallback>
					</Avatar>
				</div>
			</CardContent>
		</Card>
	)
}
