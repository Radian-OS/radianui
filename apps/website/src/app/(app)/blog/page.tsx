import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BlogPostList } from "@/components/blog-post-list"
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
export const people = [
	{
		name: "Noah Brooks",
		image: "/media/male-1.jpg",
	},
	{
		name: "Liam Reed",
		image: "/media/male-2.jpg",
	},
	{
		name: "Ethan Cole",
		image: "/media/male-3.jpg",
	},
]

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
	const gridBlogs =
		filteredBlogs.length > 1 ? filteredBlogs.slice(1) : filteredBlogs

	const serializedPosts = filteredBlogs.map((post) => ({
		url: post.url,
		slugs: post.slugs,
		data: {
			title: post.data.title,
			description: post.data.description,
			date: new Date(post.data.date).toISOString(),
			card: post.data.card,
			image: post.data.image,
			img: post.data.img,
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
			<div className="border-soft flex w-full max-w-368 flex-col border border-t-0">
				<section className="border-soft flex flex-col items-center gap-5 border-0 border-b px-15 py-20">
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
						className="border-soft flex flex-col border-y lg:flex-row">
						<div className="flex flex-1 overflow-hidden">
							<Image
								alt={featuredPost.data.title}
								height={540}
								width={840}
								src={
									featuredPost.data.image ??
									featuredPost.data.img ??
									"/changelog-v3.webp"
								}
							/>
						</div>

						<div className="flex flex-1 flex-col justify-center gap-10 p-15">
							<div className="flex w-full justify-between">
								<p className="text-fg-secondary text-base font-medium">
									{featuredPost.data.card || "Resources"}
								</p>
								<p className="text-fg-secondary text-base font-medium">
									[ {featuredPost.data.readingTime || "6 min read"} ]
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
									featuredPost.data.author.length > 0
										? featuredPost.data.author.map((person) => (
												<Avatar
													size="32"
													className="border-bg border-4 hover:z-10"
													key={person.name}>
													{person.avatar && <AvatarImage src={person.avatar} />}
													<AvatarFallback>
														{getInitials(person.name)}
													</AvatarFallback>
												</Avatar>
											))
										: people.map((person) => (
												<Avatar
													size="32"
													className="border-bg border-4 hover:z-10"
													key={person.name}>
													<AvatarImage src={person.image} />
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
				<BlogPostList posts={serializedPosts} defaultPeople={people} />
				<DiagonalDivider className="hidden sm:block" />
				<DiagonalDivider
					className="block sm:hidden"
					height={32}
					viewBox="0 0 1440 32"
				/>
				{/* {filteredBlogs.map((post) => (
					<span key={post.url}>
						<Divider className="my-10" />
						<Link
							href={post.url}
							className="flex flex-col items-start gap-9 md:flex-row">
							<Image
								className="h-full w-full rounded-lg object-cover md:h-45 md:w-70"
								alt={post.data.title}
								height={400}
								width={400}
								src={post.data.image ?? "/og/static-og.png"}
							/>
							<section className="flex flex-col lg:items-start">
								<div className="flex flex-col gap-1 pt-2 lg:items-start lg:pt-0">
									{post.data.card && (
										<p className="text-fg-tertiary text-sm">{post.data.card}</p>
									)}
									<span className="heading-6">{post.data.title}</span>
								</div>
								<div className="flex flex-wrap items-center gap-2 pt-3 pb-5">
									{post.data.author && post.data.author.length > 0 && (
										<>
											<span className="text-fg text-sm font-medium">
												{post.data.author.map((a) => a.name).join(", ")}
											</span>
											<span className="text-fg-tertiary">•</span>
										</>
									)}
									<span className="text-fg-secondary text-sm">
										{new Date(post.data.date).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</span>
								</div>
								<p className="text-fg-secondary max-w-121 text-sm lg:text-start">
									{post.data.description}
								</p>
							</section>
						</Link>
					</span>
				))}
				{filteredBlogs.length === 0 && (
					<section className="mt-10 flex flex-col items-center justify-center gap-6 rounded-sm border border-dashed py-15">
						<div>
							<svg
								className="text-border"
								width="100"
								height="100"
								viewBox="0 0 100 100"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M87.7473 8.84494H72.0102V4.93362C72.0102 2.21526 69.7959 0.00354004 67.0744 0.00354004C64.3559 0.00354004 62.1443 2.21526 62.1443 4.93362V8.84514H37.8559V4.93362C37.8559 2.21526 35.6416 0.00354004 32.9201 0.00354004C30.2016 0.00354004 27.99 2.21526 27.99 4.93362V8.84514H12.2525C7.86426 8.84514 4.29414 12.4153 4.29414 16.8037V92.0381C4.29414 96.4264 7.86426 99.9967 12.2525 99.9967H55.5896H55.5908H55.5932H87.7473C92.1357 99.9967 95.7059 96.4266 95.7059 92.0381V16.8037C95.7059 12.4153 92.1355 8.84494 87.7473 8.84494ZM64.8734 4.93362C64.8734 3.72014 65.8607 2.73284 67.0742 2.73284C68.2908 2.73284 69.2807 3.72014 69.2807 4.93362V15.486C69.2807 16.6994 68.291 17.6867 67.0742 17.6867C65.8607 17.6867 64.8734 16.6994 64.8734 15.486V4.93362ZM30.7193 4.93362C30.7193 3.72014 31.7066 2.73284 32.9201 2.73284C34.1367 2.73284 35.1266 3.72014 35.1266 4.93362V15.486C35.1266 16.6994 34.1369 17.6867 32.9201 17.6867C31.7066 17.6867 30.7193 16.6994 30.7193 15.486V4.93362ZM12.2525 11.5744H27.9898V15.486C27.9898 18.2045 30.2014 20.4162 32.9199 20.4162C35.6416 20.4162 37.8557 18.2045 37.8557 15.486V11.5744H62.1438V15.486C62.1438 18.2045 64.3553 20.4162 67.0738 20.4162C69.7955 20.4162 72.0096 18.2045 72.0096 15.486V11.5744H87.7467C90.6301 11.5744 92.9758 13.9203 92.9758 16.8035V29.7338H7.02363V16.8035C7.02363 13.9203 9.36934 11.5744 12.2525 11.5744ZM7.02363 92.0381V32.4633H92.9764V74.1897C91.6092 74.8547 90.1053 75.2045 88.5832 75.2045C86.2482 75.2045 84.0408 74.4174 82.1998 72.9281C81.8709 72.6625 81.4379 72.5639 81.0273 72.6611C80.6164 72.7584 80.2734 73.0405 80.0988 73.4252C75.2523 84.1014 66.4551 92.5582 55.3109 97.2672H12.2525C9.36934 97.2672 7.02363 94.9213 7.02363 92.0381ZM90.8979 77.7215C84.3789 86.6317 74.7951 93.0301 63.9076 95.8453C66.7541 94.0426 69.4113 91.9637 71.8561 89.6238C76.0123 85.6457 79.3785 81.0822 81.8787 76.0395C83.899 77.2836 86.1869 77.934 88.583 77.934C89.3617 77.934 90.1367 77.8623 90.8979 77.7215ZM87.7473 97.2672H68.6307C78.3807 93.8908 86.9117 87.7162 92.9766 79.502V92.0381C92.9764 94.9213 90.6305 97.2672 87.7473 97.2672ZM25.2854 38.8635H16.2059C14.6687 38.8635 13.4184 40.1115 13.4184 41.6455V50.7252C13.4184 52.2623 14.6687 53.5127 16.2059 53.5127H25.2854C26.8193 53.5127 28.0674 52.2623 28.0674 50.7252V41.6455C28.0674 40.1115 26.8193 38.8635 25.2854 38.8635ZM25.3379 50.7252C25.3379 50.7561 25.3086 50.7834 25.2852 50.7834H16.2059C16.1787 50.7834 16.1477 50.7524 16.1477 50.7252V41.6455C16.1477 41.6223 16.1752 41.593 16.2059 41.593H25.2854C25.3125 41.593 25.3381 41.6186 25.3381 41.6455V50.7252H25.3379ZM44.7848 38.8635H35.7051C34.1711 38.8635 32.923 40.1115 32.923 41.6455V50.7252C32.923 52.2623 34.1711 53.5127 35.7051 53.5127H44.7848C46.3217 53.5127 47.5721 52.2623 47.5721 50.7252V41.6455C47.5721 40.1115 46.3217 38.8635 44.7848 38.8635ZM44.8428 50.7252C44.8428 50.7524 44.8119 50.7834 44.7848 50.7834H35.7051C35.6818 50.7834 35.6523 50.7561 35.6523 50.7252V41.6455C35.6523 41.6186 35.6779 41.593 35.7051 41.593H44.7848C44.8154 41.593 44.8428 41.6223 44.8428 41.6455V50.7252ZM55.2098 53.5129H64.2895C65.8234 53.5129 67.0715 52.2625 67.0715 50.7254V41.6457C67.0715 40.1117 65.8234 38.8637 64.2895 38.8637H55.2098C53.6758 38.8637 52.4277 40.1117 52.4277 41.6457V50.7254C52.4277 52.2623 53.6756 53.5129 55.2098 53.5129ZM55.157 41.6455C55.157 41.6186 55.1826 41.593 55.2098 41.593H64.2895C64.3166 41.593 64.3422 41.6186 64.3422 41.6455V50.7252C64.3422 50.7561 64.3129 50.7834 64.2895 50.7834H55.2098C55.1865 50.7834 55.157 50.7561 55.157 50.7252V41.6455ZM74.7145 53.5129H83.7941C85.3281 53.5129 86.5762 52.2625 86.5762 50.7254V41.6457C86.5762 40.1117 85.3281 38.8637 83.7941 38.8637H74.7145C73.1773 38.8637 71.927 40.1117 71.927 41.6457V50.7254C71.927 52.2623 73.1773 53.5129 74.7145 53.5129ZM74.6562 41.6455C74.6562 41.6223 74.6838 41.593 74.7145 41.593H83.7941C83.8213 41.593 83.8469 41.6186 83.8469 41.6455V50.7252C83.8469 50.7561 83.8176 50.7834 83.7941 50.7834H74.7145C74.6877 50.7834 74.6562 50.7518 74.6562 50.7252V41.6455ZM25.2854 58.3682H16.2059C14.6687 58.3682 13.4184 59.6162 13.4184 61.1502V70.2299C13.4184 71.7639 14.6687 73.0119 16.2059 73.0119H25.2854C26.8193 73.0119 28.0674 71.7639 28.0674 70.2299V61.1504C28.0674 59.6162 26.8193 58.3682 25.2854 58.3682ZM25.3379 70.2301C25.3379 70.257 25.3123 70.2826 25.2852 70.2826H16.2059C16.1752 70.2826 16.1477 70.2533 16.1477 70.2301V61.1504C16.1477 61.1272 16.1752 61.0977 16.2059 61.0977H25.2854C25.3125 61.0977 25.3381 61.1233 25.3381 61.1504V70.2301H25.3379ZM44.7848 58.3682H35.7051C34.1711 58.3682 32.923 59.6162 32.923 61.1502V70.2299C32.923 71.7639 34.1711 73.0119 35.7051 73.0119H44.7848C46.3217 73.0119 47.5721 71.7639 47.5721 70.2299V61.1504C47.5721 59.6162 46.3217 58.3682 44.7848 58.3682ZM44.8428 70.2301C44.8428 70.2533 44.8154 70.2826 44.7848 70.2826H35.7051C35.6779 70.2826 35.6523 70.257 35.6523 70.2301V61.1504C35.6523 61.1233 35.6779 61.0977 35.7051 61.0977H44.7848C44.8154 61.0977 44.8428 61.1272 44.8428 61.1504V70.2301ZM64.2895 73.0121C65.8234 73.0121 67.0715 71.7641 67.0715 70.2301V61.1504C67.0715 59.6164 65.8234 58.3684 64.2895 58.3684H55.2098C53.6758 58.3684 52.4277 59.6164 52.4277 61.1504V70.2301C52.4277 71.7641 53.6758 73.0121 55.2098 73.0121H64.2895ZM55.157 70.2301V61.1504C55.157 61.1233 55.1826 61.0977 55.2098 61.0977H64.2895C64.3166 61.0977 64.3422 61.1233 64.3422 61.1504V70.2301C64.3422 70.257 64.3166 70.2826 64.2895 70.2826H55.2098C55.1826 70.2826 55.157 70.257 55.157 70.2301ZM25.2854 77.8676H16.2059C14.6687 77.8676 13.4184 79.118 13.4184 80.6551V89.7348C13.4184 91.2688 14.6687 92.5168 16.2059 92.5168H25.2854C26.8193 92.5168 28.0674 91.2688 28.0674 89.7348V80.6551C28.0674 79.118 26.8193 77.8676 25.2854 77.8676ZM25.3379 89.7348C25.3379 89.7619 25.3123 89.7875 25.2852 89.7875H16.2059C16.1752 89.7875 16.1477 89.758 16.1477 89.7348V80.6551C16.1477 80.628 16.1787 80.5969 16.2059 80.5969H25.2854C25.3086 80.5969 25.3381 80.6242 25.3381 80.6551V89.7348H25.3379ZM44.7848 77.8676H35.7051C34.1711 77.8676 32.923 79.118 32.923 80.6551V89.7348C32.923 91.2688 34.1711 92.5168 35.7051 92.5168H44.7848C46.3217 92.5168 47.5721 91.2688 47.5721 89.7348V80.6551C47.5721 79.118 46.3217 77.8676 44.7848 77.8676ZM44.8428 89.7348C44.8428 89.758 44.8154 89.7875 44.7848 89.7875H35.7051C35.6779 89.7875 35.6523 89.7619 35.6523 89.7348V80.6551C35.6523 80.6242 35.6816 80.5969 35.7051 80.5969H44.7848C44.8119 80.5969 44.8428 80.628 44.8428 80.6551V89.7348Z"
									fill="currentColor"
								/>
							</svg>
						</div>
						<div className="flex flex-col items-center gap-3">
							<span className="heading-6">No updates for the team yet!</span>
							<p className="text-fg-secondary max-w-105 text-center text-base">
								Looks like you’re a bit early here. No worries, our team are
								working hard to bring you the first update
							</p>
						</div>
					</section>
				)} */}
			</div>
		</>
	)
}
