import { useState } from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const items = [
	{
		value: "value 1",
		trigger: "What is Radian?",
		content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fuga nobis dolorem ipsam numquam. Dolorum reiciendis vero veniam repellendus! Eos sint sequi commodi voluptates voluptatum magni illum consequatur quae doloribus.`,
	},
	{
		value: "value 2",
		trigger: "How can Radian speed up my development process?",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.",
	},
	{
		value: "value 3",
		trigger: "Is Radian suitable for developers of all skill levels?",
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.",
	},
]

type Size = "sm" | "lg"
type Variant = "open" | "box" | "table"
type Interaction = "single" | "multiple"

const DEFAULT_SIZE: Size = "sm"
const DEFAULT_VARIANT: Variant = "box"
const DEFAULT_INTERACTION: Interaction = "single"

export default function AccordionPreview() {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)
	const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT)
	const [interaction, setInteraction] = useState<Interaction>(DEFAULT_INTERACTION)

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"} className="mb-6">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							{/* Dropdown for 'size' */}
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setSize(Array.from(keys)[0] as Size)} minSelectionCount={1} selectedValues={[size]}>
										<DropdownItem value="sm">Small</DropdownItem>
										<DropdownItem value="lg">Large</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							{/* Dropdown for 'variant' */}
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as Variant)} minSelectionCount={1} selectedValues={[variant]}>
										<DropdownItem value="open">Open</DropdownItem>
										<DropdownItem value="box">Box</DropdownItem>
										<DropdownItem value="table">Table</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							{/* Dropdown for 'interaction' */}
							<DropdownSub>
								<DropdownSubTrigger>Interaction</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setInteraction(Array.from(keys)[0] as Interaction)}
										minSelectionCount={1}
										selectedValues={[interaction.toString()]}>
										<DropdownItem value="single">Single</DropdownItem>
										<DropdownItem value="multiple">Multiple</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownContent>
					</Dropdown>
				</div>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Accordion
						{...(variant !== DEFAULT_VARIANT && { variant: variant })}
						{...(interaction !== DEFAULT_INTERACTION && { interaction: interaction })}
						{...(size !== DEFAULT_SIZE && { size: size })}>
						{items.map((item) => (
							<AccordionItem key={item.value} value={item.value}>
								<AccordionTrigger>{item.trigger}</AccordionTrigger>
								<AccordionContent>{item.content}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					className="h-[420px]"
					code={`const items = [
  {
    value: "value 1",
    trigger: "What is Radian?",
    content: \`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fuga nobis dolorem ipsam numquam. Dolorum reiciendis vero veniam repellendus! Eos sint sequi commodi voluptates voluptatum magni illum consequatur quae doloribus.\`,
  },
  {
    value: "value 2",
    trigger: "How can Radian speed up my development process?",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.",
  },
  {
    value: "value 3",
    trigger: "Is Radian suitable for developers of all skill levels?",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere.",
  },
]

<Accordion${variant !== DEFAULT_VARIANT ? ` variant="${variant}"` : ""}${size !== DEFAULT_SIZE ? ` size="${size}"` : ""}${interaction !== DEFAULT_INTERACTION ? ` interaction="${interaction}"` : ""}>
  {items.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionTrigger>{item.trigger}</AccordionTrigger>
      <AccordionContent>{item.content}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`}
				/>
			</TabsContent>
		</Tabs>
	)
}
