import { X } from "lucide-react"
import { Badge } from "@/registry/ui/badge"

function BadgeIconExample() {
	return (
		<div className="flex flex-col items-center gap-3 sm:flex-row">
			<Badge variant="outline" color="neutral">
				Required <X />
			</Badge>
			<Badge variant="soft" color="primary">
				Metrics <X />
			</Badge>
			<Badge variant="outline" color="primary">
				Invited <X />
			</Badge>
			<Badge variant="strong" color="primary">
				Verified <X />
			</Badge>
		</div>
	)
}

export default BadgeIconExample
