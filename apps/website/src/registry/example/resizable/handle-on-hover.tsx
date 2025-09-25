import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/ui/resizable"

const HandleOnHover = () => {
	return (
		<div className="mx-auto max-h-[200px] max-w-3xl">
			<ResizablePanelGroup direction="horizontal" className="my-10 min-h-[200px] max-w-md rounded-lg border md:min-w-[400px]">
				<ResizablePanel defaultSize={50}>
					<ResizablePanelGroup direction="horizontal">
						<ResizablePanel defaultSize={20}>
							<div className="flex h-full items-center justify-center p-6">
								<span className="font-semibold">Sidebar</span>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle className="[&>div]:opacity-0 [&>div]:transition-opacity [&>div]:duration-200 hover:[&>div]:opacity-100" />
						<ResizablePanel defaultSize={50}>
							<div className="flex h-full items-center justify-center p-6">
								<span className="font-semibold">Body</span>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle className="[&>div]:opacity-0 [&>div]:transition-opacity [&>div]:duration-200 hover:[&>div]:opacity-100" />
						<ResizablePanel defaultSize={25}>
							<div className="flex h-full items-center justify-center p-6">
								<span className="font-semibold">Toolbar</span>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}

export default HandleOnHover
