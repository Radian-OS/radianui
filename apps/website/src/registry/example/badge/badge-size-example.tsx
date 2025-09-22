import React from "react"
import { Badge } from "@/registry/ui/badge"

function BadgeSizeExample() {
	return (
		<div className="flex items-center justify-center gap-2">
			<div className="flex items-center justify-center gap-2">
				<Badge size="20">Size 20</Badge>
				<Badge size="24">Size 24</Badge>
				<Badge size="28">Size 28</Badge>
			</div>
		</div>
	)
}

export default BadgeSizeExample
