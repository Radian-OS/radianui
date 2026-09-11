import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BlogPostList } from "@/components/blog/blog-post-list"
import DiagonalDivider from "@/components/home/SvgDivider"
import { JsonLd } from "@/components/seo/json-ld"
import { blog } from "@/lib/source"
import { absoluteUrl, getBlogIndexStructuredData } from "@/lib/structured-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

interface BlogListPageProps {
	params?: Promise<{ slug?: string[] }>
}

const blogUrl = absoluteUrl("/blog")
const blogImage = absoluteUrl("/og/static-og.png")

export const metadata: Metadata = {
	title: "Radian UI Blogs - Latest Updates & Insights",
	description:
		"Stay updated with the latest blogs, updates, and insights from the Radian UI team. Discover product updates, industry trends, and tips to make the most of Radian UI.",
	keywords: [
		"Radian UI blog",
		"Radian UI Blogs",
		"Radian  updates",
		"tech insights",
		"product updates",
		"Radian tips",
		"industry news",
	],
	authors: [{ name: "Radian Team" }],
	robots: { index: true, follow: true },
	alternates: { canonical: blogUrl },
	openGraph: {
		title: "Radian UI Blog | Latest Updates & Insights",
		description:
			"Read the latest updates and insights from the Radian UI team. Stay informed about product releases, industry trends, and expert tips.",
		type: "website",
		url: blogUrl,
		siteName: "Radian UI",
		images: [
			{
				url: blogImage,
				width: 1200,
				height: 630,
				alt: "Radian UI Blog Open Graph Image",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Radian UI Blogs - Latest Updates & Insights",
		description:
			"Stay informed with blogs and updates from the Radian UI team. Discover product news, industry insights, and expert tips.",
		site: "@Radian UI",
		creator: "@Radian UI",
		images: [blogImage],
	},
}

function getInitials(name: string) {
	const parts = name.trim().split(" ")
	if (parts.length === 1) {
		return parts[0][0]?.toUpperCase() ?? ""
	}
	return (
		(parts[0][0]?.toUpperCase() ?? "") +
		(parts[parts.length - 1][0]?.toUpperCase() ?? "")
	)
}

export default async function BlogPage({ params }: BlogListPageProps) {
	const resolvedParams = params ? await params : undefined
	const slugPath = Array.isArray(resolvedParams?.slug)
		? resolvedParams.slug.join("/")
		: typeof resolvedParams?.slug === "string"
			? resolvedParams.slug
			: ""
	const allBlogs = blog.getPages()
	const filteredBlogs = (
		slugPath
			? allBlogs.filter((post) => post.slugs.join("/").startsWith(slugPath))
			: allBlogs
	).sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
	)

	const featuredPost = filteredBlogs[0]

	const basePosts = filteredBlogs.map((post) => ({
		url: post.url,
		slugs: post.slugs,
		data: {
			title: post.data.title,
			description: post.data.description,
			date: new Date(post.data.date).toISOString(),
			card: post.data.card,
			image: post.data.image,
			readingTime: post.data.readingTime,
			author: post.data.author,
		},
	}))

	return (
		<>
			<JsonLd
				id="blog-index-structured-data"
				data={getBlogIndexStructuredData({
					posts: filteredBlogs.map((post) => ({
						title: post.data.title,
						url: absoluteUrl(post.url),
					})),
				})}
			/>
			<div className="border-soft flex w-full max-w-368 flex-col overflow-x-hidden border border-y-0">
				<section className="border-soft flex flex-col items-center gap-5 border-0 border-b px-5 py-10 md:px-15 md:py-20">
					<p className="text-primary text-base font-medium">Radian UI Blog</p>
					<h1 className="heading-3 text-center md:w-150">
						Latest Updates and Insights from the Radian Team
					</h1>
					<p className="text-fg-secondary text-center text-base font-normal md:w-120">
						Explore design systems, UI patterns, development guides, product
						updates, and resources from the Radian team.
					</p>
				</section>
				<DiagonalDivider className="hidden sm:block" />
				<DiagonalDivider
					className="block sm:hidden"
					height={32}
					viewBox="0 0 1440 32"
				/>
				{featuredPost && (
					<Link
						href={featuredPost.url}
						className="border-soft flex flex-col border-y md:flex-row">
						<div className="group relative aspect-video w-full overflow-hidden md:aspect-auto md:flex-1 md:basis-1/2">
							<Image
								alt={featuredPost.data.title}
								src={featuredPost.data.image ?? "/changelog-v3.webp"}
								fill
								sizes="(min-width: 1024px) 50vw, 100vw"
								className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
							/>
						</div>

						<div className="flex flex-1 basis-1/2 flex-col justify-center gap-5 px-5 py-8 md:gap-10 md:p-15">
							<div className="flex w-full justify-between">
								<p className="text-fg-secondary text-base font-medium">
									{featuredPost.data.card}
								</p>
								<p className="text-fg-secondary text-base font-medium">
									[ {featuredPost.data.readingTime} ]
								</p>
							</div>

							<div className="flex flex-col gap-5">
								<h1 className="heading-4">{featuredPost.data.title}</h1>
								<p className="text-fg-secondary text-[18px] font-normal">
									{featuredPost.data.description}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<div className="flex -space-x-2.5">
									{featuredPost.data.author &&
										featuredPost.data.author.map((person) => (
											<Avatar
												size="32"
												className="border-bg border-4 hover:z-10"
												key={person.name}>
												{person.avatar && <AvatarImage src={person.avatar} />}
												<AvatarFallback>
													{getInitials(person.name)}
												</AvatarFallback>
											</Avatar>
										))}
								</div>
								<p className="text-fg-secondary text-base font-normal">
									{new Date(featuredPost.data.date).toLocaleDateString(
										"en-US",
										{
											month: "long",
											day: "numeric",
											year: "numeric",
										}
									)}
								</p>
							</div>
						</div>
					</Link>
				)}
				<DiagonalDivider className="hidden sm:block" />
				<DiagonalDivider
					className="block sm:hidden"
					height={32}
					viewBox="0 0 1440 32"
				/>
				<BlogPostList posts={basePosts} />
			</div>
		</>
	)
}
