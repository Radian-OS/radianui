"use client"

import { useState } from "react"
import { CircleCheck, EyeIcon, Info, Settings, SquareTerminal, Star, TriangleAlert } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Banner } from "@/registry/ui/banner"
import { IconButton, LinkButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BannerPreview = () => {
	type booleanType = "true" | "false"
	const [color, setColor] = useState<"primary" | "neutral" | "success" | "warning" | "error" | "info">("primary")
	const [variant, setVariant] = useState<"strong" | "outline" | "soft">("strong")
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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as typeof variant)}>
									<DropdownRadioItem value="strong" onSelect={(e) => e.preventDefault()}>
										Strong
									</DropdownRadioItem>
									<DropdownRadioItem value="outline" onSelect={(e) => e.preventDefault()}>
										Outline
									</DropdownRadioItem>
									<DropdownRadioItem value="soft" onSelect={(e) => e.preventDefault()}>
										Soft
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Color</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={color} onValueChange={(value) => setColor(value as typeof color)}>
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
							<DropdownSubTrigger>Title</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={title} onValueChange={(value) => setTitle(value as booleanType)}>
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
								<DropdownRadioGroup value={description} onValueChange={(value) => setDescription(value as booleanType)}>
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
							<DropdownSubTrigger>Start</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={start} onValueChange={(value) => setStart(value as typeof start)}>
									<DropdownRadioItem value="none" onSelect={(e) => e.preventDefault()}>
										None
									</DropdownRadioItem>
									<DropdownRadioItem value="star" onSelect={(e) => e.preventDefault()}>
										Star
									</DropdownRadioItem>
									<DropdownRadioItem value="info" onSelect={(e) => e.preventDefault()}>
										Info
									</DropdownRadioItem>
									<DropdownRadioItem value="alert" onSelect={(e) => e.preventDefault()}>
										Triangle Alert
									</DropdownRadioItem>
									<DropdownRadioItem value="check" onSelect={(e) => e.preventDefault()}>
										Check
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>End</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={end} onValueChange={(value) => setEnd(value as typeof end)}>
									<DropdownRadioItem value="none" onSelect={(e) => e.preventDefault()}>
										None
									</DropdownRadioItem>
									<DropdownRadioItem value="link" onSelect={(e) => e.preventDefault()}>
										Link
									</DropdownRadioItem>
								</DropdownRadioGroup>
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
