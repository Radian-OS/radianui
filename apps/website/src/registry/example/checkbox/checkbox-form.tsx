"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Alert, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"

export default function CheckboxForm() {
	const FormSchema = z.object({
		acceptTerms: z.boolean().refine((val) => val === true, {
			message: "You must check the box.",
		}),
	})

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { acceptTerms: false },
	})

	function onSubmit() {
		toast.custom(
			(t) => (
				<Alert variant="strong" color="success" onClose={() => toast.dismiss(t)}>
					<AlertIcon>
						<CheckCircle />
					</AlertIcon>
					<AlertTitle>Your form has successfully submitted</AlertTitle>
				</Alert>
			),
			{
				duration: 5000,
			}
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<span className="block font-medium">Billing address</span>
				<FormField
					control={form.control}
					name="acceptTerms"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center gap-2">
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<FormLabel className="text-fg-secondary">Same as the shipping address</FormLabel>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center justify-start gap-2">
					<Button type="reset" size={"32"} variant="outline" color="neutral">
						Clear
					</Button>
					<Button type="submit" size={"32"}>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	)
}
