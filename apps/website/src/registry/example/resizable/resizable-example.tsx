import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/ui/resizable"

const ResizableExample = () => {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="min-h-[200px] w-full max-w-md rounded-lg border">
			<ResizablePanel defaultSize={50}>
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel defaultSize={25}>
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Sidebar</span>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={50}>
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Body</span>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}

export default ResizableExample
