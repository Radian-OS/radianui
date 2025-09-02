"use client"

import React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
	size?: "sm" | "md" | "lg"
	icon?: React.ReactElement
	children?: React.ReactNode
}

type CheckboxGroupProps = {
	label?: string
	defaultValue?: string[]
	value?: string[]
	onChange?: (values: string[]) => void
	size?: CheckboxProps["size"]
	disabled?: boolean
	className?: string
	children?: React.ReactNode
}

function Checkbox({ size = "md", icon = <Check />, children, className, ...props }: CheckboxProps) {
	const sizeClasses: Record<string, string> = {
		sm: "size-4 rounded-sm",
		md: "size-5 rounded-sm",
		lg: "size-6 rounded-md",
	}

	const iconSizes: Record<string, number> = {
		sm: 14,
		md: 16,
		lg: 18,
	}

	return (
		<label
			data-checked={props.checked}
			data-disabled={props.disabled}
			className={cn("peer inline-flex w-fit items-center gap-2", "data-[disabled]:text-fg-tertiary data-[disabled]:cursor-not-allowed", className)}>
			<CheckboxPrimitive.Root
				className={cn(
					"focus-visible:ring-primary flex items-center justify-center border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
					sizeClasses[size],
					"data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white",
					"data-[state=unchecked]:border-border data-[state=unchecked]:bg-background",
					"hover:border-primary/50",
					"data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
				)}
				{...props}>
				<CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
					{React.isValidElement(icon) &&
						React.cloneElement(icon as React.ReactElement<React.ComponentProps<"svg"> & { size?: number }>, {
							size: iconSizes[size],
							className: "",
						})}
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
			{children && <span className={cn(size === "lg" ? "text-base" : "text-sm", "select-none")}>{children}</span>}
		</label>
	)
}

function CheckboxGroup({ defaultValue = [], label, value, onChange, size = "md", disabled = false, className, children }: CheckboxGroupProps) {
	const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue)

	React.useEffect(() => {
		if (value !== undefined) {
			setSelectedValues(value)
		}
	}, [value])

	const handleCheckboxChange = (checkboxValue: string, checked: boolean) => {
		const newValues = checked ? [...selectedValues, checkboxValue] : selectedValues.filter((v) => v !== checkboxValue)

		setSelectedValues(newValues)
		onChange?.(newValues)
	}

	const cloneChild = (child: React.ReactNode): React.ReactNode => {
		if (!React.isValidElement(child)) {
			throw new Error("CheckboxGroup only accepts valid React elements.")
		}

		if (child.type !== Checkbox) {
			throw new Error("CheckboxGroup only accepts Checkbox components as children.")
		}
		const childProps = child.props as CheckboxProps
		const childValue = childProps.value?.toString()

		return React.cloneElement(child as React.ReactElement<CheckboxProps>, {
			size,
			disabled: disabled || childProps.disabled,
			checked: selectedValues.includes(childValue as string),
			onCheckedChange: (checked: boolean) => {
				if (childValue) {
					handleCheckboxChange(childValue, checked)
				}
				childProps.onCheckedChange?.(checked)
			},
		})
	}
	return (
		<div className="flex flex-col gap-3">
			{label && <span className="text-sm font-medium">{label}</span>}
			<div className={cn("flex flex-col gap-2", className)}>{React.Children.map(children, (child) => cloneChild(child))}</div>
		</div>
	)
}

export { Checkbox, CheckboxGroup }
