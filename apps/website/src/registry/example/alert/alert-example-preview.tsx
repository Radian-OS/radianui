import { useState } from "react"

import { EyeIcon, Settings, SquareTerminal, Star } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Alert } from "@/registry/ui/alert"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const AlertExamplePreview = () => {
	const [position, setPosition] = useState<"top" | "bottom" | "center">("top")

	const generateCode = () => {
		let code = `<Alert
  variant="default"
  color="primary"
  title="Alert"
  description="This is a standard notification message"
  start={
    <div className={"flex h-full flex-col ${position === "top" ? "justify-start" : position === "bottom" ? "justify-end" : "justify-center"}"}>
      <Star size={16} /> 
    </div>
}`
		code += `
  end={<Button color="primary">Action</Button>}`

		code += `
  closable={false}`

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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownGroup>
							<DropdownSub>
								<DropdownSubTrigger>Position</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setPosition(Array.from(keys)[0] as typeof position)}
										minSelectionCount={1}
										selectedValues={[position]}>
										<DropdownItem value="top">Top</DropdownItem>
										<DropdownItem value="bottom">Bottom</DropdownItem>
										<DropdownItem value="center">Center</DropdownItem>
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
						title="Alert"
						description="This is a standard notification message"
						color="primary"
						variant="default"
						closable={false}
						start={
							<div className={`flex h-full flex-col ${position === "top" ? "justify-start" : position === "bottom" ? "justify-end" : "justify-center"}`}>
								<Star size={16} />
							</div>
						}
						end={<Button color="primary">Action</Button>}
					/>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="alert.tsx" showLineNumber className="h-[420px]" code={generateCode()} />
			</TabsContent>
		</Tabs>
	)
}

export default AlertExamplePreview
