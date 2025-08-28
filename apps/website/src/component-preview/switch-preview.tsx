"use client"

import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import Switch from "@/registry/ui/switch"
import { Switch as Switch2 } from "@/registry/ui/switch2"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const SwitchPreview = () => {
	type sizeProps = "20" | "24"
	type disabledType = "true" | "false"
	const [size, setSize] = useState<sizeProps>("20")
	const [disabled, setDisabled] = useState<disabledType>("false")

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
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled} onValueChange={(value) => setDisabled(value as disabledType)}>
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
					<Switch size={size} disabled={disabled === "true"}>
						Switch Label
					</Switch>

					<Switch2 />
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="switch.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Switch size={${size}} disabled={${disabled === "true"}} >
Switch Label
</Switch>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SwitchPreview
