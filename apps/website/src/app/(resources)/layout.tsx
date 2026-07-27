import React, { ReactNode, Suspense } from "react"
import { GetProductUpdatesDialogController } from "@/components/get-product-updates-dialog-controller"
import { NavigationBar } from "@/components/navbar/navigation-bar"

interface Props {
	children: ReactNode
}

export default function LandingLayout({ children }: Props) {
	return (
		<main>
			<Suspense fallback={null}>
				<GetProductUpdatesDialogController />
			</Suspense>
			<NavigationBar />
			{children}
		</main>
	)
}
