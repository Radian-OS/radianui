"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/ui/dialog"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function DialogDestructive() {
	const [value, setValue] = useState("")
	const confirmed = value === "Delete"

	return (
		<Dialog onOpenChange={() => setValue("")}>
			<DialogTrigger asChild>
				<Button variant="outline" color="neutral">
					Delete resource
				</Button>
			</DialogTrigger>
			<DialogContent className="w-100">
				<DialogHeader>
					<div className="flex flex-col gap-3">
						<IconButton className="rounded-full" variant="soft" color="error">
							<Trash2 />
						</IconButton>
						<div className="flex flex-col gap-1">
							<DialogTitle>Confirm deletion</DialogTitle>
							<DialogDescription>
								You are about to permanently delete this resource. Enter the
								confirmation text below to proceed.
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>
				<DialogBody className="border-0">
					<div className="flex flex-col gap-2">
						<Label className="text-fg text-sm font-semibold">
							Type &quot;Delete&quot; to confirm
						</Label>
						<Input
							placeholder="Delete"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</div>
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button color="neutral" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button variant="strong" color="error" disabled={!confirmed}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
