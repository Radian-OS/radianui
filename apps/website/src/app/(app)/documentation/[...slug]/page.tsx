import { allDocs } from "contentlayer/generated"
import { ExternalLink, Github, SquareArrowOutUpRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Mdx } from "@/components/mdx-components"
import { PreviousNextButtons } from "@/components/prev-next-buttons"
import { Badge } from "@/registry/ui/badge"

interface DocPageProps {
	params: Promise<{ slug: string[] }> // 👈 Promise-based!
}

// ✅ Await `params` inside the function
async function getDocFromParams({ params }: DocPageProps) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join("/") || ""
	const doc = allDocs.find((doc) => doc.slugAsParams === slug)
	return doc ?? null
}

// ✅ Static path generation
export async function generateStaticParams() {
	return allDocs.map((doc) => ({
		slug: doc.slugAsParams.split("/"),
	}))
}

// ✅ Await `params` inside generateMetadata
// export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
// 	const resolvedParams = await params
// 	const slug = resolvedParams.slug.join("/")
// 	const doc = allDocs.find((d) => d.slugAsParams === slug)

// 	if (!doc) {
// 		return {
// 			title: "Documentation Not Found - Radian",
// 			description: "The page you're looking for doesn't exist. Browse our docs to learn more about Radian UI components.",
// 		}
// 	}

// 	const url = `https://radianos.com/documentation/${slug}`
// 	const cleanTitle = `${doc.title} - Radian`
// 	const fullDesc = `${doc.description}`

// 	return {
// 		title: cleanTitle,
// 		description: fullDesc,
// 		keywords: doc.keywords ?? ["Radian", "React components", "Tailwind CSS", "UI library", "design system", "developer tools"],
// 		openGraph: {
// 			title: cleanTitle,
// 			description: fullDesc,
// 			url,
// 		},
// 		twitter: {
// 			card: "summary_large_image",
// 			title: cleanTitle,
// 			description: fullDesc,
// 		},
// 	}
// }
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join("/")
	const doc = allDocs.find((d) => d.slugAsParams === slug)

	if (!doc) {
		return {
			title: "Documentation Not Found - Radian",
			description: "The page you're looking for doesn't exist. Browse our docs to learn more about Radian UI components.",
		}
	}

	const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/documentation/${slug}`
	const cleanTitle = `${doc.title} - Radian`
	const fullDesc = `${doc.description}`

	// Generate OG image URL with dynamic parameters
	const ogImageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${encodeURIComponent(doc.title)}`

	return {
		title: cleanTitle,
		description: fullDesc,
		keywords: doc.keywords ?? ["Radian", "React components", "Tailwind CSS", "UI library", "design system", "developer tools"],
		openGraph: {
			title: cleanTitle,
			description: fullDesc,
			url,
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: cleanTitle,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: cleanTitle,
			description: fullDesc,
			images: [ogImageUrl],
		},
	}
}

// ✅ Await `params` in the page itself
export default async function DocPage({ params }: DocPageProps) {
	const resolvedParams = await params
	const doc = await getDocFromParams({ params })
	const currentPath = `/documentation/${resolvedParams.slug.join("/")}`

	if (!doc) return notFound()

	return (
		<div className="mx-auto">
			<div className="flex flex-col">
				<h1 className="heading-4 mb-1">{doc.title}</h1>
				<p className="text-text-secondary mb-5 text-base">{doc.description}</p>

				<section className="mb-10 flex items-center gap-2">
					{doc.apiRef && (
						<Badge className="flex w-fit cursor-pointer items-center gap-1">
							<Link href={doc.apiRef} target="_blank" rel="noopener noreferrer">
								API Reference
							</Link>
							<SquareArrowOutUpRight size={16} />
						</Badge>
					)}
					{doc.source && (
						<Link href={doc.source} target="_blank" rel="noopener noreferrer">
							<Badge className="flex w-fit cursor-pointer items-center gap-1">
								<Github size={16} />
								Source
							</Badge>
						</Link>
					)}
					{doc.externalSiteRef && (
						<Link href={doc.externalSiteRef} target="_blank" rel="noopener noreferrer">
							<Badge className="flex w-fit cursor-pointer items-center gap-1">
								{doc.customLogo ? <Image className="size-4" height={50} width={50} alt="badge-img" src={doc.customLogo} /> : <ExternalLink className="size-4" />}
								{doc.externalSiteName ?? "External Reference"}
							</Badge>
						</Link>
					)}
				</section>
			</div>

			<Mdx code={doc.body.code} />
			<PreviousNextButtons currentPath={currentPath} className="mt-6" />
		</div>
	)
}
