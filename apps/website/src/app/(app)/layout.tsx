import React, { ReactNode } from "react"
import { NavigationBar } from "@/components/navbar/navigation-bar"
import { getPackageVersion } from "@/lib/get-package-info"

interface Props {
	children: ReactNode
}

export default async function LandingLayout({ children }: Props) {
	const version = await getPackageVersion()
	return (
		<main>
			<NavigationBar version={version} />
			{children}
		</main>
	)
}
