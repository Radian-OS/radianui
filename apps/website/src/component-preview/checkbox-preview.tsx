import { useState } from "react"
import { Check, EyeIcon, Heart, Settings, SquareTerminal, Star, X } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={disabled.toString()} onValueChange={(value) => setDisabled(value === "true")}>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										false
									</DropdownRadioItem>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										true
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={iconType} onValueChange={(value) => setIconType(value as IconType)}>
									<DropdownRadioItem value="check" onSelect={(e) => e.preventDefault()}>
										Check
									</DropdownRadioItem>
									<DropdownRadioItem value="x" onSelect={(e) => e.preventDefault()}>
										X
									</DropdownRadioItem>
									<DropdownRadioItem value="heart" onSelect={(e) => e.preventDefault()}>
										Heart
									</DropdownRadioItem>
									<DropdownRadioItem value="star" onSelect={(e) => e.preventDefault()}>
										Star
									</DropdownRadioItem>
								</DropdownRadioGroup>
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
