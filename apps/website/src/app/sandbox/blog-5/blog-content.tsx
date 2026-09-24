"use client"

import React from "react"
import { ARTICLE_QUOTE, ARTICLE_SECTIONS } from "./types"

export function BlogContent() {
	return (
		<div className="flex flex-col gap-10">
			{/* Section 1: A Faster Board Engine */}
			{ARTICLE_SECTIONS.slice(0, 1).map((section) => (
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

			{/* Section 2: Saved Views That Stay Useful */}
			{ARTICLE_SECTIONS.slice(1, 2).map((section) => (
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

			{/* Section 3: Release Quality Work */}
			{ARTICLE_SECTIONS.slice(2, 3).map((section) => (
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

			{/* Pull Quote Callout */}
			<div className="border-border/50 my-2 border-y py-6">
				<blockquote className="heading-5 text-fg">
					&ldquo;{ARTICLE_QUOTE}&rdquo;
				</blockquote>
			</div>
		</div>
	)
}
