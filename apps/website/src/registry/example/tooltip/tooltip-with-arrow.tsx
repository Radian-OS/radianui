import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipWithArrow() {
	return (
		<div className="flex gap-6">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						Default Tooltip
					</Button>
				</TooltipTrigger>
				<TooltipContent withArrow>I am a default tooltip description.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						Light Tooltip
					</Button>
				</TooltipTrigger>
				<TooltipContent theme="light" withArrow>
					I am a light tooltip description.
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
