import { useState } from "react"
import { CircleAlert, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Backdrop = "overlay" | "blur" | "transparent"
type CloseButton = "hidden" | "visible" | "hover"

const PopoverPreview = () => {
	const [backdrop, setBackdrop] = useState<Backdrop>("overlay")
	const [closeButton, setCloseButton] = useState<CloseButton>("visible")

	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Backdrop</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={backdrop} onValueChange={(value) => setBackdrop(value as Backdrop)}>
									<DropdownRadioItem value="overlay" onSelect={(e) => e.preventDefault()}>
										Overlay
									</DropdownRadioItem>
									<DropdownRadioItem value="blur" onSelect={(e) => e.preventDefault()}>
										Blur
									</DropdownRadioItem>
									<DropdownRadioItem value="transparent" onSelect={(e) => e.preventDefault()}>
										Transparent
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Close Button</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={closeButton} onValueChange={(value) => setCloseButton(value as CloseButton)}>
									<DropdownRadioItem value="visible" onSelect={(e) => e.preventDefault()}>
										Visible
									</DropdownRadioItem>
									<DropdownRadioItem value="hover" onSelect={(e) => e.preventDefault()}>
										Hover
									</DropdownRadioItem>
									<DropdownRadioItem value="hidden" onSelect={(e) => e.preventDefault()}>
										Hidden
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Dialog>
						<DialogTrigger asChild>
							<Button>Dialog</Button>
						</DialogTrigger>
						<DialogContent backdrop={backdrop} closeButton={closeButton}>
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
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="modal.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Dialog>
	<DialogTrigger asChild>
		<Button>Dialog</Button>
	</DialogTrigger>
	<DialogContent backdrop="${backdrop}">
		<DialogHeader>
			<div className="flex gap-3">
				<div className="flex items-center justify-center rounded-sm border p-2">
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
				<Button color="neutral" variant="outline">Cancel</Button>
			</DialogClose>
			<Button variant={"strong"}>Continue</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default PopoverPreview
