"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import { Button } from "@/styles/default/ui/button"
import {
	COUNTRIES,
	DEFAULT_CHECKOUT_VALUES,
	type CheckoutFormValues,
	checkoutFormSchema,
} from "./types"

export function CheckoutForm() {
	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: DEFAULT_CHECKOUT_VALUES,
	})

	function onSubmit(values: CheckoutFormValues) {
		console.log("Checkout form submitted:", values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Contact */}
				<div className="space-y-4">
					<h3 className="heading-6 text-foreground">Contact</h3>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="you@example.com"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									We&apos;ll send your receipt here.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Payment Method */}
				<div className="space-y-4">
					<h3 className="heading-6 text-foreground">Payment Method</h3>
					<FormField
						control={form.control}
						name="cardName"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormLabel>Name on Card</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="cardNumber"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormLabel>Card Number</FormLabel>
								<FormControl>
									<Input
										maxLength={19}
										placeholder="1234567890123456"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="expiryDate"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Expiry Date</FormLabel>
									<FormControl>
										<Input placeholder="MM/YY" maxLength={5} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="cvv"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>CVV</FormLabel>
									<FormControl>
										<Input placeholder="123" maxLength={4} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Billing Address */}
				<div className="space-y-4">
					<h3 className="heading-6 text-foreground">Billing Address</h3>
					<FormField
						control={form.control}
						name="billingAddress"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input placeholder="123 Main St" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input placeholder="New York" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="zipCode"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>ZIP Code</FormLabel>
									<FormControl>
										<Input placeholder="10001" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormLabel>Country</FormLabel>
								<Select value={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select country" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{COUNTRIES.map((c) => (
											<SelectItem key={c.value} value={c.value}>
												{c.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					variant="strong"
					color="neutral"
					size="44"
					className="bg-foreground text-background hover:bg-foreground/90 w-full font-medium">
					Complete Purchase
				</Button>
			</form>
		</Form>
	)
}
