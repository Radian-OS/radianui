import { allDocs } from "contentlayer/generated"
import AsideBar from "@/components/aside-bar"
import { getHeadingsFromMdx } from "@/lib/get-mdx-headings"

interface Props {
	params: Promise<{ slug: string[] }>
}

export default async function AsideSlot({ params }: Props) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join("/")
	const doc = allDocs.find((d) => d.slugAsParams === slug)
	if (!doc) return null

	const headings = await getHeadingsFromMdx(doc.rawMdx)

	return <AsideBar headings={headings} />
}
