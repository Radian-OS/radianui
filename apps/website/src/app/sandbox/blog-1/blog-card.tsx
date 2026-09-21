import React from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Card, CardContent, CardFooter } from "@/styles/default/ui/card"
import type { BlogPost } from "./types"

interface BlogCardProps {
	post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
	const initials = post.author.name
		.split(" ")
		.map((n) => n[0])
		.join("")

	return (
		<Card className="border-border/60 bg-elevation-level1 group hover:border-border flex flex-col gap-0 overflow-hidden rounded-2xl border p-0 shadow-xs transition-all duration-300 hover:shadow-lg">
			{/* Artwork Banner with Fluid Gradient Backdrop */}
			<div
				className={`relative aspect-[16/10] w-full overflow-hidden ${post.gradientClass}`}>
				<Image
					src="/sandbox/placeholder.svg"
					alt={post.title}
					width={600}
					height={375}
					className="size-full object-cover opacity-60 mix-blend-overlay transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="from-elevation-level1/40 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
			</div>

			{/* Card Body */}
			<CardContent className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
				<div className="space-y-2.5">
					<div className="text-fg-tertiary text-xs font-medium tracking-wide">
						<span>{post.date}</span>
						<span className="mx-1.5 opacity-40">·</span>
						<span>{post.readTime}</span>
					</div>

					<h3 className="heading-6 text-fg leading-snug">
						<Link href={`/sandbox/blog-1#${post.slug}`} className="text-fg">
							{post.title}
						</Link>
					</h3>

					<p className="text-fg-secondary text-sm leading-relaxed">
						{post.description}
					</p>
				</div>
			</CardContent>

			{/* Card Footer: Author with Avatar & Read Action */}
			<CardFooter className="border-border/40 flex items-center justify-between border-t p-5 pt-4 sm:px-6">
				<div className="flex items-center gap-2.5">
					<Avatar size="32" rounded="circle" className="border-border border">
						<AvatarImage
							src={post.author.avatarUrl || "/sandbox/placeholder.svg"}
							alt={post.author.name}
						/>
						<AvatarFallback className="text-[11px] font-medium">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="text-fg text-xs font-semibold">
							{post.author.name}
						</span>
						<span className="text-fg-tertiary text-[11px]">
							{post.author.role}
						</span>
					</div>
				</div>

				<Link
					href={`/sandbox/blog-1#${post.slug}`}
					className="text-fg hover:text-primary flex items-center gap-1 text-xs font-medium transition-colors">
					<span>Read</span>
					<ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</Link>
			</CardFooter>
		</Card>
	)
}
