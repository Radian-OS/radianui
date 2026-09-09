"use client"

import React, { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Input, InputWrapper } from "@/registry/ui/input"

export interface BlogAuthor {
	name: string
	avatar?: string
	username?: string
	link?: string
}

export interface SerializedBlogPost {
	url: string
	slugs: string[]
	data: {
		title: string
		description?: string
		date: string
		card?: string
		image?: string
		img?: string
		readingTime?: string
		author?: BlogAuthor[]
	}
}

interface BlogPostListProps {
	posts: SerializedBlogPost[]
	defaultPeople?: { name: string; image: string }[]
}

function getInitials(name: string) {
	const parts = name.trim().split(" ")
	if (parts.length === 1) {
		return parts[0][0]?.toUpperCase() ?? ""
	}
	return (
		(parts[0][0]?.toUpperCase() ?? "") +
		(parts[parts.length - 1][0]?.toUpperCase() ?? "")
	)
}

const PREFERRED_CATEGORIES = [
	"All",
	"Design Systems",
	"Components",
	"Guides",
	"Accessibility",
	"Releases",
]

export function BlogPostList({ posts, defaultPeople = [] }: BlogPostListProps) {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("All")

	// Collect unique categories from existing posts while ensuring preferred order
	const categories = useMemo(() => {
		const existingCards = new Set<string>()
		posts.forEach((p) => {
			if (p.data.card) {
				existingCards.add(p.data.card)
			}
		})

		const ordered: string[] = ["All"]
		PREFERRED_CATEGORIES.forEach((cat) => {
			if (cat !== "All" && !ordered.includes(cat)) {
				ordered.push(cat)
			}
		})

		existingCards.forEach((cat) => {
			if (!ordered.some((item) => item.toLowerCase() === cat.toLowerCase())) {
				ordered.push(cat)
			}
		})

		return ordered
	}, [posts])

	// Filter posts based on category and search query
	const filteredPosts = useMemo(() => {
		const query = searchQuery.trim().toLowerCase()
		return posts.filter((post) => {
			const matchesCategory =
				selectedCategory === "All" ||
				post.data.card?.toLowerCase() === selectedCategory.toLowerCase()

			if (!matchesCategory) return false

			if (!query) return true

			const matchesTitle = post.data.title.toLowerCase().includes(query)
			const matchesDesc =
				post.data.description?.toLowerCase().includes(query) ?? false
			const matchesCard = post.data.card?.toLowerCase().includes(query) ?? false
			const matchesAuthor =
				post.data.author?.some((a) => a.name.toLowerCase().includes(query)) ??
				false

			return matchesTitle || matchesDesc || matchesCard || matchesAuthor
		})
	}, [posts, selectedCategory, searchQuery])

	return (
		<section className="border-soft flex flex-col border-y">
			{/* Search & Topic Filters Bar */}
			<div className="border-soft flex w-full flex-col items-stretch justify-between gap-5 border-b p-6 md:p-10 lg:flex-row lg:items-center">
				<InputWrapper className="w-full lg:w-80">
					<Input
						placeholder="Search blog..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					{searchQuery ? (
						<button
							type="button"
							onClick={() => setSearchQuery("")}
							className="text-fg-tertiary hover:text-fg transition-colors"
							aria-label="Clear search">
							<X className="size-4" />
						</button>
					) : (
						<Search className="text-fg-tertiary pointer-events-none size-4" />
					)}
				</InputWrapper>

				<div className="flex flex-wrap items-center gap-2">
					{categories.map((category) => {
						const isSelected =
							selectedCategory.toLowerCase() === category.toLowerCase()
						return (
							<Button
								key={category}
								color={isSelected ? "primary" : "neutral"}
								variant={isSelected ? undefined : "outline"}
								onClick={() => setSelectedCategory(category)}
								className="transition-all">
								{category}
							</Button>
						)
					})}
				</div>
			</div>

			{/* Posts Grid */}
			{filteredPosts.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredPosts.map((post) => (
						<Link
							key={post.url}
							href={post.url}
							className="group border-soft hover:border-fg-tertiary/40 bg-bg flex flex-col overflow-hidden border transition-colors">
							<div className="bg-fill1 relative aspect-video w-full overflow-hidden">
								<Image
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
									alt={post.data.title}
									height={540}
									width={840}
									src={post.data.image ?? post.data.img ?? "/changelog-v3.webp"}
								/>
							</div>

							<div className="flex flex-1 flex-col justify-between gap-6 p-6">
								<div className="flex w-full items-center justify-between">
									<p className="text-fg-secondary text-sm font-medium">
										{post.data.card || "Resources"}
									</p>
									<p className="text-fg-secondary text-sm font-medium">
										[ {post.data.readingTime || "5 min read"} ]
									</p>
								</div>

								<div className="flex flex-1 flex-col gap-3">
									<h2 className="heading-6 group-hover:text-primary line-clamp-2 transition-colors">
										{post.data.title}
									</h2>

									<p className="text-fg-secondary line-clamp-3 text-sm font-normal">
										{post.data.description}
									</p>
								</div>

								<div className="flex items-center gap-5 pt-2">
									<div className="flex -space-x-2.5">
										{post.data.author && post.data.author.length > 0
											? post.data.author.map((person) => (
													<Avatar
														size="24"
														className="border-bg border-2 hover:z-10"
														key={person.name}>
														{person.avatar && (
															<AvatarImage src={person.avatar} />
														)}
														<AvatarFallback>
															{getInitials(person.name)}
														</AvatarFallback>
													</Avatar>
												))
											: defaultPeople.map((person) => (
													<Avatar
														size="24"
														className="border-bg border-2 hover:z-10"
														key={person.name}>
														<AvatarImage src={person.image} />
														<AvatarFallback>
															{getInitials(person.name)}
														</AvatarFallback>
													</Avatar>
												))}
									</div>

									<p className="text-fg-secondary text-sm font-normal">
										{new Date(post.data.date).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				/* Empty State */
				<div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
					<div className="bg-fill1 border-soft text-fg-secondary rounded-full border p-3">
						<Search className="size-6" />
					</div>
					<h3 className="heading-6">No articles found</h3>
					<p className="text-fg-secondary max-w-sm text-sm">
						{searchQuery
							? `No articles match "${searchQuery}" in ${selectedCategory}.`
							: `There are currently no articles under ${selectedCategory}.`}
					</p>
					{(searchQuery || selectedCategory !== "All") && (
						<Button
							color="neutral"
							variant="outline"
							onClick={() => {
								setSearchQuery("")
								setSelectedCategory("All")
							}}>
							Reset filters
						</Button>
					)}
				</div>
			)}
		</section>
	)
}
