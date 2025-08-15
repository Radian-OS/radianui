"use client"

import { useState } from "react"

import { EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import Switch from "@/registry/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const SwitchPreview = () => {
	type sizeProps = "20" | "24"
	type disabledType = "true" | "false"
	const [size, setSize] = useState<sizeProps>("20")
	const [disabled, setDisabled] = useState<disabledType>("false")

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
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setSize(Array.from(keys)[0] as sizeProps)
									}}
									minSelectionCount={1}
									selectedValues={[size]}>
									<DropdownItem value="20">20</DropdownItem>
									<DropdownItem value="24">24</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setDisabled(Array.from(keys)[0] as disabledType)
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<Switch size={size} disabled={disabled === "true"}>
						Switch Label
					</Switch>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="switch.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Switch size={${size}} disabled={${disabled === "true"}} >
Switch Label
</Switch>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SwitchPreview
