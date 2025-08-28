import { useState } from "react"
import { Ellipsis, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, ButtonGroup, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const ButtonGroupPreview = () => {
	type variants = "strong" | "soft" | "outline" | "ghost"
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	type colors = "primary" | "info" | "success" | "error" | "warning" | "neutral"

	const [variant, setVariant] = useState<variants>("strong")
	const [size, setSize] = useState<sizes>("40")
	const [color, setColor] = useState<colors>("primary")

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
							<DropdownSubTrigger>variant</DropdownSubTrigger>
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
							<DropdownSubTrigger>size</DropdownSubTrigger>
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
							<DropdownSubTrigger>color</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={color} onValueChange={(value) => setColor(value as colors)}>
									<DropdownRadioItem value="primary" onSelect={(e) => e.preventDefault()}>
										primary
									</DropdownRadioItem>
									<DropdownRadioItem value="info" onSelect={(e) => e.preventDefault()}>
										info
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
									<DropdownRadioItem value="neutral" onSelect={(e) => e.preventDefault()}>
										neutral
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border">
					<ButtonGroup variant={variant} size={size} color={color}>
						<Button>Left</Button>
						<Button>Center</Button>
						<Button>Right</Button>
						<Button iconOnly>
							<Ellipsis />
						</Button>
					</ButtonGroup>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="button-group.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<ButtonGroup variant="${variant}" size="${size}" color="${color}">
	<Button>Left</Button>
	<Button>Center</Button>
	<Button>Right</Button>
	<Button iconOnly ><Ellipsis /></Button>
</ButtonGroup>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default ButtonGroupPreview
