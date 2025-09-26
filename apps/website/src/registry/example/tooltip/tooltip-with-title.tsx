import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipWithTitle() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" variant="outline">
					With Title
				</Button>
			</TooltipTrigger>
			<TooltipContent theme="light" className="py-2">
				<div className="flex flex-col gap-1">
					<p className="text-fg font-medium">Tooltip with title</p>
					<p className="text-xs">
						Tooltips are flexible and accessible components that support dynamic placement, rich content, and a robust API. Use them as lightweight help or a compact menu by
						setting the trigger prop to click.
					</p>
				</div>
			</TooltipContent>
		</Tooltip>
	)
}
