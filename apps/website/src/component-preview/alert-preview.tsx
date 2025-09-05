import { useState } from "react"
import { CircleCheck, EyeIcon, Info, Settings, SquareTerminal, Star, TriangleAlert } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Alert, AlertActions, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"
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

const AlertPreview = () => {
	type booleanType = "true" | "false"

	const [color, setColor] = useState<"primary" | "neutral" | "success" | "warning" | "error" | "info">("primary")
	const [variant, setVariant] = useState<"soft" | "soft-outline" | "outline" | "strong">("soft")
	const [start, setStart] = useState<"none" | "star" | "info" | "alert" | "check">("star")
	const [end, setEnd] = useState<"none" | "button" | "link">("button")
	const [title, setTitle] = useState<booleanType>("true")
	const [description, setDescription] = useState<booleanType>("true")

	const icons = {
		star: <Star size={20} className={`${color === "neutral" ? "text-fg-secondary" : ""}`} />,
		info: <Info size={20} className={`${color === "neutral" ? "text-fg-secondary" : ""}`} />,
		check: <CircleCheck size={20} className={`${color === "neutral" ? "text-fg-secondary" : ""}`} />,
		alert: <TriangleAlert size={20} className={`${color === "neutral" ? "text-fg-secondary" : ""}`} />,
		none: null,
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
		let code = `<Alert color="${color}" variant="${variant}">\n`

		if (selectedIcon) {
			const iconComponent = {
				star: "Star",
				info: "Info",
				check: "CircleCheck",
				alert: "TriangleAlert",
				none: null,
			}[start]

			const iconClassName = color === "neutral" ? ' className="text-fg-secondary"' : ""
			code += `  <AlertIcon>\n    <${iconComponent} size={20}${iconClassName} />\n  </AlertIcon>\n`
		}

		code += `  <AlertContent>\n`

		if (title === "true") {
			code += `    <AlertTitle>${alertContent.title}</AlertTitle>\n`
		}

		if (description === "true") {
			code += `    <AlertDescription>\n      ${alertContent.message}\n    </AlertDescription>\n`
		}

		code += `  </AlertContent>\n`

		if (end !== "none") {
			code += `  <AlertActions>\n`
			if (end === "button") {
				const buttonVariant = variant === "strong" ? "soft" : "strong"
				code += `    <Button variant="${buttonVariant}" color="${color}">Action</Button>\n`
			}
			code += `  </AlertActions>\n`
		}

		code += `</Alert>`

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
						<DropdownGroup>
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as typeof variant)}>
										<DropdownRadioItem value="soft" onSelect={(e) => e.preventDefault()}>
											Soft
										</DropdownRadioItem>
										<DropdownRadioItem value="soft-outline" onSelect={(e) => e.preventDefault()}>
											Soft Outline
										</DropdownRadioItem>
										<DropdownRadioItem value="outline" onSelect={(e) => e.preventDefault()}>
											Outline
										</DropdownRadioItem>
										<DropdownRadioItem value="strong" onSelect={(e) => e.preventDefault()}>
											Strong
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
										<DropdownRadioItem value="button" onSelect={(e) => e.preventDefault()}>
											Button
										</DropdownRadioItem>
										<DropdownRadioItem value="link" onSelect={(e) => e.preventDefault()}>
											Link
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
					<Alert color={color} variant={variant}>
						{selectedIcon && <AlertIcon>{selectedIcon}</AlertIcon>}
						<AlertContent>
							{title === "true" && <AlertTitle>{alertContent.title}</AlertTitle>}
							{description === "true" && <AlertDescription>{alertContent.message}</AlertDescription>}
						</AlertContent>
						{end !== "none" && (
							<AlertActions>
								<Button variant={variant === "strong" ? "soft" : "strong"} color={color}>
									Action
								</Button>
							</AlertActions>
						)}
					</Alert>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="alert.tsx" showLineNumber className="h-[420px]" code={generateCode()} />
			</TabsContent>
		</Tabs>
	)
}

export default AlertPreview
