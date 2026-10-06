"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/styles/default/ui/form"
import { Button } from "@/styles/default/ui/button"
import {
	DEFAULT_LONG_FORM_VALUES,
	type LongFormValues,
	longFormSchema,
} from "./types"
import { AccountDetailsSection } from "./account-details-section"
import { PersonalInfoSection } from "./personal-info-section"
import { AddressSection } from "./address-section"

export function LongForm() {
	const form = useForm<LongFormValues>({
		resolver: zodResolver(longFormSchema),
		defaultValues: DEFAULT_LONG_FORM_VALUES,
	})

	function onSubmit(values: LongFormValues) {
		console.log("Long form submitted:", values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<AccountDetailsSection form={form} />
				<PersonalInfoSection form={form} />
				<AddressSection form={form} />
				<Button
					type="submit"
					variant="strong"
					color="neutral"
					size="44"
					className="w-full">
					Complete Registration
				</Button>
			</form>
		</Form>
	)
}
