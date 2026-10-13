import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface PagePickerProps {
	selectedComponent?: string
	onSelect?: (value: string) => void
}

const PREVIEW_PAGES = [
	{ id: "preview-06", label: "Preview 06: AI Swarm & Intelligence" },
	{ id: "preview-05", label: "Preview 05: AgentLab Landing" },
	{ id: "preview-03", label: "Preview 03: Component Showcase" },
	{ id: "preview-02", label: "Preview 02: Analytics Dashboard" },
	{ id: "preview-01", label: "Preview 01: Simple Card" },
]

export default function PagePicker({
	selectedComponent = "preview-06",
	onSelect,
}: PagePickerProps) {
	const currentLabel =
		PREVIEW_PAGES.find((p) => p.id === selectedComponent)?.label ||
		"Showing: Preview 06"

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="28"
					variant="outline"
					color="neutral"
					className="select-none">
					<span>{currentLabel}</span>{" "}
					<ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{PREVIEW_PAGES.map((page) => (
					<DropdownMenuItem key={page.id} onClick={() => onSelect?.(page.id)}>
						{page.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
