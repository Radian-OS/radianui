import { Suspense } from "react"
import { Index } from "@/registry/blocks-example"
import registry, { registryExampleGroups } from "@/registry/registry-map"
import { PreviewClient } from "./preview-client"

const humanizeName = (name: string) =>
	name
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ")

const getRegistryComponents = (name: string) => {
	const group = registryExampleGroups.find((group) => group.name === name)

	if (group) {
		return group.examples.flatMap((exampleName) => {
			const Component = registry[exampleName]

			return Component ? ([[exampleName, Component]] as const) : []
		})
	}

	const Component = registry[name]

	return Component ? ([[name, Component]] as const) : []
}

export default async function Page({
	params: pageParams,
}: {
	params: Promise<{ name: string }>
}) {
	const { name: componentName } = await pageParams
	const block = Index[componentName]
	const components = getRegistryComponents(componentName)

	if (block) {
		const Component = block.component

		return (
			<PreviewClient>
				<Suspense
					fallback={
						<div className="bg-fill2 h-10 w-full animate-pulse rounded" />
					}>
					<Component />
				</Suspense>
			</PreviewClient>
		)
	}

	return (
		<PreviewClient>
			<div className="bg-fill2 min-h-screen overflow-auto p-6">
				<div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
					{components.length > 0 ? (
						components.map(([key, Component]) => (
							<section
								key={key}
								className="border-border bg-elevation-level1 overflow-hidden rounded-lg border">
								<div className="border-border text-fg-secondary border-b px-4 py-2 text-sm font-medium">
									{humanizeName(key)}
								</div>
								<div className="flex min-h-40 items-center justify-center overflow-auto p-6">
									<Suspense
										fallback={
											<div className="bg-fill2 h-10 w-full animate-pulse rounded" />
										}>
										<Component />
									</Suspense>
								</div>
							</section>
						))
					) : (
						<div className="text-fg-secondary p-6 text-sm">Not found</div>
					)}
				</div>
			</div>
		</PreviewClient>
	)
}
