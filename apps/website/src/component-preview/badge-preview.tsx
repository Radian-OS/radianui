import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BadgePreview = () => {
	const [variant, setVariant] = useState<"strong" | "neutral" | "outline" | "soft">("strong")
	const [color, setColor] = useState<"primary" | "info" | "success" | "error" | "warning">("primary")
	const [closable, setClosable] = useState<"true" | "false">("false")
	const [size, setSize] = useState<"24" | "20" | "28">("24")
	const [key, setKey] = useState(0)
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
									onSelectedChange={(keys) => {
										setVariant(Array.from(keys)[0] as "neutral" | "strong")
										setKey((k) => k + 1)
									}}
									minSelectionCount={1}
									selectedValues={[variant]}>
									<DropdownItem value="neutral">Neutral</DropdownItem>
									<DropdownItem value="strong">Strong</DropdownItem>
									<DropdownItem value="outline">Outline</DropdownItem>
									<DropdownItem value="soft">Soft</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setSize(Array.from(keys)[0] as "24" | "20" | "28")
										setKey((k) => k + 1)
									}}
									minSelectionCount={1}
									selectedValues={[size]}>
									<DropdownItem value="20">20</DropdownItem>
									<DropdownItem value="24">24</DropdownItem>
									<DropdownItem value="28">28</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Color</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setColor(Array.from(keys)[0] as "primary" | "info" | "success" | "error" | "warning")
										setKey((k) => k + 1)
									}}
									minSelectionCount={1}
									selectedValues={[color]}>
									<DropdownItem value="primary">Primary</DropdownItem>
									<DropdownItem value="info">Info</DropdownItem>
									<DropdownItem value="success">Success</DropdownItem>
									<DropdownItem value="error">Error</DropdownItem>
									<DropdownItem value="warning">Warning</DropdownItem>
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<Badge color={color} key={key} closable={closable === "true" ? true : false} variant={variant} size={size}>
						Badge Example
					</Badge>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="badge.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Badge 
 size="${size}" 
 variant="${variant}" 
 closable={${closable}}
 color="${color}"
 >
 Badge Example
</Badge>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default BadgePreview
