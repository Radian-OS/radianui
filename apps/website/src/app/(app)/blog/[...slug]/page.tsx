import React from "react"
import { allBlogs } from "contentlayer/generated"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MdxBlog } from "@/components/mdx-components-blogs"
import { JsonLd } from "@/components/seo/json-ld"
import { websiteMetadata } from "@/config/website-metadata-config"
import { absoluteUrl, getBlogPostStructuredData } from "@/lib/structured-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
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

export async function generateMetadata({
	params,
}: BlogPageProps): Promise<Metadata> {
	const blog = await getBlogFromParams({ params })
	if (!blog) return {}

	const url = absoluteUrl(`/blog/${blog.slugAsParams}`)
	const title = `${blog.title} - ${websiteMetadata.name}`
	const image = absoluteUrl(blog.image ?? "/og/static-og.png")

	return {
		title,
		description: blog.description,
		authors: blog.author?.map((author) => ({
			name: author.name,
			...(author.link ? { url: author.link } : {}),
		})),
		alternates: { canonical: url },
		openGraph: {
			type: "article",
			title,
			description: blog.description,
			url,
			publishedTime: blog.date,
			authors: blog.author?.map((author) => author.name),
			images: [{ url: image, alt: blog.title }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: blog.description,
			images: [image],
		},
	}
}

export default async function BlogPage({ params }: BlogPageProps) {
	const blog = await getBlogFromParams({ params })
	if (!blog) return notFound()

	const url = absoluteUrl(`/blog/${blog.slugAsParams}`)
	const image = absoluteUrl(blog.image ?? "/og/static-og.png")
	const authors =
		blog.author?.map((author) => ({
			name: author.name,
			...(author.link ? { url: author.link } : {}),
		})) ?? []

	return (
		<>
			<JsonLd
				id="blog-post-structured-data"
				data={getBlogPostStructuredData({
					title: blog.title,
					description: blog.description,
					url,
					image,
					datePublished: blog.date,
					authors,
				})}
			/>
			{/* Blog Title and Meta */}
			<div className="flex flex-col gap-4">
				<Badge size="28" variant="soft">
					{blog.card}
				</Badge>
				<h1 className="heading-3 font-semibold">{blog.title}</h1>
				<time className="text-fg-secondary text-sm" dateTime={blog.date}>
					{blog.formattedDate}
				</time>
			</div>

			{/* Blog Image */}
			<div className="py-6">
				<Image
					width={500}
					height={500}
					className="h-auto w-full rounded-lg object-cover"
					alt={blog.title}
					src={blog.image ?? "/og/static-og.png"}
				/>
			</div>

			{/* Author Info */}
			<div className="flex items-center gap-3">
				<span className="text-fg-secondary text-sm">Author</span>
				{blog.author?.map((author, index) =>
					author.username && author.avatar ? (
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href={author.link || "#"}
							key={author._id}
							className={`flex items-center gap-3 ${index !== 0 ? "px-3" : ""}`}>
							<Avatar size="24">
								<AvatarImage src={author.avatar} />
								<AvatarFallback>
									{author.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<span className="flex flex-col">
								<span className="text-sm font-medium">{author.name}</span>
								<span className="text-fg-secondary text-xs">
									{author.username}
								</span>
							</span>
						</Link>
					) : (
						<React.Fragment key={author._id || index}></React.Fragment>
					)
				)}
			</div>
			<Divider className="my-5" />
			{/* Blog Body */}
			<div className="pb-5">
				<MdxBlog code={blog.body.code} />
			</div>
		</>
	)
}
