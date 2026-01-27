import React, { ReactNode } from "react"
import { NavigationBar } from "@/components/navbar/navigation-bar"
import { getPackageVersion } from "@/lib/get-package-info"
import { fetchGithubStars } from "@/lib/github-star"

interface Props {
	children: ReactNode
}

export default async function LandingLayout({ children }: Props) {
	const version = await getPackageVersion()
	const stars = await fetchGithubStars()
	return (
		<main>
			<NavigationBar stars={stars} version={version} />
			{children}
		</main>
	)
}
