import { useState } from "react"

import { EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const RingAvatarPreview = () => {
	const [color, setColor] = useState<"primary" | "neutral" | "success" | "warning" | "error" | "info">("primary")

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
							<DropdownSubTrigger>Color</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setColor(Array.from(keys)[0] as typeof color)} minSelectionCount={1} selectedValues={[color]}>
									<DropdownItem value="primary">Primary</DropdownItem>
									<DropdownItem value="neutral">Neutral</DropdownItem>
									<DropdownItem value="success">Success</DropdownItem>
									<DropdownItem value="error">Error</DropdownItem>
									<DropdownItem value="warning">Warning</DropdownItem>
									<DropdownItem value="info">Info</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<div className={`border-3 rounded-full border-${color}`}>
						<div className="border-3 border-transparent">
							<Avatar size="64" src="https://randomuser.me/api/portraits/men/1.jpg" name="Test" />
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="avatar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="border-3 rounded-full border-${color}">
	<div className="border-3 border-transparent">
		<Avatar size="64" src="https://randomuser.me/api/portraits/men/1.jpg" name="Test" />
	</div>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default RingAvatarPreview
