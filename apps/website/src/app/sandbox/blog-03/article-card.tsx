import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Card, CardContent, CardFooter } from "@/styles/default/ui/card"
import type { Article } from "./types"

interface ArticleCardProps {
	article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Card className="group border-border/70 bg-elevation-level1 hover:border-border flex h-full flex-col justify-between gap-0 overflow-hidden p-0 transition-all duration-300 hover:shadow-md">
			<div>
				{/* Top Card Image Banner */}
				<div className="bg-fill1 relative aspect-[16/10] w-full overflow-hidden">
					<Image
						src="/sandbox/placeholder.svg"
						alt={article.title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				</div>

				{/* Card Body Content */}
				<CardContent className="p-6">
					{/* Category Badge / Label */}
					<span className="text-primary text-xs font-semibold tracking-wide uppercase">
						{article.category}
					</span>

					{/* Title with strict typography utility rule */}
					<Link href={`#${article.slug}`} className="mt-3 block">
						<h3 className="heading-5 text-fg group-hover:text-primary line-clamp-2 transition-colors">
							{article.title}
						</h3>
					</Link>

					{/* Excerpt */}
					<p className="text-fg-secondary mt-3 line-clamp-2 text-sm leading-relaxed">
						{article.excerpt}
					</p>
				</CardContent>
			</div>

			{/* Card Footer with Author Avatar and Published Date */}
			<CardFooter className="border-border/50 flex items-center justify-between border-t px-6 py-4">
				<div className="flex items-center gap-2.5">
					<Avatar size="24" rounded="circle" className="border-border border">
						<AvatarImage
							src="/sandbox/placeholder.svg"
							alt={article.author.name}
						/>
						<AvatarFallback className="text-[10px] font-semibold">
							{article.author.initials}
						</AvatarFallback>
					</Avatar>
					<span className="text-fg text-xs font-medium">
						{article.author.name}
					</span>
				</div>

				<time className="text-fg-secondary text-xs" dateTime={article.date}>
					{article.date}
				</time>
			</CardFooter>
		</Card>
	)
}
