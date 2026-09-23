"use client"

import React from "react"

export function AboutSection() {
	return (
		<div className="flex flex-col gap-4">
			{/* Heading with accent underline */}
			<div className="flex flex-col gap-2">
				<h1 className="heading-4 text-fg">About Me</h1>
				<div className="bg-warning h-1.5 w-10 rounded-full" />
			</div>

			{/* Bio descriptions */}
			<div className="text-fg-secondary flex flex-col gap-3.5 pt-2 text-xs leading-relaxed sm:text-sm">
				<p>
					I&apos;m Creative Director and UI/UX Designer from Sydney, Australia,
					working in web development and print media. I enjoy turning complex
					problems into simple, beautiful and intuitive designs.
				</p>
				<p>
					My job is to build your website so that it is functional and
					user-friendly but at the same time attractive. Moreover, I add
					personal touch to your product and make sure that is eye-catching and
					easy to use. My aim is to bring across your message and identity in
					the most creative way. I created web design for many famous brand
					companies.
				</p>
			</div>
		</div>
	)
}
