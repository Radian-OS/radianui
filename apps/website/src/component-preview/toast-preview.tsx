import { useState } from "react"
import { Box, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Toaster, showToast } from "@/registry/ui/toast"

const ToastPreview = () => {
	const [position, setPosition] = useState<"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right">("bottom-right")
	const [variant, setVariant] = useState<"outline" | "strong" | "inverse">("outline")
	const [state, setState] = useState<"neutral" | "primary" | "info" | "success" | "error" | "warning">("neutral")
	const [stackable, setStackable] = useState<"true" | "false">("true")
	const [closable, setClosable] = useState<"true" | "false">("true")
	const [visibleToasts, setVisibleToasts] = useState<"3" | "4" | "5" | "6">("3")
	const [placement, setPlacement] = useState<"horizontal" | "vertical">("horizontal")
	const [icon, setIcon] = useState<"true" | "false">("true")
	const [title, setTitle] = useState<"true" | "false">("true")
	const [desc, setDesc] = useState<"true" | "false">("true")
	const [actionButton, setActionButton] = useState<"true" | "false">("true")
	const [key, setKey] = useState(0)

	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownGroup>
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
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as typeof variant)}>
										<DropdownRadioItem value="outline" onSelect={(e) => e.preventDefault()}>
											Outline
										</DropdownRadioItem>
										<DropdownRadioItem value="strong" onSelect={(e) => e.preventDefault()}>
											Strong
										</DropdownRadioItem>
										<DropdownRadioItem value="inverse" onSelect={(e) => e.preventDefault()}>
											Inverse
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Color</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={state} onValueChange={(value) => setState(value as typeof state)}>
										<DropdownRadioItem value="primary" onSelect={(e) => e.preventDefault()}>
											Primary
										</DropdownRadioItem>
										<DropdownRadioItem value="neutral" onSelect={(e) => e.preventDefault()}>
											Neutral
										</DropdownRadioItem>
										<DropdownRadioItem value="success" onSelect={(e) => e.preventDefault()}>
											Success
										</DropdownRadioItem>
										<DropdownRadioItem value="error" onSelect={(e) => e.preventDefault()}>
											Error
										</DropdownRadioItem>
										<DropdownRadioItem value="warning" onSelect={(e) => e.preventDefault()}>
											Warning
										</DropdownRadioItem>
										<DropdownRadioItem value="info" onSelect={(e) => e.preventDefault()}>
											Info
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Button Placement</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={placement}
										onValueChange={(value) => {
											setPlacement(value as typeof placement)
											setKey((k) => k + 1)
										}}>
										<DropdownRadioItem value="horizontal" onSelect={(e) => e.preventDefault()}>
											Horizontal
										</DropdownRadioItem>
										<DropdownRadioItem value="vertical" onSelect={(e) => e.preventDefault()}>
											Vertical
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>End Content</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={actionButton}
										onValueChange={(value) => {
											setActionButton(value as typeof actionButton)
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
								<DropdownSubTrigger>Icon</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={icon}
										onValueChange={(value) => {
											setIcon(value as typeof icon)
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
								<DropdownSubTrigger>Title</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={title}
										onValueChange={(value) => {
											setTitle(value as typeof title)
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
								<DropdownSubTrigger>Description</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={desc}
										onValueChange={(value) => {
											setDesc(value as typeof desc)
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
								<DropdownSubTrigger>Closeable</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup
										value={closable}
										onValueChange={(value) => {
											setClosable(value as typeof closable)
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
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Toaster position={`${position}`} visibleToasts={Number(visibleToasts)} expand={stackable !== "true"} />
					<Button
						key={key}
						variant="strong"
						color="neutral"
						onClick={() =>
							showToast({
								icon: icon === "true" ? <Box className="size-5" /> : undefined,
								variant,
								color: state,
								placement,
								title: title === "true" ? "Toast Title" : "",
								closable: closable === "true",
								description: desc === "true" ? "Toast description message." : "",
								buttons:
									actionButton === "true"
										? [
												{ label: "Upgrade", onClick: () => console.log("Retrying..."), href: "/docs/components/toast", dismiss: false },
												{ label: "Learn More", onClick: () => console.log("Cancelled") },
											]
										: [],
							})
						}>
						Toast
					</Button>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="toast.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Toaster position="${position}" visibleToasts={${visibleToasts}} expand={${stackable}} />
<Button
	variant="outline"
	onClick={() =>
		showToast({
			${icon === "true" ? "icon:<Box className='size-5'/>," : ""}
			variant:'${variant}',
			color:'${state}',
			placement:'${placement}',
			${title === "true" ? "title:'Toast Title'," : ""}
			${closable === "true" ? "closable," : "closable:false"}
			${desc === "true" ? "description:'Toast description message.'," : ""}
			${
				actionButton === "true"
					? `buttons:[
					{ label: "Upgrade", onClick: () => console.log("Retrying..."),href: "/docs/components/toast", dismiss: false },
					{ label: "Learn More", onClick: () => console.log("Cancelled") }
				],`
					: ""
			} 
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
