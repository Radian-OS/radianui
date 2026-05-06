import { Button } from "@/styles/default/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

export default function TooltipWithArrow() {
	return (
		<div className="flex gap-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						Default Tooltip
					</Button>
				</TooltipTrigger>
				<TooltipContent>Access the full documentation.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						Tooltip with Arrow
					</Button>
				</TooltipTrigger>
				<TooltipContent withArrow>
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
