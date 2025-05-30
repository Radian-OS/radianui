import { useState } from "react"
import { Bookmark, CircleCheck, Info, Star, Trash2, TriangleAlert } from "lucide-react"
import { Alert } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const AlertPreview = () => {
	const [color, setColor] = useState<"neutral" | "primary" | "info" | "success" | "warning" | "danger">("neutral")
	const [variant, setVariant] = useState<"default" | "bordered" | "strong" | "neutral-outline">("default")
	const [showIcon, setShowIcon] = useState(true)
	const [showEndContent, setShowEndContent] = useState(true)

	const icons = {
		neutral: <Star />,
		primary: <Bookmark />,
		info: <Info />,
		success: <CircleCheck />,
		warning: <TriangleAlert />,
		danger: <Trash2 />,
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
			danger: {
				title: "Critical Error",
				message: "Unable to complete the requested operation. Please try again",
			},
		}
		return contents[type as keyof typeof contents]
	}

	const alertContent = getAlertContent(color)
	const selectedIcon = icons[color as keyof typeof icons]

	const generateCode = () => {
		let code = `<Alert
  color=\"${color}\"
  variant=\"${variant}\"
  title=\"${alertContent.title}\"
  message=\"${alertContent.message}\"`

		if (showEndContent) {
			const btnColor = color === "neutral" ? "primary" : color === "danger" ? "error" : color
			const btnClassName = variant === "strong" && color !== "neutral" ? ' className="bg-static-white/30 hover:bg-static-white/40"' : ""
			code += `
  endContent={<Button color='${btnColor}'${btnClassName}>Action</Button>}`
		}

		if (showIcon) {
			const iconComponent = {
				neutral: "Star",
				primary: "Bookmark",
				info: "Info",
				success: "CircleCheck",
				warning: "TriangleAlert",
				danger: "Trash2",
			}[color]
			code += `
  icon={<${iconComponent} />}`
		}

		code += `
/>`
		return code
	}

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub>
									<DropdownSubTrigger>Color</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setColor(Array.from(keys)[0] as typeof color)} minSelectionCount={1} selectedValues={[color]}>
											<DropdownItem value="neutral">Neutral</DropdownItem>
											<DropdownItem value="primary">Primary</DropdownItem>
											<DropdownItem value="info">Information</DropdownItem>
											<DropdownItem value="success">Success</DropdownItem>
											<DropdownItem value="warning">Warning</DropdownItem>
											<DropdownItem value="danger">Danger</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>Variant</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as typeof variant)}
											minSelectionCount={1}
											selectedValues={[variant]}>
											<DropdownItem value="default">Default (Shaded)</DropdownItem>
											<DropdownItem value="bordered">Bordered</DropdownItem>
											<DropdownItem value="strong">Strong</DropdownItem>
											<DropdownItem value="neutral-outline">Neutral Outline</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>Icon</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => setShowIcon(Array.from(keys)[0] === "show")}
											minSelectionCount={1}
											selectedValues={[showIcon ? "show" : "hide"]}>
											<DropdownItem value="show">True</DropdownItem>
											<DropdownItem value="hide">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
								<DropdownSub>
									<DropdownSubTrigger>End content</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => setShowEndContent(Array.from(keys)[0] === "show")}
											minSelectionCount={1}
											selectedValues={[showEndContent ? "show" : "hide"]}>
											<DropdownItem value="show">True</DropdownItem>
											<DropdownItem value="hide">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Alert
						title={alertContent.title}
						message={alertContent.message}
						color={color}
						variant={variant}
						icon={showIcon ? selectedIcon : undefined}
						{...(showEndContent
							? {
									endContent: (
										<Button
											className={`${variant === "strong" && color !== "neutral" ? "bg-static-white/30 hover:bg-static-white/40" : ""}`}
											color={color === "neutral" ? "primary" : color === "danger" ? "error" : color}>
											Action
										</Button>
									),
								}
							: {})}
					/>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={generateCode()} />
			</TabsContent>
		</Tabs>
	)
}

export default AlertPreview
