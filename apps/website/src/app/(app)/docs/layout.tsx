import React, { ReactNode } from "react"
import Sidebar from "@/components/sidebar-app"
import ToasterWrapper from "@/components/toaster-wrapper"

interface Props {
	children: ReactNode
	aside: ReactNode
}

const DocsLayout = ({ children, aside }: Props) => {
	return (
		<div className="max-w-368 mx-auto flex w-full px-4 md:px-5">
			<ToasterWrapper />

			{/* Left Sidebar */}
			<Sidebar />

			{/* Main Content Area */}
			<div className="flex-1 overflow-hidden">{children}</div>

			{/* Right Sidebar (TOC) - Only show on docs pages */}
			{aside}
		</div>
	)
}

export default DocsLayout
