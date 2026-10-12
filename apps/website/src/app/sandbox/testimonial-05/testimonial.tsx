import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import data from "./data.json"

export function TestimonialSection() {
	const { quote, author, position, avatar, initials } = data.testimonial

	return (
		<div className="bg-bg-subtle/50 w-full px-5 py-15 sm:py-20 md:px-16">
			<div className="mx-auto flex max-w-screen-md flex-col items-center justify-center gap-6 text-center sm:gap-8">
				<Avatar size="64" rounded="circle" className="border-border border-2">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback className="text-base font-semibold">
						{initials}
					</AvatarFallback>
				</Avatar>

				<blockquote className="text-fg text-lg font-medium sm:text-xl md:text-2xl lg:leading-relaxed">
					{quote}
				</blockquote>

				<div className="flex flex-col gap-1 text-center">
					<cite className="text-fg text-base font-semibold not-italic">
						{author}
					</cite>
					<span className="text-fg-secondary text-sm sm:text-base">
						{position}
					</span>
				</div>
			</div>
		</div>
	)
}

export default TestimonialSection
