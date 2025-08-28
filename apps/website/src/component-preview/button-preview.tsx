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

					{/* <Button color="neutral" variant="outline" iconOnly >
<svg width="76" height="90" viewBox="0 0 76 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M62.8411 47.8602C62.8866 44.4106 63.8252 41.0282 65.5694 38.0279C67.3137 35.0275 69.8069 32.5066 72.8172 30.6998C70.9049 28.0334 68.382 25.839 65.4491 24.291C62.5161 22.7429 59.2538 21.8839 55.9213 21.7821C48.8125 21.0536 41.9209 25.9351 38.2983 25.9351C34.6057 25.9351 29.0283 21.8545 23.0223 21.9751C19.1375 22.0976 15.3514 23.2005 12.033 25.1763C8.71461 27.1522 5.97702 29.9335 4.08697 33.2494C-4.10009 47.0883 2.00674 67.427 9.8494 78.6135C13.7733 84.0911 18.3591 90.2098 24.3597 89.9928C30.2316 89.7551 32.4246 86.3373 39.5125 86.3373C46.5345 86.3373 48.592 89.9928 54.7144 89.8549C61.0152 89.7551 64.985 84.3529 68.7712 78.8233C71.5905 74.9203 73.76 70.6066 75.1992 66.042C71.5386 64.5305 68.4147 62.0003 66.2171 58.7671C64.0195 55.5339 62.8454 51.7406 62.8411 47.8602Z" fill="currentColor"/>
<path d="M51.2781 14.4258C54.7136 10.3994 56.4061 5.2241 55.9963 -0.000976562C50.7477 0.53722 45.8994 2.98626 42.4176 6.85817C40.7152 8.7497 39.4113 10.9503 38.5805 13.334C37.7498 15.7178 37.4084 18.2381 37.5759 20.7508C40.2011 20.7772 42.7983 20.2216 45.1717 19.126C47.5452 18.0304 49.6331 16.4233 51.2781 14.4258Z" fill="currentColor"/>
</svg>

</Button> */}
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="button.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Button 
  size="${size}" 
  loading={${loading === "true"}}
  variant="${variant}" 
  color="${color}"
  disabled={${disabled === "true"}}${start === "alert" ? `\n  start={<Box className="${iconClass}" />}` : ""}${end === "alert" ? `\n  end={<Box className="${iconClass}" />}` : ""}>
  Button
</Button>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
export default ButtonPreview
