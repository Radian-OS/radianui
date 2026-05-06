"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Alert, AlertIcon, AlertTitle } from "@/styles/default/ui/alert"
import { Button } from "@/styles/default/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"

interface FormData {
	email: string
}

const FormSchema = z.object({
	email: z.string().check(z.email("Please enter a valid email address.")),
})

export default function FormPreview() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { email: "" },
	})

	const onSubmit = (data: FormData) => {
		console.log(data)
		toast.custom(() => (
			<Alert variant="soft" color="primary">
				<AlertIcon>
					<AlertCircle />
				</AlertIcon>
				<AlertTitle>Your form has been successfully submitted</AlertTitle>
			</Alert>
		))
	}

	const handleReset = () => {
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-6">
				<FormField
					control={form.control}
					name="email"
					rules={{
						required: "Email is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Please enter a valid email address",
						},
					}}
					render={({ field }: { field: FieldValues }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Email address" {...field} />
							</FormControl>
							{/* <FormDescription>Enter your email</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center justify-end gap-2.5">
					<Button type="button" variant="outline" onClick={handleReset}>
						Reset
					</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	)
}
