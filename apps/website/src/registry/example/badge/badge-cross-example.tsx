import { IconSlot } from "@/registry/icon/icon-library"
import { Badge } from "@/registry/ui/badge"

function BadgeIconExample() {
	return (
		<div className="flex flex-col items-center gap-3 sm:flex-row">
			<Badge variant="outline" color="neutral">
				Required
				<IconSlot slot="cross" />
			</Badge>
			<Badge variant="soft" color="primary">
				Metrics
				<IconSlot slot="cross" />
			</Badge>
			<Badge variant="outline" color="primary">
				Invited
				<IconSlot slot="cross" />
			</Badge>
			<Badge variant="strong" color="primary">
				Verified
				<IconSlot slot="cross" />
			</Badge>
		</div>
	)
}

export default BadgeIconExample
