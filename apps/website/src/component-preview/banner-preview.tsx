"use client"

import { useState } from "react"

import { CircleCheck, EyeIcon, Info, Settings, SquareTerminal, Star, TriangleAlert } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Banner } from "@/registry/ui/banner"
import { Button, LinkButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerPreview = () => {
	type booleanType = "true" | "false"
	const [color, setColor] = useState<"primary" | "neutral" | "success" | "warning" | "error" | "info">("primary")
	const [variant, setVariant] = useState<"strong" | "outline" | "soft">("strong")
	const [closable, setClosable] = useState<"true" | "false">("false")
	const [key, setKey] = useState(0)
	const [start, setStart] = useState<"none" | "star" | "info" | "alert" | "check">("star")
	const [end, setEnd] = useState<"none" | "link">("link")
	const [title, setTitle] = useState<booleanType>("true")
	const [description, setDescription] = useState<booleanType>("true")

	const icons = {
		star: <Star size={20} />,
		info: <Info size={20} />,
		check: <CircleCheck size={20} />,
		alert: <TriangleAlert size={20} />,
		none: "",
	}

	const selectedIcon = icons[start as keyof typeof icons]

	const generateCode = () => {
		let code = `<Banner
  variant="${variant}"
  color="${color}"
  ${title === "true" ? `title="Banner Title Here"` : ""}
  ${description === "true" ? `description="Enter your banner message here"` : ""}`

		const iconComponent = {
			star: "Star",
			info: "Info",
			check: "CircleCheck",
			alert: "TriangleAlert",
			none: "",
		}[start]

		if (iconComponent !== "none" && iconComponent !== "") {
			code += `
  start={<${iconComponent} ${color === "neutral" ? 'className="text-fg-secondary"' : ""}/>}`
		}

		const btnColor = color === "neutral" ? "primary" : color === "error" ? "error" : color

		code += `
  end={<Button color='${btnColor}'>Action</Button>}`

		code += `
  closable={${closable}}`

		code += `
>
</Banner>`

		return code
	}

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
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as typeof variant)}
									minSelectionCount={1}
									selectedValues={[variant]}>
									<DropdownItem value="strong">Strong</DropdownItem>
									<DropdownItem value="outline">Outline</DropdownItem>
									<DropdownItem value="soft">Soft</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Color</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setColor(Array.from(keys)[0] as typeof color)} minSelectionCount={1} selectedValues={[color]}>
									<DropdownItem value="primary">Primary</DropdownItem>
									<DropdownItem value="neutral">Neutral</DropdownItem>
									<DropdownItem value="success">Success</DropdownItem>
									<DropdownItem value="error">Error</DropdownItem>
									<DropdownItem value="warning">Warning</DropdownItem>
									<DropdownItem value="info">Info</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Title</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									minSelectionCount={1}
									selectedValues={[title]}
									onSelectedChange={(keys) => {
										setTitle(Array.from(keys)[0] as booleanType)
									}}>
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
									minSelectionCount={1}
									selectedValues={[description]}
									onSelectedChange={(keys) => {
										setDescription(Array.from(keys)[0] as booleanType)
									}}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Start</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setStart(Array.from(keys)[0] as typeof start)} minSelectionCount={1} selectedValues={[start]}>
									<DropdownItem value="none">None</DropdownItem>
									<DropdownItem value="star">Star</DropdownItem>
									<DropdownItem value="info">Info</DropdownItem>
									<DropdownItem value="alert">Triangle Alert</DropdownItem>
									<DropdownItem value="check">Check</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>End</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setEnd(Array.from(keys)[0] as typeof end)} minSelectionCount={1} selectedValues={[end]}>
									<DropdownItem value="none">None</DropdownItem>
									<DropdownItem value="link">Link</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Closable</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setClosable(Array.from(keys)[0] as "true" | "false")
										setKey((k) => k + 1)
									}}
									minSelectionCount={1}
									selectedValues={[closable]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-start overflow-auto rounded-xl border">
					<Banner
						title={title === "true" ? "Banner Title Here" : ""}
						description={description === "true" ? "Enter your banner message here" : ""}
						start={<div className={`${variant === "strong" ? (color === "neutral" ? "text-white-inverse" : "text-white") : `text-${color}`}`}>{selectedIcon}</div>}
						end={
							end === "link" ? (
								<LinkButton
									target="_blank"
									href="/docs/components/alert"
									size="14"
									className={`${variant === "strong" ? (color === "neutral" ? "text-white-inverse" : "text-white") : `text-fg`}`}>
									Button Label
								</LinkButton>
							) : undefined
						}
						key={key}
						closable={closable === "true" ? true : false}
						color={color}
						variant={variant}
						className="w-full"></Banner>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="banner.tsx" showLineNumber className="h-[420px]" code={generateCode()} />
			</TabsContent>
		</Tabs>
	)
}

export default BannerPreview
