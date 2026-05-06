import { Clock } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

export default function TooltipWithTitleAndDescription() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" className="gap-1.5" variant="outline">
					<Clock />
					Edit Time
				</Button>
			</TooltipTrigger>
			<TooltipContent className="flex flex-col gap-1 rounded-lg p-3" withArrow>
				<p className="font-medium">Timer</p>
				<p className="leading-5">6:20 AM (30m left)</p>
			</TooltipContent>
		</Tooltip>
	)
}
