"use client"

import { ComponentProps, HTMLAttributes, createContext, useContext, useId } from "react"
import { Slot } from "@radix-ui/react-slot"
import { Label as LabelPrimitive } from "radix-ui"
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label } from "./label"

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
	name: TName
}

type FormItemContextValue = {
	id: string
}

const Form = FormProvider

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

const useFormField = () => {
	const fieldContext = useContext(FormFieldContext)
	const itemContext = useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()

	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>")
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

function FormItem({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const id = useId()
	const { error } = useFormField()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div data-slot="form-item" className={cn("flex flex-col gap-1.5", className)} data-invalid={!!error} {...props} />
		</FormItemContext.Provider>
	)
}

function FormLabel({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
	const { formItemId } = useFormField()

	return <Label data-slot="form-label" className={cn("text-fg text-sm font-medium", className)} htmlFor={formItemId} {...props} />
}

function FormControl({ ...props }: ComponentProps<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot data-slot="form-control" id={formItemId} aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`} aria-invalid={!!error} {...props} />
	)
}

function FormDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
	const { formDescriptionId, error } = useFormField()

	if (error) {
		return null
	}

	return <div data-slot="form-description" id={formDescriptionId} className={cn("text-fg-secondary text-xs font-normal", className)} {...props} />
}

function FormMessage({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	if (!body) {
		return null
	}

	return (
		<div data-slot="form-message" id={formMessageId} className={cn("text-error-text text-xs font-normal", className)} {...props}>
			{body}
		</div>
	)
}

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField }
