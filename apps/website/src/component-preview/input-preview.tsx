import { useState } from "react"
import { CircleCheck, EyeIcon, Info, Settings, SquareTerminal, Star, TriangleAlert } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
const sizes = ["28", "32", "36", "40", "44", "48"]

const InputPreview = () => {
	const [size, setSize] = useState<SizeOptions>("36")
	const [placeholder, setPlaceholder] = useState<boolean>(true)
	const [disabled, setDisabled] = useState<boolean>(false)
	const [hasError, setHasError] = useState<boolean>(false)
	const [label, setLabel] = useState<boolean>(true)
	const [hint, setHint] = useState<boolean>(false)
	const [start, setStart] = useState<"none" | "star" | "info" | "alert" | "check">("none")
	const [end, setEnd] = useState<"none" | "star" | "info" | "alert" | "check">("none")

	const icons = {
		star: <Star size={20} />,
		info: <Info size={20} />,
		check: <CircleCheck size={20} />,
		alert: <TriangleAlert size={20} />,
		none: "",
	}

	const sizeHeightMapping: Record<number, string> = {
		28: "h-4 w-4",
		32: "h-5 w-5",
		36: "h-5 w-5",
		40: "h-5 w-5",
		44: "h-6 w-6",
		48: "h-6 w-6",
	}

	const iconClass = sizeHeightMapping[size] ?? ""
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
					<DropdownContent>
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(label)} onValueChange={(value) => setLabel(value === "true")}>
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
							<DropdownSubTrigger>Placeholder</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(placeholder)} onValueChange={(value) => setPlaceholder(value === "true")}>
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
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as SizeOptions)}>
									{sizes.map((size) => (
										<DropdownRadioItem value={size} key={size} onSelect={(e) => e.preventDefault()}>
											{size}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(disabled)} onValueChange={(value) => setDisabled(value === "true")}>
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
							<DropdownSubTrigger>Has error</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(hasError)} onValueChange={(value) => setHasError(value === "true")}>
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
							<DropdownSubTrigger>Hint</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(hint)} onValueChange={(value) => setHint(value === "true")}>
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
							<DropdownSubTrigger>Start</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={start} onValueChange={(value) => setStart(value as typeof start)}>
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
										Triangle Alert
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
								<DropdownRadioGroup value={end} onValueChange={(value) => setEnd(value as typeof end)}>
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
										Triangle Alert
									</DropdownRadioItem>
									<DropdownRadioItem value="check" onSelect={(e) => e.preventDefault()}>
										Check
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Input
						className="w-80"
						size={size}
						disabled={disabled}
						label={label ? "Username" : undefined}
						placeholder={placeholder ? "Enter your username here" : ""}
						start={startSelectedIcon}
						end={endSelectedIcon}
						hasError={hasError}
						hint={hint ? "Hint text to help the user with input" : ""}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="input.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Input 
    size="${size}"
    disabled={${disabled}}
    label="${label ? "Username" : ""}"
    placeholder={${placeholder ? `"Enter your username here"` : `""`}}
    hasError={${hasError}}
	${hint ? `hint="Hint text to help the user with input"` : ""}
	${startSelectedIcon ? `start={<${start.charAt(0).toUpperCase() + start.slice(1)} className="${iconClass}" />}` : ""}
	${endSelectedIcon ? `end={<${end.charAt(0).toUpperCase() + end.slice(1)} className="${iconClass}" />}` : ""}
	/>
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default InputPreview
