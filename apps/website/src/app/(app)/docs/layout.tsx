"use client"

import React, { ReactNode } from "react"
import Sidebar from "@/components/sidebar"

interface Props {
	children: ReactNode
}

const layout = ({ children }: Props) => {
	return (
		<div className="max-w-368 mx-auto flex w-full px-5">
			{/* Left Sidebar */}
			<Sidebar />

			{/* Main Content Area (children will handle their own layout) */}
			<div className="min-w-0 flex-1">{children}</div>
		</div>
	)
}

export default layout
