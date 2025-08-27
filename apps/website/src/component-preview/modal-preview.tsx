import { useState } from "react"

import { CircleAlert, EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Modal, ModalBody, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@/registry/ui/modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type CloseIconVisibility = "hidden" | "hover" | "visible"
type Backdrop = "overlay" | "blur" | "transparent"
type WithSeparator = "true" | "false"

const PopoverPreview = () => {
	const [closeIcon, setCloseIcon] = useState<CloseIconVisibility>("hidden")
	const [backdrop, setBackdrop] = useState<Backdrop>("overlay")
	const [withSeparator, setWithSeparator] = useState<WithSeparator>("false")

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
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
							<DropdownSubTrigger>Close icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => setCloseIcon(Array.from(keys)[0] as CloseIconVisibility)}
									minSelectionCount={1}
									selectedValues={[closeIcon]}>
									<DropdownItem value="hidden">Hidden</DropdownItem>
									<DropdownItem value="visible">Visible</DropdownItem>
									<DropdownItem value="hover">Hover</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Backdrop</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setBackdrop(Array.from(keys)[0] as Backdrop)} minSelectionCount={1} selectedValues={[backdrop]}>
									<DropdownItem value="overlay">Overlay</DropdownItem>
									<DropdownItem value="blur">Blur</DropdownItem>
									<DropdownItem value="transparent">Transparent</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>With separator</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => setWithSeparator(Array.from(keys)[0] as WithSeparator)}
									minSelectionCount={1}
									selectedValues={[withSeparator]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Modal backdrop={backdrop} closeIcon={closeIcon} withSeparator={withSeparator === "true" ? true : false}>
						<ModalTrigger asChild>
							<Button>Modal</Button>
						</ModalTrigger>
						<ModalContent>
							<ModalHeader>
								<div className="flex gap-3">
									<div className="flex items-center justify-center rounded-sm border p-2">
										<CircleAlert className="text-fg2 size-6" />
									</div>
									<div>
										<ModalTitle>This is sample header</ModalTitle>
										<ModalDescription>Are you sure you want to change the content?</ModalDescription>
									</div>
								</div>
							</ModalHeader>
							<ModalBody>
								<div className="bg-elevation-negative h-40 rounded-lg" />
							</ModalBody>
							<ModalFooter>
								<ModalClose asChild>
									<Button color="neutral" variant="outline">
										Cancel
									</Button>
								</ModalClose>
								<Button variant={"strong"}>Continue</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="modal.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Modal backdrop="${backdrop}" closeIcon="${closeIcon}" ${withSeparator === "true" ? "withSeparator" : ""}>
	<ModalTrigger asChild>
		<Button>Modal</Button>
	</ModalTrigger>
	<ModalContent>
		<ModalHeader>
			<div className="flex gap-3">
				<div className="flex items-center justify-center rounded-sm border p-2">
					<CircleAlert className="text-fg2 size-6" />
				</div>
				<div>
					<ModalTitle>This is sample header</ModalTitle>
					<ModalDescription>Are you sure you want to change the content?</ModalDescription>
				</div>
			</div>
		</ModalHeader>
		<ModalBody>
			<div className="bg-elevation-negative h-40 rounded-lg" />
		</ModalBody>
		<ModalFooter>
			<ModalClose asChild>
				<Button color="neutral" variant="outline">Cancel</Button>
			</ModalClose>
			<Button variant={"strong"}>Continue</Button>
		</ModalFooter>
	</ModalContent>
</Modal>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default PopoverPreview
