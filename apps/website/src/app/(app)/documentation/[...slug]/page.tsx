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
	params: Promise<{ slug: string[] }>
}

async function getDocFromParams({ params }: DocPageProps) {
	const slug = (await params)?.slug?.join("/") || ""

	const doc = allDocs.find((doc) => doc.slugAsParams === slug)

	if (!doc) {
		return null
	}
	return doc
}

export async function generateStaticParams() {
	return allDocs.map((doc) => ({
		slug: doc.slugAsParams.split("/"),
	}))
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
	const slug = params.slug.join("/")
	const doc = allDocs.find((d) => d.slugAsParams === slug)

	if (!doc) {
		return {
			title: "Documentation Not Found",
			description: "The requested documentation page could not be found.",
		}
	}

	const url = `https://radianos.com/documentation/${slug}`

	return {
		title: `${doc.title} - Radian`,
		description: doc.description,
		openGraph: {
			title: doc.title,
			description: doc.description,
			url,
			// images: doc.image ? [{ url: doc.image, alt: doc.title }] : [],
		},
		twitter: {
			card: "summary_large_image",
			title: doc.title,
			description: doc.description,
			// images: doc.image ? [doc.image] : [],
		},
	}
}

export default async function DocPage({ params }: DocPageProps) {
	const doc = await getDocFromParams({ params })
	const currentPath = `/documentation/${(await params).slug.join("/")}` || ""

	if (!doc) return notFound()

	return (
		<div className="mx-auto">
			<div className="flex flex-col">
				<h4 className="heading-4 mb-1">{doc.title}</h4>
				<p className="text-text-secondary mb-5 text-base">{doc.description}</p>
				<section className="mb-10 flex items-center gap-2">
					{doc.apiref && (
						<Badge className="flex w-fit cursor-pointer items-center gap-1">
							<Link href={doc.apiref} target="_blank">
								API Reference
							</Link>
							<SquareArrowOutUpRight size={16} />
						</Badge>
					)}
					{doc.source && (
						<Link href={doc.source} target="_blank">
							<Badge className="flex w-fit cursor-pointer items-center gap-1">
								<Github size={16} />
								Source
							</Badge>
						</Link>
					)}
					{doc.externalSiteRef && (
						<Link href={doc.externalSiteRef} target="_blank">
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
