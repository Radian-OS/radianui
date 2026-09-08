import AsideBar from "@/components/aside-bar"
import { MdxHeading } from "@/lib/get-mdx-headings"
import { blog as blogSource } from "@/lib/source"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

interface Props {
	params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
	return blogSource.getPages().map((blog) => ({
		slug: blog.slugs,
	}))
}

export default async function AsideSlot({ params }: Props) {
	const resolvedParams = await params
	const slug = resolvedParams.slug || []
	const page = blogSource.getPage(slug)
	if (!page) return null

	const headings: MdxHeading[] = page.data.toc.map((item) => ({
		level: item.depth,
		text: item.title as string,
		id: item.url.replace(/^#/, ""),
	}))

	return <AsideBar headings={headings} />
}
