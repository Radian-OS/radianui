import AsideBar from "@/components/aside-bar"
import { MdxHeading } from "@/lib/get-mdx-headings"
import { changelog, docsSource } from "@/lib/source"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

interface Props {
	params: Promise<{ slug: string[] }>
}

export default async function AsideSlot({ params }: Props) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join("/")

	let headings: MdxHeading[] = []

	if (slug === "getting-started/changelog") {
		const changelogPages = changelog
			.getPages()
			.sort(
				(a, b) =>
					new Date(b.data.date ?? 0).getTime() -
					new Date(a.data.date ?? 0).getTime()
			)
		headings = changelogPages.flatMap((page) =>
			page.data.toc.map((item) => ({
				level: item.depth,
				text: item.title as string,
				id: item.url.replace(/^#/, ""),
			}))
		)
	} else {
		const page = docsSource.getPage(resolvedParams.slug)
		if (!page) return null
		headings = page.data.toc.map((item) => ({
			level: item.depth,
			text: item.title as string,
			id: item.url.replace(/^#/, ""),
		}))
	}

	return <AsideBar headings={headings} />
}
