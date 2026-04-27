import React from "react"
import { Badge } from "@/styles/default/ui/badge"

function BadgeOutlineExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<div className="flex items-center justify-center gap-3">
				<Badge variant="strong">Strong</Badge>
				<Badge variant="outline">Outline</Badge>
				<Badge variant="soft">Soft</Badge>
			</div>
			<div className="flex items-center justify-center gap-3">
				<Badge color="neutral" variant="strong">
					Strong
				</Badge>
				<Badge color="neutral" variant="outline">
					Outline
				</Badge>
				<Badge color="neutral" variant="soft">
					Soft
				</Badge>
			</div>
			<div className="flex items-center justify-center gap-3">
				<Badge color="error" variant="strong">
					Strong
				</Badge>
				<Badge color="error" variant="outline">
					Outline
				</Badge>
				<Badge color="error" variant="soft">
					Soft
				</Badge>
			</div>
		</div>
	)
}

export default BadgeOutlineExample
