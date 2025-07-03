"use client"

import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@/registry/ui/modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function DeleteModalExample() {
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<Modal>
						<ModalTrigger asChild>
							<Button variant={"strong"} color={"error"}>
								Delete
							</Button>
						</ModalTrigger>
						<ModalContent>
							<ModalHeader>
								<ModalTitle>Delete Container</ModalTitle>
								<ModalDescription>Are you sure you want to delete this container? This cannot be undone</ModalDescription>
							</ModalHeader>
							<ModalFooter>
								<ModalClose asChild>
									<Button color="neutral" variant="outline">
										Cancel
									</Button>
								</ModalClose>
								<Button variant={"strong"} color={"error"}>
									Delete
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-105"
					code={`<Modal>
	<ModalTrigger asChild>
		<Button variant={"strong"}  color={"error"}>Delete</Button>
	</ModalTrigger>
	<ModalContent>
		<ModalHeader>
			<ModalTitle>Delete Container</ModalTitle>
			<ModalDescription>Are you sure you want to delete this container? This cannot be undone</ModalDescription>
		</ModalHeader>
		<ModalFooter>
			<ModalClose asChild>
				<Button variant="outline">Cancel</Button>
			</ModalClose>
			<Button variant={"strong"}  color={"error"}>Delete</Button>
		</ModalFooter>
	</ModalContent>
</Modal>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
