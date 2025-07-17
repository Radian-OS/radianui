import { useState } from "react"
import { CircleAlert } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
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
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
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
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
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
								<div className="bg-bg-level0 h-40 rounded-lg" />
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
				<CodeArea
					language="tsx"
					showLineNumbers
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
			<div className="bg-bg-level0 h-40 rounded-lg" />
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
