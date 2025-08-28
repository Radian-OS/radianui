import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
type Expand = "single" | "multiple"

const DEFAULT_SIZE: Size = "sm"
const DEFAULT_VARIANT: Variant = "box"
const DEFAULT_Expand: Expand = "single"

export default function AccordionPreview() {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)
	const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT)
	const [expand, setExpand] = useState<Expand>(DEFAULT_Expand)

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
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger asChild>
							<IconButton variant="outline" color="neutral" size="36">
								<Settings />
							</IconButton>
						</DropdownTrigger>
						<DropdownContent className="min-w-20">
							{/* Dropdown for 'size' */}
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as Size)}>
										<DropdownRadioItem value="sm" onSelect={(e) => e.preventDefault()}>
											Small
										</DropdownRadioItem>
										<DropdownRadioItem value="lg" onSelect={(e) => e.preventDefault()}>
											Large
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							{/* Dropdown for 'variant' */}
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as Variant)}>
										<DropdownRadioItem value="open" onSelect={(e) => e.preventDefault()}>
											Open
										</DropdownRadioItem>
										<DropdownRadioItem value="box" onSelect={(e) => e.preventDefault()}>
											Box
										</DropdownRadioItem>
										<DropdownRadioItem value="table" onSelect={(e) => e.preventDefault()}>
											Table
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							{/* Dropdown for 'Expand' */}
							<DropdownSub>
								<DropdownSubTrigger>Expand</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={expand} onValueChange={(value) => setExpand(value as Expand)}>
										<DropdownRadioItem value="single" onSelect={(e) => e.preventDefault()}>
											Single
										</DropdownRadioItem>
										<DropdownRadioItem value="multiple" onSelect={(e) => e.preventDefault()}>
											Multiple
										</DropdownRadioItem>
									</DropdownRadioGroup>
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
						{...(expand !== DEFAULT_Expand && { expand: expand })}
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
				<CodeSnippet
					title="accordion-preview.tsx"
					showLineNumber
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

<Accordion${variant !== DEFAULT_VARIANT ? ` variant="${variant}"` : ""}${size !== DEFAULT_SIZE ? ` size="${size}"` : ""}${expand !== DEFAULT_Expand ? ` expand="${expand}"` : ""}>
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
