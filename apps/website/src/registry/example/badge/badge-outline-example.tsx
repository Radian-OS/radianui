import React from "react"
import { Badge } from "@/registry/ui/badge"

function BadgeOutlineExample() {
	return (
		<div className="flex items-center justify-center gap-2">
			<Badge variant="outline" color="primary">
				Primary
			</Badge>
			<Badge variant="outline" color="success">
				Success
			</Badge>
			<Badge variant="outline" color="info">
				Info
			</Badge>
			<Badge variant="outline" color="warning">
				Warning
			</Badge>
			<Badge variant="outline" color="neutral">
				Neutral
			</Badge>
		</div>
	)
}

export default BadgeOutlineExample
