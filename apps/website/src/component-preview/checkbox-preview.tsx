import { useState } from "react"

import { Check, EyeIcon, Heart, Settings, SquareTerminal, Star, X } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Size = "sm" | "md" | "lg"
type IconType = "check" | "x" | "heart" | "star"

const DEFAULT_SIZE: Size = "md"
const DEFAULT_ICON: IconType = "check"

export default function CheckboxPreview() {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)
	const [disabled, setDisabled] = useState(false)
	const [iconType, setIconType] = useState<IconType>(DEFAULT_ICON)

	const iconMap = {
		check: <Check />,
		x: <X />,
		heart: <Heart />,
		star: <Star />,
	}

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
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setSize(Array.from(keys)[0] as Size)} minSelectionCount={1} selectedValues={[size]}>
									<DropdownItem value="sm">sm</DropdownItem>
									<DropdownItem value="md">md</DropdownItem>
									<DropdownItem value="lg">lg</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									onSelectedChange={(keys) => setDisabled(Array.from(keys)[0] === "true")}
									minSelectionCount={1}
									selectedValues={[disabled.toString()]}>
									<DropdownItem value="false">false</DropdownItem>
									<DropdownItem value="true">true</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setIconType(Array.from(keys)[0] as IconType)} minSelectionCount={1} selectedValues={[iconType]}>
									<DropdownItem value="check">Check</DropdownItem>
									<DropdownItem value="x">X</DropdownItem>
									<DropdownItem value="heart">Heart</DropdownItem>
									<DropdownItem value="star">Star</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Checkbox {...(size !== DEFAULT_SIZE && { size: size })} {...(disabled && { disabled })} {...(iconType !== DEFAULT_ICON && { icon: iconMap[iconType] })}>
						Accept terms and conditions
					</Checkbox>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="checkbox.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Checkbox${size !== DEFAULT_SIZE ? ` size="${size}"` : ""}${disabled ? " disabled" : ""}${iconType !== DEFAULT_ICON ? ` icon={<${iconType.charAt(0).toUpperCase() + iconType.slice(1)} />}` : ""}>
  Accept terms and conditions
</Checkbox>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
