import React from "react"
import { ComponentSource } from "./component-source"

export default function ComponentSourceExample() {
	return (
		<div className="space-y-8 p-6">
			<div>
				<h3 className="mb-4 text-lg font-semibold">Non-collapsible Component Source</h3>
				<ComponentSource name="button" collapsible={false} />
			</div>

			<div>
				<h3 className="mb-4 text-lg font-semibold">Collapsible Component Source</h3>
				<ComponentSource name="accordion" collapsible={true} />
			</div>

			<div>
				<h3 className="mb-4 text-lg font-semibold">Another Component Example</h3>
				<ComponentSource name="alert" collapsible={false} showLineNumbers={true} />
			</div>
		</div>
	)
}
