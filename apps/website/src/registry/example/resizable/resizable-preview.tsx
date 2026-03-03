import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/ui/resizable"

const ResizablePreview = () => {
	return (
		<div className="mx-auto max-h-[200px] max-w-3xl">
			<ResizablePanelGroup
				direction="horizontal"
				className="my-10 min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]">
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
		</div>
	)
}

export default ResizablePreview
