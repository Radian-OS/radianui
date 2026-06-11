"use client"

import { CircleAlert, ClipboardIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
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
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"

export default function DialogWithoutDivider() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" color="neutral">
					Open Dialog
				</Button>
			</DialogTrigger>
			<DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone with this link can access and view the content.
					</DialogDescription>
				</DialogHeader>
				<DialogBody className="border-0 pt-0">
					<InputGroup className="w-full">
						<InputAddon>https://</InputAddon>
						<Input
							type="url"
							defaultValue="radianos.com/docs/components/dialog"
						/>
						<InputAddon mode="icon" className="bg-transparent">
							<ClipboardIcon />
						</InputAddon>
					</InputGroup>
				</DialogBody>
				<DialogFooter className="justify-between border-0 pt-0">
					<div className="flex items-center gap-2">
						<CircleAlert className="text-fg-secondary size-5 shrink-0" />
						<span className="text-fg text-sm">Read before proceeding.</span>
					</div>
					<DialogClose asChild>
						<Button variant="strong">Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
