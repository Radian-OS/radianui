import React from "react"
import { Divider } from "@/registry/ui/divider"

function DividerExamplePreview() {
	return (
		<>
			<Divider className="flex-1" />
			<span className="text-fg-tertiary px-4 text-sm">OR</span>
			<Divider className="flex-1" />
		</>
	)
}

export default DividerExamplePreview
