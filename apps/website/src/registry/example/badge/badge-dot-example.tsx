import { Badge } from "@/registry/ui/badge"

function BadgeDotExample() {
	return (
		<div className="flex flex-col items-center gap-6">
			<div className="flex flex-col items-center gap-4 sm:flex-row">
				<Badge dot variant="outline" color="primary">
					Primary-Outline
				</Badge>
				<Badge dot color="primary" variant="strong">
					Primary-Strong
				</Badge>
				<Badge dot variant="soft" color="primary">
					Primary-Soft
				</Badge>
			</div>
			<div className="flex flex-col items-center gap-4 sm:flex-row">
				<Badge dot variant="outline" color="info">
					Info-Outline
				</Badge>
				<Badge dot color="info" variant="strong">
					Info-Strong
				</Badge>
				<Badge dot variant="soft" color="info">
					Info-Soft
				</Badge>
			</div>
			<div className="flex flex-col items-center gap-4 sm:flex-row">
				<Badge dot variant="outline" color="success">
					Success-Outline
				</Badge>
				<Badge dot color="success" variant="strong">
					Success-Strong
				</Badge>
				<Badge dot variant="soft" color="success">
					Success-Soft
				</Badge>
			</div>
			<div className="flex flex-col items-center gap-4 sm:flex-row">
				<Badge dot variant="outline" color="warning">
					Warning-Outline
				</Badge>
				<Badge dot color="warning" variant="strong">
					Warning-Strong
				</Badge>
				<Badge dot variant="soft" color="warning">
					Warning-Soft
				</Badge>
			</div>
			<div className="flex flex-col items-center gap-4 sm:flex-row">
				<Badge dot variant="outline" color="error">
					Error-Outline
				</Badge>
				<Badge dot color="error" variant="strong">
					Error-Strong
				</Badge>
				<Badge dot variant="soft" color="error">
					Error-Soft
				</Badge>
			</div>
			<div className="flex flex-col items-center gap-4 sm:flex-row">
				<Badge dot variant="outline" color="neutral">
					Neutral-outline
				</Badge>
				<Badge dot color="neutral" variant="strong">
					Neutral-Strong
				</Badge>
				<Badge dot variant="soft" color="neutral">
					Neutral-Soft
				</Badge>
			</div>
		</div>
	)
}

export default BadgeDotExample
