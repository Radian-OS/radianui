"use client"

import React from "react"
import { BlogBreadcrumbs } from "./blog-breadcrumbs"
import { BlogHeader } from "./blog-header"
import { BlogAuthor } from "./blog-author"
import { BlogFeaturedImage } from "./blog-featured-image"
import { BlogLead } from "./blog-lead"
import { BlogContent } from "./blog-content"
import { BlogTopics } from "./blog-topics"
import { BlogAuthorBio } from "./blog-author-bio"
import { BlogReadNext } from "./blog-read-next"
import { BLOG_AUTHOR } from "./types"

export function BlogArticle() {
	return (
		<article className="bg-background text-foreground min-h-screen w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
			<div className="mx-auto flex max-w-3xl flex-col gap-6 sm:gap-8">
				{/* 1. Breadcrumbs */}
				<BlogBreadcrumbs />

				{/* 2. Title and Subtitle Header */}
				<BlogHeader />

				{/* 3. Author Pill */}
				<BlogAuthor author={BLOG_AUTHOR} />

				{/* 4. Featured Banner Artwork */}
				<BlogFeaturedImage />

				{/* 5. Lead Key Takeaway */}
				<BlogLead />

				{/* 6. Main Body Content */}
				<BlogContent />

				{/* 7. Topics Tag Badges */}
				<BlogTopics />

				{/* 8. Author Biography */}
				<BlogAuthorBio />

				{/* 9. Read Next Cards Grid */}
				<BlogReadNext />
			</div>
		</article>
	)
}
