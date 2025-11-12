import React, { ReactNode } from "react"
import { NavigationBar } from "@/components/navbar/navigation-bar"

interface Props {
	children: ReactNode
}

export default function LandingLayout({ children }: Props) {
	return (
		<main>
			<NavigationBar />
			{children}
		</main>
	)
}
