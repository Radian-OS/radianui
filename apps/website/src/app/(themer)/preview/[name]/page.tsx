import { Suspense } from "react"
import { Index } from "@/registry/blocks-example"
import { PreviewClient } from "./preview-client"

const getComponentsByPrefix = (prefix: string) => {
	return Object.entries(Index).filter(([key]) => key === prefix)
}

export default async function Page({
	params: pageParams,
}: {
	params: Promise<{ name: string }>
}) {
	const { name: componentName } = await pageParams

	const components = getComponentsByPrefix(componentName)

	return (
		<PreviewClient>
			{components.map(([key, Component]) => (
				<Suspense
					key={key}
					fallback={
						<div className="bg-fill2 h-10 w-full animate-pulse rounded" />
					}>
					<Component.component />
				</Suspense>
			))}
		</PreviewClient>
	)
}
