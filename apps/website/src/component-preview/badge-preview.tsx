import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const BadgePreview = () => {
	const [variant, setVariant] = useState<"default" | "strong" | "outline" | "soft">("soft")
	const [color, setColor] = useState<"primary" | "neutral" | "info" | "success" | "error" | "warning">("primary")
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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as "default" | "strong")}>
									<DropdownRadioItem value="default" onSelect={(e) => e.preventDefault()}>
										Default
									</DropdownRadioItem>
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
								<DropdownRadioGroup value={color} onValueChange={(value) => setColor(value as "primary" | "info" | "success" | "error" | "warning")}>
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
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as "24" | "20" | "28")}>
									<DropdownRadioItem value="20" onSelect={(e) => e.preventDefault()}>
										20
									</DropdownRadioItem>
									<DropdownRadioItem value="24" onSelect={(e) => e.preventDefault()}>
										24
									</DropdownRadioItem>
									<DropdownRadioItem value="28" onSelect={(e) => e.preventDefault()}>
										28
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>OnClose</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={closable} onValueChange={(value) => setClosable(value as "true" | "false")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<Badge color={color} key={key} onClose={closable === "true" ? () => setKey((k) => k + 1) : undefined} variant={variant} size={size}>
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
 onClose={() => console.log("Badge closed")}
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
