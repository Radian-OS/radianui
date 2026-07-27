import { allChangelogs, allDocs } from "contentlayer/generated"
import AsideBar from "@/components/aside-bar"
import { getHeadingsFromMdx } from "@/lib/get-mdx-headings"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

interface Props {
	params: Promise<{ slug: string[] }>
}

export default async function AsideSlot({ params }: Props) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join("/")
	const doc = allDocs.find((d) => d.slugAsParams === slug)
	if (!doc) return null

	const headings =
		slug === "getting-started/changelog"
			? (
					await Promise.all(
						[...allChangelogs]
							.sort(
								(a, b) =>
									new Date(b.date).getTime() - new Date(a.date).getTime()
							)
							.map((changelog) => getHeadingsFromMdx(changelog.body.raw))
					)
				).flat()
			: await getHeadingsFromMdx(doc.rawMdx)

	return <AsideBar headings={headings} />
}
