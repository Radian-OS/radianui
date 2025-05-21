import { useState } from "react"
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
import { TextArea } from "@/registry/ui/text-area"

const TextAreaPreview = () => {
	const [label, setLabel] = useState<string>("true")
	const [resizable, setResizable] = useState<string>("false")
	const [hasError, setHasError] = useState<string>("false")
	const [disabled, setDisabled] = useState<string>("false")
	const [hint, setHint] = useState<string>("false")
	const [rows, setRows] = useState<"4" | "5" | "6" | "7" | "8">("4")

	return (
		<Tabs className="mb-10" defaultValue="preview">
			<div className="flex items-center justify-between">
				<Dropdown>
					<DropdownTrigger>Properties</DropdownTrigger>
					<DropdownContent>
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[label]}
									onSelectedChange={(keys) => {
										setLabel(Array.from(keys)[0] as "true" | "false")
									}}>
									<DropdownItem value="true">true</DropdownItem>
									<DropdownItem value="false">false</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Resizable</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[resizable]}
									onSelectedChange={(keys) => {
										setResizable(Array.from(keys)[0] as "true" | "false")
									}}>
									<DropdownItem value="true">true</DropdownItem>
									<DropdownItem value="false">false</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Has Error</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[hasError]}
									onSelectedChange={(keys) => {
										setHasError(Array.from(keys)[0] as "true" | "false")
									}}>
									<DropdownItem value="true">true</DropdownItem>
									<DropdownItem value="false">false</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[disabled]}
									onSelectedChange={(keys) => {
										setDisabled(Array.from(keys)[0] as "true" | "false")
									}}>
									<DropdownItem value="true">true</DropdownItem>
									<DropdownItem value="false">false</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Rows</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[hint]}
									onSelectedChange={(keys) => {
										setRows(Array.from(keys)[0] as "4" | "5" | "6" | "7" | "8")
									}}>
									<DropdownItem value="4">4</DropdownItem>
									<DropdownItem value="5">5</DropdownItem>
									<DropdownItem value="6">6</DropdownItem>
									<DropdownItem value="7">7</DropdownItem>
									<DropdownItem value="8">8</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Hint</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[hint]}
									onSelectedChange={(keys) => {
										setHint(Array.from(keys)[0] as "true" | "false")
									}}>
									<DropdownItem value="true">true</DropdownItem>
									<DropdownItem value="false">false</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
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
				<CodeArea
					className="h-[420px]"
					code={`<TextArea
label={${label === "true" ? "Description" : ""}}
resizable={${resizable === "true"}}
placeholder="Placeholder text..."
hasError={${hasError === "true"}}
disabled={${disabled === "true"}}
rows={${rows === "4" ? 4 : rows === "5" ? 5 : rows === "6" ? 6 : rows === "7" ? 7 : 8}}
hint="${hint === "true" ? "This is a hint" : ""}"
 />`}
					language="tsx"
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TextAreaPreview
