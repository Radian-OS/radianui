import React from "react"
import { GlobeLock } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipWithIconTitle() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" variant="outline">
					With Icon & Title
				</Button>
			</TooltipTrigger>
			<TooltipContent className="flex max-w-60 flex-col gap-1 rounded-lg p-3">
				<div className="flex gap-2">
					<GlobeLock className="text-fg-tertiary size-4 shrink-0" aria-hidden="true" />
					<div className="space-y-1">
						<p className="text-white-inverse font-semibold">Security Risk</p>
						<p className="text-white-inverse">Upgrading your account to Pro for end-to- end encryption.</p>
					</div>
				</div>
			</TooltipContent>
		</Tooltip>
	)
}
