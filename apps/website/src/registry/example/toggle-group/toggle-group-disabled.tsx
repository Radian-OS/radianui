import { Bold, Italic, Underline } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

export default function ToggleGroupDisabled() {
	return (
		<ToggleGroup disabled type="multiple" size="32">
			<ToggleGroupItem className="p-1.5" value="bold" aria-label="Toggle bold">
				<Bold className="text-fg-secondary" />
			</ToggleGroupItem>
			<ToggleGroupItem
				className="p-1.5"
				value="italic"
				aria-label="Toggle italic">
				<Italic className="text-fg-secondary" />
			</ToggleGroupItem>
			<ToggleGroupItem
				className="p-1.5"
				value="strikethrough"
				aria-label="Toggle strikethrough">
				<Underline className="text-fg-secondary" />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
