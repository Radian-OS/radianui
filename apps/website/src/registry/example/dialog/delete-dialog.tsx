"use client"

import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function DeleteDialogExample() {
	return (
		<Tabs defaultValue="preview" variant="outline-ghost">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<Dialog>
						<DialogTrigger asChild>
							<Button variant={"strong"} color={"error"}>
								Delete
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Delete Container</DialogTitle>
								<DialogDescription>Are you sure you want to delete this container? This cannot be undone</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose asChild>
									<Button color="neutral" variant="outline">
										Cancel
									</Button>
								</DialogClose>
								<Button variant={"strong"} color={"error"}>
									Delete
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="delete-modal.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Dialog>
	<DialogTrigger asChild>
		<Button variant={"strong"}  color={"error"}>Delete</Button>
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Delete Container</DialogTitle>
			<DialogDescription>Are you sure you want to delete this container? This cannot be undone</DialogDescription>
		</DialogHeader>
		<DialogFooter>
			<DialogClose asChild>
				<Button variant="outline">Cancel</Button>
			</DialogClose>
			<Button variant={"strong"}  color={"error"}>Delete</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
