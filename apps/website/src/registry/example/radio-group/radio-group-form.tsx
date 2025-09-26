"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Alert, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"

const options = [
	{ id: "m3", label: "M3" },
	{ id: "m3_pro", label: "M3 Pro" },
	{ id: "m3_max", label: "M3 Max" },
	{ id: "m4", label: "M4" },
	{ id: "m4_pro", label: "M4 Pro" },
	{ id: "m4_max", label: "M4 Max (Out of Stock)", disabled: true },
]

export default function RadioGroupForm() {
	const FormSchema = z.object({
		chip: z.string().nonempty({
			message: "You must select an option.",
		}),
	})

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { chip: "" },
	})

	function onSubmit(values: z.infer<typeof FormSchema>) {
		const selected = options.find((o) => o.id === values.chip)?.id
		toast.custom(
			(t) => (
				<Alert variant="strong" color="success" onClose={() => toast.dismiss(t)}>
					<AlertIcon>
						<CheckCircle />
					</AlertIcon>
					<AlertTitle>Selected Option: {selected}</AlertTitle>
				</Alert>
			),
			{
				duration: 5000,
			}
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-[320px] space-y-6">
				<FormField
					control={form.control}
					name="chip"
					render={({ field }) => (
						<FormItem>
							<FormLabel asChild>
								<Label>Select Your ARM Chip</Label>
							</FormLabel>
							<FormControl>
								<RadioGroup value={field.value} onValueChange={field.onChange}>
									{options.map((opt) => (
										<div className="flex items-center gap-2" key={opt.id}>
											<RadioGroupItem value={opt.id} id={opt.id} disabled={opt.disabled} />
											<Label htmlFor={opt.id}>{opt.label}</Label>
										</div>
									))}
								</RadioGroup>
							</FormControl>
							<FormDescription>Choose one option before submitting.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center justify-end gap-2.5">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	)
}
