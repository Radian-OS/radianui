"use client"

import React, { ReactNode } from "react"
import { allDocs } from "contentlayer/generated"
import { usePathname } from "next/navigation"
import CommunityCard from "@/components/community-card"
import Sidebar from "@/components/sidebar"
import TableOfContent from "@/components/table-of-contents"
import { getHeadingsFromMdx } from "@/lib/get-mdx-headings"

interface Props {
	children: ReactNode
}

const DocsLayout = ({ children }: Props) => {
	const pathname = usePathname()

	// Get current doc based on pathname
	const getCurrentDoc = () => {
		if (!pathname.startsWith("/docs/")) return null
		const slug = pathname.replace("/docs/", "")
		return allDocs.find((doc) => doc.slugAsParams === slug) || null
	}

	const currentDoc = getCurrentDoc()
	const [headings, setHeadings] = React.useState<{ id: string; text: string; level: number }[]>([])

	// Load headings when doc changes
	React.useEffect(() => {
		if (currentDoc) {
			getHeadingsFromMdx(currentDoc.rawMdx).then(setHeadings)
		}
	}, [currentDoc])

	return (
		<div className="max-w-368 mx-auto flex w-full px-4 md:px-5">
			{/* Left Sidebar */}
			<Sidebar />

			{/* Main Content Area */}
			<div className="flex-1 overflow-x-auto">{children}</div>

			{/* Right Sidebar (TOC) - Only show on docs pages */}
			{pathname.startsWith("/docs/") && (
				<aside className="bg-bg-base w-65 not-custom:hidden sticky top-[4.3rem] z-30 h-[calc(100vh-4.3rem)] py-10">
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
			)}
		</div>
	)
}

export default DocsLayout
