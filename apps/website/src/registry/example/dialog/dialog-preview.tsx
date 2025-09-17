import { CircleAlert } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"

export default function DialogPreview() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<div className="flex gap-3">
						<div className="flex items-center justify-center rounded-md border p-2">
							<CircleAlert className="text-fg2 size-6" />
						</div>
						<div>
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
