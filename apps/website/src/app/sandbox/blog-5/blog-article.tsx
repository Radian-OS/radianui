"use client"

import React from "react"
import { BlogHero } from "./blog-hero"
import { BlogAuthor } from "./blog-author"
import { BlogContent } from "./blog-content"
import { BlogTopics } from "./blog-topics"
import { BlogAuthorBio } from "./blog-author-bio"
import { BlogRelated } from "./blog-related"
import { BLOG_AUTHOR } from "./types"

export function BlogArticle() {
	return (
		<article className="bg-bg text-fg min-h-screen w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
			{/* Top Hero Container */}
			<div className="mx-auto max-w-4xl">
				<BlogHero />

				{/* Author Pill */}
				<div className="mt-6 flex justify-start sm:justify-start">
					<BlogAuthor author={BLOG_AUTHOR} />
				</div>
			</div>

			{/* Main Article Body & Footer Modules */}
			<div className="mx-auto mt-10 flex max-w-2xl flex-col gap-10 sm:mt-12">
				<BlogContent />
				<BlogTopics />
				<BlogAuthorBio />
				<BlogRelated />
			</div>
		</article>
	)
}
