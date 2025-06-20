import React, { ReactNode } from "react"
import Navbar from "@/components/navbar"

interface Props {
	children: ReactNode
}

export default function LandingLayout({ children }: Props) {
	return (
		<div>
			<header className="sticky top-0 z-50 w-full">
				<Navbar />
			</header>
			{children}
		</div>
	)
}
