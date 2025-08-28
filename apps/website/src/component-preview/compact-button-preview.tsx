import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal, X } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { CompactButton, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const CompactButtonPreview = () => {
	type sizes = "20" | "24"
	const [size, setSize] = useState<sizes>("20")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [variant, setVariant] = useState<"outline" | "ghost" | "white">("outline")

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

		if (variant === "white") {
			return `<CompactButton
size="${size}"
disabled={${disabled === "true"}}
variant="ghost"
color="neutral"
>
 <X className="stroke-white" />
</CompactButton>`
		}

		return "" // fallback
	})()

	return (
		<Tabs className="mt-3" defaultValue="preview" variant={"outline-ghost"} size={"md"}>
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
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled} onValueChange={(value) => setDisabled(value as "true" | "false")}>
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
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as "outline" | "ghost" | "white")}>
									<DropdownRadioItem value="outline" onSelect={(e) => e.preventDefault()}>
										Outline
									</DropdownRadioItem>
									<DropdownRadioItem value="ghost" onSelect={(e) => e.preventDefault()}>
										Ghost
									</DropdownRadioItem>
									<DropdownRadioItem value="white" onSelect={(e) => e.preventDefault()}>
										Static White
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as sizes)}>
									<DropdownRadioItem value="20" onSelect={(e) => e.preventDefault()}>
										20
									</DropdownRadioItem>
									<DropdownRadioItem value="24" onSelect={(e) => e.preventDefault()}>
										24
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center gap-2 overflow-auto rounded-xl border">
					{variant === "white" && (
						<CompactButton size={size} disabled={disabled === "true"} variant="ghost" color="neutral">
							<X className="stroke-white" />
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
