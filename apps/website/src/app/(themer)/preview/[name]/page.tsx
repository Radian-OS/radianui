import { Suspense } from "react"
import { Index } from "@/registry/blocks-example"
import { PreviewClient } from "./preview-client"

// const humanizeName = (name: string) =>
// 	name
// 		.split("-")
// 		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
// 		.join(" ")

export default async function Page({
	params: pageParams,
}: {
	params: Promise<{ name: string }>
}) {
	const { name: componentName } = await pageParams
	const block = Index[componentName]

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
					<div className="text-fg-secondary p-6 text-sm">Not found</div>
				</div>
			</div>
		</PreviewClient>
	)
}
