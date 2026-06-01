import { IconSlot } from "@/registry/icon/icon-library"
import { Badge } from "@/registry/ui/badge"

function BadgeIconExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Badge variant="strong">
				<IconSlot slot="badge-check" />
				Verified
			</Badge>
			<Badge color="primary" variant="outline">
				<IconSlot slot="user" />
				Profile
			</Badge>
			<Badge color="primary" variant="soft">
				<IconSlot slot="trending-up" />
				Metrics
			</Badge>
			<Badge color="neutral" variant="outline">
				<IconSlot slot="star" className="stroke-warning fill-warning" />
				4.8 Ratings
			</Badge>
		</div>
	)
}

export default BadgeIconExample
