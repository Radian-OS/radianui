import { useState } from "react"
import { Bookmark, CircleCheck, EyeIcon, Info, Settings, SquareTerminal, Star, Trash2, TriangleAlert } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Alert } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const AlertPreview = () => {
	const [color, setColor] = useState<"primary" | "neutral" | "success" | "warning" | "error" | "info">("primary")
	const [variant, setVariant] = useState<"default" | "soft-outline" | "outline">("default")
	const [closable, setClosable] = useState<"true" | "false">("false")
	const [key, setKey] = useState(0)
	const [start, setStart] = useState<"none" | "star" | "bookmark" | "info" | "alert" | "trash">("star")
	const [end, setEnd] = useState<"none" | "button" | "link">("link")

	const icons = {
		star: <Star size={20} />,
		bookmark: <Bookmark size={20} />,
		info: <Info size={20} />,
		success: <CircleCheck size={20} />,
		alert: <TriangleAlert size={20} />,
		trash: <Trash2 size={20} />,
		none: "",
	}

	const getAlertContent = (type: string) => {
		const contents = {
			neutral: {
				title: "Neutral Alert",
				message: "This is a standard notification message",
			},
			primary: {
				title: "Primary Alert",
				message: "This is a primary notification with important information",
			},
			info: {
				title: "Information Available",
				message: "Your application has been successfully updated with new information",
			},
			success: {
				title: "Operation Successful",
				message: "Your changes have been successfully saved to the database",
			},
			warning: {
				title: "Action Required",
				message: "Please review your settings before proceeding with the operation",
			},
			error: {
				title: "Critical Error",
				message: "Unable to complete the requested operation. Please try again",
			},
		}
		return contents[type as keyof typeof contents]
	}

	const alertContent = getAlertContent(color)
	const selectedIcon = icons[start as keyof typeof icons]

	const generateCode = () => {
		let code = `<Alert
  color=\"${color}\"
  variant=\"${variant}\"
  title=\"${alertContent.title}\"
  message=\"${alertContent.message}\"
  closable={${closable}}`

		const btnColor = color === "neutral" ? "primary" : color === "error" ? "error" : color
		const btnClassName = color !== "neutral" ? ' className="bg-white/30 hover:bg-white/40"' : ""
		code += `
  end={<Button color='${btnColor}'${btnClassName}>Action</Button>}`

		const iconComponent = {
			star: "Star",
			bookmark: "Bookmark",
			info: "Info",
			success: "CircleCheck",
			alert: "TriangleAlert",
			trash: "Trash2",
			none: "",
		}[start]
		if (iconComponent !== "none" && iconComponent !== "") {
			code += `
  start={<${iconComponent} />}`
		}

		code += `
/>`
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
						<DropdownGroup>
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as typeof variant)}
										minSelectionCount={1}
										selectedValues={[variant]}>
										<DropdownItem value="default">Soft</DropdownItem>
										<DropdownItem value="soft-outline">Soft Outline</DropdownItem>
										<DropdownItem value="outline">Outline</DropdownItem>
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
								<DropdownSubTrigger>Start</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setStart(Array.from(keys)[0] as typeof start)} minSelectionCount={1} selectedValues={[start]}>
										<DropdownItem value="none">None</DropdownItem>
										<DropdownItem value="star">Star</DropdownItem>
										<DropdownItem value="bookmark">Bookmark</DropdownItem>
										<DropdownItem value="info">Info</DropdownItem>
										<DropdownItem value="alert">Triangle Alert</DropdownItem>
										<DropdownItem value="trash">Trash</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>End</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setEnd(Array.from(keys)[0] as typeof end)} minSelectionCount={1} selectedValues={[end]}>
										<DropdownItem value="none">None</DropdownItem>
										<DropdownItem value="button">Button</DropdownItem>
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
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Alert
						key={key}
						title={alertContent.title}
						description={alertContent.message}
						color={color}
						variant={variant}
						closable={closable === "true" ? true : false}
						start={selectedIcon}
						end={
							end === "button" ? (
								<Button color={color}>Action</Button>
							) : end === "link" ? (
								<a href="#" className={`text-${color}-text text-sm underline`}>
									Button Label
								</a>
							) : undefined
						}
					/>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="alert.tsx" showLineNumber className="h-[420px]" code={generateCode()} />
			</TabsContent>
		</Tabs>
	)
}

export default AlertPreview
