import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/ui/resizable"

const ResizableExample = () => {
	return (
		<div className="mx-auto max-h-[200px] max-w-3xl">
			<ResizablePanelGroup
				direction="horizontal"
				className="my-10 min-h-[200px] max-w-md rounded-lg border md:min-w-[350px]">
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
		</div>
	)
}

export default ResizableExample
