import React from "react"
import { Badge } from "@/registry/ui/badge"

function BadgeExamplePreview() {
	return (
		<div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
			<Badge>Primary</Badge>
			<Badge color="info">Info</Badge>
			<Badge color="success">Success</Badge>
			<Badge color="error">Error</Badge>
			<Badge color="warning">Warning</Badge>
			<Badge color="neutral">Neutral</Badge>
		</div>
	)
}

export default BadgeExamplePreview
