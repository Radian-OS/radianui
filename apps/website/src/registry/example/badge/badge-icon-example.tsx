import { Activity, Mail, Tag } from "lucide-react"
import { Badge } from "@/registry/ui/badge"

function BadgeIconExample() {
	return (
		<div className="flex flex-col items-center gap-6">
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="primary">
					<Tag /> Tag
				</Badge>
				<Badge color="primary" variant="strong">
					<Mail /> Mail
				</Badge>
				<Badge variant="soft" color="primary">
					<Activity /> Light
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="info">
					<Tag /> Tag
				</Badge>
				<Badge color="info" variant="strong">
					<Mail /> Mail
				</Badge>
				<Badge variant="soft" color="info">
					<Activity /> Light
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="success">
					<Tag /> Tag
				</Badge>
				<Badge color="success" variant="strong">
					<Mail /> Mail
				</Badge>
				<Badge variant="soft" color="success">
					<Activity /> Light
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="warning">
					<Tag /> Tag
				</Badge>
				<Badge color="warning" variant="strong">
					<Mail /> Mail
				</Badge>
				<Badge variant="soft" color="warning">
					<Activity /> Light
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="error">
					<Tag /> Tag
				</Badge>
				<Badge color="error" variant="strong">
					<Mail /> Mail
				</Badge>
				<Badge variant="soft" color="error">
					<Activity /> Light
				</Badge>
			</div>
			<div className="flex items-center gap-4">
				<Badge variant="outline" color="neutral">
					<Tag /> Tag
				</Badge>
				<Badge color="neutral" variant="strong">
					<Mail /> Mail
				</Badge>
				<Badge variant="soft" color="neutral">
					<Activity /> Light
				</Badge>
			</div>
		</div>
	)
}

export default BadgeIconExample
