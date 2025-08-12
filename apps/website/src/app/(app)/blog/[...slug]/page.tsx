import React from "react"
import { allBlogs } from "contentlayer/generated"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MdxBlog } from "@/components/mdx-components-blogs"
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
		<>
			{/* Blog Title and Meta */}
			<div className="flex flex-col gap-4">
				<Badge size="28" variant="soft">
					{blog.card}
				</Badge>
				<h1 className="heading-3 font-semibold">{blog.title}</h1>
				<p className="text-fg-secondary text-sm">{blog.formattedDate}</p>
			</div>

			{/* Blog Image */}
			<div className="py-6">
				<Image width={500} height={500} className="h-auto w-full rounded-lg object-cover" alt={blog.title} src={blog.image ?? "/og/static-og.png"} />
			</div>

			{/* Author Info */}
			<div className="flex items-center gap-3">
				<span className="text-fg-secondary text-sm">Author</span>
				{blog.author?.map((author, index) =>
					author.username && author.avatar ? (
						<Link target="_blank" href={author.link || "#"} key={author._id} className={`flex items-center gap-3 ${index !== 0 ? "px-3" : ""}`}>
							<Avatar size="24" name={author.name} src={author.avatar} />
							<span className="flex flex-col">
								<span className="text-sm font-medium">{author.name}</span>
								<span className="text-fg-secondary text-xs">{author.username}</span>
							</span>
						</Link>
					) : (
						<React.Fragment key={author._id || index}></React.Fragment>
					)
				)}
			</div>
			<Divider className="mt-5" spacing="0" />
			{/* Blog Body */}
			<div className="pb-5">
				<MdxBlog code={blog.body.code} />
			</div>
		</>
	)
}
