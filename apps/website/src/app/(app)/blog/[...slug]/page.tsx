import React from "react"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BlogShareButton } from "@/components/blog-share-button"
import { BlogTableOfContents } from "@/components/blog-table-of-contents"
import { BlogComponents } from "@/components/mdx-components-blogs"
import { JsonLd } from "@/components/seo/json-ld"
import { websiteMetadata } from "@/config/website-metadata-config"
import { MdxHeading } from "@/lib/get-mdx-headings"
import { blog as blogSource } from "@/lib/source"
import { absoluteUrl, getBlogPostStructuredData } from "@/lib/structured-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

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
	const image = absoluteUrl(blog.data.image ?? "/carousel-home.png")

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
	const image = absoluteUrl(blog.data.image ?? "/carousel-home.png")
	const authors =
		blog.data.author?.map((author: any) => ({
			name: author.name,
			username: author.username,
			avatar: author.avatar,
			...(author.link ? { url: author.link } : {}),
		})) ?? []

	const leadParagraphs: string[] = Array.isArray(blog.data.lead)
		? blog.data.lead
		: typeof blog.data.lead === "string"
			? [blog.data.lead]
			: blog.data.description
				? [blog.data.description]
				: []

	const headings: MdxHeading[] =
		blog.data.toc?.map((item: any) => ({
			level: item.depth,
			text: item.title as string,
			id: item.url.replace(/^#/, ""),
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

			{/* Back Link */}
			<div className="mb-6">
				<Link
					href="/blog"
					className="text-fg-secondary hover:text-fg group inline-flex items-center gap-2 text-sm font-normal transition-colors">
					<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
					<span>Back to Blogs</span>
				</Link>
			</div>

			{/* Date & Reading Time */}
			<div className="text-fg-secondary mb-4 flex items-center gap-2 text-sm">
				<span>
					{new Date(blog.data.date).toLocaleDateString("en-US", {
						month: "long",
						day: "numeric",
						year: "numeric",
					})}
				</span>
				<span>•</span>
				<span>{blog.data.readingTime || "6 min read"}</span>
			</div>

			{/* Main Title */}
			<h1 className="heading-2 mb-6">{blog.data.title}</h1>

			{/* Lead / Intro Paragraphs */}
			{leadParagraphs.length > 0 && (
				<div className="mb-8 space-y-4">
					{leadParagraphs.map((paragraph, index) => (
						<p
							key={index}
							className="text-fg-secondary text-base leading-relaxed">
							{paragraph}
						</p>
					))}
				</div>
			)}

			{/* Author & Share Row */}
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				{authors.length > 0 && (
					<div className="flex flex-col gap-2">
						<span className="text-fg-secondary text-xs">Author</span>
						<div className="flex flex-wrap items-center gap-6">
							{authors.map((author: any, index: number) => {
								const authorKey = author.username || author.name || index
								const content = (
									<div className="hover:bg-fill1-alpha flex items-center gap-2.5 rounded-md p-2">
										<Avatar size="32" className="size-8">
											{author.avatar && (
												<AvatarImage src={author.avatar} alt={author.name} />
											)}
											<AvatarFallback>
												{author.name
													? author.name.charAt(0).toUpperCase()
													: "A"}
											</AvatarFallback>
										</Avatar>
										<div className="flex flex-col">
											<span className="text-fg text-sm font-medium">
												{author.name}
											</span>
											{author.username && (
												<span className="text-fg-secondary text-xs">
													{author.username}
												</span>
											)}
										</div>
									</div>
								)

								if (author.url) {
									return (
										<Link
											key={authorKey}
											target="_blank"
											rel="noopener noreferrer"
											href={author.url}>
											{content}
										</Link>
									)
								}

								return <div key={authorKey}>{content}</div>
							})}
						</div>
					</div>
				)}

				<div className="self-end sm:self-auto">
					<BlogShareButton title={blog.data.title} />
				</div>
			</div>

			{/* Hero / Cover Image */}
			<div className="border-border/50 bg-fill2 relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border shadow-sm">
				<Image
					fill
					src={blog.data.image ?? "/carousel-home.png"}
					alt={blog.data.title}
					className="object-cover"
					priority
					sizes="(min-width: 1280px) 1100px, (min-width: 1024px) 960px, 100vw"
				/>
			</div>

			{/* Main Content + Table of Contents Layout */}
			<div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
				{/* Article Body */}
				<article className="max-w-3xl min-w-0 flex-1">
					<blog.data.body components={BlogComponents} />
				</article>

				{/* In this Article (Table of Contents) */}
				<aside className="sticky top-24 hidden w-64 shrink-0 lg:block">
					<BlogTableOfContents headings={headings} />
				</aside>
			</div>
		</>
	)
}
