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

interface AccountDetailsSectionProps {
	form: LongFormReturn
}

export function AccountDetailsSection({ form }: AccountDetailsSectionProps) {
	return (
		<div className="space-y-4">
			<h3 className="heading-6 text-foreground">Account Details</h3>
			<FormField
				control={form.control}
				name="username"
				render={({ field }) => (
					<FormItem className="space-y-2">
						<FormLabel>Username</FormLabel>
						<FormControl>
							<Input placeholder="johndoe" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem className="space-y-2">
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input type="email" placeholder="john@example.com" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
