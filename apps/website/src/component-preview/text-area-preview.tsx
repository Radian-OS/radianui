import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { TextArea } from "@/registry/ui/text-area"

const TextAreaPreview = () => {
	const [label, setLabel] = useState<string>("true")
	const [resizable, setResizable] = useState<string>("false")
	const [hasError, setHasError] = useState<string>("false")
	const [disabled, setDisabled] = useState<string>("false")
	const [hint, setHint] = useState<string>("false")
	const [rows, setRows] = useState<"4" | "5" | "6" | "7" | "8">("4")

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
					<DropdownContent>
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={label} onValueChange={(value) => setLabel(value as "true" | "false")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										true
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										false
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Resizable</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={resizable} onValueChange={(value) => setResizable(value as "true" | "false")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										true
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										false
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Has Error</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={hasError} onValueChange={(value) => setHasError(value as "true" | "false")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										true
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										false
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled} onValueChange={(value) => setDisabled(value as "true" | "false")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										true
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										false
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Rows</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={rows} onValueChange={(value) => setRows(value as "4" | "5" | "6" | "7" | "8")}>
									<DropdownRadioItem value="4" onSelect={(e) => e.preventDefault()}>
										4
									</DropdownRadioItem>
									<DropdownRadioItem value="5" onSelect={(e) => e.preventDefault()}>
										5
									</DropdownRadioItem>
									<DropdownRadioItem value="6" onSelect={(e) => e.preventDefault()}>
										6
									</DropdownRadioItem>
									<DropdownRadioItem value="7" onSelect={(e) => e.preventDefault()}>
										7
									</DropdownRadioItem>
									<DropdownRadioItem value="8" onSelect={(e) => e.preventDefault()}>
										8
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Hint</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={hint} onValueChange={(value) => setHint(value as "true" | "false")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										true
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										false
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border p-6">
					<div className="w-full max-w-md space-y-6">
						<TextArea
							label={label === "true" ? "Description" : ""}
							resizable={resizable === "true"}
							placeholder="Placeholder text..."
							hasError={hasError === "true"}
							disabled={disabled === "true"}
							rows={rows === "4" ? 4 : rows === "5" ? 5 : rows === "6" ? 6 : rows === "7" ? 7 : 8}
							hint={hint === "true" ? "This is a hint" : ""}
						/>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="text-area.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<TextArea
label="${label === "true" ? "Description" : ""}"
resizable={${resizable === "true"}}
placeholder="Placeholder text..."
hasError={${hasError === "true"}}
disabled={${disabled === "true"}}
rows={${rows === "4" ? 4 : rows === "5" ? 5 : rows === "6" ? 6 : rows === "7" ? 7 : 8}}
hint="${hint === "true" ? "This is a hint" : ""}"
 />`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TextAreaPreview
