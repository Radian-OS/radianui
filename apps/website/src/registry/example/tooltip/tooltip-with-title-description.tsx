import { Clock } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipWithTitleAndDescription() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" className="gap-1.5" variant="outline">
					<Clock className="text-fg-secondary" />
					Edit Time
				</Button>
			</TooltipTrigger>
			<TooltipContent className="flex flex-col gap-1 rounded-lg p-3" withArrow>
				<p className="font-medium">Timer</p>
				<p className="text-fg-secondary leading-5">6:20 AM (30m left)</p>
			</TooltipContent>
		</Tooltip>
	)
}
