import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Size = "sm" | "md" | "lg"

const DEFAULT_SIZE: Size = "md"

const RadiogroupPreview = () => {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)

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
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as Size)}>
									<DropdownRadioItem value="sm" onSelect={(e) => e.preventDefault()}>
										sm
									</DropdownRadioItem>
									<DropdownRadioItem value="md" onSelect={(e) => e.preventDefault()}>
										md
									</DropdownRadioItem>
									<DropdownRadioItem value="lg" onSelect={(e) => e.preventDefault()}>
										lg
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-3">
						<Label className="text-base">Notify me about...</Label>
						<RadioGroup {...(size !== DEFAULT_SIZE && { size: size })} defaultValue="1">
							<div className="flex items-center gap-2">
								<RadioGroupItem id="1" value="1" />
								<Label htmlFor="1">All new messages</Label>
							</div>

							<div className="flex items-center gap-2">
								<RadioGroupItem id="2" value="2" />
								<Label htmlFor="2">Direct messages and mentions</Label>
							</div>

							<div className="flex items-center gap-2">
								<RadioGroupItem id="3" value="3" />
								<Label htmlFor="3">Nothing</Label>
							</div>
						</RadioGroup>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="radio-group.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<RadioGroup ${size !== DEFAULT_SIZE ? `size="${size}"` : ``} defaultValue="1" label="Notify me about...">
	<RadioGroupItem id="1" value="1"/>
	<Label htmlFor="1">All new messages</Label>

	<RadioGroupItem id="2" value="2"/>
	<Label htmlFor="2">Direct messages and mentions</Label>

	<RadioGroupItem id="3" value="3"/>
	<Label htmlFor="3">Nothing</Label>
</RadioGroup>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default RadiogroupPreview
