import { Clipboard, Copy, Scissors, Trash2 } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/registry/ui/context-menu"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/ui/dialog"

export default function ContextMenuDialogExamples() {
	return (
		<div className="flex w-full items-center justify-center p-12">
			<Dialog modal={false}>
				<DialogTrigger asChild>
					<Button color="neutral" variant="outline">
						Open Dialog
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Context Menu Example</DialogTitle>
						<DialogDescription>
							Right click on the area below to see the context menu.
						</DialogDescription>
					</DialogHeader>
					<ContextMenu>
						<ContextMenuTrigger className="text-muted-foreground flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border border-dashed text-sm">
							Right click here
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuGroup>
								<ContextMenuItem>
									<Copy />
									Copy
								</ContextMenuItem>
								<ContextMenuItem>
									<Scissors />
									Cut
								</ContextMenuItem>
								<ContextMenuItem>
									<Clipboard />
									Paste
								</ContextMenuItem>
							</ContextMenuGroup>
							<ContextMenuGroup>
								<ContextMenuItem variant="error">
									<Trash2 />
									Delete
								</ContextMenuItem>
							</ContextMenuGroup>
						</ContextMenuContent>
					</ContextMenu>
				</DialogContent>
			</Dialog>
		</div>
	)
}
