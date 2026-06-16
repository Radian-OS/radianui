import { Badge } from "@/registry/ui/badge"
import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerBadge() {
	return (
		<div className="grid grid-cols-3 gap-4">
			<Badge>
				<Spinner variant="activity" data-icon="inline-start" />
				Updating
			</Badge>
			<Badge variant="outline">
				<Spinner variant="activity" data-icon="inline-start" />
				Syncing
			</Badge>
			<Badge variant="strong">
				<Spinner variant="activity" data-icon="inline-start" />
				Loading
			</Badge>
			<Badge variant="soft" color="info">
				<Spinner variant="activity" data-icon="inline-start" />
				Updating
			</Badge>
			<Badge variant="strong" color="success">
				<Spinner variant="activity" data-icon="inline-start" />
				Syncing
			</Badge>
			<Badge variant="soft" color="primary">
				<Spinner variant="activity" data-icon="inline-start" />
				Loading
			</Badge>
		</div>
	)
}
