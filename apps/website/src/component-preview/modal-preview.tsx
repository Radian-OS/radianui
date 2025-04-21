import { useState } from "react"
import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@/registry/ui/modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type CloseIconVisibility = "hidden" | "hover" | "visible"
type Backdrop = "overlay" | "blur" | "transparent"

const PopoverPreview = () => {
	const [closeIconVisibility, setCloseIconVisibility] = useState<CloseIconVisibility>("hidden")
	const [backdrop, setBackdrop] = useState<Backdrop>("overlay")

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>CloseIconVisibility</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setCloseIconVisibility(Array.from(keys)[0] as CloseIconVisibility)}
										minSelectionCount={1}
										selectedValues={[closeIconVisibility]}>
										<DropdownItem value="hidden">Hidden</DropdownItem>
										<DropdownItem value="visible">Visible</DropdownItem>
										<DropdownItem value="hover">Hover</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Backdrop</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setBackdrop(Array.from(keys)[0] as Backdrop)}
										minSelectionCount={1}
										selectedValues={[backdrop]}>
										<DropdownItem value="overlay">Overlay</DropdownItem>
										<DropdownItem value="blur">Blur</DropdownItem>
										<DropdownItem value="transparent">Transparent</DropdownItem>
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
					<Modal backdrop={backdrop}
					// closeIconVisibility={closeIconVisibility}
					>
						<ModalTrigger asChild>
							<Button>Modal</Button>
						</ModalTrigger>
						<ModalContent>
							<div className="flex items-center justify-center gap-2 pt-6">
								<Image
									className="rounded-2xl"
									src={"https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"}
									alt="radian"
									height={60}
									width={60}
								/>
							</div>
							<ModalHeader className="text-center">
								<ModalTitle>Connect account to Github</ModalTitle>
								<ModalDescription>Streamline your API requests by using Github SDK’s and automate all your tickets</ModalDescription>
							</ModalHeader>
							<div className="flex flex-col gap-4">
								<Input label="Account Name" placeholder="e.g. John Doe" type="text" name="account-name" />
								<Input label="API Key" placeholder="e.g.0405a-5598e-gg54gg " type="text" name="account-name" />
								<Input label="Workspace URL" placeholder="e.g. radianos.com/workspace" type="email" name="account-name" />
							</div>
							<ModalFooter className="justify-start">
								<ModalClose asChild>
									<Button variant="neutral-outline" className="w-1/2">
										Close Modal
									</Button>
								</ModalClose>
								<Button variant={"strong"} className="w-1/2">
									Submit Action
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default PopoverPreview
