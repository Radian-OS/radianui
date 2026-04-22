"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
} from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label, type LabelProps } from "@/styles/lyra/ui/label"

export type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName
}

export type FormItemContextValue = {
	id: string
}

export type FormItemProps = React.HTMLAttributes<HTMLDivElement>

export type FormLabelProps = LabelProps

export type FormControlProps = React.ComponentProps<typeof Slot>

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

function useFormField() {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>")
	}

	const fieldState = getFieldState(fieldContext.name, formState)
	const id = itemContext?.id ?? ""

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

const Form = FormProvider

function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

FormField.displayName = "FormField"

function FormItem({ className, ...props }: FormItemProps) {
	const id = React.useId()
	const { error } = useFormField()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("flex flex-col gap-1.5", className)}
				data-invalid={!!error}
				{...props}
			/>
		</FormItemContext.Provider>
	)
}

FormItem.displayName = "FormItem"

function FormLabel({ className, ...props }: FormLabelProps) {
	const { formItemId } = useFormField()

	return (
		<Label
			data-slot="form-label"
			className={cn("text-fg text-sm font-medium", className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
}

FormLabel.displayName = "FormLabel"

function FormControl({ ...props }: FormControlProps) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
}

FormControl.displayName = "FormControl"

function FormDescription({ className, ...props }: FormDescriptionProps) {
	const { formDescriptionId, error } = useFormField()

	if (error) {
		return null
	}

	return (
		<div
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-fg-secondary text-xs font-normal", className)}
			{...props}
		/>
	)
}

FormDescription.displayName = "FormDescription"

function FormMessage({ className, children, ...props }: FormMessageProps) {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	if (!body) {
		return null
	}

	return (
		<div
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-error-text text-xs font-normal", className)}
			{...props}>
			{body}
		</div>
	)
}

FormMessage.displayName = "FormMessage"

export {
	useFormField,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
}
