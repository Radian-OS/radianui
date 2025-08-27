import { useState } from "react"

import { EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const ResizablePreview = () => {
	const [handle, setHandle] = useState<"true" | "false">("true")

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
						<DropdownGroup>
							<DropdownSub>
								<DropdownSubTrigger>Handle</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setHandle(Array.from(keys)[0] as typeof handle)}
										minSelectionCount={1}
										selectedValues={[handle]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="mx-auto max-h-[200px] max-w-3xl">
						<ResizablePanelGroup direction="horizontal" className="my-10 min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]">
							<ResizablePanel defaultSize={50} className="border-r">
								<ResizablePanelGroup direction="vertical">
									<ResizablePanel defaultSize={25}>
										<div className="flex h-full items-center justify-center border-b p-6">
											<span className="font-semibold">One</span>
										</div>
									</ResizablePanel>
									<ResizableHandle withHandle={handle === "true"} />
									<ResizablePanel defaultSize={25}>
										<div className="flex h-full items-center justify-center p-6">
											<span className="font-semibold">Two</span>
										</div>
									</ResizablePanel>
								</ResizablePanelGroup>
							</ResizablePanel>
							<ResizableHandle withHandle={handle === "true"} />
							<ResizablePanel defaultSize={50}>
								<ResizablePanelGroup direction="vertical">
									<ResizablePanel defaultSize={25}>
										<div className="flex h-full items-center justify-center border-b p-6">
											<span className="font-semibold">Three</span>
										</div>
									</ResizablePanel>
									<ResizableHandle withHandle={handle === "true"} />
									<ResizablePanel defaultSize={75}>
										<div className="flex h-full items-center justify-center p-6">
											<span className="font-semibold">Four</span>
										</div>
									</ResizablePanel>
								</ResizablePanelGroup>
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="resizable.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default ResizablePreview
