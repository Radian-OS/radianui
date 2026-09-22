import React from "react"
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"
import type { LongFormReturn } from "./types"

interface AddressSectionProps {
	form: LongFormReturn
}

export function AddressSection({ form }: AddressSectionProps) {
	return (
		<div className="space-y-4">
			<h3 className="heading-6 text-foreground">Address</h3>
			<FormField
				control={form.control}
				name="street"
				render={({ field }) => (
					<FormItem className="space-y-2">
						<FormLabel>Street Address</FormLabel>
						<FormControl>
							<Input placeholder="123 Main St" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
					name="state"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>State</FormLabel>
							<FormControl>
								<Input placeholder="NY" {...field} />
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
		</div>
	)
}
