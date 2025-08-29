import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DividerPreview = () => {
	const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical")
	const [margin, setmargin] = useState<"0" | "2" | "4" | "6" | "8" | "12" | "16" | "24" | "32" | "40">("4")

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
								<DropdownRadioGroup value={margin} onValueChange={(value) => setmargin(value as "0" | "2" | "4" | "6" | "8" | "12" | "16" | "24" | "32" | "40")}>
									<DropdownRadioItem value="0" onSelect={(e) => e.preventDefault()}>
										0
									</DropdownRadioItem>
									<DropdownRadioItem value="2" onSelect={(e) => e.preventDefault()}>
										2
									</DropdownRadioItem>
									<DropdownRadioItem value="4" onSelect={(e) => e.preventDefault()}>
										4
									</DropdownRadioItem>
									<DropdownRadioItem value="6" onSelect={(e) => e.preventDefault()}>
										6
									</DropdownRadioItem>
									<DropdownRadioItem value="8" onSelect={(e) => e.preventDefault()}>
										8
									</DropdownRadioItem>
									<DropdownRadioItem value="12" onSelect={(e) => e.preventDefault()}>
										12
									</DropdownRadioItem>
									<DropdownRadioItem value="16" onSelect={(e) => e.preventDefault()}>
										16
									</DropdownRadioItem>
									<DropdownRadioItem value="24" onSelect={(e) => e.preventDefault()}>
										24
									</DropdownRadioItem>
									<DropdownRadioItem value="32" onSelect={(e) => e.preventDefault()}>
										32
									</DropdownRadioItem>
									<DropdownRadioItem value="40" onSelect={(e) => e.preventDefault()}>
										40
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className={`flex ${orientation === "horizontal" ? "flex-col" : ""} h-[420px] items-center justify-center overflow-auto rounded-xl border px-10`}>
					<h4 className="heading-4">Heading1</h4>
					<Divider margin={margin} orientation={orientation} />
					<h4 className="heading-4">Heading2</h4>
					<Divider margin={margin} orientation={orientation} />
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
<Divider margin="${margin}" orientation="${orientation}" />
<h4 className="heading-4">Heading2</h4>
<Divider margin="${margin}" orientation="${orientation}" />
<h4 className="heading-4">Heading3</h4>
</div>
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default DividerPreview
