import { useState } from "react"
import { ChevronLeft, ChevronRight, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton, LinkButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const LinkButtonPreview = () => {
	type sizes = "14" | "16"
	type colors = "primary" | "info" | "success" | "error" | "warning" | "neutral"

	const [size, setSize] = useState<sizes>("14")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [color, setColor] = useState<colors>("primary")
	const [start, setStart] = useState<"true" | "false">("false")
	const [end, setEnd] = useState<"true" | "false">("false")

	const code = (() => {
		return `<LinkButton
href="https://radianos.com/docs/components/buttons" 
target="_blank"
size="${size}"
disabled={${disabled === "true"}}
color="${color}"
${start === "true" ? "start={<ChevronLeft />}" : ""}
${end === "true" ? "end={<ChevronRight />}" : ""}
>
 Button Label
</LinkButton>`
	})()

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
							<DropdownSubTrigger>Color</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={color} onValueChange={(value) => setColor(value as colors)}>
									<DropdownRadioItem value="primary" onSelect={(e) => e.preventDefault()}>
										primary
									</DropdownRadioItem>
									<DropdownRadioItem value="neutral" onSelect={(e) => e.preventDefault()}>
										neutral
									</DropdownRadioItem>
									<DropdownRadioItem value="success" onSelect={(e) => e.preventDefault()}>
										success
									</DropdownRadioItem>
									<DropdownRadioItem value="error" onSelect={(e) => e.preventDefault()}>
										error
									</DropdownRadioItem>
									<DropdownRadioItem value="warning" onSelect={(e) => e.preventDefault()}>
										warning
									</DropdownRadioItem>
									<DropdownRadioItem value="info" onSelect={(e) => e.preventDefault()}>
										info
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Text Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as sizes)}>
									<DropdownRadioItem value="14" onSelect={(e) => e.preventDefault()}>
										14
									</DropdownRadioItem>
									<DropdownRadioItem value="16" onSelect={(e) => e.preventDefault()}>
										16
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Start</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={start} onValueChange={(value) => setStart(value as "true" | "false")}>
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
							<DropdownSubTrigger>End</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={end} onValueChange={(value) => setEnd(value as "true" | "false")}>
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
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center gap-2 overflow-auto rounded-xl border">
					<LinkButton
						start={start === "true" ? <ChevronLeft /> : undefined}
						end={end === "true" ? <ChevronRight /> : undefined}
						href="/docs/components/button"
						target="_blank"
						size={size}
						disabled={disabled === "true"}
						color={color}>
						Button Label
					</LinkButton>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="compact-button.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default LinkButtonPreview
