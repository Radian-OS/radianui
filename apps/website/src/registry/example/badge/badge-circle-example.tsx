import React from "react"
import { Badge } from "@/registry/ui/badge"

function BadgeCircleExample() {
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-col items-center gap-4 sm:flex-row">
				<Badge className="rounded-full" variant="soft" color="primary">
					Primary
				</Badge>
				<Badge className="rounded-full" variant="soft" color="info">
					Info
				</Badge>
				<Badge className="rounded-full" variant="soft" color="success">
					Success
				</Badge>
				<Badge className="rounded-full" variant="soft" color="warning">
					Warning
				</Badge>
				<Badge className="rounded-full" variant="soft" color="error">
					Error
				</Badge>
				<Badge className="rounded-full" variant="soft" color="neutral">
					Neutral
				</Badge>
			</div>
			<div className="flex flex-col items-center gap-4 sm:flex-row">
				<Badge className="rounded-full" variant="strong" color="primary">
					Primary
				</Badge>
				<Badge className="rounded-full" variant="strong" color="info">
					Info
				</Badge>
				<Badge className="rounded-full" variant="strong" color="success">
					Success
				</Badge>
				<Badge className="rounded-full" variant="strong" color="warning">
					Warning
				</Badge>
				<Badge className="rounded-full" variant="strong" color="error">
					Error
				</Badge>
				<Badge className="rounded-full" variant="strong" color="neutral">
					Neutral
				</Badge>
			</div>
			<div className="flex flex-col items-center gap-4 sm:flex-row">
				<Badge className="rounded-full" variant="outline" color="primary">
					Primary
				</Badge>
				<Badge className="rounded-full" variant="outline" color="info">
					Info
				</Badge>
				<Badge className="rounded-full" variant="outline" color="success">
					Success
				</Badge>
				<Badge className="rounded-full" variant="outline" color="warning">
					Warning
				</Badge>
				<Badge className="rounded-full" variant="outline" color="error">
					Error
				</Badge>
				<Badge className="rounded-full" variant="outline" color="neutral">
					Neutral
				</Badge>
			</div>
		</div>
	)
}

export default BadgeCircleExample
