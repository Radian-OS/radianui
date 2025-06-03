"use client"

import React, { ReactNode } from "react"
import Navbar from "@/components/navbar"

interface Props {
	children: ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<div>
			<header className="sticky top-0 z-50 w-full">
				{/* <Banner /> */}
				<Navbar />
			</header>

			{children}
		</div>
	)
}

export default Layout
