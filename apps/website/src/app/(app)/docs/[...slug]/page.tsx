import { allDocs } from "contentlayer/generated"
import { ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Mdx } from "@/components/mdx-components-docs"
import { PreviousNextButtons } from "@/components/prev-next-buttons"
import { websiteMetadata } from "@/config/website-metadata-config"
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

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
	const doc = await getDocFromParams({ params })

	const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/docs/${doc!.slugAsParams}`
	const title = `${doc!.title} - ${websiteMetadata.name}`
	const description = `${doc!.description}`
	const ogImageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${encodeURIComponent(doc!.title)}`

	return {
		title: title,
		description: description,
		keywords: doc!.keywords ?? websiteMetadata.keywords,
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

// ✅ Await `params` in the page itself
export default async function Page({ params }: DocPageProps) {
	const resolvedParams = await params
	const doc = await getDocFromParams({ params })
	const currentPath = `/docs/${resolvedParams.slug.join("/")}`
	const category = doc?.slugAsParams.split("/")[0].replace("-", " ")

	if (!doc) return notFound()

	return (
		<div className="mx-auto w-full flex-1 overflow-y-auto py-10 lg:max-w-[720px]">
			<span className="text-primary text-sm font-medium capitalize">{category}</span>
			<div className="flex flex-col">
				<h1 className="heading-4 my-2">{doc.title}</h1>
				<p className="text-text-secondary mb-4 text-base">{doc.description}</p>
				{(doc.apiRef || doc.source || doc.externalSiteRef) && (
					<section className="flex flex-wrap items-center gap-2 pb-10">
						{doc.source && (
							<Link href={doc.source} target="_blank" rel="noopener noreferrer">
								<Badge size="28" variant={"neutral"} color="primary" className="shadow-2xs">
									<svg width={16} height={16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg " className="size-4">
										<path
											d="M9.96974 1.98495C0.462177 2.18375 -1.51713 14.9412 7.3768 18.001C7.79168 18.0787 7.94726 17.8194 7.94726 17.6033C7.94726 17.3872 7.94726 16.8946 7.94726 16.2032C5.62222 16.7045 5.12954 15.1055 5.12954 15.1055C4.97362 14.6054 4.64207 14.1787 4.19608 13.9041C3.44412 13.3941 4.25658 13.4027 4.25658 13.4027C4.52219 13.4378 4.77603 13.5342 4.99803 13.6842C5.22003 13.8342 5.40412 14.0337 5.53578 14.2671C5.77157 14.6776 6.15907 14.9791 6.61489 15.1067C7.07073 15.2345 7.55847 15.1782 7.97319 14.9499C8.01589 14.5338 8.20234 14.1456 8.50041 13.8522C6.64213 13.6447 4.69738 12.936 4.69738 9.78982C4.68569 8.97032 4.99604 8.17891 5.56171 7.5858C5.30004 6.87121 5.3311 6.08221 5.64814 5.39041C5.64814 5.39041 6.34825 5.17432 7.94726 6.25473C9.31691 5.88303 10.7609 5.88303 12.1306 6.25473C13.721 5.19161 14.4211 5.39041 14.4211 5.39041C14.7252 6.07963 14.7531 6.85935 14.4988 7.56851C15.0645 8.16163 15.3749 8.95299 15.3632 9.77257C15.3632 12.9273 13.4098 13.6275 11.5515 13.8262C12.4158 14.2843 12.0528 17.2317 12.1047 17.5947C12.1047 17.8108 12.2516 18.0701 12.6837 17.9923C21.5517 14.9585 19.4774 2.18375 9.96974 1.98495Z"
											className="fill-text"
										/>
									</svg>
									Source Code
								</Badge>
							</Link>
						)}
						{doc.apiRef && (
							<Link href={doc.apiRef} target="_blank" rel="noopener noreferrer">
								<Badge size="28" variant={"neutral"} color="primary" className="shadow-2xs">
									<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none" className="size-4">
										<path
											d="M1.33398 7.99998C1.33398 6.68144 1.72498 5.39251 2.45752 4.29618C3.19006 3.19985 4.23125 2.34537 5.44943 1.84079C6.6676 1.3362 8.00805 1.20418 9.30125 1.46141C10.5945 1.71865 11.7823 2.35359 12.7147 3.28594C13.647 4.21829 14.282 5.40617 14.5392 6.69938C14.7965 7.99259 14.6644 9.33303 14.1598 10.5512C13.6553 11.7694 12.8008 12.8106 11.7045 13.5431C10.6081 14.2757 9.31919 14.6666 8.00065 14.6666C6.23308 14.6649 4.53842 13.9619 3.28856 12.7121C2.03869 11.4622 1.33575 9.76755 1.33398 7.99998ZM8.93065 8.74998C8.00888 9.03775 7.15288 9.50441 6.41162 10.1233C5.67035 10.7421 5.05836 11.5011 4.61065 12.3566L4.68598 12.4166C5.48514 13.0131 6.43125 13.3813 7.42332 13.482C8.23795 13.5829 9.06479 13.5034 9.84532 13.2493C9.93532 13.2493 9.96532 13.182 9.95065 13.0847C9.81019 11.9591 9.57422 10.8475 9.24532 9.76198C9.14798 9.42465 9.03532 9.10198 8.93065 8.74998ZM8.18065 6.98665C6.32415 7.56868 4.38036 7.82248 2.43665 7.73665C2.36933 9.17367 2.86431 10.5804 3.81665 11.6587C4.86334 9.83956 6.546 8.47201 8.54065 7.81932L8.18065 6.98665ZM2.60865 6.61332C4.32198 6.71532 6.03932 6.51998 7.68598 6.03598C7.1099 4.9684 6.39082 3.98444 5.54865 3.11132C5.53954 3.1015 5.5285 3.09367 5.51623 3.08832C5.50395 3.08297 5.49071 3.0802 5.47732 3.0802C5.46393 3.0802 5.45068 3.08297 5.43841 3.08832C5.42613 3.09367 5.41509 3.1015 5.40598 3.11132C4.54259 3.56204 3.81529 4.23526 3.29932 5.06132C2.99081 5.54638 2.76276 6.07813 2.62398 6.63598L2.60865 6.61332ZM13.5127 8.59332C12.3793 8.51041 11.2414 8.51041 10.108 8.59332C10.2807 9.26798 10.4827 9.92798 10.6327 10.5953C10.7826 11.2626 10.888 11.9526 11.0153 12.6353C11.7025 12.1897 12.2836 11.5988 12.7176 10.9042C13.1517 10.2096 13.4281 9.42831 13.5273 8.61532L13.5127 8.59332ZM11.548 3.72665C10.8745 3.16799 10.0783 2.77681 9.22447 2.58515C8.37068 2.39349 7.48364 2.4068 6.63598 2.62398C7.4944 3.52174 8.2283 4.53077 8.81798 5.62398C9.86721 5.21976 10.8036 4.56939 11.548 3.72665ZM9.29798 6.59798C9.44065 6.94998 9.57532 7.28732 9.72532 7.62465C9.72532 7.62465 9.80065 7.66998 9.83798 7.66998C10.138 7.66998 10.438 7.61732 10.738 7.60998H13.52C13.4485 6.43428 12.9927 5.31463 12.2227 4.42332C11.4642 5.39807 10.4561 6.1495 9.30532 6.59798H9.29798Z"
											fill="#F43AB6"
										/>
									</svg>
									Radix
								</Badge>
							</Link>
						)}

						{doc.externalSiteRef && (
							<Link href={doc.externalSiteRef} target="_blank" rel="noopener noreferrer">
								<Badge size="28" variant={"neutral"} color="primary" className="shadow-2xs">
									{doc.customLogo ? <Image className="size-4" height={16} width={16} alt="badge-img" src={doc.customLogo} /> : <ExternalLink className="stroke-text size-4" />}
									{doc.externalSiteName ?? "External Reference"}
								</Badge>
							</Link>
						)}
					</section>
				)}
			</div>

			<Mdx code={doc.body.code} />
			<PreviousNextButtons currentPath={currentPath} className="mt-10" />
		</div>
	)
}
