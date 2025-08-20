import { useState } from "react"

import { ChevronLeft, ChevronRight, EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Button, LinkButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const LinkButtonPreview = () => {
	type sizes = "14" | "16"
	type colors = "primary" | "info" | "success" | "error" | "warning" | "neutral"

	const [size, setSize] = useState<sizes>("14")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [color, setColor] = useState<colors>("primary")
	const [start, setStart] = useState<"true" | "false">("false")
	const [end, setEnd] = useState<"true" | "false">("false")

	const code = (() => {
		return `<LinkButton
href="https://radianos.com/docs/components/buttons" 
target="_blank"
size="${size}"
disabled={${disabled === "true"}}
color="${color}"
>
 Button Label
</LinkButton>`

		return "" // fallback
	})()

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
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Color</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setColor(Array.from(keys)[0] as colors)
									}}
									minSelectionCount={1}
									selectedValues={[color]}>
									<DropdownItem value="primary">primary</DropdownItem>
									<DropdownItem value="neutral">neutral</DropdownItem>
									<DropdownItem value="success">success</DropdownItem>
									<DropdownItem value="error">error</DropdownItem>
									<DropdownItem value="warning">warning</DropdownItem>
									<DropdownItem value="info">info</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Text Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setSize(Array.from(keys)[0] as sizes)
									}}
									minSelectionCount={1}
									selectedValues={[size]}>
									<DropdownItem value="14">14</DropdownItem>
									<DropdownItem value="16">16</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Start</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									minSelectionCount={1}
									selectedValues={[start]}
									onSelectedChange={(keys) => {
										setStart(Array.from(keys)[0] as "true" | "false")
									}}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>End</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									minSelectionCount={1}
									selectedValues={[end]}
									onSelectedChange={(keys) => {
										setEnd(Array.from(keys)[0] as "true" | "false")
									}}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setDisabled(Array.from(keys)[0] as "true" | "false")
									}}
									minSelectionCount={1}
									selectedValues={[disabled]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center gap-2 overflow-auto rounded-xl border">
					<LinkButton
						start={start === "true" ? <ChevronLeft /> : undefined}
						end={end === "true" ? <ChevronRight /> : undefined}
						href="/docs/components/button"
						target="_blank"
						size={size}
						disabled={disabled === "true"}
						color={color}>
						Button Label
					</LinkButton>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="compact-button.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default LinkButtonPreview
