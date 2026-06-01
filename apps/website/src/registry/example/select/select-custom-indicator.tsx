import { IconSlot } from "@/registry/icon/icon-library"
import {
	Select,
	SelectContent,
	SelectIndicator,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

export default function SelectDemo() {
	return (
		<Select
			defaultValue="read_write"
			indicatorPosition="right"
			indicator={
				<SelectIndicator>
					<IconSlot slot="circle-check" className="text-primary size-4" />
				</SelectIndicator>
			}>
			<SelectTrigger
				defaultValue="read_only"
				className="w-[200px] [&_small]:hidden">
				<SelectValue placeholder="Select access level" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="full_access">
					<span className="flex flex-col items-start gap-px">
						<span className="font-medium">Full access</span>
						<small className="text-fg-secondary text-xs">
							Can modify list access
						</small>
					</span>
				</SelectItem>
				<SelectItem value="read_write">
					<span className="flex flex-col items-start gap-px">
						<span className="font-medium">Read and write</span>
						<small className="text-fg-secondary text-xs">
							Can edit & publish lists
						</small>
					</span>
				</SelectItem>
				<SelectItem value="read_only">
					<span className="flex flex-col items-start gap-px">
						<span className="font-medium">Read only</span>
						<small className="text-fg-secondary text-xs">
							Can only view lists
						</small>
					</span>
				</SelectItem>
				<SelectItem value="no_access">
					<span className="flex flex-col items-start gap-px">
						<span className="font-medium">No access</span>
						<small className="text-fg-secondary text-xs">
							Cannot view or edit lists
						</small>
					</span>
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
