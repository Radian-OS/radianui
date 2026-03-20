"use client"

import { CreditCard, Ellipsis, Landmark, Link2 } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

type PaymentFormValues = {
	email: string
	fullName: string
	country: string
	address: string
}

type PlanSummary = {
	id: string
	name: string
	description: string
	price: string
	priceMonthly: string
}

const planData: Record<string, PlanSummary> = {
	starter: {
		id: "starter",
		name: "Starter plan",
		description: "Includes 50GB individual user data & 2 user accounts",
		price: "$50",
		priceMonthly: "/per month",
	},
	standard: {
		id: "standard",
		name: "Standard plan",
		description: "Includes 200GB individual user data & 10 user accounts.",
		price: "$70",
		priceMonthly: "/per month",
	},
}

export default function PaymentStep({
	selectedPlanId = "standard",
}: {
	selectedPlanId?: string
}) {
	const form = useForm<PaymentFormValues>({
		defaultValues: {
			email: "",
			fullName: "",
			country: "",
			address: "",
		},
	})

	const selectedPlan = planData[selectedPlanId] || planData.standard
	const otherPlan =
		selectedPlanId === "starter" ? planData.standard : planData.starter

	const subtotal = selectedPlanId === "starter" ? "$49.99" : "$69.99"
	const tax = selectedPlanId === "starter" ? "$2.90" : "$4.05"
	const total = selectedPlanId === "starter" ? "$52.89" : "$73.99"

	function onSubmit(data: PaymentFormValues) {
		console.log("Payment data:", data)
	}

	return (
		<div className="flex w-full max-w-[960px] flex-col lg:flex-row">
			{/* Left - Plan Summary */}
			<div className="bg-fill1 flex flex-1 flex-col gap-8 p-6 lg:p-10">
				<div className="flex flex-col gap-3">
					<p className="text-fg text-base font-medium">Plan summary</p>
					<div className="flex flex-col gap-4">
						{/* Selected Plan */}
						<div className="border-primary-border bg-bg flex items-start gap-9 rounded-lg border p-3">
							<div className="flex flex-1 gap-5">
								<div className="bg-primary flex size-6 items-center justify-center rounded-full">
									<div className="bg-bg size-3 rounded-full" />
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex flex-col gap-1">
										<p className="text-fg text-sm font-semibold">
											{selectedPlan.name}
										</p>
										<p className="text-fg-secondary text-xs">
											{selectedPlan.description}
										</p>
									</div>
									<p className="text-primary text-xs font-medium">
										View plan details
									</p>
								</div>
							</div>
							<div className="flex items-end gap-0.5">
								<span className="text-fg text-sm font-semibold">
									{selectedPlan.price}
								</span>
								<span className="text-fg-secondary pb-0.5 text-xs">
									{selectedPlan.priceMonthly}
								</span>
							</div>
						</div>

						{/* Other Plan */}
						<div className="border-soft bg-bg flex items-start gap-9 rounded-lg border p-3">
							<div className="flex flex-1 gap-5">
								<div className="border-alpha bg-bg flex size-6 items-center justify-center rounded-full border">
									<div className="bg-bg size-3 rounded-full" />
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex flex-col gap-1">
										<p className="text-fg text-sm font-semibold">
											{otherPlan.name}
										</p>
										<p className="text-fg-secondary text-xs">
											{otherPlan.description}
										</p>
									</div>
									<p className="text-primary text-xs font-medium">
										View plan details
									</p>
								</div>
							</div>
							<div className="flex items-end gap-0.5">
								<span className="text-fg text-sm font-semibold">
									{otherPlan.price}
								</span>
								<span className="text-fg-secondary pb-0.5 text-xs">
									{otherPlan.priceMonthly}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Pricing breakdown */}
				<div className="flex flex-col gap-2">
					<Divider />
					<div className="flex flex-col gap-1">
						<div className="flex items-center justify-between px-2 py-1.5">
							<span className="text-fg text-sm font-medium">Subtotal</span>
							<span className="text-fg text-sm font-medium">{subtotal}</span>
						</div>
						<div className="flex items-center justify-between px-2 py-1.5">
							<span className="text-fg text-sm">Tax</span>
							<span className="text-fg-secondary text-[13px]">{tax}</span>
						</div>
						<div className="flex items-center justify-between px-2 py-1.5">
							<span className="text-fg text-sm font-medium">Promo</span>
							<span className="text-fg-secondary text-sm">&mdash;</span>
						</div>
					</div>
					<Divider />
					<div className="flex items-center justify-between px-2 py-1.5">
						<span className="text-fg text-sm font-semibold">Total</span>
						<span className="text-fg text-sm font-semibold">
							{total}/ month
						</span>
					</div>
				</div>
			</div>

			{/* Right - Payment Form */}
			<div className="bg-bg flex flex-1 flex-col items-center justify-center p-6 lg:p-10">
				<div className="w-full max-w-[480px]">
					<div className="flex flex-col gap-6">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							className="w-full">
							Pay with link
							<Link2 className="size-5" />
						</Button>

						<div className="flex items-center gap-1">
							<Divider className="flex-1" />
							<span className="text-fg-secondary text-sm font-medium">Or</span>
							<Divider className="flex-1" />
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex flex-col gap-5">
								{/* Contact info */}
								<div className="flex flex-col gap-4">
									<p className="text-fg text-base font-medium">Contact info</p>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="Enter your email"
														size="36"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								{/* Payment method */}
								<div className="flex flex-col gap-4">
									<p className="text-fg text-base font-medium">
										Payment method
									</p>
									<div className="flex gap-4">
										<button
											type="button"
											className="border-border bg-bg shadow-xs flex h-9 flex-1 items-center justify-center rounded-lg border px-2.5">
											<CreditCard className="text-fg-secondary size-5" />
										</button>
										<button
											type="button"
											className="border-border bg-bg shadow-xs flex h-9 flex-1 items-center justify-center rounded-lg border px-2.5">
											<Landmark className="text-fg-secondary size-5" />
										</button>
									</div>
									<div className="border-border bg-bg shadow-xs flex h-9 items-center justify-between rounded-lg border px-2.5">
										<div className="flex items-center gap-1.5">
											<Ellipsis className="text-fg-secondary size-5" />
											<span className="text-fg text-xs font-medium">More</span>
										</div>
										<div className="flex items-center gap-1.5">
											<Image
												src="https://www.google.com/s2/favicons?sz=32&domain=americanexpress.com"
												alt="Amex"
												width={20}
												height={20}
											/>
											<Image
												src="https://www.google.com/s2/favicons?sz=32&domain=unionpayintl.com"
												alt="UnionPay"
												width={20}
												height={20}
											/>
											<Image
												src="https://www.google.com/s2/favicons?sz=32&domain=paypal.com"
												alt="PayPal"
												width={20}
												height={20}
											/>
											<Image
												src="https://www.google.com/s2/favicons?sz=32&domain=apple.com"
												alt="Apple Pay"
												width={20}
												height={20}
											/>
											<Image
												src="https://www.google.com/s2/favicons?sz=32&domain=pay.google.com"
												alt="Google Pay"
												width={20}
												height={20}
											/>
										</div>
									</div>
								</div>

								{/* Billing information */}
								<div className="flex flex-col gap-4">
									<p className="text-fg text-base font-medium">
										Billing information
									</p>
									<FormField
										control={form.control}
										name="fullName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Full name</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter your full name"
														size="36"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="country"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Country or region</FormLabel>
												<Select
													value={field.value}
													onValueChange={field.onChange}>
													<FormControl>
														<SelectTrigger size="36">
															<SelectValue placeholder="Select country" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="us">United States</SelectItem>
														<SelectItem value="uk">United Kingdom</SelectItem>
														<SelectItem value="ca">Canada</SelectItem>
														<SelectItem value="au">Australia</SelectItem>
														<SelectItem value="de">Germany</SelectItem>
														<SelectItem value="fr">France</SelectItem>
														<SelectItem value="np">Nepal</SelectItem>
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Address line 1</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter your address"
														size="36"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<Divider />

								<Button type="submit" color="primary" className="w-full">
									Pay $--
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}
