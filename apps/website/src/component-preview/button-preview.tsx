import { useState } from "react"
import { CircleCheck, EyeIcon, Info, Settings, SquareTerminal, Star, TriangleAlert } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const ButtonPreview = () => {
	type variants = "strong" | "soft" | "outline" | "ghost"
	// Updated sizes type to include "28"
	type sizes = "28" | "32" | "36" | "40" | "44" | "48"
	type isloadingType = "true" | "false"
	type disabledType = "true" | "false"
	// Colors type; neutral is removed.
	type colors = "primary" | "info" | "success" | "error" | "warning" | "neutral"
	type iconType = "star" | "info" | "alert" | "check" | "none"

	const [variant, setVariant] = useState<variants>("strong")
	const [size, setSize] = useState<sizes>("36")
	const [loading, setLoading] = useState<isloadingType>("false")
	const [disabled, setDisabled] = useState<disabledType>("false")
	const [color, setColor] = useState<colors>("primary")
	const [start, setstart] = useState<iconType>("none")
	const [end, setend] = useState<iconType>("none")

	const getstartTrialClass = () => {
		if (size === "36" || size === "32" || size === "40") {
			return "size-5"
		}
		if (size === "28") {
			return "size-4"
		}
		if (size === "44" || size === "48") {
			return "size-6"
		}
		return ""
	}

	const iconClass = getstartTrialClass()
	const icons = {
		star: <Star />,
		info: <Info />,
		check: <CircleCheck />,
		alert: <TriangleAlert />,
		none: "",
	}
	const startSelectedIcon = icons[start as keyof typeof icons]
	const endSelectedIcon = icons[end as keyof typeof icons]

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
							<DropdownSubTrigger>Start</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={start} onValueChange={(value) => setstart(value as iconType)}>
									<DropdownRadioItem value="none" onSelect={(e) => e.preventDefault()}>
										None
									</DropdownRadioItem>
									<DropdownRadioItem value="star" onSelect={(e) => e.preventDefault()}>
										Star
									</DropdownRadioItem>
									<DropdownRadioItem value="info" onSelect={(e) => e.preventDefault()}>
										Info
									</DropdownRadioItem>
									<DropdownRadioItem value="alert" onSelect={(e) => e.preventDefault()}>
										Alert
									</DropdownRadioItem>
									<DropdownRadioItem value="check" onSelect={(e) => e.preventDefault()}>
										Check
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>End</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={end} onValueChange={(value) => setend(value as iconType)}>
									<DropdownRadioItem value="none" onSelect={(e) => e.preventDefault()}>
										None
									</DropdownRadioItem>
									<DropdownRadioItem value="star" onSelect={(e) => e.preventDefault()}>
										Star
									</DropdownRadioItem>
									<DropdownRadioItem value="info" onSelect={(e) => e.preventDefault()}>
										Info
									</DropdownRadioItem>
									<DropdownRadioItem value="alert" onSelect={(e) => e.preventDefault()}>
										Alert
									</DropdownRadioItem>
									<DropdownRadioItem value="check" onSelect={(e) => e.preventDefault()}>
										Check
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

						<DropdownSub>
							<DropdownSubTrigger>Loading</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={loading} onValueChange={(value) => setLoading(value as isloadingType)}>
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
					<Button start={startSelectedIcon} end={endSelectedIcon} variant={variant} size={size} loading={loading === "true"} color={color} disabled={disabled === "true"}>
						Button
					</Button>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="button.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Button${
						start !== "none"
							? `\n  start={${
									start === "star"
										? `<Star className="${iconClass}" />`
										: start === "info"
											? `<Info className="${iconClass}" />`
											: start === "alert"
												? `<TriangleAlert className="${iconClass}" />`
												: start === "check"
													? `<CircleCheck className="${iconClass}" />`
													: ""
								}}`
							: ""
					}${
						end !== "none"
							? `\n  end={${
									end === "star"
										? `<Star className="${iconClass}" />`
										: end === "info"
											? `<Info className="${iconClass}" />`
											: end === "alert"
												? `<TriangleAlert className="${iconClass}" />`
												: end === "check"
													? `<CircleCheck className="${iconClass}" />`
													: ""
								}}`
							: ""
					}
  size="${size}"
  loading={${loading === "true"}}
  variant="${variant}"
  color="${color}"
  disabled={${disabled === "true"}}>
  Button
</Button>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default ButtonPreview
