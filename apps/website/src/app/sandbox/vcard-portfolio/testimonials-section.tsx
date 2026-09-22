"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Card, CardContent } from "@/styles/default/ui/card"
import { TESTIMONIALS } from "./types"

export function TestimonialsSection() {
	return (
		<div className="flex flex-col gap-5">
			<h2 className="heading-5 text-foreground">Testimonials</h2>

			{/* 2-column testimonial cards */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{TESTIMONIALS.map((testimonial) => (
					<Card
						key={testimonial.id}
						className="border-border/70 bg-elevation-level1/20 relative rounded-2xl border p-5 shadow-xs transition-all hover:border-amber-400/30">
						<CardContent className="flex flex-col gap-3.5 p-0">
							<div className="flex items-center gap-3">
								<Avatar
									size="40"
									rounded="circle"
									className="border-border/60 border">
									<AvatarImage
										src={testimonial.avatarUrl}
										alt={testimonial.name}
									/>
									<AvatarFallback className="text-xs font-bold">
										{testimonial.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<span className="text-foreground text-sm font-bold">
										{testimonial.name}
									</span>
								</div>
							</div>
							<p className="text-fg-secondary text-xs leading-relaxed">
								{testimonial.content}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Scroll / Carousel progress indicator */}
			<div className="bg-border/40 mx-auto mt-2 h-1.5 w-48 overflow-hidden rounded-full">
				<div className="h-full w-24 rounded-full bg-amber-400 transition-all duration-300" />
			</div>
		</div>
	)
}
