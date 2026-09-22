"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/styles/default/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"
import type { NewsletterFormValues } from "./types"

const newsletterSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
})

export function NewsletterSection() {
	const [isSubmitted, setIsSubmitted] = useState(false)

	const form = useForm<NewsletterFormValues>({
		resolver: zodResolver(newsletterSchema),
		defaultValues: {
			email: "",
		},
	})

	const onSubmit = (_values: NewsletterFormValues) => {
		setIsSubmitted(true)
		form.reset()
	}

	return (
		<section className="mx-auto my-12 max-w-7xl">
			<div className="bg-primary relative overflow-hidden rounded-3xl px-6 py-12 shadow-xl sm:px-12 sm:py-16 lg:px-16 lg:py-20">
				{/* Background subtle curved watermark rings */}
				<div
					className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full border-[40px] border-white/10 sm:size-[480px] sm:border-[60px]"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute -right-12 -bottom-32 size-80 rounded-full border-[30px] border-white/10 sm:size-[400px] sm:border-[50px]"
					aria-hidden="true"
				/>

				<div className="relative z-10 max-w-2xl">
					{/* Heading with typography utility rule */}
					<h2 className="heading-2 text-white">Subscribe to our newsletter</h2>

					{/* Subtitle */}
					<p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
						Stay in the loop with the freshest updates on our innovative
						products, exciting promotions, and insightful articles that cater to
						your interests!
					</p>

					{/* Newsletter Form with native Form + Zod validation */}
					{isSubmitted ? (
						<div className="mt-8 flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 text-white">
							<CheckCircle2 className="size-5 shrink-0" />
							<span className="text-sm font-medium">
								Thank you for subscribing! Check your inbox for updates.
							</span>
						</div>
					) : (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="mt-8 flex flex-col gap-3">
								<div className="flex flex-col gap-3 sm:flex-row sm:items-start">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormControl>
													<Input
														size="44"
														type="email"
														placeholder="Enter your email"
														{...field}
														className="h-11 border-white/30 bg-white/15 text-white placeholder:text-white/70 focus-visible:border-white focus-visible:ring-white/30"
													/>
												</FormControl>
												<FormMessage className="mt-1 text-xs text-white/90" />
											</FormItem>
										)}
									/>

									<Button
										type="submit"
										variant="strong"
										color="neutral"
										size="44"
										className="rounded-control-lg text-primary h-11 shrink-0 bg-white px-7 font-semibold transition-colors hover:bg-white/90">
										Subscribe
									</Button>
								</div>

								<p className="mt-1 text-xs text-white/70">
									By clicking submit I agree to receive the latest news and
									updates from Zentra
								</p>
							</form>
						</Form>
					)}
				</div>
			</div>
		</section>
	)
}
