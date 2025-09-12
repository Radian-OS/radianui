import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DividerPreview = () => {
	const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical")
	const [margin, setMargin] = useState<"0" | "2" | "4" | "6" | "8" | "12" | "16" | "24" | "32" | "40">("0")

	// Map pixel values to Tailwind spacing classes (using only guaranteed classes)
	const marginMap = {
		"0": "0",
		"2": "0.5",
		"4": "1",
		"6": "1.5",
		"8": "2",
		"12": "3", // mx-3 = 12px
		"16": "4", // mx-4 = 16px
		"24": "6", // mx-6 = 24px
		"32": "8", // mx-8 = 32px
		"40": "10", // mx-10 = 40px
	} as const

	// Get the Tailwind class value
	const tailwindMargin = marginMap[margin]

	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="mx-0.5 min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Orientation</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={orientation} onValueChange={(value) => setOrientation(value as "vertical" | "horizontal")}>
									<DropdownRadioItem value="vertical" onSelect={(e) => e.preventDefault()}>
										vertical
									</DropdownRadioItem>
									<DropdownRadioItem value="horizontal" onSelect={(e) => e.preventDefault()}>
										horizontal
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Margin</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={margin} onValueChange={(value) => setMargin(value as typeof margin)}>
									<DropdownRadioItem value="0" onSelect={(e) => e.preventDefault()}>
										0px
									</DropdownRadioItem>
									<DropdownRadioItem value="2" onSelect={(e) => e.preventDefault()}>
										2px
									</DropdownRadioItem>
									<DropdownRadioItem value="4" onSelect={(e) => e.preventDefault()}>
										4px
									</DropdownRadioItem>
									<DropdownRadioItem value="6" onSelect={(e) => e.preventDefault()}>
										6px
									</DropdownRadioItem>
									<DropdownRadioItem value="8" onSelect={(e) => e.preventDefault()}>
										8px
									</DropdownRadioItem>
									<DropdownRadioItem value="12" onSelect={(e) => e.preventDefault()}>
										12px
									</DropdownRadioItem>
									<DropdownRadioItem value="16" onSelect={(e) => e.preventDefault()}>
										16px
									</DropdownRadioItem>
									<DropdownRadioItem value="24" onSelect={(e) => e.preventDefault()}>
										24px
									</DropdownRadioItem>
									<DropdownRadioItem value="32" onSelect={(e) => e.preventDefault()}>
										32px
									</DropdownRadioItem>
									<DropdownRadioItem value="40" onSelect={(e) => e.preventDefault()}>
										40px
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div
					className={`flex ${orientation === "horizontal" ? "flex-col" : ""} h-[420px] items-center justify-center overflow-auto rounded-xl border ${orientation === "horizontal" ? "px-10 py-4" : "px-4 py-10"}`}>
					<h4 className="heading-4">Heading1</h4>
					<Divider className={`${orientation === "horizontal" ? "my-" : "mx-"}${tailwindMargin}`} orientation={orientation} />
					<h4 className="heading-4">Heading2</h4>
					<Divider className={`${orientation === "horizontal" ? "my-" : "mx-"}${tailwindMargin}`} orientation={orientation} />
					<h4 className="heading-4">Heading3</h4>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="divider.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="${orientation === "horizontal" ? "flex flex-col" : "flex"}" >
<h4 className="heading-4">Heading1</h4>
<Divider className="${orientation === "horizontal" ? "my-" : "mx-"}${tailwindMargin}" orientation="${orientation}" />
<h4 className="heading-4">Heading2</h4>
<Divider className="${orientation === "horizontal" ? "my-" : "mx-"}${tailwindMargin}" orientation="${orientation}" />
<h4 className="heading-4">Heading3</h4>
</div>
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default DividerPreview
