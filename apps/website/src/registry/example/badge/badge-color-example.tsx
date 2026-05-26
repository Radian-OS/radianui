import React from "react"
import { Badge } from "@/registry/ui/badge"

const BadgeColorExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Badge variant="strong">Primary</Badge>
			<Badge color="neutral" variant="strong">
				Neutral
			</Badge>
			<Badge color="success" variant="strong">
				Success
			</Badge>
			<Badge color="error" variant="strong">
				Error
			</Badge>
			<Badge color="warning" variant="strong">
				Warning
			</Badge>
			<Badge color="info" variant="strong">
				Info
			</Badge>
		</div>
	)
}

export default BadgeColorExample
