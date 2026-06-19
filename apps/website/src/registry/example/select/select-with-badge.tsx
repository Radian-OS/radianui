import { Badge } from "@/registry/ui/badge"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

export default function SelectWithBadge() {
	return (
		<Select defaultValue="1" indicatorPosition="right">
			<SelectTrigger className="w-80">
				Status: <SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="1">
					<Badge color="info">In Progress</Badge>
				</SelectItem>
				<SelectItem value="2">
					<Badge color="success">Completed</Badge>
				</SelectItem>
				<SelectItem value="3">
					<Badge color="neutral">Pending</Badge>
				</SelectItem>
				<SelectItem value="4">
					<Badge color="warning">Cancelled</Badge>
				</SelectItem>
				<SelectItem value="5">
					<Badge color="error">Rejected</Badge>
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
