import React from "react"
import { BlogCard } from "./blog-card"
import type { BlogPost } from "./types"

const blogPosts: BlogPost[] = [
	{
		id: "cadence-3-2",
		title: "What's new in Cadence 3.2",
		slug: "whats-new-in-cadence-3-2",
		description:
			"A rebuilt board engine and saved views that remember how you work.",
		date: "May 28, 2026",
		readTime: "5 min read",
		gradientClass: "bg-gradient-to-tr from-blue-950 via-indigo-800 to-blue-600",
		author: {
			name: "Mira Stone",
			role: "Product Lead",
			avatarUrl: "/sandbox/placeholder.svg",
		},
	},
	{
		id: "cold-start-latency",
		title: "Cutting cold start latency",
		slug: "cutting-cold-start-latency",
		description:
			"How we traced the cost and brought it down without a rewrite.",
		date: "May 21, 2026",
		readTime: "8 min read",
		gradientClass:
			"bg-gradient-to-tr from-slate-950 via-purple-900 to-pink-600",
		author: {
			name: "Leo Grant",
			role: "Platform Engineer",
			avatarUrl: "/sandbox/placeholder.svg",
		},
	},
	{
		id: "color-system",
		title: "Rethinking our color system",
		slug: "rethinking-our-color-system",
		description:
			"Why we rebuilt the palette around contrast ratios, not hex values.",
		date: "May 14, 2026",
		readTime: "6 min read",
		gradientClass:
			"bg-gradient-to-tr from-orange-500 via-fuchsia-600 to-cyan-500",
		author: {
			name: "Nora Vale",
			role: "Design Systems",
			avatarUrl: "/sandbox/placeholder.svg",
		},
	},
]

export function BlogGrid() {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{blogPosts.map((post) => (
				<BlogCard key={post.id} post={post} />
			))}
		</div>
	)
}
