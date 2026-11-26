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
	{ id: "preview-13", label: "Preview 13: Spark Pixel Analytics Dashboard" },
	{ id: "preview-11", label: "Preview 11: Compliance & SLA Dashboard" },
	{ id: "preview-07", label: "Preview 07: Brand & Themer Showcase" },
	{ id: "preview-10", label: "Preview 10: AI Chat Interface" },
	{ id: "preview-09", label: "Preview 09: E-Commerce Analytics Dashboard" },
	{ id: "preview-08", label: "Preview 08: SaaS Analytics Dashboard" },
	{ id: "preview-06", label: "Preview 06: AI Swarm & Intelligence" },
	{ id: "preview-05", label: "Preview 05: AgentLab Landing" },
	{ id: "preview-03", label: "Preview 03: Component Showcase" },
	{ id: "preview-02", label: "Preview 02: Analytics Dashboard" },
	{ id: "preview-01", label: "Preview 01: Simple Card" },
]

export default function PagePicker({
	selectedComponent = "preview-09",
	onSelect,
}: PagePickerProps) {
	const currentLabel =
		PREVIEW_PAGES.find((p) => p.id === selectedComponent)?.label.split(
			": "
		)[1] ?? "Choose a preview"

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="xs"
					variant="outline"
					color="neutral"
					className="max-w-52 min-w-0 justify-between select-none max-sm:h-9 max-sm:px-3 max-sm:text-sm max-sm:[&>svg]:size-5"
					title={currentLabel}>
					<span className="truncate">{currentLabel}</span>{" "}
					<ChevronDown className="text-fg-secondary shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-[calc(100vw-1rem)]">
				{PREVIEW_PAGES.map((page) => (
					<DropdownMenuItem key={page.id} onSelect={() => onSelect?.(page.id)}>
						{page.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
