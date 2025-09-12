import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const ResizableExample = () => {
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

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="mx-auto max-h-[200px] max-w-3xl">
						<ResizablePanelGroup direction="horizontal" className="my-10 min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]">
							<ResizablePanel defaultSize={50}>
								<ResizablePanelGroup direction="vertical">
									<ResizablePanel defaultSize={25}>
										<div className="flex h-full items-center justify-center border-b p-6">
											<span className="font-semibold">Navbar</span>
										</div>
									</ResizablePanel>
									<ResizableHandle withHandle />
									<ResizablePanel defaultSize={75}>
										<div className="flex h-full items-center justify-center p-6">
											<span className="font-semibold">Body</span>
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


export default function ResizableHandleExample() {
  return (    						
		<ResizablePanelGroup direction="horizontal" className="my-10 min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]">
			<ResizablePanel defaultSize={50}>
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel defaultSize={25}>
						<div className="flex h-full items-center justify-center border-b p-6">
							<span className="font-semibold">Navbar</span>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={75}>
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Body</span>
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

export default ResizableExample
