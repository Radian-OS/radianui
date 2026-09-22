import React from "react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/styles/default/ui/badge"
import { Card, CardContent } from "@/styles/default/ui/card"
import type { BlogArticle } from "./types"

interface BlogCardProps {
	article: BlogArticle
}

export function BlogCard({ article }: BlogCardProps) {
	return (
		<Card className="group flex flex-col gap-0 border-0 bg-transparent p-0 shadow-none transition-transform duration-300 ease-in-out hover:-translate-y-1">
			<CardContent className="flex flex-col gap-6 p-0">
				{/* Article Cover Image with Smooth Rounded Corners and Hover Zoom */}
				<div
					className={`relative w-full overflow-hidden rounded-2xl bg-zinc-900/80 ${
						article.isFeatured
							? "aspect-[16/10] sm:aspect-[16/10]"
							: "aspect-[16/10]"
					}`}>
					<Image
						src="/sandbox/placeholder.svg"
						alt={article.title}
						width={600}
						height={375}
						className="size-full object-cover opacity-60 grayscale transition-transform duration-500 ease-in-out group-hover:scale-105"
					/>
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
				</div>

				{/* Article Metadata & Content */}
				<div className="flex flex-col gap-3.5">
					{/* Category Badge & Publication Date */}
					<div className="flex items-center gap-3">
						<Badge
							variant="soft"
							color="neutral"
							size="20"
							className="rounded-md px-2 py-0.5 text-xs font-medium">
							{article.category}
						</Badge>
						<div className="bg-fg/20 size-1 rounded-full" />
						<span className="text-fg-tertiary text-xs font-medium tracking-wider uppercase">
							{article.date}
						</span>
					</div>

					{/* Article Title */}
					<h3
						className={`text-fg leading-snug font-semibold ${
							article.isFeatured ? "heading-5" : "heading-6"
						}`}>
						<Link href={`/sandbox/blog-02#${article.slug}`} className="text-fg">
							{article.title}
						</Link>
					</h3>

					{/* Read More Action Link */}
					<div className="pt-1">
						<Link
							href={`/sandbox/blog-02#${article.slug}`}
							className="text-fg hover:text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
							<span>Read more</span>
							<ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
