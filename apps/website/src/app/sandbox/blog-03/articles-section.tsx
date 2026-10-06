"use client"

import React, { useMemo, useState } from "react"
import { ArticleCard } from "./article-card"
import { CategoryFilter } from "./category-filter"
import type { Article, FilterCategory } from "./types"

const initialArticles: Article[] = [
	{
		id: "art-1",
		title: "Smart Money Moves for Everyday Success",
		excerpt:
			"Actionable tips and proven insights to help you make better financial decisions every day.",
		category: "Personal Finance",
		date: "Jul 24, 2025",
		author: {
			name: "Darlene Robertson",
			avatarUrl: "/sandbox/placeholder.svg",
			initials: "DR",
		},
		imageUrl: "/sandbox/placeholder.svg",
		slug: "smart-money-moves-everyday-success",
	},
	{
		id: "art-2",
		title: "What's New at Zentra: Smarter Tools for Smarter Finances",
		excerpt:
			"Discover the latest features, updates to help you achieve financial clarity.",
		category: "Product Updates",
		date: "Jul 24, 2025",
		author: {
			name: "Jordan Mitchell",
			avatarUrl: "/sandbox/placeholder.svg",
			initials: "JM",
		},
		imageUrl: "/sandbox/placeholder.svg",
		slug: "whats-new-at-zentra-smarter-tools",
	},
	{
		id: "art-3",
		title: "Creating a Life You Love with Smarter Money Decisions",
		excerpt:
			"Practical ways to align your financial goals with the lifestyle you want to live.",
		category: "Personal Finance",
		date: "Jul 24, 2025",
		author: {
			name: "Savannah Nguyen",
			avatarUrl: "/sandbox/placeholder.svg",
			initials: "SN",
		},
		imageUrl: "/sandbox/placeholder.svg",
		slug: "creating-a-life-you-love",
	},
	{
		id: "art-4",
		title: "Decoding Market Trends and Financial Shifts",
		excerpt:
			"In-depth coverage of the latest market movements, news, and economic updates.",
		category: "Industry News",
		date: "Jul 24, 2025",
		author: {
			name: "Alexandria Lee",
			avatarUrl: "/sandbox/placeholder.svg",
			initials: "AL",
		},
		imageUrl: "/sandbox/placeholder.svg",
		slug: "decoding-market-trends",
	},
	{
		id: "art-5",
		title: "Mastering Personal Finance Essentials",
		excerpt:
			"Budgeting, saving, and money management strategies designed for real life.",
		category: "Personal Finance",
		date: "Jul 24, 2025",
		author: {
			name: "Jordan Mitchell",
			avatarUrl: "/sandbox/placeholder.svg",
			initials: "JM",
		},
		imageUrl: "/sandbox/placeholder.svg",
		slug: "mastering-personal-finance-essentials",
	},
	{
		id: "art-6",
		title: "Real Results: How Zentra Transformed Personal Finances",
		excerpt:
			"Success stories from individuals who achieved clarity, control, and confidence with Zentra.",
		category: "Case Studies",
		date: "Jul 24, 2025",
		author: {
			name: "Michael Thompson",
			avatarUrl: "/sandbox/placeholder.svg",
			initials: "MT",
		},
		imageUrl: "/sandbox/placeholder.svg",
		slug: "real-results-zentra-transformed",
	},
	{
		id: "art-7",
		title: "Global Finance Explained Simply",
		excerpt:
			"Breaking down complex economic events and what they mean for you.",
		category: "Industry News",
		date: "Jul 24, 2025",
		author: {
			name: "Emily Carter",
			avatarUrl: "/sandbox/placeholder.svg",
			initials: "EC",
		},
		imageUrl: "/sandbox/placeholder.svg",
		slug: "global-finance-explained-simply",
	},
	{
		id: "art-8",
		title: "Scaling Smarter: Business Growth Powered by Zentra",
		excerpt:
			"Case studies highlighting how companies streamlined their finances and unlocked growth.",
		category: "Case Studies",
		date: "Jul 24, 2025",
		author: {
			name: "Daniel Kim",
			avatarUrl: "/sandbox/placeholder.svg",
			initials: "DK",
		},
		imageUrl: "/sandbox/placeholder.svg",
		slug: "scaling-smarter-business-growth",
	},
	{
		id: "art-9",
		title: "Zentra in Action: Real Stories From Real Users",
		excerpt:
			"How individuals and businesses are using Zentra to simplify money management.",
		category: "Product Updates",
		date: "Jul 24, 2025",
		author: {
			name: "Sophia Brown",
			avatarUrl: "/sandbox/placeholder.svg",
			initials: "SB",
		},
		imageUrl: "/sandbox/placeholder.svg",
		slug: "zentra-in-action-real-stories",
	},
]

export function ArticlesSection() {
	const [activeCategory, setActiveCategory] = useState<FilterCategory>("All")
	const [searchQuery, setSearchQuery] = useState("")

	const filteredArticles = useMemo(() => {
		return initialArticles.filter((article) => {
			const matchesCategory =
				activeCategory === "All" || article.category === activeCategory
			const matchesSearch =
				searchQuery.trim() === "" ||
				article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
				article.author.name.toLowerCase().includes(searchQuery.toLowerCase())
			return matchesCategory && matchesSearch
		})
	}, [activeCategory, searchQuery])

	return (
		<section className="mx-auto max-w-7xl pb-20">
			{/* Category Filter and Search Header */}
			<CategoryFilter
				activeCategory={activeCategory}
				onSelectCategory={setActiveCategory}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
			/>

			{/* Responsive 3x3 Articles Grid */}
			{filteredArticles.length > 0 ? (
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{filteredArticles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			) : (
				<div className="py-16 text-center">
					<p className="text-fg-secondary text-base">
						No articles found matching your criteria.
					</p>
				</div>
			)}
		</section>
	)
}
