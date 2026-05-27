import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

export default function ToggleGroupGhostVariant() {
	return (
		<div className="flex items-center justify-center">
			<ToggleGroup
				type="single"
				variant="ghost"
				defaultValue="left"
				spacing={1}>
				<ToggleGroupItem value="left" aria-label="Align left">
					<AlignLeft />
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Align center">
					<AlignCenter />
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right">
					<AlignRight />
				</ToggleGroupItem>
				<ToggleGroupItem value="justify" aria-label="Justify">
					<AlignJustify />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
