import React from "react"
import { Label } from "@radix-ui/react-label"
import { ListTodo } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Switch } from "@/registry/ui/switch"

export default function ListTodos() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
					<ListTodo size={18} />
				</div>
			</PopoverTrigger>
			<PopoverContent sideOffset={10} className="border-none p-0">
				<p className="text-fg-tertiary px-3 py-2 text-xs font-medium">FORM CONTROL</p>
				<Divider />
				<Accordion type="single" variant="open" className="w-full" collapsible>
					<AccordionItem className="px-3" value="spacing">
						<AccordionTrigger className="h-9">Spacing</AccordionTrigger>
						<AccordionContent className="flex gap-1.5">
							<Button variant="outline" size="28" color="neutral">
								Compact
							</Button>
							<Button variant="outline" size="28" color="primary">
								Default
							</Button>
							<Button variant="outline" size="28" color="neutral">
								Spacious
							</Button>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem className="px-3" value="size">
						<AccordionTrigger className="h-9">Size</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-1.5">
							<div className="flex gap-1.5">
								<Button variant="outline" size="28" color="primary">
									Default-36
								</Button>
								<Button variant="outline" size="28" color="neutral">
									Small-32
								</Button>
								<Button variant="outline" size="28" color="neutral">
									Large-40
								</Button>
							</div>
							<p className="text-fg-tertiary text-xs font-normal">Input and Buttons.More sizes available in docs</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem className="px-3" value="input">
						<AccordionTrigger className="h-9">Input</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-2">
							<div className="flex items-center gap-2">
								<Switch size="20" defaultChecked id="Label" />
								<Label htmlFor="Label">Label</Label>
							</div>
							<div className="flex items-center gap-2">
								<Switch size="20" id="Placeholder" />
								<Label htmlFor="Placeholder">Placholder</Label>
							</div>
							<div className="flex items-center gap-2">
								<Switch size="20" id="Icon" />
								<Label htmlFor="Icon">Icon</Label>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem className="px-3" value="button">
						<AccordionTrigger className="h-9">Button</AccordionTrigger>
						<AccordionContent className="flex gap-1.5">
							<Button variant="outline" size="28" color="neutral">
								Default
							</Button>
							<Button variant="outline" size="28" color="primary">
								Gradient
							</Button>
							<Button variant="outline" size="28" color="neutral">
								Fancy
							</Button>
							<Button variant="outline" size="28" color="neutral">
								Inverted
							</Button>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</PopoverContent>
		</Popover>
	)
}
