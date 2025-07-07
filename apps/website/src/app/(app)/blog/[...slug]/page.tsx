import React from "react"
import { allBlogs } from "contentlayer/generated"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Mdx } from "@/components/mdx-components"
import { Avatar } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Divider } from "@/registry/ui/divider"

interface BlogPageProps {
	params: Promise<{ slug: string[] }>
}

async function getBlogFromParams({ params }: BlogPageProps) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join("/") || ""
	const blog = allBlogs.find((blog) => blog.slugAsParams === slug)
	return blog ?? null
}

export async function generateStaticParams() {
	return allBlogs.map((blog) => ({
		slug: blog.slugAsParams.split("/"),
	}))
}

export default async function BlogPage({ params }: BlogPageProps) {
	const blog = await getBlogFromParams({ params })
	if (!blog) return notFound()

	return (
		<div className="max-w-360 mb-70.5 mx-auto mt-20 flex w-full flex-col items-center">
			<div className="max-w-200 flex w-full flex-col px-5 md:px-0">
				{/* Blog Title and Meta */}
				<div className="flex flex-col gap-4">
					<Badge variant="soft">{blog.card}</Badge>
					<h1 className="heading-3 font-semibold">{blog.title}</h1>
					<p className="text-text-secondary text-sm">{blog.formattedDate}</p>
				</div>

				{/* Blog Image */}
				<div className="py-6">
					<Image width={500} height={500} className="h-auto w-full rounded-lg object-cover" alt={blog.title} src={blog.image ?? "/og/static-og.png"} />
				</div>

				{/* Author Info */}
				<div className="flex items-center gap-3">
					<span className="text-text-secondary text-sm">Author</span>
					{blog.author?.map((author, index) =>
						author.username && author.avatar ? (
							<span
								key={author._id} // ✅ FIXED: key directly on outermost element
								className={`flex items-center gap-3 ${index !== 0 ? "px-3" : ""}`}>
								<Avatar size="24" name={author.name} src={author.avatar} />
								<span className="flex flex-col">
									<span className="text-sm font-medium">{author.name}</span>
									<span className="text-text-secondary text-xs">{author.username}</span>
								</span>
							</span>
						) : null
					)}
				</div>

				<Divider spacing="20" />

				{/* Blog Body */}
				<Mdx code={blog.body.code} />
			</div>
		</div>
	)
}
