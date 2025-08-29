import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal, Volume2, VolumeX } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import Slider from "@/registry/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const SliderPreview = () => {
	const [withInput, setWithInput] = useState<boolean>(false)
	const [showSteppers, setShowSteppers] = useState<boolean>(false)
	const [showMarks, setShowMarks] = useState(false)
	const [startContent, setStartContent] = useState(false)
	const [endContent, setEndContent] = useState(false)
	const [showTooltip, setShowTooltip] = useState(true)
	const [label, setLabel] = useState(true)
	const [disabled, setDisabled] = useState(false)
	const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")

	const marks = [
		{ value: 0, label: "0%" },
		{ value: 20, label: "20%" },
		{ value: 40, label: "40%" },
		{ value: 60, label: "60%" },
		{ value: 80, label: "80%" },
		{ value: 100, label: "100%" },
	]
	const formattedMarks = marks
		.map((m, i) => {
			const line = `\t\t\t\t{ value: ${m.value}, label: "${m.label}" }`
			return i < marks.length - 1 ? line + "," : line // no comma on last
		})
		.join("\n")

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
							<DropdownSubTrigger>With input</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(withInput)} onValueChange={(value) => setWithInput(value === "true")}>
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
							<DropdownSubTrigger>Show steppers</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(showSteppers)} onValueChange={(value) => setShowSteppers(value === "true")}>
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
							<DropdownSubTrigger>Show marks</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(showMarks)} onValueChange={(value) => setShowMarks(value === "true")}>
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
							<DropdownSubTrigger>Lead icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(startContent)} onValueChange={(value) => setStartContent(value === "true")}>
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
							<DropdownSubTrigger>Trail icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(endContent)} onValueChange={(value) => setEndContent(value === "true")}>
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
							<DropdownSubTrigger>Orientation</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={orientation} onValueChange={(value) => setOrientation(value as "horizontal" | "vertical")}>
									<DropdownRadioItem value="horizontal" onSelect={(e) => e.preventDefault()}>
										Horizontal
									</DropdownRadioItem>
									<DropdownRadioItem value="vertical" onSelect={(e) => e.preventDefault()}>
										Vertical
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Show tooltip</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(showTooltip)} onValueChange={(value) => setShowTooltip(value === "true")}>
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Slider
						label={label ? "Select volume label" : undefined}
						disabled={disabled}
						classNames={{ base: "w-[320px]" }}
						withInput={withInput}
						showSteppers={showSteppers}
						showTooltip={showTooltip}
						marks={
							showMarks
								? [
										{ value: 0, label: "0%" },
										{ value: 20, label: "20%" },
										{ value: 40, label: "40%" },
										{ value: 60, label: "60%" },
										{ value: 80, label: "80%" },
										{ value: 100, label: "100%" },
									]
								: undefined
						}
						start={startContent ? <VolumeX className="text-fg-tertiary" /> : undefined}
						end={endContent ? <Volume2 className="text-fg-tertiary" /> : undefined}
						orientation={orientation}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="slider.tsx"
					showLineNumber
					className="h-[420px]"
					code={`  <Slider
		label=${label ? `"Select volume label"` : "undefined"}
		disabled={${disabled}}
		classNames={{ base: "w-[320px]" }}
		withInput={${withInput}}
		showSteppers={${showSteppers}}
		showTooltip={${showTooltip}}
		orientation="${orientation}"
		${startContent ? 'start={<VolumeX className="text-fg-tertiary" />}' : ""}
		${endContent ? 'end={<VolumeX className="text-fg-tertiary" />}' : ""}
		${
			showMarks
				? `marks={[
${formattedMarks}
				]}`
				: ""
		}
    /> `}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SliderPreview
