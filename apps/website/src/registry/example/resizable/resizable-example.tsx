import {
	ResizableGroup,
	ResizablePanel,
	ResizableSeparator,
} from "@/registry/ui/resizable"

const ResizableExample = () => {
	return (
		<ResizableGroup
			orientation="horizontal"
			className="min-h-[200px] w-full max-w-md rounded-lg border">
			<ResizablePanel defaultSize={50}>
				<ResizableGroup orientation="horizontal">
					<ResizablePanel defaultSize={25}>
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Sidebar</span>
						</div>
					</ResizablePanel>
					<ResizableSeparator withHandle />
					<ResizablePanel defaultSize={50}>
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Body</span>
						</div>
					</ResizablePanel>
				</ResizableGroup>
			</ResizablePanel>
		</ResizableGroup>
	)
}

export default ResizableExample
