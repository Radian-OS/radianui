import { Badge } from "@/registry/ui/badge"

function BadgeDotExample() {
	return (
		<div className="flex items-center justify-center gap-3">
			<Badge dot variant="strong">
				Update
			</Badge>
			<Badge dot variant="soft">
				Update
			</Badge>
			<Badge dot variant="outline">
				Update
			</Badge>
		</div>
	)
}

export default BadgeDotExample
