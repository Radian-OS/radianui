import React from "react"
import { CloudDownload, Printer } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

const ButtonWithBadgeExample = () => {
	return (
		<div className="flex items-center justify-center gap-3">
			<Button variant="outline" color="neutral">
				<Printer className="text-fg-secondary" />
				Print
				<Badge size="20" variant="outline" color="neutral">
					⌘P
				</Badge>
			</Button>
			<Button variant="outline" color="neutral">
				<CloudDownload className="text-fg-secondary" />
				Download
				<Badge size="20" variant="outline" color="neutral">
					12
				</Badge>
			</Button>
		</div>
	)
}

export default ButtonWithBadgeExample
