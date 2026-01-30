import React, { ReactNode } from "react"
import { GetEarlyUpdatesDialogController } from "@/components/get-early-updates-dialog-controller"
import { NavigationBar } from "@/components/navbar/navigation-bar"
import { getPackageVersion } from "@/lib/get-package-info"

interface Props {
	children: ReactNode
}

export default async function LandingLayout({ children }: Props) {
	const version = await getPackageVersion()
	return (
		<main>
			<GetEarlyUpdatesDialogController />
			<NavigationBar version={version} />
			{children}
		</main>
	)
}
