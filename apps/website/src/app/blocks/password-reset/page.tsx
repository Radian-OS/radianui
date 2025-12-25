"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { GmailIcon } from "@/components/home/gmail-icon"
import { OutlookIcon } from "@/components/home/outlook-icon"
import Logo from "@/components/home/playground-logo"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"

interface VerificationProps {
	fullScreen?: boolean
}

const FormSchema = z.object({
	email: z.email("Please enter a valid email address"),
})

export default function Page({ fullScreen = true }: VerificationProps) {
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	})

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data)
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
			form.reset()
		}, 2000)
	}

	return (
		<div className={cn("bg-bg flex items-center justify-center px-5", { "h-full w-full": !fullScreen, "h-screen w-screen": fullScreen })}>
			<div className="w-100 bg-bg flex">
				<div className="flex flex-1 flex-col gap-8">
					<div>
						<Logo />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">Reset password</h1>
						<p className="text-fg-secondary text-sm">Enter the email address you registered with and we&apos;ll send you the reset instructions</p>
					</div>
					<Form {...form}>
						<form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-5">
								<div className="flex flex-col gap-5">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email Address</FormLabel>
												<FormControl>
													<Input size="36" type="email" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button className="w-full" type="submit" disabled={isLoading}>
									{isLoading ? <Spinner variant="default" /> : "Send Reset Instructions"}
								</Button>
							</div>
							<Divider className="my-2.5" />

							<div className="flex gap-3">
								<Button variant="outline" color="neutral" className="text-fg-secondary w-full">
									<GmailIcon />
									Open Gmail
								</Button>
								<Button variant="outline" color="neutral" className="text-fg-secondary w-full">
									<OutlookIcon />
									Open Outlook
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
