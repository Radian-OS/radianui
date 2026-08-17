import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BlogComponents } from "@/components/mdx-components-blogs"
import { JsonLd } from "@/components/seo/json-ld"
import { websiteMetadata } from "@/config/website-metadata-config"
import { blog as blogSource } from "@/lib/source"
import { absoluteUrl, getBlogPostStructuredData } from "@/lib/structured-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Divider } from "@/registry/ui/divider"

interface BlogPageProps {
	params: Promise<{ slug: string[] }>
}

async function getBlogFromParams({ params }: BlogPageProps) {
	const resolvedParams = await params
	const slug = resolvedParams.slug || []
	const blog = blogSource.getPage(slug)
	return blog ?? null
}

export async function generateStaticParams() {
	return blogSource.getPages().map((blog) => ({
		slug: blog.slugs,
	}))
}

export async function generateMetadata({
	params,
}: BlogPageProps): Promise<Metadata> {
	const blog = await getBlogFromParams({ params })
	if (!blog) return {}

	const url = absoluteUrl(`/blog/${blog.slugs.join("/")}`)
	const title = `${blog.data.title} - ${websiteMetadata.name}`
	const image = absoluteUrl(blog.data.image ?? "/og/static-og.png")

	return {
		title,
		description: blog.data.description,
		authors: blog.data.author?.map((author: any) => ({
			name: author.name,
			...(author.link ? { url: author.link } : {}),
		})),
		alternates: { canonical: url },
		openGraph: {
			siteName: websiteMetadata.name,
			type: "article",
			title,
			description: blog.data.description,
			url,
			publishedTime: blog.data.date.toISOString(),
			authors: blog.data.author?.map((author: any) => author.name),
			images: [{ url: image, alt: blog.data.title }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: blog.data.description,
			images: [image],
		},
	}
}

export default async function BlogPage({ params }: BlogPageProps) {
	const blog = await getBlogFromParams({ params })
	if (!blog) return notFound()

	const url = absoluteUrl(`/blog/${blog.slugs.join("/")}`)
	const image = absoluteUrl(blog.data.image ?? "/og/static-og.png")
	const authors =
		blog.data.author?.map((author: any) => ({
			name: author.name,
			...(author.link ? { url: author.link } : {}),
		})) ?? []

	return (
		<>
			<JsonLd
				id="blog-post-structured-data"
				data={getBlogPostStructuredData({
					title: blog.data.title,
					description: blog.data.description || "",
					url,
					image,
					datePublished: blog.data.date.toISOString(),
					authors,
				})}
			/>
			{/* Blog Title and Meta */}
			<div className="flex flex-col gap-4">
				<Badge size="28" variant="soft">
					{blog.data.card}
				</Badge>
				<h1 className="heading-3 font-semibold">{blog.data.title}</h1>
				<time
					className="text-fg-secondary text-sm"
					dateTime={blog.data.date.toISOString()}>
					{new Date(blog.data.date).toLocaleDateString("en-US", {
						month: "long",
						day: "numeric",
						year: "numeric",
					})}
				</time>
			</div>

			{/* Blog Image */}
			<div className="py-6">
				<Image
					width={500}
					height={500}
					className="h-auto w-full rounded-lg object-cover"
					alt={blog.data.title}
					src={blog.data.image ?? "/og/static-og.png"}
				/>
			</div>

			{/* Author Info */}
			<div className="flex items-center gap-3">
				<span className="text-fg-secondary text-sm">Author</span>
				{blog.data.author?.map((author: any, index: number) =>
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
				<div className="flex flex-col gap-12">
					<blog.data.body components={BlogComponents} />
				</div>
			</div>
		</>
	)
}
