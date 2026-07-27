import React from "react"
import { Label } from "@radix-ui/react-label"
import { ListTodo } from "lucide-react"
import {
	ButtonOption,
	SizeOption,
	SpacingOption,
	usePlayground,
} from "@/contexts/playground"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"
import { Button, IconButton } from "@/styles/default/ui/button"
import { Divider } from "@/styles/default/ui/divider"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"
import { Switch } from "@/styles/default/ui/switch"

export default function ListTodos() {
	const {
		spacing,
		setSpacing,
		size,
		setSize,
		label,
		setLabel,
		placeholder,
		setPlaceholder,
		icon,
		setIcon,
		button,
		setButton,
	} = usePlayground()

	const handleSpacingClick = (value: SpacingOption): void => {
		setSpacing?.(value)
	}
	const handleSizeClick = (value: SizeOption): void => {
		setSize?.(value)
	}

	const handleLabelClick = (value: boolean): void => {
		setLabel?.(value)
	}
	const handlePlaceholderClick = (value: boolean): void => {
		setPlaceholder?.(value)
	}
	const handleIconClick = (value: boolean): void => {
		setIcon?.(value)
	}

	const handleButtonClick = (value: ButtonOption): void => {
		setButton?.(value)
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<IconButton
					variant="ghost"
					color="neutral"
					aria-label="Change Form Styles"
					className="hover:bg-fill2 text-fg flex size-8 cursor-pointer items-center justify-center rounded-md">
					<ListTodo size={18} />
				</IconButton>
			</PopoverTrigger>
			<PopoverContent sideOffset={10} className="border-none p-0">
				<p className="text-fg-tertiary px-3 py-2 text-xs font-medium">
					FORM CONTROL
				</p>
				<Divider />
				<Accordion type="single" variant="open" className="w-full" collapsible>
					<AccordionItem className="px-3" value="spacing">
						<AccordionTrigger className="h-9">Spacing</AccordionTrigger>
						<AccordionContent className="flex gap-1.5">
							<Button
								variant="outline"
								size="28"
								color={spacing === "compact" ? "primary" : "neutral"}
								onClick={() => handleSpacingClick("compact")}>
								Compact
							</Button>
							<Button
								variant="outline"
								size="28"
								color={spacing === "default" ? "primary" : "neutral"}
								onClick={() => handleSpacingClick("default")}>
								Default
							</Button>
							<Button
								variant="outline"
								size="28"
								color={spacing === "spacious" ? "primary" : "neutral"}
								onClick={() => handleSpacingClick("spacious")}>
								Spacious
							</Button>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem className="px-3" value="size">
						<AccordionTrigger className="h-9">Size</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-1.5">
							<div className="flex gap-1.5">
								<Button
									variant="outline"
									size="28"
									color={size === "default" ? "primary" : "neutral"}
									onClick={() => handleSizeClick("default")}>
									Default-36
								</Button>
								<Button
									variant="outline"
									size="28"
									color={size === "small" ? "primary" : "neutral"}
									onClick={() => handleSizeClick("small")}>
									Small-32
								</Button>
								<Button
									variant="outline"
									size="28"
									color={size === "large" ? "primary" : "neutral"}
									onClick={() => handleSizeClick("large")}>
									Large-40
								</Button>
							</div>
							<p className="text-fg-tertiary text-xs font-normal">
								Input and Buttons.More sizes available in docs
							</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem className="px-3" value="input">
						<AccordionTrigger className="h-9">Input</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-2">
							<div className="flex items-center gap-2">
								<Switch
									onCheckedChange={() => handleLabelClick(!label)}
									size="20"
									checked={label}
									id="Label"
								/>
								<Label htmlFor="Label">Label</Label>
							</div>
							<div className="flex items-center gap-2">
								<Switch
									onCheckedChange={() => handlePlaceholderClick(!placeholder)}
									checked={placeholder}
									size="20"
									id="Placeholder"
								/>
								<Label htmlFor="Placeholder">Placholder</Label>
							</div>
							<div className="flex items-center gap-2">
								<Switch
									onCheckedChange={() => handleIconClick(!icon)}
									checked={icon}
									size="20"
									id="Icon"
								/>
								<Label htmlFor="Icon">Icon</Label>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem className="px-3" value="button">
						<AccordionTrigger className="h-9">Button</AccordionTrigger>
						<AccordionContent className="flex gap-1.5">
							<Button
								variant="outline"
								size="28"
								color={button === "default" ? "primary" : "neutral"}
								onClick={() => handleButtonClick("default")}>
								Default
							</Button>
							<Button
								variant="outline"
								size="28"
								color={button === "gradient" ? "primary" : "neutral"}
								onClick={() => handleButtonClick("gradient")}>
								Gradient
							</Button>
							<Button
								variant="outline"
								size="28"
								color={button === "fancy" ? "primary" : "neutral"}
								onClick={() => handleButtonClick("fancy")}>
								Fancy
							</Button>
							<Button
								variant="outline"
								size="28"
								color={button === "elevated" ? "primary" : "neutral"}
								onClick={() => handleButtonClick("elevated")}>
								Elevated
							</Button>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</PopoverContent>
		</Popover>
	)
}
