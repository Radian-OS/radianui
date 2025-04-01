import { useState } from "react"
import { Alert } from "@/registry/ui/alert"
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

const AlertPreview = () => {
	const [type, setType] = useState<"neutral" | "info" | "success" | "warning" | "danger">("neutral")
	const [variant, setVariant] = useState<"default" | "bordered">("default")

	const getAlertContent = (type: string) => {
		const contents = {
			neutral: {
				title: "Neutral Alert",
				message: "This is a standard notification message",
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

	const alertContent = getAlertContent(type)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub>
									<DropdownSubTrigger>Type</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											onSelectedChange={(keys) => setType(Array.from(keys)[0] as typeof type)}
											minSelectionCount={1}
											selectedValues={[type]}>
											<DropdownItem value="neutral">Neutral</DropdownItem>
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
					<Alert title={alertContent.title} message={alertContent.message} type={type} variant={variant} />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<Alert
  type="${type}"
  variant="${variant}"
  title="${alertContent.title}"
  message="${alertContent.message}"
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AlertPreview
