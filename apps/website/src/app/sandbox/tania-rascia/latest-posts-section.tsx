"use client"

import React from "react"
import Link from "next/link"
import { FileText, HardDrive, Zap } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { LATEST_POSTS, type BlogPost } from "./types"

export function LatestPostsSection() {
	const renderPostIcon = (type: BlogPost["iconType"]) => {
		switch (type) {
			case "lightning":
				return <Zap className="text-warning size-4" />
			case "doc":
				return <FileText className="text-info size-4" />
			case "disk":
				return <HardDrive className="text-primary size-4" />
		}
	}

	return (
		<div id="blog" className="flex flex-col gap-4 pt-8">
			{/* Section Header */}
			<div className="flex items-center gap-3">
				<h2 className="heading-4 text-fg">Latest</h2>
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="28"
					className="h-6 rounded-md px-2 text-[11px] font-medium">
					All Posts
				</Button>
			</div>

			{/* Posts List */}
			<div className="divide-border/60 border-border/70 bg-elevation-level1/10 flex flex-col divide-y rounded-xl border">
				{LATEST_POSTS.map((post) => (
					<Link
						key={post.id}
						href="#"
						className="group hover:bg-elevation-level1/30 flex flex-col justify-between gap-2 p-4 transition-colors sm:flex-row sm:items-center">
						<div className="flex items-start gap-3">
							<div className="mt-0.5 shrink-0">
								{renderPostIcon(post.iconType)}
							</div>
							<div className="flex flex-col">
								<span className="text-fg group-hover:text-primary text-xs font-semibold transition-colors sm:text-sm">
									{post.title}
								</span>
								<span className="text-fg-tertiary text-[11px]">
									{post.date}
								</span>
							</div>
						</div>

						{/* Tags */}
						<div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="border-border/60 bg-elevation-level1/50 text-fg-secondary rounded border px-1.5 py-0.5 text-[10px] font-medium">
									{tag}
								</span>
							))}
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
