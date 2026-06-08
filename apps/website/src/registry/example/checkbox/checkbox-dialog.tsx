"use client"

import React from "react"
import { Wrench } from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Checkbox } from "@/registry/ui/checkbox"
import { Dialog, DialogFooter, DialogHeader } from "@/registry/ui/dialog"

const CheckboxDialog = () => {
	const [dontShow, setDontShow] = React.useState(true)

	return (
		<Card className="w-130 gap-0 py-0">
			<Dialog>
				<DialogHeader className="w-130 flex flex-col items-center gap-4 p-5 text-center">
					<IconButton color="warning" variant="soft" className="rounded-full">
						<Wrench />
					</IconButton>

					<div className="flex w-full flex-col items-center gap-2">
						<span className="text-fg text-base font-medium">
							Server maintenance
						</span>
						<p className="text-fg-secondary text-center text-sm font-normal">
							We are performing a scheduled system update to improve stability
							and performance. The workspace will be back online shortly.
						</p>
					</div>
				</DialogHeader>

				<DialogFooter className="border-border flex items-center justify-between gap-4 border-t p-5">
					<label className="flex cursor-pointer select-none items-center gap-2">
						<Checkbox
							checked={dontShow}
							onCheckedChange={(v) => setDontShow(Boolean(v))}
							size="md"
						/>
						<span className="text-fg text-sm font-medium">
							Don&apos;t show it again
						</span>
					</label>

					<div className="flex items-center gap-2">
						<Button variant="outline" color="neutral">
							Cancel
						</Button>
						<Button color="primary">Continue</Button>
					</div>
				</DialogFooter>
			</Dialog>
		</Card>
	)
}

export default CheckboxDialog
