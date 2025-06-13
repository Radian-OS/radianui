import { useState } from "react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Toaster, showToast } from "@/registry/ui/toast"

const SonnerPreview = () => {
	const [position, setPosition] = useState<"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right">("bottom-right")
	const [variant, setVariant] = useState<"default" | "information" | "success" | "error" | "warning">("default")
	const [stackable, setStackable] = useState<"true" | "false">("false")
	const [closable, setClosable] = useState<"true" | "false">("false")
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
									<DropdownSubTrigger>Variant</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as typeof variant)}
											minSelectionCount={1}
											selectedValues={[variant]}>
											<DropdownItem value="default">Default</DropdownItem>
											<DropdownItem value="information">Information</DropdownItem>
											<DropdownItem value="success">Success</DropdownItem>
											<DropdownItem value="warning">Warning</DropdownItem>
											<DropdownItem value="error">Error</DropdownItem>{" "}
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
									<DropdownSubTrigger>Closeable</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => {
												setClosable(Array.from(keys)[0] as typeof closable)
												setKey((k) => k + 1)
											}}
											minSelectionCount={1}
											selectedValues={[closable]}>
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
							variant="neutral-outline"
							onClick={() =>
								showToast({
									variant,
									title: "Toast Title",
									closable: closable === "true",
									description: "Toast description message",
									buttons: [
										{ label: "Upgrade", onClick: () => console.log("Retrying..."), dismiss: false },
										{ label: "Learn More", onClick: () => console.log("Cancelled") },
									],
								})
							}>
							Sonner
						</Button>
						{/* 
						<Button
							key={key}
							variant="neutral-outline"
							onClick={() =>
								showToast({
									customContent: (
										<div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
											<div className="flex items-center space-x-3">
												<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
													<span className="text-2xl">🎉</span>
												</div>
												<div>
													<h3 className="text-lg font-bold">Congratulations!</h3>
													<p className="text-sm opacity-90">You've unlocked a new achievement</p>
													<p className="mt-1 text-xs opacity-75">Click anywhere to dismiss</p>
													<div className="mt-2 flex space-x-2">
														<button
															className="rounded bg-white px-3 py-1 text-xs font-medium text-purple-500"
															onClick={(e) => {
																e.stopPropagation() // Prevent toast from closing
																console.log("View Details clicked")
															}}>
															View Details
														</button>
														<button
															className="rounded bg-purple-600 px-3 py-1 text-xs text-white"
															onClick={(e) => {
																e.stopPropagation() // Prevent toast from closing
																console.log("Share clicked")
															}}>
															Share
														</button>
													</div>
												</div>
											</div>
										</div>
									),
									isCustom: true,
									closeOnClick: false,
								})
							}>
							Sonner
						</Button> */}
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={` <Toaster position="${position}" bgColor="${variant}" visibleToasts={${visibleToasts}} expand={${stackable}} />
<Button
variant="neutral-outline"
onClick={() =>
Sonner({
variant:"${variant}",
closable:"${closable}",
description: "New card added",
})}
>
Sonner
</Button>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SonnerPreview
