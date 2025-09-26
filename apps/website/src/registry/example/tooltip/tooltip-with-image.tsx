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
						<p className="text-fg font-medium">Whats new in Radian v1.5.0</p>
						<p className="text-xs">Discover the innovative our latest update introduces cutting-edge model that enhances your experience with advanced capabilities.</p>
					</div>
				</div>
			</TooltipContent>
		</Tooltip>
	)
}
