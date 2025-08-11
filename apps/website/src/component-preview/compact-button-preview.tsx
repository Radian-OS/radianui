import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal, X } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, CompactButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const CompactButtonPreview = () => {
	type sizes = "20" | "24"
	const [size, setSize] = useState<sizes>("20")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [variant, setVariant] = useState<"outline" | "ghost" | "static-white">("outline")

	const code = (() => {
		if (variant === "outline") {
			return `<CompactButton
size="${size}"
disabled={${disabled === "true"}}
color="neutral"
variant="outline"
className="focus-visible:ring-offset-4 focus-visible:ring-2"
>
 <X />
</CompactButton>`
		}

		if (variant === "ghost") {
			return `<CompactButton
size="${size}"
disabled={${disabled === "true"}}
variant="ghost"
color="neutral"
>
 <X />
</CompactButton>`
		}

		if (variant === "static-white") {
			return `<CompactButton
size="${size}"
disabled={${disabled === "true"}}
variant="ghost"
color="neutral"
>
 <X className="stroke-static-white" />
</CompactButton>`
		}

		return "" // fallback
	})()

	return (
		<Tabs className="mb-10 pb-6" defaultValue="preview" variant={"outline-ghost"} size={"md"}>
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
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setDisabled(Array.from(keys)[0] as "true" | "false")
									}}
									minSelectionCount={1}
									selectedValues={[disabled]}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setVariant(Array.from(keys)[0] as "outline" | "ghost")
									}}
									minSelectionCount={1}
									selectedValues={[variant]}>
									<DropdownItem value="outline">Outline</DropdownItem>
									<DropdownItem value="ghost">Ghost</DropdownItem>
									<DropdownItem value="static-white">Static White</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => {
										setSize(Array.from(keys)[0] as sizes)
									}}
									minSelectionCount={1}
									selectedValues={[size]}>
									<DropdownItem value="20">20</DropdownItem>
									<DropdownItem value="24">24</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center gap-2 overflow-auto rounded-xl border">
					{variant === "static-white" && (
						<CompactButton size={size} disabled={disabled === "true"} variant="ghost" color="neutral">
							<X className="stroke-static-white" />
						</CompactButton>
					)}
					{variant === "ghost" && (
						<CompactButton size={size} disabled={disabled === "true"} variant="ghost" color="neutral">
							<X />
						</CompactButton>
					)}
					{variant === "outline" && (
						<CompactButton size={size} disabled={disabled === "true"} color="neutral" variant="outline" className="focus-visible:ring-2 focus-visible:ring-offset-4">
							<X />
						</CompactButton>
					)}
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="compact-button.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default CompactButtonPreview
