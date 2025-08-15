import { useState } from "react"

import { Box } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Toaster, showToast } from "@/registry/ui/toast"

const ToastExample = () => {
	const [position, setPosition] = useState<"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right">("bottom-right")
	// const [variant, setVariant] = useState<"default" | "information" | "success" | "error" | "warning">("default")
	const [stackable, setStackable] = useState<"true" | "false">("false")
	// const [closable, setClosable] = useState<"true" | "false">("false")
	const [visibleToasts, setVisibleToasts] = useState<"3" | "4" | "5" | "6">("3")
	const [key, setKey] = useState(0)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub>
									<DropdownSubTrigger>Position</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => setPosition(Array.from(keys)[0] as typeof position)}
											minSelectionCount={1}
											selectedValues={[position]}>
											<DropdownItem value="bottom-right">Bottom Right</DropdownItem>
											<DropdownItem value="top-left">Top Left</DropdownItem>
											<DropdownItem value="top-center">Top Center</DropdownItem>
											<DropdownItem value="top-right">Top Right</DropdownItem>
											<DropdownItem value="bottom-left">Bottom Left</DropdownItem>
											<DropdownItem value="bottom-center">Bottom Center</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Stackable</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => {
												setStackable(Array.from(keys)[0] as typeof stackable)
												setKey((k) => k + 1)
											}}
											minSelectionCount={1}
											selectedValues={[stackable]}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Visible toast</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => {
												setVisibleToasts(Array.from(keys)[0] as typeof visibleToasts)
												setKey((k) => k + 1)
											}}
											minSelectionCount={1}
											selectedValues={[visibleToasts]}>
											<DropdownItem value="3">3</DropdownItem>
											<DropdownItem value="4">4</DropdownItem>
											<DropdownItem value="5">5</DropdownItem>
											<DropdownItem value="6">6</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="mx-auto max-h-[200px] max-w-3xl">
						<Toaster position={`${position}`} visibleToasts={Number(visibleToasts)} expand={stackable !== "true"} />
						<Button
							key={key}
							variant="outline"
							onClick={() =>
								showToast({
									customContent: (
										<div className="bg-elevation-level2 gap-2 rounded-lg p-3 text-white">
											<div className="flex items-center space-x-3">
												<Box />
												<div>
													{/* Content */}
													<div className="flex-1">
														<div className="mb-1 text-sm font-semibold">Toast title</div>
														<div className="text-sm opacity-90">Toast description message</div>
													</div>
													<div className="mt-2 flex space-x-2">
														<Button variant="ghost" className={`p-0 text-xs text-white`}>
															Upgrade
														</Button>
														<Button variant="ghost" className={`p-0 text-xs text-white`}>
															Learn More
														</Button>
													</div>
												</div>
											</div>
										</div>
									),
									isCustom: true,
									closeOnClick: false,
								})
							}>
							Toast
						</Button>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="toast-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={` <Toaster position="${position}" visibleToasts={${visibleToasts}} expand={${stackable}} />
	<Button
		variant="outline"
		onClick={() =>
			showToast({
				customContent: (
					<div className="bg-elevation-level2 gap-2 rounded-lg p-3 text-white">
						<div className="flex items-center space-x-3">
							<Box />
							<div>
								{/* Content */}
								<div className="flex-1">
									<div className="mb-1 text-sm font-semibold">Toast title</div>
									<div className="text-sm opacity-90">Toast description message</div>
								</div>
								<div className="mt-2 flex space-x-2">
									<Button variant="ghost" className="p-0 text-xs text-white">
										Upgrade
									</Button>
									<Button variant="ghost" className="p-0 text-xs text-white">
										Learn More
									</Button>
								</div>
							</div>
						</div>
					</div>
				),
				isCustom: true,
				closeOnClick: false,
			})
			}>
			Toast
		</Button>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default ToastExample
