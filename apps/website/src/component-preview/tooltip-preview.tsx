import { useState } from "react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

const TooltipPreview = () => {
	const [position, setPosition] = useState<"top" | "left" | "right" | "bottom">("top")
	const [variant, setVariant] = useState<"start" | "end" | "center">("center")
	const [withArrow, setWithArrow] = useState<"true" | "false">("false")
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
									<DropdownSubTrigger>With Arrow</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => {
												setWithArrow(Array.from(keys)[0] as typeof withArrow)
												setKey((k) => k + 1)
											}}
											minSelectionCount={1}
											selectedValues={[withArrow]}>
											<DropdownItem value="false">False</DropdownItem>
											<DropdownItem value="true">True</DropdownItem>
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
						<Tooltip side={`${position}`} withArrow={withArrow === "true"} align={`${variant}`}>
							<TooltipTrigger asChild>
								<Button key={key} variant="neutral-outline">
									Hover me
								</Button>
							</TooltipTrigger>
							<TooltipContent>I am a tooltip</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<Tooltip side="${position}" withArrow={${withArrow}} align="${variant}">
	<TooltipTrigger asChild>
		<Button key={key} variant="neutral-outline">Hover me</Button>
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
