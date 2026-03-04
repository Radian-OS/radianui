import { allDocs } from "contentlayer/generated"
import { ExternalLinkIcon } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Mdx } from "@/components/mdx"
import { PreviousNextButtons } from "@/components/prev-next-buttons"
import { websiteMetadata } from "@/config/website-metadata-config"
import { Badge } from "@/registry/ui/badge"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

interface DocPageProps {
	params: Promise<{ slug: string[] }>
}

// Await `params` inside the function
async function getDocFromParams({ params }: DocPageProps) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join("/") || ""
	const doc = allDocs.find((doc) => doc.slugAsParams === slug)
	return doc ?? null
}

// Static path generation
export async function generateStaticParams() {
	return allDocs.map((doc) => ({
		slug: doc.slugAsParams.split("/"),
	}))
}

export async function generateMetadata({
	params,
}: DocPageProps): Promise<Metadata> {
	const doc = await getDocFromParams({ params })

	const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/docs/${doc!.slugAsParams}`
	const title = `${doc!.title} - ${websiteMetadata.name}`
	const description = `${doc!.description}`
	const ogImageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${encodeURIComponent(doc!.title)}`

	return {
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			url,
			type: "article",
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: title,
			description: description,
			images: [ogImageUrl],
		},
		alternates: {
			canonical: url,
		},
	}
}

// Await `params` in the page itself
export default async function Page({ params }: DocPageProps) {
	const resolvedParams = await params
	const doc = await getDocFromParams({ params })
	const currentPath = `/docs/${resolvedParams.slug.join("/")}`
	const category = doc?.slugAsParams.split("/")[0].replace("-", " ")

	if (!doc) return notFound()

	return (
		<div className="mx-auto w-full flex-1 overflow-y-auto py-10 lg:max-w-[720px]">
			<span className="text-primary-text text-sm font-medium capitalize">
				{category}
			</span>
			<div className="flex flex-col">
				<h1 className="heading-4 my-2">{doc.title}</h1>
				<p className="text-fg-secondary mb-5">{doc.description}</p>
				{doc.links && (
					<section className="flex flex-wrap items-center gap-2 pb-10">
						{doc.links.github && (
							<Badge
								size="28"
								variant="outline"
								color="neutral"
								className="shadow-2xs"
								asChild>
								<Link
									href={doc.links.github.href}
									target="_blank"
									rel="noopener noreferrer">
									<svg
										width={16}
										height={16}
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg "
										className="size-4">
										<path
											d="M9.96974 1.98495C0.462177 2.18375 -1.51713 14.9412 7.3768 18.001C7.79168 18.0787 7.94726 17.8194 7.94726 17.6033C7.94726 17.3872 7.94726 16.8946 7.94726 16.2032C5.62222 16.7045 5.12954 15.1055 5.12954 15.1055C4.97362 14.6054 4.64207 14.1787 4.19608 13.9041C3.44412 13.3941 4.25658 13.4027 4.25658 13.4027C4.52219 13.4378 4.77603 13.5342 4.99803 13.6842C5.22003 13.8342 5.40412 14.0337 5.53578 14.2671C5.77157 14.6776 6.15907 14.9791 6.61489 15.1067C7.07073 15.2345 7.55847 15.1782 7.97319 14.9499C8.01589 14.5338 8.20234 14.1456 8.50041 13.8522C6.64213 13.6447 4.69738 12.936 4.69738 9.78982C4.68569 8.97032 4.99604 8.17891 5.56171 7.5858C5.30004 6.87121 5.3311 6.08221 5.64814 5.39041C5.64814 5.39041 6.34825 5.17432 7.94726 6.25473C9.31691 5.88303 10.7609 5.88303 12.1306 6.25473C13.721 5.19161 14.4211 5.39041 14.4211 5.39041C14.7252 6.07963 14.7531 6.85935 14.4988 7.56851C15.0645 8.16163 15.3749 8.95299 15.3632 9.77257C15.3632 12.9273 13.4098 13.6275 11.5515 13.8262C12.4158 14.2843 12.0528 17.2317 12.1047 17.5947C12.1047 17.8108 12.2516 18.0701 12.6837 17.9923C21.5517 14.9585 19.4774 2.18375 9.96974 1.98495Z"
											className="fill-fg"
										/>
									</svg>
									Source Code
								</Link>
							</Badge>
						)}
						{doc.links.externalReference &&
							doc.links.externalReference.length > 0 &&
							doc.links.externalReference.map((link) => (
								<Badge
									key={link.href}
									size="28"
									variant="outline"
									color="neutral"
									className="shadow-2xs"
									asChild>
									<Link
										href={link.href}
										target="_blank"
										rel="noopener noreferrer">
										{link.icon ? (
											<Image
												className="text-fg-secondary size-4"
												height={16}
												width={16}
												src={
													link.icon.startsWith("/")
														? link.icon
														: "/" + link.icon
												}
												alt={link.label}
											/>
										) : (
											<ExternalLinkIcon className="size-4" />
										)}
										{link.label ?? <>External Reference</>}
									</Link>
								</Badge>
							))}
					</section>
				)}
			</div>

			<Mdx code={doc.body.code} />

			<PreviousNextButtons currentPath={currentPath} className="mt-10" />
		</div>
	)
}
