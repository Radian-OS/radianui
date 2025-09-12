import { useState } from "react"
import { Box } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
							<DropdownSub>
								<DropdownSubTrigger>Position</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={position} onValueChange={(value) => setPosition(value as typeof position)}>
										<DropdownRadioItem value="bottom-right" onSelect={(e) => e.preventDefault()}>
											Bottom Right
										</DropdownRadioItem>
										<DropdownRadioItem value="top-left" onSelect={(e) => e.preventDefault()}>
											Top Left
										</DropdownRadioItem>
										<DropdownRadioItem value="top-center" onSelect={(e) => e.preventDefault()}>
											Top Center
										</DropdownRadioItem>
										<DropdownRadioItem value="top-right" onSelect={(e) => e.preventDefault()}>
											Top Right
										</DropdownRadioItem>
										<DropdownRadioItem value="bottom-left" onSelect={(e) => e.preventDefault()}>
											Bottom Left
										</DropdownRadioItem>
										<DropdownRadioItem value="bottom-center" onSelect={(e) => e.preventDefault()}>
											Bottom Center
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Stackable</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={stackable}
										onValueChange={(value) => {
											setStackable(value as typeof stackable)
											setKey((k) => k + 1)
										}}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Visible toast</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={visibleToasts}
										onValueChange={(value) => {
											setVisibleToasts(value as typeof visibleToasts)
											setKey((k) => k + 1)
										}}>
										<DropdownRadioItem value="3" onSelect={(e) => e.preventDefault()}>
											3
										</DropdownRadioItem>
										<DropdownRadioItem value="4" onSelect={(e) => e.preventDefault()}>
											4
										</DropdownRadioItem>
										<DropdownRadioItem value="5" onSelect={(e) => e.preventDefault()}>
											5
										</DropdownRadioItem>
										<DropdownRadioItem value="6" onSelect={(e) => e.preventDefault()}>
											6
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList variant="outline-ghost" size="md">
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
