import CommunityCard from "@/components/community-card"
import TableOfContent from "@/components/table-of-contents"
import { MdxHeading } from "@/lib/get-mdx-headings"

const AsideBar = ({ headings }: { headings: MdxHeading[] }) => {
	return (
		<aside className="border-soft not-custom:hidden sticky top-[4.3rem] z-30 h-[calc(100vh-4.3rem)] w-65 border-x border-y-0 py-3">
			<div className="flex h-full flex-col gap-5">
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
