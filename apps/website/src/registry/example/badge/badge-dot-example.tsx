import { Badge, BadgeDot } from "@/styles/default/ui/badge"

function BadgeDotExample() {
	return (
		<div className="flex items-center justify-center gap-3">
			<Badge variant="strong">
				<BadgeDot />
				Update
			</Badge>
			<Badge variant="soft">
				<BadgeDot className="bg-primary-border" />
				Update
			</Badge>
			<Badge variant="outline">
				<BadgeDot className="bg-primary-border" />
				Update
			</Badge>
		</div>
	)
}

export default BadgeDotExample
