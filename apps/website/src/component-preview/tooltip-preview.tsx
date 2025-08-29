import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
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
								<DropdownSubContent className="min-w-24">
									<DropdownRadioGroup value={position} onValueChange={(value) => setPosition(value as typeof position)}>
										<DropdownRadioItem value="top" onSelect={(e) => e.preventDefault()}>
											Top
										</DropdownRadioItem>
										<DropdownRadioItem value="left" onSelect={(e) => e.preventDefault()}>
											Left
										</DropdownRadioItem>
										<DropdownRadioItem value="right" onSelect={(e) => e.preventDefault()}>
											Right
										</DropdownRadioItem>
										<DropdownRadioItem value="bottom" onSelect={(e) => e.preventDefault()}>
											Bottom
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Align</DropdownSubTrigger>
								<DropdownSubContent className="min-w-24">
									<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as typeof variant)}>
										<DropdownRadioItem value="start" onSelect={(e) => e.preventDefault()}>
											Start
										</DropdownRadioItem>
										<DropdownRadioItem value="center" onSelect={(e) => e.preventDefault()}>
											Center
										</DropdownRadioItem>
										<DropdownRadioItem value="end" onSelect={(e) => e.preventDefault()}>
											End
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>With arrow</DropdownSubTrigger>
								<DropdownSubContent className="min-w-24">
									<DropdownRadioGroup
										value={withArrow}
										onValueChange={(value) => {
											setWithArrow(value as typeof withArrow)
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
