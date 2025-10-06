"use client"

import React, { ReactNode } from "react"
import { useTheme } from "next-themes"
import { Toaster, ToasterProps } from "sonner"
import AsideBar from "@/components/aside-bar"
import Sidebar from "@/components/sidebar"
import { useToast } from "@/contexts/toast-context"

interface Props {
	children: ReactNode
}

const DocsLayout = ({ children }: Props) => {
	const { position, isExpandable } = useToast()
	const { theme = "system" } = useTheme()

	return (
		<div className="max-w-368 mx-auto flex w-full px-4 md:px-5">
			<Toaster expand={isExpandable} position={position} theme={theme as ToasterProps["theme"]} />

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
