import React from "react"
import { Badge } from "@/registry/ui/badge"

function BadgeSizeExample() {
	return (
		<div className="flex justify-center gap-3">
			<Badge variant="outline" color="neutral" size="20">
				Size 20
			</Badge>
			<Badge variant="outline" color="neutral" size="24">
				Size 24
			</Badge>
			<Badge variant="outline" color="neutral" size="28">
				Size 28
			</Badge>
		</div>
	)
}

export default BadgeSizeExample
