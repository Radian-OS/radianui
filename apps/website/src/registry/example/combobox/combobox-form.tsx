"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/ui/command"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const languages = [
	{
		label: "English",
		value: "en",
		flag: "/media/flags/usa.png",
		language: "English US",
	},
	{
		label: "French",
		value: "fr",
		flag: "/media/flags/france.png",
		language: "Français",
	},
	{
		label: "German",
		value: "de",
		flag: "/media/flags/germany.png",
		language: "Deutsch",
	},
	{
		label: "Spanish",
		value: "es",
		flag: "/media/flags/spain.png",
		language: "Español",
	},
	{
		label: "Portuguese",
		value: "pt",
		flag: "/media/flags/portugal.png",
		language: "Português",
	},
	{
		label: "Russian",
		value: "ru",
		flag: "/media/flags/russia.png",
		language: "Русский",
	},
	{
		label: "Japanese",
		value: "ja",
		flag: "/media/flags/japan.png",
		language: "日本語 ",
	},
	{
		label: "Chinese",
		value: "zh",
		flag: "/media/flags/china.png",
		language: "中文",
	},
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

	const selectedLanguage = languages.find(
		(country) => country.value === form.getValues().language
	)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
											className="text-fg-tertiary w-80 font-normal">
											{selectedLanguage ? (
												<>
													<img
														src={selectedLanguage.flag}
														alt={selectedLanguage.value.toUpperCase()}
														className="size-4"
													/>
													<span className="text-fg">
														{
															languages.find(
																(language) => language.value === field.value
															)?.language
														}
													</span>
												</>
											) : (
												"Select Language"
											)}
											<ChevronDown className="text-fg-tertiary ml-auto" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-80 p-0">
									<Command className="border-0">
										<CommandInput placeholder="Search" className="h-9" />
										<CommandList>
											<CommandEmpty>No language found.</CommandEmpty>
											<CommandGroup>
												{languages.map((l) => (
													<CommandItem
														value={l.label}
														key={l.value}
														onSelect={() => {
															form.setValue("language", l.value, {
																shouldValidate: true,
																shouldDirty: true,
															})
															setOpen(false)
														}}>
														<img
															src={l.flag}
															alt={l.value.toUpperCase()}
															className="size-4"
														/>
														<span className="text-sm">{l.language}</span>
														<div className="ml-auto flex gap-2">
															<span className="text-fg-secondary text-[13px] font-normal">
																({l.label})
															</span>
															{l.value === field.value && <Check />}
														</div>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Set Language
				</Button>
			</form>
		</Form>
	)
}
