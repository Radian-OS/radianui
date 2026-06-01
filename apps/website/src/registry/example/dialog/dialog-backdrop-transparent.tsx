import { IconSlot } from "@/registry/icon/icon-library"
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

export default function DialogBackdropTransparent() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" color="neutral">
					Open Dialog
				</Button>
			</DialogTrigger>
			<DialogContent backdrop="transparent">
				<DialogHeader>
					<div className="flex gap-3">
						<div className="border-soft-alpha flex size-fit items-center justify-start rounded-lg border p-2">
							<IconSlot slot="circle-alert" className="text-fg2 size-6" />
						</div>
						<div className="flex flex-col gap-1">
							<DialogTitle>This is sample header</DialogTitle>
							<DialogDescription>
								Are you sure you want to change the content?
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>
				<DialogBody>
					<div className="bg-elevation-negative h-40 rounded-lg" />
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button color="neutral" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button variant={"strong"}>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
