import React, { ReactNode } from "react"
import Navbar from "@/components/navbar"

interface Props {
	children: ReactNode
}

export default function LandingLayout({ children }: Props) {
	return (
		<div>
			<header className="border-soft bg-bg-base sticky top-0 z-50 box-content w-full border-b">
				<Navbar />
			</header>
			{children}
		</div>
	)
}
