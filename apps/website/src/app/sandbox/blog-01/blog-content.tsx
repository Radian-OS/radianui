"use client"

import React from "react"
import { ARTICLE_SECTIONS } from "./types"

export function BlogContent() {
	return (
		<div className="flex flex-col gap-10">
			{ARTICLE_SECTIONS.map((section) => (
				<section key={section.id} className="flex flex-col gap-4">
					<h2 className="heading-3 text-fg">{section.title}</h2>
					{section.paragraphs.map((p, i) => (
						<p
							key={i}
							className="text-fg-secondary text-sm leading-relaxed sm:text-base">
							{p}
						</p>
					))}
				</section>
			))}
		</div>
	)
}
