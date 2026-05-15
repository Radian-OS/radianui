import React, { ReactNode } from "react"
import { subscribe } from "@/app/actions/subscribe"
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
			<GetProductUpdatesDialogController subscribeAction={subscribe} />
			<NavigationBar version={version} />
			{children}
		</main>
	)
}
