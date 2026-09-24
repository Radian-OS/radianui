import { type ReactNode, Suspense } from "react"
import { GetProductUpdatesDialogController } from "@/components/get-product-updates-dialog-controller"
import { ResourcesHeader } from "./components/ResourcesHeader"

interface Props {
	children: ReactNode
}

export default function LandingLayout({ children }: Props) {
	return (
		<main className="overflow-x-clip">
			<Suspense fallback={null}>
				<GetProductUpdatesDialogController />
			</Suspense>
			<ResourcesHeader />
			{children}
		</main>
	)
}
