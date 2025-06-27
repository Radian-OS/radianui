"use client"

import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@/registry/ui/modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function GithubIntegrationModalExample() {
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
					<Modal closeIcon="hover">
						<ModalTrigger asChild>
							<Button>Integrate Now</Button>
						</ModalTrigger>
						<ModalContent>
							<div className="flex items-center justify-center gap-2 pt-6">
								<Image className="border-3 rounded-2xl p-0.5" src={"/radian.webp"} alt="radian" height={60} width={60} />
								<Image className="border-3 rounded-2xl p-0.5" src={"/github.webp"} alt="github" height={60} width={60} />
							</div>
							<ModalHeader className="text-center">
								<ModalTitle>Connect RadianOS to Github</ModalTitle>
								<ModalDescription>Streamline your API requests by using Github SDK’s and automate all your tickets</ModalDescription>
							</ModalHeader>
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
									<Input type="text" id="url" placeholder="e.g https://example@workspace.com" />
								</div>
							</div>
							<ModalFooter className="justify-start">
								<ModalClose asChild>
									<Button variant="outline" color="neutral" className="w-1/2">
										Cancel
									</Button>
								</ModalClose>
								<Button variant={"strong"} className="w-1/2">
									Next
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
					code={`<Modal closeIcon="hover">
    <ModalTrigger asChild>
        <Button>Integrate Now</Button>
    </ModalTrigger>
    <ModalContent>
        <div className="flex items-center justify-center gap-2 pt-6">
            <Image
                className="rounded-2xl border-3 p-0.5"
                src={"/radian.webp"}
                alt="radian"
                height={60}
                width={60}
            />
            <Image
                className="rounded-2xl border-3 p-0.5"
                src={"/github.webp"}
                alt="github"
                height={60}
                width={60}
            />
        </div>
        <ModalHeader className="text-center">
            <ModalTitle>Connect RadianOS to Github</ModalTitle>
            <ModalDescription>Streamline your API requests by using Github SDK’s and automate all your tickets</ModalDescription>
        </ModalHeader>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Account Name</Label>
                <Input type="text" id="name" placeholder="e.g John Smith"/>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="key">API Key</Label>
                <Input type="text" id="key" placeholder="e.g 1231-2345FGH56-A"  />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="url">Workspace URL</Label>
                <Input type="text" id="url" placeholder="e.g https://example@workspace.com"/>
            </div>
        </div>
        <ModalFooter className="justify-start">
            <ModalClose asChild>
                <Button variant="outline" color="neutral" className="w-1/2">
                    Cancel
                </Button>
            </ModalClose>
            <Button variant={"strong"} className="w-1/2">
                Next
            </Button>
        </ModalFooter>
    </ModalContent>
</Modal>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
