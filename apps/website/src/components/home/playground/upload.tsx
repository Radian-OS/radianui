import React from "react"
import { Upload } from "lucide-react"
import Image from "next/image"
import { Button, IconButton } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function Uploads() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
					<Image alt="" height={18} width={18} src="/mstile-70x70.png" />
				</div>
			</PopoverTrigger>
			<PopoverContent className="p-3" sideOffset={10}>
				<div className="flex flex-col gap-1.5">
					<p className="text-fg text-sm font-medium">My Logo</p>
					<div
						role="button"
						className="border-border hover:bg-fill1 data-[dragging=true]:bg-primary-accent has-[input:focus]:border-primary-focus has-disabled:pointer-events-none has-disabled:opacity-50 min-h-41 flex flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px] has-[input:focus]:ring-transparent">
						<input className="sr-only" aria-label="Upload files" />

						<div className="flex flex-col items-center justify-center gap-3 text-center">
							<IconButton color="neutral" variant="outline">
								<Upload size={20} />
							</IconButton>
							<div className="flex flex-col gap-1">
								<p className="text-fg text-sm font-medium">Drag and drop image here</p>
								<p className="text-fg-secondary text-xs font-normal">PNG or JPEG (max. 10 MB)</p>
							</div>
							<Button variant="outline" color="neutral" size="28">
								Browse Files
							</Button>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
