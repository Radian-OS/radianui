import { X } from "lucide-react"
import { Badge } from "@/registry/ui/badge"

function BadgeIconExample() {
	return (
		<div className="flex flex-col items-center gap-6">
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="primary">
					Tag <X />
				</Badge>
				<Badge color="primary" variant="strong">
					Mail <X />
				</Badge>
				<Badge variant="soft" color="primary">
					Light <X />
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="info">
					Tag <X />
				</Badge>
				<Badge color="info" variant="strong">
					Mail <X />
				</Badge>
				<Badge variant="soft" color="info">
					Light <X />
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="success">
					Tag <X />
				</Badge>
				<Badge color="success" variant="strong">
					Mail <X />
				</Badge>
				<Badge variant="soft" color="success">
					Light <X />
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="warning">
					Tag <X />
				</Badge>
				<Badge color="warning" variant="strong">
					Mail <X />
				</Badge>
				<Badge variant="soft" color="warning">
					Light <X />
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="error">
					Tag <X />
				</Badge>
				<Badge color="error" variant="strong">
					Mail <X />
				</Badge>
				<Badge variant="soft" color="error">
					Light <X />
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="neutral">
					Tag <X />
				</Badge>
				<Badge color="neutral" variant="strong">
					Mail <X />
				</Badge>
				<Badge variant="soft" color="neutral">
					Light <X />
				</Badge>
			</div>
		</div>
	)
}

export default BadgeIconExample
