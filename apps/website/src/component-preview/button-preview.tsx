import { useState } from "react"
import { CircleCheck, EyeIcon, Info, Settings, SquareTerminal, Star, TriangleAlert } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const ButtonPreview = () => {
	type variants = "strong" | "soft" | "outline" | "ghost"
	// Updated sizes type to include "28"
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	type isloadingType = "true" | "false"
	type disabledType = "true" | "false"
	// Colors type; neutral is removed.
	type colors = "primary" | "info" | "success" | "error" | "warning" | "neutral"
	type iconType = "star" | "info" | "alert" | "check" | "none"

	const [variant, setVariant] = useState<variants>("strong")
	const [size, setSize] = useState<sizes>("36")
	const [loading, setLoading] = useState<isloadingType>("false")
	const [disabled, setDisabled] = useState<disabledType>("false")
	const [color, setColor] = useState<colors>("primary")
	const [start, setstart] = useState<iconType>("none")
	const [end, setend] = useState<iconType>("none")

	const getstartTrialClass = () => {
		if (size === "36" || size === "32" || size === "40") {
			return "size-5"
		}
		if (size === "28") {
			return "size-4"
		}
		if (size === "44" || size === "48") {
			return "size-6"
		}
		return ""
	}

	const iconClass = getstartTrialClass()
	const icons = {
		star: <Star />,
		info: <Info />,
		check: <CircleCheck />,
		alert: <TriangleAlert />,
		none: "",
	}
	const startSelectedIcon = icons[start as keyof typeof icons]
	const endSelectedIcon = icons[end as keyof typeof icons]

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
									<DropdownItem value="neutral">neutral</DropdownItem>
									<DropdownItem value="success">success</DropdownItem>
									<DropdownItem value="error">error</DropdownItem>
									<DropdownItem value="warning">warning</DropdownItem>
									<DropdownItem value="info">info</DropdownItem>
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
										setstart(Array.from(keys)[0] as iconType)
									}}>
									<DropdownItem value="none">None</DropdownItem>
									<DropdownItem value="star">Star</DropdownItem>
									<DropdownItem value="info">Info</DropdownItem>
									<DropdownItem value="alert">Alert</DropdownItem>
									<DropdownItem value="check">Check</DropdownItem>
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
										setend(Array.from(keys)[0] as iconType)
									}}>
									<DropdownItem value="none">None</DropdownItem>
									<DropdownItem value="star">Star</DropdownItem>
									<DropdownItem value="info">Info</DropdownItem>
									<DropdownItem value="alert">Alert</DropdownItem>
									<DropdownItem value="check">Check</DropdownItem>
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
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center gap-3 overflow-auto rounded-xl border">
					<Button start={startSelectedIcon} end={endSelectedIcon} variant={variant} size={size} loading={loading === "true"} color={color} disabled={disabled === "true"}>
						Button
					</Button>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="button.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Button 
  size="${size}" 
  loading={${loading === "true"}}
  variant="${variant}" 
  color="${color}"
  disabled={${disabled === "true"}}${start === "alert" ? `\n  start={<Box className="${iconClass}" />}` : ""}${end === "alert" ? `\n  end={<Box className="${iconClass}" />}` : ""}>
  Button
</Button>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default ButtonPreview
