import Image from "next/image"
import { Button } from "@/registry/ui/button"
import {
	Dialog,
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

export default function DialogWithForm() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" color="neutral">
					Integrate Now
				</Button>
			</DialogTrigger>
			<DialogContent closeButton="hover">
				<div className="flex items-center justify-center gap-2 pt-6">
					<Image
						className="border-3 rounded-2xl p-0.5"
						src={"/radian-mb.svg"}
						alt="radian"
						height={60}
						width={60}
					/>
					<Image
						className="border-3 rounded-2xl p-0.5"
						src={"/github.webp"}
						alt="github"
						height={60}
						width={60}
					/>
				</div>
				<DialogHeader className="text-center">
					<DialogTitle>Connect RadianOS to Github</DialogTitle>
					<DialogDescription>
						Streamline your API requests by using Github SDK’s and automate all
						your tickets
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="name">Account Name</Label>
						<Input type="text" id="name" placeholder="e.g John Smith" />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="key">API Key</Label>
						<Input type="text" id="key" placeholder="e.g 1231-2345FGH56-A" />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="url">Workspace URL</Label>
						<Input
							type="text"
							id="url"
							placeholder="e.g https://example@workspace.com"
						/>
					</div>
				</div>
				<DialogFooter className="justify-start">
					<DialogClose asChild>
						<Button variant="outline" color="neutral" className="w-1/2">
							Cancel
						</Button>
					</DialogClose>
					<Button variant={"strong"} className="w-1/2">
						Next
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
