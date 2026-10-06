"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RELATED_POSTS } from "./types"

export function BlogRelated() {
	return (
		<div className="flex flex-col gap-6">
			<h3 className="heading-4 text-fg">More From The Blog</h3>

			<div className="divide-border/40 divide-y">
				{RELATED_POSTS.map((post) => (
					<Link
						key={post.id}
						href={post.href}
						className="group flex items-center justify-between py-5 first:pt-0 last:pb-0">
						<div className="flex flex-col gap-1 pr-4">
							<span className="text-fg-secondary text-xs">
								{post.category} <span className="opacity-40">|</span>{" "}
								{post.readTime}
							</span>
							<span className="text-fg group-hover:text-primary text-sm font-semibold transition-colors sm:text-base">
								{post.title}
							</span>
							<p className="text-fg-secondary text-xs sm:text-sm">
								{post.description}
							</p>
						</div>

						<div className="flex shrink-0 items-center justify-center">
							<ArrowRight className="text-fg-secondary group-hover:text-fg size-4 transition-transform duration-200 group-hover:translate-x-1" />
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
