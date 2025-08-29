import { useState } from "react"
import { Box, EyeIcon, Send, Settings, SquareTerminal, Star, User } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const IconButtonPreview = () => {
	type variants = "strong" | "soft" | "outline" | "ghost"
	// Updated sizes type to include "28"
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	type booleanType = "true" | "false"
	type IconType = "box" | "settings" | "star" | "user" | "send"
	// Colors type; neutral is removed.
	type colors = "primary" | "info" | "success" | "error" | "warning" | "neutral"

	const [variant, setVariant] = useState<variants>("strong")
	const [size, setSize] = useState<sizes>("36")
	const [loading, setLoading] = useState<booleanType>("false")
	const [disabled, setDisabled] = useState<booleanType>("false")
	const [color, setColor] = useState<colors>("primary")
	const [tooltip, setTooltip] = useState<booleanType>("true")
	const [icon, setIcon] = useState<IconType>("box")

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
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as variants)}>
									<DropdownRadioItem value="strong" onSelect={(e) => e.preventDefault()}>
										strong
									</DropdownRadioItem>
									<DropdownRadioItem value="soft" onSelect={(e) => e.preventDefault()}>
										soft
									</DropdownRadioItem>
									<DropdownRadioItem value="outline" onSelect={(e) => e.preventDefault()}>
										outline
									</DropdownRadioItem>
									<DropdownRadioItem value="ghost" onSelect={(e) => e.preventDefault()}>
										ghost
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as sizes)}>
									<DropdownRadioItem value="28" onSelect={(e) => e.preventDefault()}>
										28
									</DropdownRadioItem>
									<DropdownRadioItem value="32" onSelect={(e) => e.preventDefault()}>
										32
									</DropdownRadioItem>
									<DropdownRadioItem value="36" onSelect={(e) => e.preventDefault()}>
										36
									</DropdownRadioItem>
									<DropdownRadioItem value="40" onSelect={(e) => e.preventDefault()}>
										40
									</DropdownRadioItem>
									<DropdownRadioItem value="44" onSelect={(e) => e.preventDefault()}>
										44
									</DropdownRadioItem>
									<DropdownRadioItem value="48" onSelect={(e) => e.preventDefault()}>
										48
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={icon} onValueChange={(value) => setIcon(value as IconType)}>
									<DropdownRadioItem value="box" onSelect={(e) => e.preventDefault()}>
										Box
									</DropdownRadioItem>
									<DropdownRadioItem value="settings" onSelect={(e) => e.preventDefault()}>
										Settings
									</DropdownRadioItem>
									<DropdownRadioItem value="star" onSelect={(e) => e.preventDefault()}>
										Star
									</DropdownRadioItem>
									<DropdownRadioItem value="user" onSelect={(e) => e.preventDefault()}>
										User
									</DropdownRadioItem>
									<DropdownRadioItem value="send" onSelect={(e) => e.preventDefault()}>
										Send
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

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
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled} onValueChange={(value) => setDisabled(value as booleanType)}>
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
							<DropdownSubTrigger>Loading</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={loading} onValueChange={(value) => setLoading(value as booleanType)}>
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
							<DropdownSubTrigger>Tooltip</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={tooltip} onValueChange={(value) => setTooltip(value as booleanType)}>
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
				<div className="flex h-[420px] flex-col items-center justify-center gap-3 overflow-auto rounded-xl border">
					<IconButton tooltip={tooltip === "true" ? icon : ""} variant={variant} size={size} loading={loading === "true"} color={color} disabled={disabled === "true"}>
						{icon === "box" && <Box />}
						{icon === "settings" && <Settings />}
						{icon === "star" && <Star />}
						{icon === "user" && <User />}
						{icon === "send" && <Send />}
					</IconButton>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="icon-button.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<IconButton 
  size="${size}" 
  loading={${loading === "true"}}
  variant="${variant}" 
  color="${color}"
  disabled={${disabled === "true"}}
  ${tooltip === "true" ? 'tooltip="box"' : ""}
>
  <Box />
</IconButton>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default IconButtonPreview
