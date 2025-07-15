"use client"

import React, { ReactNode } from "react"
import Sidebar from "@/components/sidebar"

interface Props {
	children: ReactNode
}

const layout = ({ children }: Props) => {
	return (
		<div className="max-w-368 mx-auto flex w-full px-4 md:px-5">
			{/* Left Sidebar */}
			<Sidebar />

			{/* Main Content Area (children will handle their own layout) */}
			<div className="flex-1 overflow-x-auto">{children}</div>
		</div>
	)
}

export default layout
