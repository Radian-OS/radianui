import React from "react"
import { Badge } from "@/registry/ui/badge"

const BadgeStrongVariant = () => {
	return (
		<div className="flex items-center justify-center gap-2">
			<Badge variant="strong">Primary</Badge>
			<Badge color="info" variant="strong">
				Info
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
			<Badge color="neutral" variant="strong">
				Neutral
			</Badge>
		</div>
	)
}

export default BadgeStrongVariant
