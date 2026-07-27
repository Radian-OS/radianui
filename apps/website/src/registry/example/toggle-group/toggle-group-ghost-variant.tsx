import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

export default function ToggleGroupGhostVariant() {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<ToggleGroup
				type="single"
				defaultValue="active"
				spacing={2}
				variant="ghost">
				<ToggleGroupItem value="all">All</ToggleGroupItem>
				<ToggleGroupItem value="active">Active</ToggleGroupItem>
				<ToggleGroupItem value="completed">Completed</ToggleGroupItem>
				<ToggleGroupItem value="archived">Archived</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
