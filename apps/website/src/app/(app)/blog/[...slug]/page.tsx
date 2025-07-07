import React from "react"
import { allBlogs } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { Badge } from "@/registry/ui/badge"

interface BlogPageProps {
	params: Promise<{ slug: string[] }> // 👈 Promise-based!
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
	// const resolvedParams = await params
	const blog = await getBlogFromParams({ params })
	// const currentPath = `/docs/${resolvedParams.slug.join("/")}`
	// const category = blog?.slugAsParams.split("/")[0]
	if (!blog) return notFound()

	return (
		<div className="max-w-360 mb-70.5 mx-auto mt-20 flex w-full flex-col items-center">
			<div className="max-w-200 w-full">
				<div className="flex flex-col gap-4">
					<Badge variant="soft">Announcements</Badge>
					<h1 className="heading-3 font-semibold">Radian OS Alpha Release</h1>
					<p className="text-text-secondary text-sm">Sunday, June 24, 2025</p>
				</div>
			</div>
		</div>
	)
}
