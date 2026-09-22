"use client"

import React from "react"

export function AboutSection() {
	return (
		<div className="flex flex-col gap-3.5 pt-4">
			<h2 className="heading-5 text-foreground">About</h2>

			<div className="text-fg-secondary flex flex-col gap-3 text-xs leading-relaxed sm:text-sm">
				<p>
					Hello! I&apos;m Kishor — a Product Designer from Nepal who designs and
					builds useful tools, often starting with a personal need.
				</p>
				<p>
					I tend to blur the line between design and development. I build
					functional prototypes myself and follow an intuitive, iterative
					approach. It&apos;s not always &quot;by the book,&quot; but it works
					for validating ideas quickly and solving real problems.
				</p>
				<p>
					<span className="text-foreground font-semibold">
						My approach is simple:
					</span>{" "}
					Spot real problems, build fast, stay practical, and iterate in the
					open.
				</p>
				<p>
					Beyond building my own tools, I work with founders and teams to break
					down their big ideas into smaller, achievable steps. I work best in
					fast-paced, unstructured environments where I can take unclear
					requirements and turn them into working solutions.
				</p>
				<p>
					I value empathy, clear communication, and being close to real users. I
					believe in shipping useful products over perfect designs.
				</p>
			</div>
		</div>
	)
}
