import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function PagePicker() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="28" variant="outline" color="neutral">
					<span>Showing: Landing Page</span>{" "}
					<ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Landing Page 1</DropdownMenuItem>
				<DropdownMenuItem>Landing Page 2</DropdownMenuItem>
				<DropdownMenuItem>Landing Page 3</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
