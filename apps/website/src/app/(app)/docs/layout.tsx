import React, { ReactNode } from "react"

import AsideBar from "@/components/aside-bar"
import Sidebar from "@/components/sidebar"

interface Props {
	children: ReactNode
}

const DocsLayout = ({ children }: Props) => {
	return (
		<div className="max-w-368 mx-auto flex w-full px-4 md:px-5">
			{/* Left Sidebar */}
			<Sidebar />

			{/* Main Content Area */}
			<div className="flex-1 overflow-x-auto">{children}</div>

			{/* Right Sidebar (TOC) - Only show on docs pages */}
			<AsideBar />
		</div>
	)
}

export default DocsLayout
