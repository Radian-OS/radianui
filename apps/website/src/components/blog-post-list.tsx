"use client"

import React, {
	useCallback,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
} from "react"
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button, IconButton } from "@/registry/ui/button"
import { Input, InputWrapper } from "@/registry/ui/input"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from "@/registry/ui/pagination"

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
		readingTime?: string
		author?: BlogAuthor[]
	}
}

interface BlogPostListProps {
	posts: SerializedBlogPost[]
	postsPerPage?: number
}

function useMediaQuery(query: string, defaultValue = false) {
	const subscribe = useCallback(
		(callback: () => void) => {
			if (typeof window === "undefined" || !window.matchMedia) {
				return () => {}
			}
			const matchMedia = window.matchMedia(query)
			matchMedia.addEventListener("change", callback)
			return () => {
				matchMedia.removeEventListener("change", callback)
			}
		},
		[query]
	)

	const getSnapshot = () => {
		if (typeof window === "undefined" || !window.matchMedia) {
			return defaultValue
		}
		return window.matchMedia(query).matches
	}

	const getServerSnapshot = () => {
		return defaultValue
	}

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
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

function getPaginationRange(
	currentPage: number,
	totalPages: number
): (number | "ellipsis")[] {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	const showLeftEllipsis = currentPage > 4
	const showRightEllipsis = currentPage < totalPages - 3

	if (!showLeftEllipsis && showRightEllipsis) {
		return [1, 2, 3, 4, 5, "ellipsis", totalPages]
	}

	if (showLeftEllipsis && !showRightEllipsis) {
		const rightRange: number[] = []
		for (let i = totalPages - 4; i <= totalPages; i++) {
			rightRange.push(i)
		}
		return [1, "ellipsis", ...rightRange]
	}

	return [
		1,
		"ellipsis",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"ellipsis",
		totalPages,
	]
}

const PREFERRED_CATEGORIES = [
	"All",
	"Design Systems",
	"Components",
	"Guides",
	"Accessibility",
	"Releases",
]

export function BlogPostList({ posts, postsPerPage }: BlogPostListProps) {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("All")
	const [currentPage, setCurrentPage] = useState(1)
	const listRef = useRef<HTMLElement>(null)

	// Responsive posts per page: 9 for 3-column grid (lg: >= 1024px), 8 for 2-column grid (< 1024px)
	const isLargeScreen = useMediaQuery("(min-width: 1024px)", true)
	const effectivePostsPerPage = postsPerPage ?? (isLargeScreen ? 9 : 8)

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

	// Total pages calculation based on filtered results
	const totalPages = Math.max(
		1,
		Math.ceil(filteredPosts.length / effectivePostsPerPage)
	)
	const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages)

	// Keep currentPage in bounds if filteredPosts changes
	React.useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(1)
		}
	}, [currentPage, totalPages])

	// Paginated slice for current page
	const paginatedPosts = useMemo(() => {
		const startIndex = (safeCurrentPage - 1) * effectivePostsPerPage
		return filteredPosts.slice(startIndex, startIndex + effectivePostsPerPage)
	}, [filteredPosts, safeCurrentPage, effectivePostsPerPage])

	// Pagination numbers and ellipses
	const paginationRange = useMemo(() => {
		return getPaginationRange(safeCurrentPage, totalPages)
	}, [safeCurrentPage, totalPages])

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages || page === safeCurrentPage) return
		setCurrentPage(page)
		listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
	}

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category)
		setCurrentPage(1)
	}

	const handleSearchChange = (value: string) => {
		setSearchQuery(value)
		setCurrentPage(1)
	}

	return (
		<section ref={listRef} className="border-soft flex flex-col border-t">
			{/* Search & Topic Filters Bar */}
			<div className="border-soft flex w-full flex-col items-stretch justify-between gap-5 border-b p-6 md:p-10 lg:flex-row lg:items-center">
				<InputWrapper className="w-full lg:w-80">
					<Input
						placeholder="Search blog..."
						value={searchQuery}
						onChange={(e) => handleSearchChange(e.target.value)}
					/>
					{searchQuery ? (
						<button
							type="button"
							onClick={() => handleSearchChange("")}
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
								onClick={() => handleCategoryChange(category)}
								className="transition-all">
								{category}
							</Button>
						)
					})}
				</div>
			</div>

			{/* Posts Grid */}
			{filteredPosts.length > 0 ? (
				<div className="-mt-px -ml-px grid w-[calc(100%+2px)] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{paginatedPosts.map((post) => (
						<Link
							key={post.url}
							href={post.url}
							className="group border-soft bg-bg flex flex-col overflow-hidden border transition-colors">
							<div className="bg-fill1 relative aspect-video w-full overflow-hidden">
								<Image
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
									alt={post.data.title}
									height={540}
									width={840}
									src={post.data.image ?? "/changelog-v3.webp"}
								/>
							</div>

							<div className="flex flex-1 flex-col justify-between gap-6 p-8">
								<div className="flex w-full items-center justify-between">
									<p className="text-fg-secondary text-sm font-medium">
										{post.data.card}
									</p>
									<p className="text-fg-tertiary text-sm font-medium">
										[ {post.data.readingTime} ]
									</p>
								</div>

								<div className="flex flex-1 flex-col gap-3">
									<h2 className="heading-6 line-clamp-2 transition-colors">
										{post.data.title}
									</h2>

									<p className="text-fg-secondary line-clamp-3 text-sm font-normal">
										{post.data.description}
									</p>
								</div>

								<div className="flex items-center gap-2">
									<div className="flex -space-x-2.5">
										{post.data.author &&
											post.data.author.map((person) => (
												<Avatar
													size="24"
													className="border-bg border-2 hover:z-10"
													key={person.name}>
													{person.avatar && <AvatarImage src={person.avatar} />}
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
								handleSearchChange("")
								handleCategoryChange("All")
							}}>
							Reset filters
						</Button>
					)}
				</div>
			)}

			{/* Dynamic Pagination Bar */}
			{filteredPosts.length > 0 && (
				<div className="flex items-center justify-center p-10">
					<Pagination>
						<PaginationContent className="border-soft bg-bg flex items-center gap-0 rounded-lg border">
							{/* Previous Page Button */}
							<PaginationItem>
								<Button
									color="neutral"
									variant="ghost"
									className="border-soft rounded-l-lg rounded-r-none border-r"
									disabled={safeCurrentPage <= 1}
									onClick={() => handlePageChange(safeCurrentPage - 1)}
									aria-label="Go to previous page">
									<ArrowLeft className="text-fg-secondary rtl:rotate-180" />{" "}
									<span className="hidden sm:inline">Previous</span>
								</Button>
							</PaginationItem>

							{/* Page Numbers */}
							{paginationRange.map((pageItem, index) => {
								if (pageItem === "ellipsis") {
									return (
										<PaginationItem key={`ellipsis-${index}`}>
											<PaginationEllipsis className="text-fg-secondary border-soft border-r" />
										</PaginationItem>
									)
								}

								const isCurrent = safeCurrentPage === pageItem

								return (
									<PaginationItem key={pageItem}>
										<IconButton
											aria-label={`Page ${pageItem}`}
											color={isCurrent ? "primary" : "neutral"}
											variant={isCurrent ? "soft" : "ghost"}
											className={`border-soft rounded-none border-r ${
												isCurrent ? "text-primary font-semibold" : ""
											}`}
											onClick={() => handlePageChange(pageItem)}
											aria-current={isCurrent ? "page" : undefined}>
											{pageItem}
										</IconButton>
									</PaginationItem>
								)
							})}

							{/* Next Page Button */}
							<PaginationItem>
								<Button
									color="neutral"
									variant="ghost"
									className="rounded-l-none rounded-r-lg"
									disabled={safeCurrentPage >= totalPages}
									onClick={() => handlePageChange(safeCurrentPage + 1)}
									aria-label="Go to next page">
									<span className="hidden sm:inline">Next</span>{" "}
									<ArrowRight className="text-fg-secondary rtl:rotate-180" />
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</section>
	)
}
