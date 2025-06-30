import { useState } from "react"
import { Box, CirclePlus, X } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const ButtonPreview = () => {
	type variants = "strong" | "soft" | "outline" | "ghost"
	// Updated sizes type to include "28"
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	type isIconType = "true" | "false"
	type isloadingType = "true" | "false"
	type disabledType = "true" | "false"
	type leadTrailType = "true" | "false"
	// Colors type; neutral is removed.
	type colors = "primary" | "info" | "success" | "error" | "warning" | "neutral"

	const [variant, setVariant] = useState<variants>("strong")
	const [size, setSize] = useState<sizes>("36")
	const [isIcon, setIsIcon] = useState<isIconType>("false")
	const [loading, setLoading] = useState<isloadingType>("false")
	const [disabled, setDisabled] = useState<disabledType>("false")
	const [color, setColor] = useState<colors>("primary")
	const [lead, setLead] = useState<leadTrailType>("false")
	const [trail, setTrail] = useState<leadTrailType>("false")

	const getLeadTrialClass = () => {
		if ((lead === "true" || trail === "true") && (size === "36" || size === "32" || size === "40")) {
			return "size-5"
		}
		if ((lead === "true" || trail === "true") && size === "28") {
			return "size-4"
		}
		if ((lead === "true" || trail === "true") && (size === "44" || size === "48")) {
			return "size-6"
		}
		return ""
	}

	const iconClass = getLeadTrialClass()

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
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
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
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
										<DropdownItem value="info">info</DropdownItem>
										<DropdownItem value="success">success</DropdownItem>
										<DropdownItem value="error">error</DropdownItem>
										<DropdownItem value="warning">warning</DropdownItem>
										<DropdownItem value="neutral">neutral</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Is icon</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[isIcon]}
										onSelectedChange={(keys) => {
											setIsIcon(Array.from(keys)[0] as isIconType)
										}}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Lead Icon</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[lead]}
										onSelectedChange={(keys) => {
											setLead(Array.from(keys)[0] as leadTrailType)
										}}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Loading</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[loading]}
										onSelectedChange={(keys) => {
											setLoading(Array.from(keys)[0] as isloadingType)
										}}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Trail Icon</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[trail]}
										onSelectedChange={(keys) => {
											setTrail(Array.from(keys)[0] as leadTrailType)
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
										minSelectionCount={1}
										selectedValues={[disabled]}
										onSelectedChange={(keys) => {
											setDisabled(Array.from(keys)[0] as disabledType)
										}}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
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
					<Button
						lead={lead === "true" ? <Box className={iconClass} /> : undefined}
						trail={trail === "true" ? <Box className={iconClass} /> : undefined}
						isIcon={isIcon === "true"}
						variant={variant}
						size={size}
						loading={loading === "true"}
						color={color}
						disabled={disabled === "true"}>
						{isIcon === "true" ? <CirclePlus /> : "Button"}
					</Button>

					<Button className="focus-within: outline-soft bg-fill-level1 hover:bg-soft-alpha outline drop-shadow" isIcon variant="outline" color="neutral">
						<X />
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
  loading={${loading === "true"}}
  variant="${variant}" 
  color="${color}"
  isIcon={${isIcon === "true"}}
  disabled={${disabled === "true"}}${lead === "true" ? `\n  lead={<Box className="${iconClass}" />}` : ""}${trail === "true" ? `\n  trail={<Box className="${iconClass}" />}` : ""}>
  ${isIcon === "true" ? `<CirclePlus />` : "Button"}
</Button>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default ButtonPreview
