import React from "react"
import { Badge } from "@/registry/ui/badge"

function BadgeSizeExample() {
	return (
		<div className="flex justify-center gap-3">
			<Badge variant="outline" color="neutral" size="sm">
				Size sm
			</Badge>
			<Badge variant="outline" color="neutral" size="md">
				Size md
			</Badge>
			<Badge variant="outline" color="neutral" size="lg">
				Size lg
			</Badge>
		</div>
	)
}

export default BadgeSizeExample
