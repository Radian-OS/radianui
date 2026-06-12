import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

export default function ToggleGroupGhostVariant() {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<ToggleGroup
				type="single"
				variant="ghost"
				defaultValue="left"
				spacing={1}>
				<ToggleGroupItem value="left" aria-label="Align left" className="p-2">
					<AlignLeft className="size-5" />
				</ToggleGroupItem>
				<ToggleGroupItem
					value="center"
					aria-label="Align center"
					className="p-2">
					<AlignCenter className="size-5" />
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right" className="p-2">
					<AlignRight className="size-5" />
				</ToggleGroupItem>
				<ToggleGroupItem value="justify" aria-label="Justify" className="p-2">
					<AlignJustify className="size-5" />
				</ToggleGroupItem>
			</ToggleGroup>
			Example Tmp
			<ToggleGroup type="single" defaultValue="active" variant="ghost">
				<ToggleGroupItem value="all">All</ToggleGroupItem>
				<ToggleGroupItem value="active">Active</ToggleGroupItem>
				<ToggleGroupItem value="completed">Completed</ToggleGroupItem>
				<ToggleGroupItem value="archived">Archived</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
