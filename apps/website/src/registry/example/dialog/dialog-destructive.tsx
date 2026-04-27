import React from "react"
import { Button } from "@/styles/default/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/styles/default/ui/dialog"

export default function DialogDestructive() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"strong"} color={"error"}>
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent closeButton="hidden">
				<DialogHeader>
					<DialogTitle>Delete Container</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this container? This cannot be
						undone
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button color="neutral" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button variant="strong" color="error">
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
