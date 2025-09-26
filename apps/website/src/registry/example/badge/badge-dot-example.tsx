import { Badge } from "@/registry/ui/badge"

function BadgeDotExample() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<Badge dot variant="outline" color="primary">
				Primary-Outline
			</Badge>
			<Badge dot color="primary" variant="strong">
				Primary-Strong
			</Badge>
			<Badge dot variant="soft" color="primary">
				Primary-Soft
			</Badge>

			<Badge dot variant="outline" color="info">
				Info-Outline
			</Badge>
			<Badge dot color="info" variant="strong">
				Info-Strong
			</Badge>
			<Badge dot variant="soft" color="info">
				Info-Soft
			</Badge>

			<Badge dot variant="outline" color="success">
				Success-Outline
			</Badge>
			<Badge dot color="success" variant="strong">
				Success-Strong
			</Badge>
			<Badge dot variant="soft" color="success">
				Success-Soft
			</Badge>

			<Badge dot variant="outline" color="warning">
				Warning-Outline
			</Badge>
			<Badge dot color="warning" variant="strong">
				Warning-Strong
			</Badge>
			<Badge dot variant="soft" color="warning">
				Warning-Soft
			</Badge>

			<Badge dot variant="outline" color="error">
				Error-Outline
			</Badge>
			<Badge dot color="error" variant="strong">
				Error-Strong
			</Badge>
			<Badge dot variant="soft" color="error">
				Error-Soft
			</Badge>

			<Badge dot variant="outline" color="neutral">
				Neutral-Outline
			</Badge>
			<Badge dot color="neutral" variant="strong">
				Neutral-Strong
			</Badge>
			<Badge dot variant="soft" color="neutral">
				Neutral-Soft
			</Badge>
		</div>
	)
}

export default BadgeDotExample
