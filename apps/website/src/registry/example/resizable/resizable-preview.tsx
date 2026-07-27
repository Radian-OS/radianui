import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/ui/resizable"

const ResizablePreview = () => {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="min-h-[200px] w-full max-w-md rounded-lg border">
			<ResizablePanel defaultSize={50}>
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel defaultSize={25}>
						<div className="flex h-full items-center justify-center p-6">
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
						<div className="flex h-full items-center justify-center p-6">
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
	)
}

export default ResizablePreview
