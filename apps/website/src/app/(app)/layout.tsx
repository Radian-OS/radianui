import React, { ReactNode } from "react"
import { GetProductUpdatesDialogController } from "@/components/get-product-updates-dialog-controller"
import { NavigationBar } from "@/components/navbar/navigation-bar"
import { getPackageVersion } from "@/lib/get-package-info"

interface Props {
	children: ReactNode
}

export default async function LandingLayout({ children }: Props) {
	const version = await getPackageVersion()
	return (
		<main>
			<GetProductUpdatesDialogController />
			<NavigationBar version={version} />
			{children}
		</main>
	)
}
