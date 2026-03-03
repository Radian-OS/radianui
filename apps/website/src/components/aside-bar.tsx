import CommunityCard from "@/components/community-card"
import TableOfContent from "@/components/table-of-contents"
import { MdxHeading } from "@/lib/get-mdx-headings"

const AsideBar = ({ headings }: { headings: MdxHeading[] }) => {
	return (
		<aside className="bg-bg w-65 not-custom:hidden sticky top-[4.3rem] z-30 h-[calc(100vh-4.3rem)] py-10">
			<div className="flex h-full flex-col gap-10">
				{/* TOC takes remaining space and allows internal scrolling */}
				<div className="min-h-0 overflow-hidden">
					<TableOfContent headings={headings} />
				</div>

				{/* Community card with fixed size */}
				<div className="flex-shrink-0">
					<CommunityCard />
				</div>
			</div>
		</aside>
	)
}

export default AsideBar
