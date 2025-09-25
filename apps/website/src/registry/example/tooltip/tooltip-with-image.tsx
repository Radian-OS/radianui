import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipWithImage() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" variant="outline">
					With Image
				</Button>
			</TooltipTrigger>
			<TooltipContent theme="light" className="py-2">
				<div className="space-y-2">
					<Image className="w-full rounded" src="/og/static-og.png" width={382} height={216} alt="Content image" />
					<div className="flex flex-col gap-1">
						<p className="font-medium">Tooltip with Image</p>
						<p className="text-fg-secondary text-xs">
							Tooltips are flexible and accessible components that support dynamic placement, rich content, and a robust API. Use them as lightweight help or a compact menu by
							setting the trigger prop to click.
						</p>
					</div>
				</div>
			</TooltipContent>
		</Tooltip>
	)
}
