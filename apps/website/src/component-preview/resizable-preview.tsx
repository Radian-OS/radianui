import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const ResizablePreview = () => {
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
									<ResizableHandle />
									<ResizablePanel defaultSize={25}>
										<div className="flex h-full items-center justify-center p-6">
											<span className="font-semibold">Two</span>
										</div>
									</ResizablePanel>
								</ResizablePanelGroup>
							</ResizablePanel>
							<ResizableHandle />
							<ResizablePanel defaultSize={50}>
								<ResizablePanelGroup direction="vertical">
									<ResizablePanel defaultSize={25}>
										<div className="flex h-full items-center justify-center border-b p-6">
											<span className="font-semibold">Three</span>
										</div>
									</ResizablePanel>
									<ResizableHandle />
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
				<CodeSnippet
					title="resizable.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"


export default function ResizableExample() {
  return (    						
		<ResizablePanelGroup direction="horizontal" className="my-10 min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]">
			<ResizablePanel defaultSize={50} className="border-r">
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel defaultSize={25}>
						<div className="flex h-full items-center justify-center border-b p-6">
							<span className="font-semibold">One</span>
						</div>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel defaultSize={25}>
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Two</span>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={50}>
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel defaultSize={25}>
						<div className="flex h-full items-center justify-center border-b p-6">
							<span className="font-semibold">Three</span>
						</div>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel defaultSize={75}>
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Four</span>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
		</ResizablePanelGroup>
  );
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default ResizablePreview
