import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

export default function ToggleOutlineVariant() {
	return (
		<div className="flex items-center justify-center">
			<ToggleGroup type="single" defaultValue="active" variant="outline">
				<ToggleGroupItem value="all">All</ToggleGroupItem>
				<ToggleGroupItem value="active">Active</ToggleGroupItem>
				<ToggleGroupItem value="completed">Completed</ToggleGroupItem>
				<ToggleGroupItem value="archived">Archived</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
