import { BadgeCheck, Star, TrendingUp, User } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"

function BadgeIconExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Badge variant="strong">
				<BadgeCheck />
				Verified
			</Badge>
			<Badge color="primary" variant="outline">
				<User />
				Profile
			</Badge>
			<Badge color="primary" variant="soft">
				<TrendingUp />
				Metrics
			</Badge>
			<Badge color="neutral" variant="outline">
				<Star className="stroke-warning fill-warning" />
				4.8 Ratings
			</Badge>
		</div>
	)
}

export default BadgeIconExample
