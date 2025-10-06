"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const languages = [
	{ label: "English", value: "en" },
	{ label: "French", value: "fr" },
	{ label: "German", value: "de" },
	{ label: "Spanish", value: "es" },
	{ label: "Portuguese", value: "pt" },
	{ label: "Russian", value: "ru" },
	{ label: "Japanese", value: "ja" },
	{ label: "Korean", value: "ko" },
	{ label: "Chinese", value: "zh" },
] as const

const FormSchema = z.object({
	language: z.string({
		error: "Please select a language.",
	}),
})

export default function ComboboxForm() {
	const [open, setOpen] = React.useState(false)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		mode: "onSubmit",
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast("You submitted the following values", {
			description: JSON.stringify(data, null, 2),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Language</FormLabel>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											color="neutral"
											role="combobox"
											aria-haspopup="listbox"
											aria-expanded={!!field.value}
											className={cn("w-[200px] justify-between", !field.value && "text-fg-tertiary")}>
											{field.value ? languages.find((language) => language.value === field.value)?.label : "Select language"}
											<ChevronsUpDown className="text-fg-tertiary" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command className="border-0">
										<CommandInput placeholder="Search language..." className="h-9" />
										<CommandList>
											<CommandEmpty>No language found.</CommandEmpty>
											<CommandGroup>
												{languages.map((language) => (
													<CommandItem
														value={language.label}
														key={language.value}
														onSelect={() => {
															form.setValue("language", language.value, {
																shouldValidate: true,
																shouldDirty: true,
															})
															setOpen(false)
														}}>
														{language.label}
														<Check className={cn("ml-auto", language.value === field.value ? "opacity-100" : "opacity-0")} />
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<p className="text-xs">This is the language that will be used in the dashboard.</p>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
