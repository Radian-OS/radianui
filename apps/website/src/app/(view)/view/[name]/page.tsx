import React from "react"
import { Index } from "@/registry/blocks-example"
import { getComponent } from "@/registry/registry-map"

export default async function Page({
	params,
}: {
	params: Promise<{ name: string }>
}) {
	const { name } = await params

	const Component = getComponent(name)

	if (!Component) {
		const block = Index[name]
		if (!block) return <h1>Not found</h1>

		const Block = block.component

		return (
			<React.Suspense fallback={<div>Loading...</div>}>
				<Block />
			</React.Suspense>
		)
	}

	return <Component />
}
