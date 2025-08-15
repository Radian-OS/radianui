import { useState } from "react"

import { EyeIcon, Settings, SquareTerminal, Volume2, VolumeX } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent>
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[String(label)]} onSelectedChange={(values) => setLabel(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Disabled</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[String(disabled)]} onSelectedChange={(values) => setDisabled(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>With input</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[String(withInput)]} onSelectedChange={(values) => setWithInput(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Show steppers</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[String(showSteppers)]}
									onSelectedChange={(values) => setShowSteppers(values[0] === "true")}
									minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Show marks</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[String(showMarks)]} onSelectedChange={(values) => setShowMarks(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Lead icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[String(startContent)]}
									onSelectedChange={(values) => setStartContent(values[0] === "true")}
									minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Trail icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[String(endContent)]}
									onSelectedChange={(values) => setEndContent(values[0] === "true")}
									minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Orientation</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[orientation]}
									onSelectedChange={(values) => setOrientation(values[0] as "horizontal" | "vertical")}
									minSelectionCount={1}>
									<DropdownItem value="horizontal">Horizontal</DropdownItem>
									<DropdownItem value="vertical">Vertical</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Show tooltip</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup
									selectionMode="single"
									selectedValues={[String(showTooltip)]}
									onSelectedChange={(values) => setShowTooltip(values[0] === "true")}
									minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
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
