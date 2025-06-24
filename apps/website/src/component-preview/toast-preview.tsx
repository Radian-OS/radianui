import { useState } from "react"
import { Box } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Toaster, showToast } from "@/registry/ui/toast"

const ToastPreview = () => {
	const [position, setPosition] = useState<"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right">("bottom-right")
	const [variant, setVariant] = useState<"neutral" | "strong" | "inverse">("neutral")
	const [state, setState] = useState<"default" | "info" | "success" | "error" | "warning">("default")
	const [stackable, setStackable] = useState<"true" | "false">("false")
	const [closable, setClosable] = useState<"true" | "false">("true")
	const [visibleToasts, setVisibleToasts] = useState<"3" | "4" | "5" | "6">("3")
	const [placement, setPlacement] = useState<"horizontal" | "vertical">("horizontal")
	const [icon, setIcon] = useState<"true" | "false">("true")
	const [title, setTitle] = useState<"true" | "false">("true")
	const [desc, setDesc] = useState<"true" | "false">("true")
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
											<DropdownItem value="neutral">Neutral</DropdownItem>
											<DropdownItem value="strong">Strong</DropdownItem>
											<DropdownItem value="inverse">Inverse</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>State</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setState(Array.from(keys)[0] as typeof state)} minSelectionCount={1} selectedValues={[state]}>
											<DropdownItem value="default">Default</DropdownItem>
											<DropdownItem value="info">Information</DropdownItem>
											<DropdownItem value="success">Success</DropdownItem>
											<DropdownItem value="warning">Warning</DropdownItem>
											<DropdownItem value="error">Error</DropdownItem>{" "}
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Button Placement</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => {
												setPlacement(Array.from(keys)[0] as typeof placement)
												setKey((k) => k + 1)
											}}
											minSelectionCount={1}
											selectedValues={[placement]}>
											<DropdownItem value="horizontal">Horizontal</DropdownItem>
											<DropdownItem value="vertical">Vertical</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Icon</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => {
												setIcon(Array.from(keys)[0] as typeof icon)
												setKey((k) => k + 1)
											}}
											minSelectionCount={1}
											selectedValues={[icon]}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Title</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => {
												setTitle(Array.from(keys)[0] as typeof title)
												setKey((k) => k + 1)
											}}
											minSelectionCount={1}
											selectedValues={[title]}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Description</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => {
												setDesc(Array.from(keys)[0] as typeof desc)
												setKey((k) => k + 1)
											}}
											minSelectionCount={1}
											selectedValues={[desc]}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
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
									icon: icon === "true" ? <Box className="size-5" /> : undefined,
									variant,
									state,
									placement,
									title: title === "true" ? "Toast Title" : "",
									closable: closable === "true",
									description: desc === "true" ? "Toast description message." : "",
									buttons: [
										{ label: "Upgrade", onClick: () => console.log("Retrying..."), dismiss: false },
										{ label: "Learn More", onClick: () => console.log("Cancelled") },
									],
								})
							}>
							Toast
						</Button>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={` <Toaster position="${position}" visibleToasts={${visibleToasts}} expand={${stackable}} />
<Button
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
	Toast
</Button>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default ToastPreview
