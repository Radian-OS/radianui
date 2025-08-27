import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

const TooltipPreview = () => {
	const [position, setPosition] = useState<"top" | "left" | "right" | "bottom">("top")
	const [variant, setVariant] = useState<"start" | "end" | "center">("center")
	const [withArrow, setWithArrow] = useState<"true" | "false">("false")
	const [key, setKey] = useState(0)

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
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
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setPosition(Array.from(keys)[0] as typeof position)}
										minSelectionCount={1}
										selectedValues={[position]}>
										<DropdownItem value="top">Top</DropdownItem>
										<DropdownItem value="left">Left</DropdownItem>
										<DropdownItem value="right">Right</DropdownItem>
										<DropdownItem value="bottom">Bottom</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Align</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as typeof variant)}
										minSelectionCount={1}
										selectedValues={[variant]}>
										<DropdownItem value="start">Start</DropdownItem>
										<DropdownItem value="center">Center</DropdownItem>
										<DropdownItem value="end">End</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>With arrow</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setWithArrow(Array.from(keys)[0] as typeof withArrow)
											setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[withArrow]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="mx-auto max-h-[200px] max-w-3xl">
						<Tooltip side={`${position}`} withArrow={withArrow === "true"} align={`${variant}`}>
							<TooltipTrigger asChild>
								<Button key={key} variant="outline">
									Hover me
								</Button>
							</TooltipTrigger>
							<TooltipContent>I am a tooltip</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="tooltip.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Tooltip side="${position}" withArrow={${withArrow}} align="${variant}">
	<TooltipTrigger asChild>
		<Button key={key} variant="outline">Hover me</Button>
	</TooltipTrigger>
	<TooltipContent>
		I am a tooltip
	</TooltipContent>
</Tooltip>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TooltipPreview
