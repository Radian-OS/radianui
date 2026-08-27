import {
	ResizableGroup,
	ResizablePanel,
	ResizableSeparator,
} from "@/registry/ui/resizable"

const ResizablePreview = () => {
	return (
		<ResizableGroup
			orientation="horizontal"
			className="min-h-[200px] w-full max-w-md rounded-lg border">
			<ResizablePanel defaultSize="50%">
				<ResizableGroup orientation="vertical">
					<ResizablePanel defaultSize="50%">
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">One</span>
						</div>
					</ResizablePanel>
					<ResizableSeparator />
					<ResizablePanel defaultSize="50%">
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Two</span>
						</div>
					</ResizablePanel>
				</ResizableGroup>
			</ResizablePanel>
			<ResizableSeparator />
			<ResizablePanel defaultSize="50%">
				<ResizableGroup orientation="vertical">
					<ResizablePanel defaultSize="25%">
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Three</span>
						</div>
					</ResizablePanel>
					<ResizableSeparator />
					<ResizablePanel defaultSize="75%">
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Four</span>
						</div>
					</ResizablePanel>
				</ResizableGroup>
			</ResizablePanel>
		</ResizableGroup>
	)
}

export default ResizablePreview
