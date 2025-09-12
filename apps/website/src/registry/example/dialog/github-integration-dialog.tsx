"use client"

import { EyeIcon, SquareTerminal } from "lucide-react"
import Image from "next/image"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function GithubIntegrationDialogExample() {
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
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<Dialog>
						<DialogTrigger asChild>
							<Button>Integrate Now</Button>
						</DialogTrigger>
						<DialogContent closeButton="hover">
							<div className="flex items-center justify-center gap-2 pt-6">
								<Image className="border-3 rounded-2xl p-0.5" src={"/radian.webp"} alt="radian" height={60} width={60} />
								<Image className="border-3 rounded-2xl p-0.5" src={"/github.webp"} alt="github" height={60} width={60} />
							</div>
							<DialogHeader className="text-center">
								<DialogTitle>Connect RadianOS to Github</DialogTitle>
								<DialogDescription>Streamline your API requests by using Github SDK’s and automate all your tickets</DialogDescription>
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
									<Input type="text" id="url" placeholder="e.g https://example@workspace.com" />
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
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="github-integration-modal.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Dialog closeIcon="hover">
    <DialogTrigger asChild>
        <Button>Integrate Now</Button>
    </DialogTrigger>
    <DialogContent>
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
        <DialogHeader className="text-center">
            <DialogTitle>Connect RadianOS to Github</DialogTitle>
            <DialogDescription>Streamline your API requests by using Github SDK’s and automate all your tickets</DialogDescription>
        </DialogHeader>
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
</Dialog>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
