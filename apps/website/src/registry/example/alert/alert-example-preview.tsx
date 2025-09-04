import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal, Star } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Alert, AlertActions, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const AlertExamplePreview = () => {
	const [position, setPosition] = useState<"top" | "bottom" | "center">("top")

	const getAlertClassName = () => {
		switch (position) {
			case "top":
				return "self-start"
			case "bottom":
				return "self-end"
			case "center":
				return "self-center"
			default:
				return "self-center"
		}
	}

	const generateCode = () => {
		const alertClassName = getAlertClassName()

		return `<Alert
  variant="soft"
  color="primary"
>
  <AlertIcon className="${alertClassName}">
    <Star size={16} />
  </AlertIcon>
  <AlertContent>
    <AlertTitle>Alert</AlertTitle>
    <AlertDescription>
      This is a standard notification message
    </AlertDescription>
  </AlertContent>
  <AlertActions>
    <Button color="primary">Action</Button>
  </AlertActions>
</Alert>`
	}

	return (
		<Tabs defaultValue="preview" variant="outline-ghost" size="md">
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
							<DropdownSubTrigger>Position</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={position} onValueChange={(value) => setPosition(value as typeof position)}>
									<DropdownRadioItem value="top" onSelect={(e) => e.preventDefault()}>
										Top
									</DropdownRadioItem>
									<DropdownRadioItem value="bottom" onSelect={(e) => e.preventDefault()}>
										Bottom
									</DropdownRadioItem>
									<DropdownRadioItem value="center" onSelect={(e) => e.preventDefault()}>
										Center
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Alert color="primary" variant="soft">
						<AlertIcon className={getAlertClassName()}>
							<Star size={16} />
						</AlertIcon>
						<AlertContent>
							<AlertTitle>Alert</AlertTitle>
							<AlertDescription>This is a standard notification message</AlertDescription>
						</AlertContent>
						<AlertActions>
							<Button color="primary">Action</Button>
						</AlertActions>
					</Alert>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="alert.tsx" showLineNumber className="h-[420px]" code={generateCode()} />
			</TabsContent>
		</Tabs>
	)
}

export default AlertExamplePreview
