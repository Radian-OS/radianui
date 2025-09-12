"use client"

import * as React from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Label } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const SwitchPreview = () => {
	type sizeProps = "20" | "24"
	const [size, setSize] = React.useState<sizeProps>("20")

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
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as sizeProps)}>
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<div className="flex items-center space-x-2">
						<Switch size={size} id="enable-notifications" />
						<Label htmlFor="enable-notifications">Enable Notifications</Label>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="switch.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
"use client"

import { Switch } from "@/components/ui/switch"

const SwitchPreview = () => {
	return (
		<div className="flex items-center space-x-2">
			<Switch size="${size}" />
			<Label>Enable Notifications</Label>
		</div>
	)
}

export default SwitchPreview
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SwitchPreview
