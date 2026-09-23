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

interface PersonalInfoSectionProps {
	form: LongFormReturn
}

export function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
	return (
		<div className="space-y-4">
			<h3 className="heading-6 text-fg">Personal Information</h3>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="John" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder="Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<FormField
				control={form.control}
				name="phone"
				render={({ field }) => (
					<FormItem className="space-y-2">
						<FormLabel>Phone Number</FormLabel>
						<FormControl>
							<Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
