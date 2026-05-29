import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

const ButtonWithBadgeExample = () => {
	return (
		<div className="flex items-center justify-center gap-3">
			<Button variant="outline" color="neutral">
				<IconSlot slot="printer" size={16} />
				Print
				<Badge size="20" variant="outline" color="neutral">
					⌘P
				</Badge>
			</Button>
			<Button variant="outline" color="neutral">
				<IconSlot slot="download" size={16} />
				Download
				<Badge size="20" variant="outline" color="neutral">
					12
				</Badge>
			</Button>
		</div>
	)
}

export default ButtonWithBadgeExample
