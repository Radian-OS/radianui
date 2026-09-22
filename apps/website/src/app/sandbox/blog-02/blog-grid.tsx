import React from "react"
import { BlogCard } from "./blog-card"
import type { BlogArticle } from "./types"

const articles: BlogArticle[] = [
	{
		id: "saas-scale",
		title:
			"How SaaS companies can scale faster with smart design and development",
		slug: "how-saas-companies-can-scale-faster-with-smart-design-and-development",
		category: "Insights",
		date: "OCT 21, 2026",
		imageUrl: "https://images.shadcnspace.com/assets/blog/blog-2-img-1.webp",
		isFeatured: true,
	},
	{
		id: "ultimate-guide",
		title: "The ultimate guide to build SaaS app",
		slug: "the-ultimate-guide-to-build-saas-app",
		category: "News",
		date: "OCT 24, 2026",
		imageUrl: "https://images.shadcnspace.com/assets/blog/blog-2-img-2.webp",
		isFeatured: false,
	},
	{
		id: "idea-to-launch",
		title: "From idea to launch - learn how to do it",
		slug: "from-idea-to-launch-learn-how-to-do-it",
		category: "Insights",
		date: "OCT 26, 2026",
		imageUrl: "https://images.shadcnspace.com/assets/blog/blog-2-img-3.webp",
		isFeatured: false,
	},
]

export function BlogGrid() {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{articles.map((article) => (
				<div
					key={article.id}
					className={
						article.isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
					}>
					<BlogCard article={article} />
				</div>
			))}
		</div>
	)
}
