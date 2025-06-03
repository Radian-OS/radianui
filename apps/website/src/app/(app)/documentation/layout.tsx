"use client"

import React, { ReactNode } from "react"
import Sidebar from "@/components/sidebar"

interface Props {
	children: ReactNode
}

const layout = ({ children }: Props) => {
	return (
		<main className="gap-30 flex">
			<Sidebar />

			<section className="relative flex w-full justify-center gap-8 overflow-auto px-4 py-12 md:px-5 lg:px-6">
				<div className="max-w-200 w-full">{children}</div>
			</section>
		</main>
	)
}

export default layout
