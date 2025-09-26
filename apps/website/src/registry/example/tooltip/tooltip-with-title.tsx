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
					<p className="text-fg font-medium">Whats new in Radian v1.5.0</p>
					<p className="text-xs">Discover the innovative our latest update introduces cutting-edge model that enhances your experience with advanced capabilities.</p>
				</div>
			</TooltipContent>
		</Tooltip>
	)
}
