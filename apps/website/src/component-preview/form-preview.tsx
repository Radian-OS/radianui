"use client"

import { AlertCircle, EyeIcon, SquareTerminal } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import CodeSnippet from "@/components/code-snippet"
import { Alert, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

interface FormData {
	email: string
}

export default function FormPreview() {
	const form = useForm<FormData>({
		defaultValues: { email: "" },
		mode: "onChange",
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
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
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
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Email address" {...field} />
										</FormControl>
										<FormDescription>Enter your email</FormDescription>
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
					</Form>{" "}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="form.tsx"
					showLineNumber
					className="h-[420px]"
					code={`	import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { toast } from "sonner"			

interface FormData {
	email: string
}	
						
export default function FormPreview() {
	const form = useForm<FormData>({
		defaultValues: { email: "" },
		mode: "onChange",
	})

	const onSubmit = (data: FormData) => {
		console.log(data)
		toast.custom((t) => (
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
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Email address" {...field} />
							</FormControl>
							<FormDescription>Enter your email</FormDescription>
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
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
