import { useState } from "react"
import { CirclePlus } from "lucide-react"
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

const ButtonPreview = () => {
	type variants = "strong" | "soft" | "outline" | "ghost" | "neutral-soft" | "neutral-outline"
	// Updated sizes type to include "28"
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	type isIconType = "true" | "false"
	type disabledType = "true" | "false"
	// Colors type; neutral is removed.
	type colors = "primary" | "info" | "success" | "error" | "warning"

	const [variant, setVariant] = useState<variants>("strong")
	const [size, setSize] = useState<sizes>("36")
	const [isIcon, setIsIcon] = useState<isIconType>("false")
	const [disabled, setDisabled] = useState<disabledType>("false")
	const [color, setColor] = useState<colors>("primary")

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setVariant(Array.from(keys)[0] as variants)
										}}
										minSelectionCount={1}
										selectedValues={[variant]}>
										<DropdownItem value="strong">strong</DropdownItem>
										<DropdownItem value="soft">soft</DropdownItem>
										<DropdownItem value="outline">outline</DropdownItem>
										<DropdownItem value="ghost">ghost</DropdownItem>
									</DropdownGroup>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setVariant(Array.from(keys)[0] as variants)
										}}
										minSelectionCount={1}
										selectedValues={[variant]}
										title="neutral">
										<DropdownItem value="neutral-soft">neutral-soft</DropdownItem>
										<DropdownItem value="neutral-outline">neutral-outline</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setSize(Array.from(keys)[0] as sizes)
										}}
										minSelectionCount={1}
										selectedValues={[size]}>
										<DropdownItem value="28">28</DropdownItem>
										<DropdownItem value="32">32</DropdownItem>
										<DropdownItem value="36">36</DropdownItem>
										<DropdownItem value="40">40</DropdownItem>
										<DropdownItem value="44">44</DropdownItem>
										<DropdownItem value="48">48</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>color</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setColor(Array.from(keys)[0] as colors)
										}}
										minSelectionCount={1}
										selectedValues={[color]}>
										<DropdownItem value="primary">primary</DropdownItem>
										<DropdownItem value="info">info</DropdownItem>
										<DropdownItem value="success">success</DropdownItem>
										<DropdownItem value="error">error</DropdownItem>
										<DropdownItem value="warning">warning</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>isIcon</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[isIcon]}
										onSelectedChange={(keys) => {
											setIsIcon(Array.from(keys)[0] as isIconType)
										}}>
										<DropdownItem value="true">true</DropdownItem>
										<DropdownItem value="false">false</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[disabled]}
										onSelectedChange={(keys) => {
											setDisabled(Array.from(keys)[0] as disabledType)
										}}>
										<DropdownItem value="true">true</DropdownItem>
										<DropdownItem value="false">false</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center gap-3 overflow-auto rounded-xl border">
					<Button isIcon={isIcon === "true"} variant={variant} size={size} color={color} disabled={disabled === "true"}>
						{isIcon === "true" ? <CirclePlus /> : "Button"}
					</Button>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<Button 
  size="${size}" 
  variant="${variant}" 
  color="${color}"
  isIcon={${isIcon === "true"}}
  disabled={${disabled === "true"}}>
  ${isIcon === "true" ? `<CirclePlus />` : "Button"}
</Button>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default ButtonPreview
