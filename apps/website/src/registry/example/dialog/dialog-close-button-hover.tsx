import { CircleAlert } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"

export default function DialogCloseButtonHover() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Open Dialog</Button>
			</DialogTrigger>
			<DialogContent closeButton="hover">
				<DialogHeader>
					<div className="flex gap-3">
						<div className="border-soft-alpha flex size-fit items-center justify-start rounded-lg border p-2">
							<CircleAlert className="text-fg2 size-6" />
						</div>
						<div className="flex flex-col gap-1">
							<DialogTitle>This is sample header</DialogTitle>
							<DialogDescription>Are you sure you want to change the content?</DialogDescription>
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
