import { useLayoutEffect, useRef, useState } from "react"
import { CheckIcon, ChevronLeft, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Size = "sm" | "lg"
type Variant = "open" | "box" | "table"
type Interaction = "single" | "multiple"
type View = "main" | "size" | "variant" | "interaction"

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

const DEFAULT_SIZE: Size = "sm"
const DEFAULT_VARIANT: Variant = "box"
const DEFAULT_INTERACTION: Interaction = "single"

const SIZE_OPTIONS: Size[] = ["sm", "lg"]
const VARIANT_OPTIONS: Variant[] = ["open", "box", "table"]
const INTERACTION_OPTIONS: Interaction[] = ["single", "multiple"]

const PopoverHeader = ({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	const baseClasses = "text-text-secondary w-full border-b px-2 py-2.5 text-start text-sm font-medium"

	if (onClick) {
		return (
			<button className={cn(baseClasses, "flex cursor-pointer items-center gap-2")} onClick={onClick} {...props}>
				<ChevronLeft size={20} className="text-text-tertiary" />
				{children}
			</button>
		)
	}

	return (
		<div className={baseClasses} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
			{children}
		</div>
	)
}

const PopoverMenuItem = ({
	children,
	endContent,
	className = "",
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	endContent?: React.ReactNode
}) => {
	return (
		<button
			type="button"
			className={cn(
				"hover:bg-bg-alpha-4 text-text-secondary focus-visible:ring-text-tertiary focus-visible:ring-offset-bg-base flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
				className
			)}
			{...props}>
			<span className="flex-1 text-left font-medium">{children}</span>
			{endContent && <span className="text-muted-foreground font-normal">{endContent}</span>}
		</button>
	)
}

const AnimateHeight = ({ children }: { children: React.ReactNode }) => {
	const [height, setHeight] = useState<number | undefined>(undefined)
	const contentRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (contentRef.current) {
			setHeight(contentRef.current.scrollHeight)
		}
	}, [children])

	return (
		<div className="overflow-hidden transition-[height] duration-200 ease-in-out" style={{ height: height ? `${height}px` : undefined }}>
			<div ref={contentRef}>{children}</div>
		</div>
	)
}

export default function AccordionPreview() {
	// States for properties(props)
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)
	const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT)
	const [interaction, setInteraction] = useState<Interaction>(DEFAULT_INTERACTION)

	// States for navigation
	const [currentView, setCurrentView] = useState<View>("main")
	const [navigationStack, setNavigationStack] = useState<View[]>(["main"])

	const navigateToView = (view: View) => {
		setCurrentView(view)
		setNavigationStack((prev) => [...prev, view])
	}

	const goBack = () => {
		if (navigationStack.length > 1) {
			const newStack = navigationStack.slice(0, -1)
			setNavigationStack(newStack)
			setCurrentView(newStack[newStack.length - 1])
		}
	}

	const resetNavigation = () => {
		setCurrentView("main")
		setNavigationStack(["main"])
	}

	const renderPopoverContent = () => {
		switch (currentView) {
			case "main":
				return (
					<>
						<PopoverHeader>Properties</PopoverHeader>
						<div className="p-1.5">
							<PopoverMenuItem endContent={size} onClick={() => navigateToView("size")}>
								Size
							</PopoverMenuItem>
							<PopoverMenuItem endContent={variant} onClick={() => navigateToView("variant")}>
								Variant
							</PopoverMenuItem>
							<PopoverMenuItem endContent={interaction} onClick={() => navigateToView("interaction")}>
								Interaction
							</PopoverMenuItem>
						</div>
					</>
				)
			case "size":
				return (
					<>
						<PopoverHeader onClick={goBack}>Size</PopoverHeader>
						<div className="p-1.5">
							{SIZE_OPTIONS.map((opt) => (
								<PopoverMenuItem key={opt} endContent={size === opt ? <CheckIcon size={16} /> : null} onClick={() => setSize(opt)}>
									{opt}
								</PopoverMenuItem>
							))}
						</div>
					</>
				)
			case "variant":
				return (
					<>
						<PopoverHeader onClick={goBack}>Variant</PopoverHeader>
						<div className="p-1.5">
							{VARIANT_OPTIONS.map((opt) => (
								<PopoverMenuItem key={opt} endContent={variant === opt ? <CheckIcon size={16} /> : null} onClick={() => setVariant(opt)}>
									{opt}
								</PopoverMenuItem>
							))}
						</div>
					</>
				)
			case "interaction":
				return (
					<>
						<PopoverHeader onClick={goBack}>Interaction</PopoverHeader>
						<div className="p-1.5">
							{INTERACTION_OPTIONS.map((opt) => (
								<PopoverMenuItem key={opt} endContent={interaction === opt ? <CheckIcon size={16} /> : null} onClick={() => setInteraction(opt)}>
									{opt}
								</PopoverMenuItem>
							))}
						</div>
					</>
				)
			default:
				return null
		}
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
				<Popover align="end" side="bottom" onOpenChange={(open) => !open && resetNavigation()}>
					<PopoverTrigger asChild>
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="max-w-55 p-0">
						<AnimateHeight>{renderPopoverContent()}</AnimateHeight>
					</PopoverContent>
				</Popover>
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
				<CodeSnippet
					title="accordion.tsx"
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
