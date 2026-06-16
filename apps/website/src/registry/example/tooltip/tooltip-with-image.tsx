import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipWithImage() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" variant="outline">
					With Title & Image
				</Button>
			</TooltipTrigger>
			<TooltipContent
				theme="light"
				className="flex flex-col gap-3 rounded-lg p-3">
				<Image
					className="w-full rounded-md"
					src="/og/static-og.png"
					width={280}
					height={147}
					alt="Content image"
				/>
				<div className="flex flex-col gap-1">
					<p className="text-fg font-semibold">Whats new in Radian v1.0.0</p>
					<p className="leading-5 opacity-75">
						Discover the innovative our latest update introduces cutting-edge
						model that enhances your experience.
					</p>
				</div>
			</TooltipContent>
		</Tooltip>
	)
}
